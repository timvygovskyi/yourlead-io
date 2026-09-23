export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0E0E18] text-white font-sans flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-3xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">You're in!</h1>
        <p className="text-[#8B8FA8] text-lg mb-8">
          Check your email for next steps and the information you need to get started.
        </p>
        <a
          href="/leadgentool"
          className="inline-flex items-center justify-center rounded-full bg-[#5C4BD4] px-6 py-3 text-white font-semibold hover:bg-[#6b5ce6] transition-colors"
        >
          Back to yourlead.io
        </a>
      </div>
    </div>
  );
}
