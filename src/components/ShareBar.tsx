import { useState } from "react";
import { Linkedin, Instagram, Link2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareBarProps {
  title: string;
  url: string;
}

const SITE_URL = "https://simplifybusinessconsultancy.com";

const ShareBar = ({ title, url }: ShareBarProps) => {
  const [copied, setCopied] = useState(false);
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const instagramUrl = "https://www.instagram.com/simplify.sbc/";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Paste it into Instagram or anywhere you like.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Could not copy link", variant: "destructive" });
    }
  };

  const baseClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground border border-border transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <div className="flex items-center gap-3 py-4 my-8 border-y border-border">
      <span className="text-sm font-medium text-muted-foreground mr-2">
        Share this post
      </span>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share "${title}" on LinkedIn`}
        className={baseClass}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Instagram"
        title="Copy the link, then share it from Instagram"
        className={baseClass}
      >
        <Instagram className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className={baseClass}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default ShareBar;
