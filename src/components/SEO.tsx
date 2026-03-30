import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  article?: {
    author: string;
    publishedDate: string;
    section: string;
    tags: string[];
  };
  faqItems?: { question: string; answer: string }[];
  organizationSchema?: boolean;
}

const SITE_URL = "https://simplifybusinessconsultancy.com";
const SITE_NAME = "Simplify Business Consultancy";

const SEO = ({
  title,
  description,
  canonical,
  type = "website",
  article,
  faqItems,
  organizationSchema,
}: SEOProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  const schemas: object[] = [];

  if (organizationSchema) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Simplify Business Consultancy helps rural and small businesses across the USA streamline operations with automation, AI tools, and process optimization.",
      slogan: "Simplifying Business, Empowering Communities",
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      serviceType: [
        "Business Process Automation",
        "Process Optimization",
        "Digital Transformation",
        "Workflow Consulting",
      ],
      knowsAbout: [
        "Rural business automation",
        "Small business process improvement",
        "AI for small businesses",
        "Workflow optimization USA",
      ],
    });
  }

  if (article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: {
        "@type": "Organization",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      datePublished: article.publishedDate,
      articleSection: article.section,
      keywords: article.tags.join(", "),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    });
  }

  if (faqItems && faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
