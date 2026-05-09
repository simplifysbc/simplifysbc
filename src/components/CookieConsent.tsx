import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "sbc_consent_v1";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    openCookieSettings?: () => void;
  }
}

const applyConsent = (c: Consent) => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: c.marketing ? "granted" : "denied",
      ad_user_data: c.marketing ? "granted" : "denied",
      ad_personalization: c.marketing ? "granted" : "denied",
      analytics_storage: c.analytics ? "granted" : "denied",
    });
  }
};

const saveConsent = (c: Consent) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  applyConsent(c);
};

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setOpen(true);
    window.openCookieSettings = () => {
      try {
        const existing = saved ? JSON.parse(saved) : null;
        if (existing) {
          setAnalytics(!!existing.analytics);
          setMarketing(!!existing.marketing);
        }
      } catch {}
      setShowPrefs(true);
      setOpen(true);
    };
    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
    setOpen(false);
    setShowPrefs(false);
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
    setOpen(false);
    setShowPrefs(false);
  };

  const handleSavePrefs = () => {
    saveConsent({
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    });
    setOpen(false);
    setShowPrefs(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 backdrop-blur shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              We value your privacy
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We use cookies to run our site and, with your permission, to measure traffic with
              Google Analytics. You can accept all, reject non-essential, or choose what to allow.
              See our practices for GDPR and CCPA compliance.
            </p>

            {showPrefs && (
              <div className="mt-4 space-y-3 rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Strictly necessary</p>
                    <p className="text-xs text-muted-foreground">
                      Required for the site to work. Always on.
                    </p>
                  </div>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Analytics</p>
                    <p className="text-xs text-muted-foreground">
                      Helps us understand how visitors use the site (Google Analytics).
                    </p>
                  </div>
                  <Switch checked={analytics} onCheckedChange={setAnalytics} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Marketing</p>
                    <p className="text-xs text-muted-foreground">
                      Used to personalize ads. Off by default.
                    </p>
                  </div>
                  <Switch checked={marketing} onCheckedChange={setMarketing} />
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
              {!showPrefs ? (
                <>
                  <Button variant="ghost" onClick={() => setShowPrefs(true)} className="sm:order-1">
                    Preferences
                  </Button>
                  <Button variant="outline" onClick={handleRejectAll} className="sm:order-2">
                    Reject all
                  </Button>
                  <Button onClick={handleAcceptAll} className="sm:order-3">
                    Accept all
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleRejectAll}>
                    Reject all
                  </Button>
                  <Button variant="outline" onClick={handleAcceptAll}>
                    Accept all
                  </Button>
                  <Button onClick={handleSavePrefs}>Save preferences</Button>
                </>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRejectAll}
            aria-label="Close and reject non-essential cookies"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
