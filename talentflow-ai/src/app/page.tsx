"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Users, Briefcase, Zap, Search, Globe, Plus, Linkedin, X, Upload, Loader2, MapPin, DollarSign } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  candidates: number;
  matches: number;
}

export default function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importedCandidates, setImportedCandidates] = useState<any[]>([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  });
  const [jobs, setJobs] = useState<Job[]>([
    { id: "1", title: "Senior Frontend Engineer", company: "Tech Corp", location: "Remote", type: "Full-time", salary: "€60k - €80k", description: "We are looking for a Senior Frontend Engineer...", candidates: 45, matches: 12 },
    { id: "2", title: "Data Scientist", company: "DataTech", location: "Lisbon, PT", type: "Full-time", salary: "€50k - €70k", description: "Join our data science team...", candidates: 38, matches: 8 },
    { id: "3", title: "Product Designer", company: "DesignStudio", location: "Remote", type: "Contract", salary: "€40k - €60k", description: "Create amazing user experiences...", candidates: 28, matches: 6 },
  ]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard TalentFlow</h1>
            <p className="text-gray-400">Bem-vindo, {user.displayName}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" onClick={() => setShowLinkedInModal(true)}>
              <Linkedin className="w-4 h-4 mr-2" />
              Importar LinkedIn
            </Button>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600" onClick={() => setShowNewJobModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Vaga
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Vagas Ativas" value={jobs.length.toString()} icon={<Briefcase className="text-blue-400" />} color="blue" />
          <StatsCard title="Candidatos" value="148" icon={<Users className="text-emerald-400" />} color="emerald" />
          <StatsCard title="Matches" value="24" icon={<Zap className="text-purple-400" />} color="purple" />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-white">Vagas Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-white">Candidatos Recentes</h2>
        <div className="space-y-4">
          <CandidateRow name="Ana Silva" role="Senior Frontend Engineer" score={92} linkedinUrl="https://linkedin.com/in/anasilva" />
          <CandidateRow name="João Pereira" role="Data Scientist" score={85} linkedinUrl="https://linkedin.com/in/joaopereira" />
          <CandidateRow name="Marta Santos" role="Product Designer" score={74} linkedinUrl="https://linkedin.com/in/martasantos" />
          {importedCandidates.map((c, i) => <CandidateRow key={i} name={c.name} role={c.role} score={c.score} linkedinUrl={c.linkedinUrl} />)}
        </div>

        {showNewJobModal && <NewJobModal jobs={jobs} setJobs={setJobs} setShowNewJobModal={setShowNewJobModal} jobForm={jobForm} setJobForm={setJobForm} />}
        {showLinkedInModal && <LinkedInModal linkedInUrl={linkedInUrl} setLinkedInUrl={setLinkedInUrl} isImporting={isImporting} setIsImporting={setIsImporting} setImportedCandidates={setImportedCandidates} setShowLinkedInModal={setShowLinkedInModal} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center space-y-8">
        <Badge className="bg-pink-500/30 text-pink-200 border-pink-400/50 px-4 py-1 text-lg">
          Powered by DeepSeek AI
        </Badge>
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
          Recrutamento Inteligente com DeepSeek
        </h1>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
          Automatize a triagem de currículos e encontre os melhores talentos 
          em segundos com o poder da inteligência artificial generativa.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={handleSignIn} disabled={isLoading} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 shadow-lg shadow-pink-500/25">
            {isLoading ? "A entrar..." : "Entrar com Google"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
        <FeatureCard icon={<Zap className="text-yellow-400" />} title="Análise Instantânea" desc="DeepSeek AI analisa competências e fit cultural em milissegundos." />
        <FeatureCard icon={<Globe className="text-pink-400" />} title="Sourcing LinkedIn" desc="Integração com OpenClaw para extrair talentos diretamente da rede." />
        <FeatureCard icon={<Search className="text-purple-400" />} title="Match Score" desc="Ranking inteligente baseado nos requisitos reais da tua vaga." />
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, color }: { title: string; value: string; icon: any; color: string }) {
  const colors: any = { blue: "from-blue-600 to-blue-700", emerald: "from-emerald-600 to-emerald-700", purple: "from-violet-600 to-violet-700" };
  return (
    <Card className="bg-gray-800 border border-gray-700">
      <CardContent className="flex items-center p-6 gap-4">
        <div className={`p-3 bg-gradient-to-br ${colors[color]} rounded-lg`}>{icon}</div>
        <div><p className="text-gray-300 text-sm">{title}</p><p className="text-2xl font-bold text-white">{value}</p></div>
      </CardContent>
    </Card>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="bg-gray-800 border border-gray-700 hover:border-gray-500">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge className="bg-gray-700 text-white">{job.type}</Badge>
          <span className="text-gray-400 text-sm">{job.candidates} candidatos</span>
        </div>
        <h3 className="font-semibold text-white text-lg mb-1">{job.title}</h3>
        <p className="text-gray-300 mb-3">{job.company}</p>
        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location || "N/A"}</span>
          {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-700 mt-3">
          <span className="text-violet-400 text-sm font-medium">{job.matches} matches</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CandidateRow({ name, role, score, linkedinUrl }: { name: string; role: string; score: number; linkedinUrl?: string }) {
  return (
    <Card className="bg-gray-800 border border-gray-700 hover:border-gray-500">
      <CardContent className="flex items-center justify-between p-4">
        <div><p className="font-semibold text-white">{name}</p><p className="text-gray-300 text-sm">{role}</p></div>
        <div className="flex items-center gap-2">
          {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"><Linkedin className="w-4 h-4" /></a>}
          <Badge className={score >= 80 ? "bg-emerald-700 text-emerald-300 border border-emerald-600" : "bg-gray-700 text-gray-300"}>{score}% Match</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return <Card className="bg-black border border-slate-800 text-left p-6 hover:border-slate-600"><div className="mb-4 text-2xl text-yellow-400">{icon}</div><h3 className="text-base font-semibold text-white mb-2">{title}</h3><p className="text-slate-300 text-sm">{desc}</p></Card>;
}

function NewJobModal({ jobs, setJobs, setShowNewJobModal, jobForm, setJobForm }: any) {
  const [isSaving, setIsSaving] = useState(false);
  const handleCreate = () => {
    if (!jobForm.title || !jobForm.company) return;
    setIsSaving(true);
    setTimeout(() => {
      setJobs([{ ...jobForm, id: Date.now().toString(), candidates: 0, matches: 0 }, ...jobs]);
      setJobForm({ title: "", company: "", location: "", type: "Full-time", salary: "", description: "" });
      setShowNewJobModal(false);
      setIsSaving(false);
    }, 500);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Criar Nova Vaga</h2>
          <button onClick={() => setShowNewJobModal(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="text-white/80 text-sm mb-2 block">Título *</label><Input value={jobForm.title} onChange={(e: any) => setJobForm({...jobForm, title: e.target.value})} className="w-full bg-white/5 border-white/10 text-white" placeholder="Ex: Senior Frontend Engineer" /></div>
          <div><label className="text-white/80 text-sm mb-2 block">Empresa *</label><Input value={jobForm.company} onChange={(e: any) => setJobForm({...jobForm, company: e.target.value})} className="w-full bg-white/5 border-white/10 text-white" placeholder="Ex: Tech Corp" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-white/80 text-sm mb-2 block">Localização</label><Input value={jobForm.location} onChange={(e: any) => setJobForm({...jobForm, location: e.target.value})} className="w-full bg-white/5 border-white/10 text-white" placeholder="Remote, Lisboa" /></div>
            <div><label className="text-white/80 text-sm mb-2 block">Tipo</label><select value={jobForm.type} onChange={(e: any) => setJobForm({...jobForm, type: e.target.value})} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"><option>Full-time</option><option>Part-time</option><option>Contract</option></select></div>
          </div>
          <div><label className="text-white/80 text-sm mb-2 block">Salário</label><Input value={jobForm.salary} onChange={(e: any) => setJobForm({...jobForm, salary: e.target.value})} className="w-full bg-white/5 border-white/10 text-white" placeholder="€50k - €70k" /></div>
          <div><label className="text-white/80 text-sm mb-2 block">Descrição</label><Textarea value={jobForm.description} onChange={(e: any) => setJobForm({...jobForm, description: e.target.value})} className="w-full h-32 bg-white/5 border-white/10 text-white" placeholder="Descreve a vaga..." /></div>
          <Button onClick={handleCreate} disabled={isSaving || !jobForm.title || !jobForm.company} className="w-full bg-indigo-600 hover:bg-indigo-700">{isSaving ? "A criar..." : "Criar Vaga"}</Button>
        </div>
      </div>
    </div>
  );
}

function LinkedInModal({ linkedInUrl, setLinkedInUrl, isImporting, setIsImporting, setImportedCandidates, setShowLinkedInModal }: any) {
  const handleImport = async () => {
    if (!linkedInUrl.trim()) return;
    setIsImporting(true);
    setTimeout(() => {
      const name = linkedInUrl.split("linkedin.com/in/")[1]?.split("/")[0]?.replace(/-/g, " ") || "Candidato";
      setImportedCandidates([{ name: name.charAt(0).toUpperCase() + name.slice(1), role: "Professional", score: Math.floor(Math.random() * 20) + 75, linkedInUrl }]);
      setLinkedInUrl("");
      setIsImporting(false);
      setShowLinkedInModal(false);
    }, 1500);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3"><div className="p-2 bg-blue-500/20 rounded-lg"><Linkedin className="w-6 h-6 text-blue-400" /></div><h2 className="text-xl font-bold text-white">Importar do LinkedIn</h2></div>
          <button onClick={() => setShowLinkedInModal(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div><label className="text-white/80 text-sm mb-2 block">URL do Perfil LinkedIn</label><Input value={linkedInUrl} onChange={(e: any) => setLinkedInUrl(e.target.value)} className="w-full bg-white/5 border-white/10 text-white" placeholder="https://linkedin.com/in/nome" /></div>
          <p className="text-white/40 text-sm">Cole o link do perfil LinkedIn do candidato.</p>
          <Button onClick={handleImport} disabled={!linkedInUrl.trim() || isImporting} className="w-full bg-blue-600 hover:bg-blue-700">{isImporting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />A importar...</> : <><Upload className="w-4 h-4 mr-2" />Importar</>}</Button>
        </div>
      </div>
    </div>
  );
}
