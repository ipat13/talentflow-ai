"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@/components/ui";
import { Briefcase, Users, TrendingUp, Clock, ArrowRight, Loader2, Linkedin, Upload, Sparkles } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  activeJobs: number;
  totalCandidates: number;
  avgMatchScore: number;
  inInterview: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  _count?: { candidates: number };
}

interface Candidate {
  id: string;
  name: string;
  jobTitle?: string;
  matchScore: number | null;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    activeJobs: 0,
    totalCandidates: 0,
    avgMatchScore: 0,
    inInterview: 0,
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [topCandidates, setTopCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      
      const [jobsRes, candidatesRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/candidates"),
      ]);

      console.log("Jobs response:", jobsRes.ok);
      console.log("Candidates response:", candidatesRes.ok);

      const jobsData = await jobsRes.json();
      const candidatesData = await candidatesRes.json();

      console.log("Jobs data:", jobsData);
      console.log("Candidates data:", candidatesData);

      const jobs = jobsData.jobs || [];
      const candidates = candidatesData.candidates || [];

      const activeJobs = jobs.filter((j: Job) => j.status === "active").length;
      const inInterview = candidates.filter((c: Candidate) => c.status === "interview").length;
      const scoresWithMatch = candidates.filter((c: Candidate) => c.matchScore !== null);
      const avgMatchScore = scoresWithMatch.length > 0
        ? Math.round(scoresWithMatch.reduce((acc: number, c: Candidate) => acc + (c.matchScore || 0), 0) / scoresWithMatch.length)
        : 0;

      setStats({
        activeJobs,
        totalCandidates: candidates.length,
        avgMatchScore,
        inInterview,
      });

      setRecentJobs(jobs.slice(0, 5));
      setTopCandidates(
        candidates
          .filter((c: Candidate) => c.matchScore !== null)
          .sort((a: Candidate, b: Candidate) => (b.matchScore || 0) - (a.matchScore || 0))
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const statsCards = [
    {
      title: "Active Jobs",
      value: stats.activeJobs.toString(),
      change: `${stats.totalCandidates} total candidates`,
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Candidates",
      value: stats.totalCandidates.toString(),
      change: `${stats.inInterview} in interview`,
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      title: "Avg Match Score",
      value: `${stats.avgMatchScore}%`,
      change: stats.avgMatchScore >= 80 ? "Excellent" : "Good",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "In Interview",
      value: stats.inInterview.toString(),
      change: "Advanced candidates",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "interview":
        return <Badge variant="success">Interview</Badge>;
      case "reviewing":
        return <Badge variant="warning">Reviewing</Badge>;
      case "offer":
        return <Badge variant="info">Offer</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="default">New</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Overview of your recruitment process
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => router.push("/jobs?modal=linkedin")}
          >
            <Linkedin className="w-4 h-4 mr-2" />
            Import LinkedIn
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => router.push("/jobs/new")}
          >
            <Upload className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 ${stat.iconBg} rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 text-lg">Recent Jobs</CardTitle>
            <Link href="/jobs" className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No jobs yet.</p>
                <Button 
                  className="mt-3 bg-blue-500 hover:bg-blue-600"
                  onClick={() => router.push("/jobs/new")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Create First Job
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs?id=${job.id}`}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500">
                        {job.company} • {job._count?.candidates || 0} candidates
                      </p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      job.status === "active" 
                        ? "bg-emerald-100 text-emerald-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {job.status === "active" ? "Active" : "Draft"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-900 text-lg">Top Candidates</CardTitle>
            <Link href="/candidates" className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {topCandidates.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No candidates yet.</p>
                <p className="text-gray-400 text-sm mt-1">Upload CVs to see candidates here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {topCandidates.map((candidate) => (
                  <Link
                    key={candidate.id}
                    href={`/candidates?id=${candidate.id}`}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {candidate.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {candidate.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {candidate.jobTitle || "Candidate"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(candidate.status)}
                      {candidate.matchScore !== null && (
                        <span
                          className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                            candidate.matchScore >= 90
                              ? "bg-emerald-100 text-emerald-700"
                              : candidate.matchScore >= 80
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {candidate.matchScore}%
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 text-lg">Candidates by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { status: "new", label: "New", color: "bg-blue-500" },
              { status: "reviewing", label: "Reviewing", color: "bg-yellow-500" },
              { status: "interview", label: "Interview", color: "bg-emerald-500" },
              { status: "offer", label: "Offer", color: "bg-purple-500" },
              { status: "rejected", label: "Rejected", color: "bg-red-500" },
            ].map((item) => {
              const count = topCandidates.filter((c) => c.status === item.status).length;
              const total = stats.totalCandidates || 1;
              const percentage = Math.round((count / total) * 100) || 0;
              return (
                <div key={item.status} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-center mb-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
