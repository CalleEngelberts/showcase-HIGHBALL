import { useEffect, useState } from "react";

export function AgeGate() {
  const [showGate, setShowGate] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const ageVerified = localStorage.getItem("ageVerified");
    if (!ageVerified) {
      setShowGate(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ageVerified", "true");
    setShowGate(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isClient || !showGate) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl border border-slate-700">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-5xl font-display text-amber-500">18+</div>
            <h1 className="text-2xl font-bold text-white">Age Verification</h1>
            <p className="text-slate-300 text-sm">
              You must be 18 or older to enter this site
            </p>
          </div>

          {/* Content */}
          <p className="text-slate-400 text-sm leading-relaxed">
            HIGHBALL CLUB contains alcohol products. By entering, you confirm that you are of legal drinking age in your country.
          </p>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleAccept}
              className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 px-4 transition-colors duration-200"
            >
              I'm 18 or Older
            </button>
            <button
              onClick={handleReject}
              className="w-full rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-3 px-4 transition-colors duration-200"
            >
              I'm Under 18
            </button>
          </div>

          {/* Footer */}
          {/* <p className="text-xs text-slate-500 pt-2">
            Your choice is saved locally. You won't see this again.
          </p> */}
        </div>
      </div>
    </div>
  );
}
