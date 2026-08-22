import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SEO_CONFIGS = {
  "/": {
    title: "Aayush Sharma | MERN Stack Developer in Pali, Rajasthan",
    description:
      "Portfolio of Aayush Sharma, Full-Stack MERN Developer in Pali, Rajasthan. Building modern React web apps, Node.js APIs, and e-commerce websites.",
    canonical: "https://aayushlabs.vercel.app/",
    ogType: "website",
    ogTitle: "Aayush Sharma | MERN Stack Developer in Pali, Rajasthan",
    ogDescription:
      "Portfolio of Aayush Sharma, Full-Stack MERN Developer in Pali, Rajasthan. Building modern React web apps, Node.js APIs, and e-commerce websites.",
    twitterTitle: "Aayush Sharma | MERN Stack Developer in Pali, Rajasthan",
    twitterDescription:
      "Portfolio of Aayush Sharma, Full-Stack MERN Developer in Pali, Rajasthan. Building modern React web apps, Node.js APIs, and e-commerce websites.",
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aayushlabs.vercel.app/"
        }
      ]
    }
  },
  "/services": {
    title: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    description:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    canonical: "https://aayushlabs.vercel.app/services",
    ogType: "website",
    ogTitle: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    ogDescription:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    twitterTitle: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    twitterDescription:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://aayushlabs.vercel.app/services#webpage",
          "url": "https://aayushlabs.vercel.app/services",
          "name": "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
          "description": "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
          "about": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "isPartOf": {
            "@id": "https://aayushlabs.vercel.app/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aayushlabs.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://aayushlabs.vercel.app/services"
            }
          ]
        }
      ]
    }
  },
  "/service": {
    title: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    description:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    canonical: "https://aayushlabs.vercel.app/services",
    ogType: "website",
    ogTitle: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    ogDescription:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    twitterTitle: "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
    twitterDescription:
      "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://aayushlabs.vercel.app/services#webpage",
          "url": "https://aayushlabs.vercel.app/services",
          "name": "Web Development Services in Pali, Rajasthan | MERN & E-Commerce",
          "description": "Web development services by Aayush Sharma in Pali, Rajasthan: full-stack MERN web apps, custom e-commerce stores, responsive landing pages, and SEO optimization.",
          "about": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "isPartOf": {
            "@id": "https://aayushlabs.vercel.app/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aayushlabs.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://aayushlabs.vercel.app/services"
            }
          ]
        }
      ]
    }
  },
  "/about": {
    title: "About Aayush Sharma | Full-Stack Developer in Pali, Rajasthan",
    description:
      "Learn about Aayush Sharma, a Full-Stack MERN Developer from Pali, Rajasthan, experienced in React, Node.js, Express, MongoDB, Tailwind CSS, and scalable REST API development.",
    canonical: "https://aayushlabs.vercel.app/about",
    ogType: "profile",
    ogTitle: "About Aayush Sharma | Full-Stack Developer in Pali, Rajasthan",
    ogDescription:
      "Learn about Aayush Sharma, a Full-Stack MERN Developer from Pali, Rajasthan, experienced in React, Node.js, Express, MongoDB, Tailwind CSS, and scalable REST API development.",
    twitterTitle: "About Aayush Sharma | Full-Stack Developer in Pali, Rajasthan",
    twitterDescription:
      "Learn about Aayush Sharma, a Full-Stack MERN Developer from Pali, Rajasthan, experienced in React, Node.js, Express, MongoDB, Tailwind CSS, and scalable REST API development.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://aayushlabs.vercel.app/about#profilepage",
          "url": "https://aayushlabs.vercel.app/about",
          "name": "About Aayush Sharma | Full-Stack Developer in Pali, Rajasthan",
          "description": "Learn about Aayush Sharma, a Full-Stack MERN Developer from Pali, Rajasthan, experienced in React, Node.js, Express, MongoDB, Tailwind CSS, and scalable REST API development.",
          "mainEntity": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "isPartOf": {
            "@id": "https://aayushlabs.vercel.app/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aayushlabs.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About Me",
              "item": "https://aayushlabs.vercel.app/about"
            }
          ]
        }
      ]
    }
  },
  "/contact": {
    title: "Contact Aayush Sharma | Web Developer in Pali, Rajasthan",
    description:
      "Get in touch with Aayush Sharma, a Full-Stack MERN Developer based in Pali, Rajasthan, for freelance web development, custom e-commerce stores, and web applications.",
    canonical: "https://aayushlabs.vercel.app/contact",
    ogType: "website",
    ogTitle: "Contact Aayush Sharma | Web Developer in Pali, Rajasthan",
    ogDescription:
      "Get in touch with Aayush Sharma, a Full-Stack MERN Developer based in Pali, Rajasthan, for freelance web development, custom e-commerce stores, and web applications.",
    twitterTitle: "Contact Aayush Sharma | Web Developer in Pali, Rajasthan",
    twitterDescription:
      "Get in touch with Aayush Sharma, a Full-Stack MERN Developer based in Pali, Rajasthan, for freelance web development, custom e-commerce stores, and web applications.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": "https://aayushlabs.vercel.app/contact#contactpage",
          "url": "https://aayushlabs.vercel.app/contact",
          "name": "Contact Aayush Sharma | Web Developer in Pali, Rajasthan",
          "description": "Get in touch with Aayush Sharma, a Full-Stack MERN Developer based in Pali, Rajasthan, for freelance web development, custom e-commerce stores, and web applications.",
          "mainEntity": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "isPartOf": {
            "@id": "https://aayushlabs.vercel.app/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aayushlabs.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact Us",
              "item": "https://aayushlabs.vercel.app/contact"
            }
          ]
        }
      ]
    }
  },
  "/articles": {
    title: "Technical Articles & Web Engineering Guides | Aayush Sharma",
    description:
      "In-depth technical guides on React 19, Node.js, Express, MongoDB REST APIs, Technical SEO, and cloud deployments by Aayush Sharma.",
    canonical: "https://aayushlabs.vercel.app/articles",
    ogType: "website",
    ogTitle: "Technical Articles & Web Engineering Guides | Aayush Sharma",
    ogDescription:
      "In-depth technical guides on React 19, Node.js, Express, MongoDB REST APIs, Technical SEO, and cloud deployments by Aayush Sharma.",
    twitterTitle: "Technical Articles & Web Engineering Guides | Aayush Sharma",
    twitterDescription:
      "In-depth technical guides on React 19, Node.js, Express, MongoDB REST APIs, Technical SEO, and cloud deployments by Aayush Sharma.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://aayushlabs.vercel.app/articles#collectionpage",
          "url": "https://aayushlabs.vercel.app/articles",
          "name": "Technical Articles & Web Engineering Guides | Aayush Sharma",
          "description":
            "In-depth technical guides on React 19, Node.js, Express, MongoDB REST APIs, Technical SEO, and cloud deployments by Aayush Sharma.",
          "isPartOf": {
            "@id": "https://aayushlabs.vercel.app/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aayushlabs.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Articles",
              "item": "https://aayushlabs.vercel.app/articles"
            }
          ]
        }
      ]
    }
  },
};

const DEFAULT_IMAGE = "https://aayushlabs.vercel.app/og-image.png";
const SITE_NAME = "Aayush Sharma Portfolio";

function setOrCreateMeta(attrName, attrVal, content) {
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute(rel, rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setOrCreateJsonLd(id, data) {
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

export function updatePageMetadata(pathname) {
  const meta = SEO_CONFIGS[pathname] || SEO_CONFIGS["/"];

  // 1. Document Title
  document.title = meta.title;

  // 2. Meta Description, Author, Robots, Theme-color
  setOrCreateMeta("name", "description", meta.description);
  setOrCreateMeta("name", "author", "Aayush Sharma");
  setOrCreateMeta(
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );
  setOrCreateMeta("name", "theme-color", "#0D0814");

  // 3. Canonical URL
  setOrCreateLink("canonical", meta.canonical);

  // 4. Open Graph Metadata
  setOrCreateMeta("property", "og:site_name", SITE_NAME);
  setOrCreateMeta("property", "og:type", meta.ogType || "website");
  setOrCreateMeta("property", "og:locale", "en_US");
  setOrCreateMeta("property", "og:title", meta.ogTitle || meta.title);
  setOrCreateMeta("property", "og:description", meta.ogDescription || meta.description);
  setOrCreateMeta("property", "og:url", meta.canonical);
  setOrCreateMeta("property", "og:image", DEFAULT_IMAGE);

  // 5. Twitter / X Metadata
  setOrCreateMeta("name", "twitter:card", "summary_large_image");
  setOrCreateMeta("name", "twitter:title", meta.twitterTitle || meta.title);
  setOrCreateMeta("name", "twitter:description", meta.twitterDescription || meta.description);
  setOrCreateMeta("name", "twitter:image", DEFAULT_IMAGE);

  // 6. Route-Specific Dynamic JSON-LD Structured Data
  if (meta.schema) {
    setOrCreateJsonLd("route-specific-schema", meta.schema);
  }
}

export function updateArticleMetadata(article) {
  if (!article) return;

  const articleUrl = `https://aayushlabs.vercel.app/articles/${article.slug}`;
  const pageTitle = `${article.title} | Aayush Sharma`;
  const pageDescription = article.description;
  const imageUrl = article.image || DEFAULT_IMAGE;

  // 1. Document Title
  document.title = pageTitle;

  // 2. Meta Description & Robots
  setOrCreateMeta("name", "description", pageDescription);
  setOrCreateMeta("name", "author", article.author || "Aayush Sharma");
  setOrCreateMeta(
    "name",
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );
  setOrCreateMeta("name", "theme-color", "#0D0814");

  // 3. Canonical URL
  setOrCreateLink("canonical", articleUrl);

  // 4. Open Graph Metadata
  setOrCreateMeta("property", "og:site_name", SITE_NAME);
  setOrCreateMeta("property", "og:type", "article");
  setOrCreateMeta("property", "og:locale", "en_US");
  setOrCreateMeta("property", "og:title", pageTitle);
  setOrCreateMeta("property", "og:description", pageDescription);
  setOrCreateMeta("property", "og:url", articleUrl);
  setOrCreateMeta("property", "og:image", imageUrl);

  // 5. Twitter / X Metadata
  setOrCreateMeta("name", "twitter:card", "summary_large_image");
  setOrCreateMeta("name", "twitter:title", pageTitle);
  setOrCreateMeta("name", "twitter:description", pageDescription);
  setOrCreateMeta("name", "twitter:image", imageUrl);

  // 6. Dynamic TechArticle JSON-LD Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${articleUrl}#article`,
        "headline": article.title,
        "description": article.description,
        "url": articleUrl,
        "image": imageUrl,
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "author": {
          "@id": "https://aayushlabs.vercel.app/#person"
        },
        "publisher": {
          "@id": "https://aayushlabs.vercel.app/#website"
        },
        "inLanguage": "en-US",
        "mainEntityOfPage": articleUrl
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aayushlabs.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Articles",
            "item": "https://aayushlabs.vercel.app/articles"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": articleUrl
          }
        ]
      }
    ]
  };

  setOrCreateJsonLd("route-specific-schema", articleSchema);
}

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    // Only auto-update if not on a dynamic /articles/:slug route handled by ArticleView
    if (!location.pathname.startsWith("/articles/")) {
      updatePageMetadata(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Listen to custom route sync events triggered during scroll-based history replacement
    const handleRouteSync = (event) => {
      if (event.detail && event.detail.pathname && !event.detail.pathname.startsWith("/articles/")) {
        updatePageMetadata(event.detail.pathname);
      }
    };

    window.addEventListener("portfolio:route-change", handleRouteSync);
    return () => window.removeEventListener("portfolio:route-change", handleRouteSync);
  }, []);

  return null;
}
