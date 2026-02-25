const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GeneratedJobDescription {
  description: string;
  requirements: string[];
}

function getApiKey(): string {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY not configured");
  }
  return apiKey;
}

export async function generateJobDescription(
  title: string,
  competencies: string[]
): Promise<GeneratedJobDescription> {
  const apiKey = getApiKey();

  const prompt = `Gera uma descrição de vaga profissional em português para a seguinte posição:

Título: ${title}
Competências chave: ${competencies.join(", ")}

Responde APENAS com um JSON válido no seguinte formato (sem markdown, sem código):
{
  "description": "Descrição completa da vaga em 2-3 parágrafos, incluindo responsabilidades principais e o que a empresa oferece",
  "requirements": ["Requisito 1", "Requisito 2", "Requisito 3", "Requisito 4", "Requisito 5"]
}

Os requisitos devem incluir:
- Experiência necessária
- Skills técnicas
- Skills soft
- Formação académica
- Diferenciais

Não uses markdown, não uses \`\`\`json, apenas o JSON puro.`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "És um especialista em recrutamento que cria descrições de vagas profissionais. Respondeste sempre apenas com JSON válido, sem markdown ou formatação adicional.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content in DeepSeek response");
    }

    const cleanedContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanedContent) as GeneratedJobDescription;

    if (!parsed.description || !Array.isArray(parsed.requirements)) {
      throw new Error("Invalid response structure from DeepSeek");
    }

    return parsed;
  } catch (error) {
    console.error("Error generating job description:", error);
    throw error;
  }
}

interface CVAnalysisResult {
  score: number;
  highlights: string[];
  summary: string;
  skillsMatch?: {
    matched: string[];
    missing: string[];
  };
  experience?: {
    yearsFound: number;
    relevantRoles: string[];
  };
  education?: {
    level: string;
    field: string;
  };
  recommendation: "strong_match" | "good_match" | "potential" | "weak_match";
  recommendationReason: string;
}

export async function analyzeCV(
  cvText: string,
  jobDescription: string,
  jobRequirements: string[]
): Promise<CVAnalysisResult> {
  const apiKey = getApiKey();

  const prompt = `Analisa este CV detalhadamente e compara-o com a vaga. Retorna uma análise completa em JSON.

VAGA:
${jobDescription}

REQUISITOS:
${jobRequirements.join("\n")}

CV DO CANDIDATO:
${cvText}

Responde APENAS com JSON válido (sem markdown):
{
  "score": <número de 0 a 100 representando o match global>,
  "highlights": ["Ponto forte 1", "Ponto forte 2", "Ponto forte 3"],
  "summary": "Resumo breve do candidato (2-3 frases)",
  "skillsMatch": {
    "matched": ["Skill que corresponde 1", "Skill que corresponde 2"],
    "missing": ["Skill em falta 1", "Skill em falta 2"]
  },
  "experience": {
    "yearsFound": <anos de experiência encontrados ou 0>,
    "relevantRoles": ["Role relevante 1", "Role relevante 2"]
  },
  "education": {
    "level": "Licenciatura/Mestrado/Doutoramento/Outro",
    "field": "Área de formação"
  },
  "recommendation": "strong_match|good_match|potential|weak_match",
  "recommendationReason": "Razão breve da recomendação"
}

Critérios de recomendação:
- strong_match: 80-100% score, cumpre requisitos essenciais
- good_match: 60-79% score, cumpre maioria dos requisitos
- potential: 40-59% score, tem potencial mas faltam alguns requisitos
- weak_match: 0-39% score, não é adequado para a posição

Não uses markdown, apenas JSON puro.`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "És um recrutador experiente que analisa CVs detalhadamente. Respondeste sempre apenas com JSON válido, sem markdown ou formatação adicional.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content in DeepSeek response");
    }

    const cleanedContent = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanedContent) as CVAnalysisResult;

    if (
      typeof parsed.score !== "number" ||
      !Array.isArray(parsed.highlights)
    ) {
      throw new Error("Invalid response structure from DeepSeek");
    }

    return parsed;
  } catch (error) {
    console.error("Error analyzing CV:", error);
    throw error;
  }
}
