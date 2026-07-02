import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Google" },
      { name: "description", content: "Google Search" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Product+Sans:wght@400&family=Arial&display=swap",
      },
    ],
  }),
});

function Index() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmitted(true);
      inputRef.current?.blur();
    }
  };

  const handleAdClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-arial">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#4285f4] rounded-full animate-spin" />
          <p className="text-gray-700 text-base">Loading...</p>
        </div>
      </div>
    );
  }

  const showResults = submitted && query.trim().length > 0;

  return (
    <div className="min-h-screen bg-white font-arial text-[#202124]" style={{ fontFamily: 'arial, sans-serif' }}>
      {/* Search header */}
      <div className="sticky top-0 bg-white z-10 pt-3 pb-2 px-3 border-b border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Google G logo (small when results shown) */}
          {!showResults ? (
            <div className="flex items-center justify-center w-full mb-4 mt-8">
              <GoogleLogo />
            </div>
          ) : null}
        </form>

        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex items-center w-full bg-white border border-[#dfe1e5] rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.08)] px-3 py-2 focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.18)]">
            {showResults && (
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className="mr-1 p-1 -ml-1"
                aria-label="Back"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              </button>
            )}
            {!showResults && (
              <svg className="mr-2 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="#9aa0a6"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSubmitted(false)}
              className="flex-1 outline-none text-[16px] bg-transparent text-[#202124] placeholder-[#9aa0a6] min-w-0"
              placeholder=""
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); setSubmitted(false); inputRef.current?.focus(); }}
                className="ml-2 p-1"
                aria-label="Clear"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#70757a"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            )}
            <div className="w-px h-6 bg-[#dfe1e5] mx-2" />
            <button type="button" aria-label="Voice" className="p-1">
              <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285f4" d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/><path fill="#34a853" d="M11 18.08h2V21h-2z"/><path fill="#fbbc04" d="M7.05 16.87A6.973 6.973 0 0 1 5 12H3c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c-1.51-.22-2.86-.94-3.95-2.05z"/><path fill="#ea4335" d="M19 12h-2a5 5 0 0 1-5 5v2c3.87 0 7-3.13 7-7z"/></svg>
            </button>
          </div>
        </form>

        {showResults && (
          <div className="flex gap-5 mt-3 text-[13px] text-[#5f6368] overflow-x-auto no-scrollbar">
            <TabItem active label="All" />
            <TabItem label="Images" />
            <TabItem label="Videos" />
            <TabItem label="News" />
            <TabItem label="Shopping" />
            <TabItem label="Maps" />
          </div>
        )}
      </div>

      {!showResults ? (
        <div className="px-6 mt-10 flex flex-col items-center">
          <div className="text-[12px] text-[#70757a]">Google offered in: Español</div>
        </div>
      ) : (
        <div className="px-4 py-3 pb-20">
          <div className="text-[12px] text-[#70757a] mb-3">About 47,300,000 results (0.42 seconds)</div>

          {/* Sponsored ad */}
          <a
            href="#"
            onClick={handleAdClick}
            className="block mb-6 active:opacity-70"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[12px] font-bold text-[#202124]">Sponsored</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5f6368"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-[#202124] leading-tight">appl.reviews750.com</div>
                <div className="text-[12px] text-[#5f6368] flex items-center gap-1">
                  https://appl.reviews750.com
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#5f6368"><path d="M7 10l5 5 5-5H7z"/></svg>
                </div>
              </div>
            </div>
            <h3 className="text-[20px] leading-[26px] text-[#1a0dab] mt-1 font-normal">
              Apple Product Reviewer - $750 Bonus
            </h3>
            <p className="text-[14px] text-[#4d5156] leading-[20px] mt-1">
              Get paid to share your opinion on Apple products you already use. Complete Your Registration.
            </p>
          </a>

          {/* Organic results */}
          <Result
            site="Apple"
            url="https://www.apple.com › feedback"
            title="Product Feedback - Apple"
            desc="We love hearing from our customers, and we welcome your feedback on our products. Share your thoughts and help us improve."
          />
          <Result
            site="Reddit"
            url="https://www.reddit.com › r › apple"
            title="How do I become a beta tester for Apple products?"
            desc="15 posts · I've been using Apple products for years and would love to test them before release. Is there an official program?"
          />
          <Result
            site="Apple Developer"
            url="https://developer.apple.com › programs"
            title="Apple Beta Software Program"
            desc="Help make the next releases of iOS, iPadOS, macOS, tvOS, watchOS and HomePod software our best yet. As a member of the program..."
          />
          <Result
            site="YouTube"
            url="https://m.youtube.com › watch"
            title="How I Became an Apple Product Reviewer"
            desc="8:24 · Uploaded by TechWithTim · A step-by-step guide on how I started reviewing Apple products on YouTube..."
          />

          <div className="mt-6">
            <div className="text-[16px] text-[#202124] mb-3 font-medium">People also ask</div>
            {["How do you get paid to review Apple products?", "Does Apple pay for reviews?", "How do I join Apple's testing program?"].map((q) => (
              <div key={q} className="flex items-center justify-between border-b border-gray-200 py-3">
                <span className="text-[14px] text-[#202124] pr-4">{q}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function TabItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className={`pb-2 whitespace-nowrap ${active ? "text-[#1a73e8] border-b-2 border-[#1a73e8] font-medium" : ""}`}>
      {label}
    </div>
  );
}

function Result({ site, url, title, desc }: { site: string; url: string; title: string; desc: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
          {site[0]}
        </div>
        <div className="min-w-0">
          <div className="text-[14px] text-[#202124] leading-tight truncate">{site}</div>
          <div className="text-[12px] text-[#5f6368] truncate">{url}</div>
        </div>
      </div>
      <h3 className="text-[20px] leading-[26px] text-[#1a0dab] font-normal">{title}</h3>
      <p className="text-[14px] text-[#4d5156] leading-[20px] mt-1">{desc}</p>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="180" height="60" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
    </svg>
  );
}
