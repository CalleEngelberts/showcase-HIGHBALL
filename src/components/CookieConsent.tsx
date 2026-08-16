import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    // Trigger analytics loading if needed
    window.dispatchEvent(new CustomEvent("cookieConsentAccepted"));
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!isClient || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 shadow-2xl">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">Cookie Consent</h3>
            <p className="text-slate-300 text-sm">
              We use cookies and analytics to improve your experience. By accepting, you help us understand how you use our site.{" "}
              <Link to="/privacy" className="text-amber-500 hover:text-amber-400 underline">
                Learn more
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="flex-1 md:flex-none rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-2 px-4 transition-colors duration-200 text-sm"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 px-4 transition-colors duration-200 text-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
