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
  "/ahmedabad-web-developer": {
    title: "Aayush Sharma | Web Developer in Ahmedabad | Full-Stack MERN",
    description:
      "Looking for a professional web developer in Ahmedabad? Aayush Sharma builds fast, custom React & MERN stack web applications, e-commerce stores, and high-converting websites for businesses.",
    canonical: "https://aayushlabs.vercel.app/ahmedabad-web-developer",
    ogType: "website",
    ogTitle: "Aayush Sharma | Web Developer in Ahmedabad | Full-Stack MERN",
    ogDescription:
      "Looking for a professional web developer in Ahmedabad? Aayush Sharma builds fast, custom React & MERN stack web applications, e-commerce stores, and high-converting websites for businesses.",
    twitterTitle: "Aayush Sharma | Web Developer in Ahmedabad | Full-Stack MERN",
    twitterDescription:
      "Looking for a professional web developer in Ahmedabad? Aayush Sharma builds fast, custom React & MERN stack web applications, e-commerce stores, and high-converting websites for businesses.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://aayushlabs.vercel.app/ahmedabad-web-developer#webpage",
          "url": "https://aayushlabs.vercel.app/ahmedabad-web-developer",
          "name": "Aayush Sharma | Web Developer in Ahmedabad | Full-Stack MERN",
          "description":
            "Looking for a professional web developer in Ahmedabad? Aayush Sharma builds fast, custom React & MERN stack web applications, e-commerce stores, and high-converting websites for businesses.",
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
              "name": "Ahmedabad Web Developer",
              "item": "https://aayushlabs.vercel.app/ahmedabad-web-developer"
            }
          ]
        },
        {
          "@type": "Service",
          "@id": "https://aayushlabs.vercel.app/ahmedabad-web-developer#service",
          "name": "Full-Stack MERN Web Development in Ahmedabad",
          "serviceType": "Web Development & Custom Web Applications",
          "description":
            "Engineering custom MERN stack web applications, responsive corporate websites, high-converting e-commerce stores, and REST APIs for businesses in Ahmedabad.",
          "provider": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Ahmedabad, Gujarat, India"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://aayushlabs.vercel.app/ahmedabad-web-developer#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you work with businesses and startups in Ahmedabad?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Although I am based in Pali, Rajasthan, I work with businesses, startups, and founders across Ahmedabad (including teams along SG Highway, Prahlad Nagar, and Bodakdev) remotely through structured video calls, collaborative Git repositories, and transparent milestone deliveries."
              }
            },
            {
              "@type": "Question",
              "name": "What technologies do you use for web application development?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I specialize in the modern JavaScript ecosystem using the full MERN stack: React 19 and Tailwind CSS on the frontend, Node.js and Express.js on the backend, and MongoDB (with Mongoose) for the database layer. For cloud deployments, I use Vercel and Docker containerization."
              }
            },
            {
              "@type": "Question",
              "name": "What types of websites and digital solutions can you build?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I build full-stack SaaS web applications, custom e-commerce storefronts with integrated payment gateways, high-converting responsive landing pages, real-time client portals, and administrative management dashboards."
              }
            },
            {
              "@type": "Question",
              "name": "How do you manage communication and project delivery remotely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Communication is handled smoothly via scheduled Google Meet calls, email, and Loom video walkthroughs. Project milestones are tracked on GitHub or agile boards with live preview staging URLs so you can test updates before production release."
              }
            },
            {
              "@type": "Question",
              "name": "Do I get full source code ownership upon project completion?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Upon final project sign-off and milestone settlement, you receive 100% full ownership of the clean Git source code repository, documentation, deployment scripts, and database schemas with zero vendor lock-in."
              }
            },
            {
              "@type": "Question",
              "name": "How can an Ahmedabad business request a project quote?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can navigate to the contact page to share your project scope, select required deliverables, and specify your target timeline. Alternatively, you can email me directly at aayush.s4568@gmail.com for an initial consultation."
              }
            }
          ]
        }
      ]
    }
  },
  "/gandhinagar-web-developer": {
    title: "Aayush Sharma | Web Developer in Gandhinagar | MERN & Full-Stack",
    description:
      "Professional web developer in Gandhinagar. Aayush Sharma engineers scalable MERN stack web applications, secure REST APIs, and modern responsive websites for startups and growing enterprises.",
    canonical: "https://aayushlabs.vercel.app/gandhinagar-web-developer",
    ogType: "website",
    ogTitle: "Aayush Sharma | Web Developer in Gandhinagar | MERN & Full-Stack",
    ogDescription:
      "Professional web developer in Gandhinagar. Aayush Sharma engineers scalable MERN stack web applications, secure REST APIs, and modern responsive websites for startups and growing enterprises.",
    twitterTitle: "Aayush Sharma | Web Developer in Gandhinagar | MERN & Full-Stack",
    twitterDescription:
      "Professional web developer in Gandhinagar. Aayush Sharma engineers scalable MERN stack web applications, secure REST APIs, and modern responsive websites for startups and growing enterprises.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://aayushlabs.vercel.app/gandhinagar-web-developer#webpage",
          "url": "https://aayushlabs.vercel.app/gandhinagar-web-developer",
          "name": "Aayush Sharma | Web Developer in Gandhinagar | MERN & Full-Stack",
          "description":
            "Professional web developer in Gandhinagar. Aayush Sharma engineers scalable MERN stack web applications, secure REST APIs, and modern responsive websites for startups and growing enterprises.",
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
              "name": "Gandhinagar Web Developer",
              "item": "https://aayushlabs.vercel.app/gandhinagar-web-developer"
            }
          ]
        },
        {
          "@type": "Service",
          "@id": "https://aayushlabs.vercel.app/gandhinagar-web-developer#service",
          "name": "Full-Stack MERN Web Development in Gandhinagar",
          "serviceType": "Web Development & Custom Web Applications",
          "description":
            "Engineering scalable MERN stack applications, secure REST API architectures, and cloud-ready web systems for tech startups and enterprises in Gandhinagar.",
          "provider": {
            "@id": "https://aayushlabs.vercel.app/#person"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Gandhinagar, Gujarat, India"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://aayushlabs.vercel.app/gandhinagar-web-developer#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you provide web development services for companies in Gandhinagar and GIFT City?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. I provide full-stack web engineering and consulting for companies, tech initiatives, and emerging startups in Gandhinagar and the broader GIFT City tech ecosystem remotely from my base in Pali, Rajasthan."
              }
            },
            {
              "@type": "Question",
              "name": "What are the benefits of choosing the MERN stack for Gandhinagar tech startups?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The MERN stack (MongoDB, Express.js, React 19, Node.js) allows startups to build and iterate on unified JavaScript codebases quickly. It provides high concurrency, non-blocking I/O, seamless JSON data structures, and easy containerization with Docker for cloud deployments."
              }
            },
            {
              "@type": "Question",
              "name": "Can you build custom administrative dashboards and REST API backends?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. I engineer modular RESTful API architectures using Express.js and Node.js with structured controller layers, input sanitization, automated error handling, and intuitive React dashboard interfaces with real-time state updates."
              }
            },
            {
              "@type": "Question",
              "name": "How do you handle data security and user authentication?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I implement JSON Web Token (JWT) stateless authentication, bcrypt password hashing, HTTP-only secure cookies, CORS security headers, rate limiting, and role-based access control (RBAC) to ensure enterprise-grade security."
              }
            },
            {
              "@type": "Question",
              "name": "What is your typical project timeline from requirements to deployment?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A focused MVP or business web application typically takes 2 to 4 weeks depending on feature complexity, API integrations, and database schemas. Every milestone follows a strict schedule with weekly progress reviews."
              }
            },
            {
              "@type": "Question",
              "name": "How can a Gandhinagar team initiate a web development consultation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can reach out through the contact form with your technical scope and milestones, or send an email directly to aayush.s4568@gmail.com to schedule an introductory video call."
              }
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

  const articleUrl = article.canonical || `https://aayushlabs.vercel.app/articles/${article.slug}`;
  const pageTitle = `${article.title} | Aayush Sharma`;
  const pageDescription = article.description;
  const imageUrl = article.image || DEFAULT_IMAGE;
  const publishedDate = article.publishedDate || article.datePublished || "2026-08-22";
  const modifiedDate = article.modifiedDate || article.dateModified || publishedDate;

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
        "datePublished": publishedDate,
        "dateModified": modifiedDate,
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

  return null;
}
