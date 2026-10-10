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
      { name: "description", content: "Registration steps for the $750 Coach women's gift card offer, including the 4–5 sponsored deal requirement." },
      { property: "og:title", content: "Coach Women | Complete Your Registration" },
      { property: "og:description", content: "Follow four steps to claim your $750 Coach gift card." },
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
      if (offer.ctaUrl) {
        window.location.href = offer.ctaUrl;
        return;
      }
      setNotice("The registration link has not been provided yet.");
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [loading]);

  if (loading)
    return (
      <main className="registration-page flex min-h-screen items-center justify-center bg-background">
        <div className="text-center" role="status">
          <div className="coach-display mx-auto mb-4 text-[15px] font-semibold uppercase tracking-[0.34em] text-accent">Coach</div>
          <div className="mx-auto mb-4 size-9 rounded-full border-2 border-border border-t-primary motion-safe:animate-spin" />
          <p className="text-[13px] tracking-[0.06em] text-muted-foreground">Loading...</p>
        </div>
      </main>
    );

  return (
    <main className="registration-page min-h-screen bg-background px-5 pb-9 pt-4 text-foreground">
      <div className="mx-auto w-full max-w-[373px] sm:max-w-[430px]">
        <header className="text-center">
          <div aria-label="Coach New York">
            <div className="coach-display pl-[0.2em] text-[33px] font-semibold uppercase leading-8 tracking-[0.2em] text-foreground">Coach</div>
            <div className="mt-0.5 pl-[0.46em] text-[9px] font-semibold uppercase tracking-[0.46em] text-accent">New York</div>
          </div>
          <div className="hairline-rule mx-auto mt-3 h-px w-20" />


          <h1 className="coach-display mt-6 text-[27px] font-semibold leading-8">Complete Your Registration</h1>
          <p className="mx-auto mt-2 max-w-[300px] text-[13px] leading-5 text-muted-foreground">
            Follow these simple steps to claim your {offer.reward}
          </p>
        </header>

        <ol className="mt-6 space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex min-h-[60px] items-center gap-3 rounded-lg border border-border bg-muted px-[15px] py-3">
              <span className="coach-display flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-semibold text-primary-foreground">{index + 1}</span>
              <span className="text-[13px] font-semibold leading-5">{step}</span>
            </li>
          ))}
        </ol>

        <Button
          onClick={() => { setNotice(""); setLoading(true); }}
          className="claim-button mt-8 h-[52px] w-full rounded-md bg-primary pl-[0.18em] text-[14px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/95"
        >
          Claim Now
        </Button>
        {notice && <p role="status" className="mt-3 text-center text-[12px] text-muted-foreground">{notice}</p>}
        <p className="mx-auto mt-5 max-w-[320px] text-center text-[11px] leading-[19px] text-muted-foreground">
          By clicking "Claim Now", you agree to complete the required steps to receive your gift card.
        </p>

        <div className="hairline-rule mx-auto mt-8 h-px w-full" />

        <section className="mt-7" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="coach-display mb-4 text-center text-[22px] font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {questions.map((item, index) => (
              <div key={item.question} className="overflow-hidden rounded-lg border border-border">
                <Button
                  variant="ghost"
                  aria-expanded={openQuestion === index}
                  aria-controls={`answer-${index}`}
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  className="flex h-auto min-h-10 w-full justify-between whitespace-normal rounded-none px-[15px] py-3 text-left text-[13px] font-semibold hover:bg-muted"
                >
                  {item.question}
                  <ChevronDown className={`shrink-0 text-accent transition-transform ${openQuestion === index ? "rotate-180" : ""}`} />
                </Button>
                {openQuestion === index && <p id={`answer-${index}`} className="px-[15px] pb-4 text-[12px] leading-5 text-muted-foreground">{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-primary">
          <Button variant="link" className="h-auto p-0 text-[11px] font-semibold" onClick={() => setNotice("The offer provider has not supplied the user agreement yet.")}>User Agreement</Button>
          <span className="text-accent" aria-hidden="true">•</span>
          <Button variant="link" className="h-auto p-0 text-[11px] font-semibold" onClick={() => setNotice("The offer provider has not supplied the privacy policy yet.")}>Privacy Policy</Button>
          <span className="text-accent" aria-hidden="true">•</span>
          <a href="https://www.coach.com/shop/women" target="_blank" rel="noopener noreferrer" className="hover:underline">Coach.com</a>
        </footer>
      </div>
    </main>
  );
}
