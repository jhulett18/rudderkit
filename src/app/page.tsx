"use client";

import Link from "next/link";
import { Anchor, Link2, FileCheck, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Send a Link, Not an Email",
    description:
      "Create a branded upload link for each vendor. They click, upload, done. No accounts, no passwords, no back-and-forth.",
    accent: "bg-blue-50 text-navy",
  },
  {
    icon: FileCheck,
    title: "Every Document in One Place",
    description:
      "W-9s, certificates of insurance, licenses — vendors drag and drop what you need. No more digging through inboxes and shared drives.",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: ShieldCheck,
    title: "Know Who’s Compliant Instantly",
    description:
      "Your dashboard shows every vendor\u2019s status at a glance. Spot missing documents in seconds, not hours.",
    accent: "bg-amber-50 text-amber-700",
  },
];

const checkpoints = [
  "Vendors never need to create an account",
  "W-9, COI, and license collection built in",
  "Shareable upload links in one click",
  "Real-time compliance dashboard",
  "Built for GCs and property managers",
  "Free to start — no credit card required",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
              <Anchor className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-navy">RudderKit</span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-navy-light hover:shadow-md active:scale-[0.98]"
          >
            Start Tracking Compliance
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "0ms", animationFillMode: "forwards" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1.5 text-xs font-semibold text-navy mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                Built for South Florida contractors and property managers
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-in-up opacity-0"
              style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
            >
              Stop chasing vendors
              <br />
              <span className="text-navy">for paperwork.</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-slate-light animate-fade-in-up opacity-0"
              style={{ animationDelay: "160ms", animationFillMode: "forwards" }}
            >
              Collect W-9s, insurance certificates, and licenses from every sub and vendor
              — without the email runaround. Send one link. They upload. You stay compliant.
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: "240ms", animationFillMode: "forwards" }}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-light hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Start Tracking Compliance
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/upload/apex-electrical-abc123"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-white px-6 py-3.5 text-base font-semibold text-slate transition-all hover:border-navy/30 hover:text-navy"
              >
                See What Vendors See
              </Link>
            </div>

            <ul
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 animate-fade-in-up opacity-0"
              style={{ animationDelay: "320ms", animationFillMode: "forwards" }}
            >
              {checkpoints.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate">
                  <CheckCircle className="h-4 w-4 text-green shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pain Point Bridge */}
      <section className="border-t border-border/60 bg-slate-50/50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg text-slate leading-relaxed">
              You have jobs to run. But first, you need that W-9 from the electrician,
              the updated COI from the plumber, and the license renewal from the roofer.
              That is an entire morning lost to emails and follow-ups.{" "}
              <span className="font-semibold text-foreground">RudderKit handles it in three steps.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              From paperwork chaos to full compliance in minutes
            </h2>
            <p className="mt-3 text-base text-muted max-w-lg mx-auto">
              No more email chains, shared folders, or spreadsheets.
              One workflow for every vendor document you need.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative rounded-2xl border border-border/80 bg-white p-7 transition-all hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5 hover:-translate-y-1"
                >
                  <div className="mb-5">
                    <span className="absolute -top-3.5 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="border-t border-border/60 bg-slate-50/50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-navy">60 sec</p>
              <p className="mt-1 text-sm text-muted">to set up your first vendor</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-navy">0</p>
              <p className="mt-1 text-sm text-muted">logins required from your vendors</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-navy">100%</p>
              <p className="mt-1 text-sm text-muted">visibility into compliance status</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/60 bg-gradient-to-br from-navy-dark to-navy py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Your vendors have the documents. Make it easy for them to hand them over.
          </h2>
          <p className="mt-3 text-base text-blue-200 max-w-md mx-auto">
            Set up your first vendor in under a minute. Free to start, no credit card needed.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-navy shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start Tracking Compliance
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Anchor className="h-4 w-4 text-navy" />
            <span className="text-sm font-semibold text-navy">RudderKit</span>
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} RudderKit. Vendor compliance document collection for contractors and small businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}
