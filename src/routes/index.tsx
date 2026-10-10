import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { offer } from "@/lib/offer";

export const Route = createFileRoute("/")({
  component: Registration,
  head: () => ({
    meta: [
      { title: "Coach Women | Complete Your Registration" },
      { name: "description", content: "View the registration steps and 4–5 sponsored deal requirement for the Coach women's gift card offer." },
      { property: "og:title", content: "Coach Women | Complete Your Registration" },
      { property: "og:description", content: "Registration steps for the Coach women's gift card offer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const steps = [
  'Click on "Claim Now"',
  "Enter your email and basic info",
  `Complete ${offer.minimumDeals}–${offer.maximumDeals} sponsored deals`,
  `Enjoy your ${offer.reward}!`,
];

const questions = [
  { question: "How long do the deals take?", answer: "Completion times depend on the sponsored deals you choose. Check each deal's terms before starting." },
  { question: "What are deals?", answer: "Sponsored deals are offers from participating companies. Each offer has its own requirements and may involve a purchase or subscription." },
  { question: "How many deals do I have to do?", answer: `Complete ${offer.minimumDeals}–${offer.maximumDeals} qualifying sponsored deals. Review the full offer terms before participating.` },
  { question: "When will I receive my reward?", answer: "Reward timing depends on eligibility verification and the offer provider's terms." },
];

function Registration() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => {
      setLoading(false);
      setNotice("The registration link has not been provided yet.");
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [loading]);

  if (loading) return <main className="registration-page min-h-screen bg-background flex items-center justify-center"><div className="text-center" role="status"><div className="mx-auto mb-4 size-9 rounded-full border-4 border-border border-t-primary motion-safe:animate-spin" /><p>Loading...</p></div></main>;

  return (
    <main className="registration-page min-h-screen bg-background px-5 pb-8 pt-3 text-foreground">
      <div className="mx-auto w-full max-w-[373px]">
        <header className="text-center">
          <div aria-label="Coach Women" className="text-primary">
            <div className="text-[30px] font-bold leading-8">COACH</div>
            <div className="mt-1 text-[10px] font-semibold uppercase">Women</div>
          </div>
          <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-primary" />
          <h1 className="mt-4 text-[23px] font-semibold leading-7">Complete Your Registration</h1>
          <p className="mt-2 text-[13px] leading-5 text-muted-foreground">Follow these simple steps to claim your {offer.reward}</p>
        </header>

        <ol className="mt-5 space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex min-h-[60px] items-center gap-3 rounded-lg border border-border bg-muted px-[15px] py-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">{index + 1}</span>
              <span className="text-[13px] font-bold leading-5">{step}</span>
            </li>
          ))}
        </ol>

        <Button onClick={() => { setNotice(""); setLoading(true); }} className="claim-button mt-7 h-[50px] w-full rounded-lg bg-accent text-base font-bold text-accent-foreground hover:bg-accent/90">CLAIM NOW</Button>
        {notice && <p role="status" className="mt-3 text-center text-[12px] text-muted-foreground">{notice}</p>}
        <p className="mx-auto mt-5 text-center text-[11px] leading-[19px] text-muted-foreground">By clicking "Claim Now", you agree to complete the required steps to receive your gift card.</p>

        <section className="mt-7" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="mb-4 text-[20px] font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {questions.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-lg border border-border">
                <Button variant="ghost" aria-expanded={openQuestion === index} aria-controls={`answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)} className="flex h-auto min-h-10 w-full justify-between whitespace-normal rounded-none px-[15px] py-3 text-left text-[13px] font-bold hover:bg-muted">
                  {item.question}<ChevronDown className={`shrink-0 text-muted-foreground transition-transform ${openQuestion === index ? "rotate-180" : ""}`} />
                </Button>
                {openQuestion === index && <p id={`answer-${index}`} className="px-[15px] pb-4 text-[12px] leading-5 text-muted-foreground">{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-primary">
          <Button variant="link" className="h-auto p-0 text-[11px] font-bold" onClick={() => setNotice("The offer provider has not supplied the user agreement yet.")}>User Agreement</Button>
          <span className="text-border" aria-hidden="true">•</span>
          <Button variant="link" className="h-auto p-0 text-[11px] font-bold" onClick={() => setNotice("The offer provider has not supplied the privacy policy yet.")}>Privacy Policy</Button>
          <span className="text-border" aria-hidden="true">•</span>
          <a href="https://www.coach.com/shop/women" target="_blank" rel="noopener noreferrer" className="hover:underline">Coach.com</a>
        </footer>
      </div>
    </main>
  );
}