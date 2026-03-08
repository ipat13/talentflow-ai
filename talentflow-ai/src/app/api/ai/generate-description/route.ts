import { NextRequest, NextResponse } from "next/server";

const MOCK_MODE = true;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, requirements } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (MOCK_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockDescriptions: Record<string, string> = {
        "Frontend": `Somos uma empresa líder em tecnologia à procura de um ${title} talentoso para joining our dynamic team.

**Responsabilidades:**
- Desenvolver e manter aplicações web de alta qualidade
- Colaborar com designers e backend developers
- Implementar designs responsivos e acessíveis
- Participar em code reviews e mentoring de juniors
- Manter-se atualizado com as últimas tendências em desenvolvimento web

**O que oferecemos:**
- Salário competitivo
- Trabalho híbrido flexível
- Gym e wellbeing benefits
- Formação contínua
- Ambiente de trabalho inovador

**Como candidatar:**
- Envie o seu CV e portfolio`,
        "default": `Estamos à procura de um ${title} para joining our team.

**Sobre a função:**
- Trabalhar em projetos desafiantes
- Colaborar com equipas multidisciplinares
- Contribuir para decisões técnicas

**Requisitos:**
${requirements?.map((r: string) => `- ${r}`).join("\n") || "- Experiência relevante"}

**Oferecemos:**
- Contrato de trabalho
- Pack salarial atrativo
- Formação e desenvolvimento
- Ambiente dinâmico`
      };

      const key = Object.keys(mockDescriptions).find((k) => 
        title.toLowerCase().includes(k.toLowerCase())
      ) || "default";

      const description = mockDescriptions[key]
        .replace("{{title}}", title)
        .replace("{{requirements}}", requirements?.join(", ") || "");

      const competencies = [
        "Comunicação",
        "Trabalho em Equipa",
        "Proatividade",
        "Resolução de Problemas",
        "Adaptabilidade",
      ];

      return NextResponse.json({
        description,
        competencies,
      });
    }

    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
    if (!deepseekApiKey) {
      return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    }

    const prompt = `Gera uma descrição de vaga de emprego profissional em português de Portugal para o seguinte cargo:

**Título:** ${title}
**Requisitos:** ${requirements?.join(", ") || "Não especificado"}

A descrição deve incluir:
1. Uma introdução atrativa sobre a empresa e a posição
2. Responsabilidades principais
3. Requisitos técnicos
4. O que oferecemos (salário, benefícios, ambiente)
5. Como candidatar

Responde em formato JSON com os campos "description" e "competencies" (array de strings).`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekApiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      return NextResponse.json({ description: content, competencies: [] });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating description:", error);
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 });
  }
}
