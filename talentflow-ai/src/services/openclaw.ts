export interface LinkedInProfile {
  name: string;
  headline?: string;
  location?: string;
  company?: string;
  summary?: string;
  skills?: string[];
  linkedInUrl: string;
}

export interface ScraperConfig {
  apiKey?: string;
  apiUrl?: string;
}

let config: ScraperConfig = {};

export function configureScraper(newConfig: ScraperConfig) {
  config = newConfig;
}

export async function scrapeLinkedInProfile(linkedInUrl: string): Promise<LinkedInProfile> {
  if (config.apiUrl && config.apiKey) {
    return scrapeWithExternalAPI(linkedInUrl);
  }
  
  return mockScrape(linkedInUrl);
}

async function scrapeWithExternalAPI(linkedInUrl: string): Promise<LinkedInProfile> {
  if (!config.apiUrl || !config.apiKey) {
    throw new Error("Scraper API not configured");
  }

  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({ url: linkedInUrl }),
    });

    if (!response.ok) {
      throw new Error(`Scraper API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      name: data.name || data.fullName || "Unknown",
      headline: data.headline || data.title,
      location: data.location,
      company: data.company || data.currentCompany,
      summary: data.summary || data.about,
      skills: data.skills || [],
      linkedInUrl,
    };
  } catch (error) {
    console.error("Error scraping LinkedIn profile:", error);
    throw error;
  }
}

function mockScrape(linkedInUrl: string): LinkedInProfile {
  const urlParts = linkedInUrl.split("/");
  const username = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
  
  const mockProfiles: Record<string, Partial<LinkedInProfile>> = {
    "joao-silva": {
      name: "João Silva",
      headline: "Senior Software Engineer at TechCorp",
      location: "Lisboa, Portugal",
      company: "TechCorp",
      summary: "Engenheiro de software com 8+ anos de experiência em React, Node.js e TypeScript.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    },
    "maria-santos": {
      name: "Maria Santos",
      headline: "Product Manager at StartupXYZ",
      location: "Porto, Portugal",
      company: "StartupXYZ",
      summary: "Product Manager com foco em produtos B2B SaaS e metodologias ágeis.",
      skills: ["Product Management", "Agile", "Scrum", "Data Analysis", "User Research"],
    },
    "pedro-oliveira": {
      name: "Pedro Oliveira",
      headline: "Full Stack Developer",
      location: "Braga, Portugal",
      company: "Freelancer",
      summary: "Desenvolvedor full stack especializado em React e Python.",
      skills: ["React", "Python", "Django", "Docker", "MongoDB"],
    },
  };

  const mockData = mockProfiles[username] || {
    name: username
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "),
    headline: "Professional",
    location: "Portugal",
    company: "Company",
    summary: "Professional with experience in various technologies.",
    skills: ["Communication", "Teamwork", "Problem Solving"],
  };

  return {
    ...mockData,
    linkedInUrl,
  } as LinkedInProfile;
}

export function isValidLinkedInUrl(url: string): boolean {
  const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
  return linkedInPattern.test(url);
}

export function extractUsernameFromUrl(url: string): string {
  const matches = url.match(/linkedin\.com\/in\/([\w-]+)/);
  return matches ? matches[1] : "";
}
