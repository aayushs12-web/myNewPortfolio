/**
 * Intent Classification Service
 * Multi-tier, high-accuracy intent classification engine for Aayush AI Assistant.
 * Validates intents against the 9 officially supported categories.
 */

const SUPPORTED_INTENTS = new Set([
  "portfolio",
  "project",
  "service",
  "technical",
  "contact",
  "pricing",
  "lead",
  "general",
  "unsupported",
]);

/**
 * Classifies the intent of a user message.
 * @param {string} userMessage - Raw query from the user
 * @param {Array} history - Previous conversation messages
 * @returns {{ intent: string, confidence: number }}
 */
function classifyIntent(userMessage, history = []) {
  if (!userMessage || typeof userMessage !== "string") {
    return { intent: "general", confidence: 1.0 };
  }

  const query = userMessage.trim().toLowerCase();

  // ──────────────────────────────────────────
  // 1. UNSUPPORTED / SECURITY INTENT (Highest Priority)
  // ──────────────────────────────────────────
  const securityPatterns = [
    /system\s+prompt/i,
    /system\s+instruction/i,
    /api[_\s-]?key/i,
    /gemini[_\s-]?key/i,
    /env(?:ironment)?\s+var/i,
    /secret/i,
    /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/i,
    /reveal\s+(?:your\s+)?prompt/i,
    /show\s+(?:me\s+)?(?:your\s+)?prompt/i,
    /what\s+is\s+your\s+prompt/i,
    /hidden\s+(?:data|prompt|backend)/i,
    /password/i,
    /credential/i,
    /bypass\s+safety/i,
    /database\s+uri/i,
    /mongo(?:db)?[_\s-]?uri/i,
    /jwt[_\s-]?secret/i,
  ];

  for (const pattern of securityPatterns) {
    if (pattern.test(query)) {
      return { intent: "unsupported", confidence: 0.99 };
    }
  }

  // ──────────────────────────────────────────
  // 2. PRICING INTENT
  // ──────────────────────────────────────────
  const pricingPatterns = [
    /(?:how\s+much|what\s+is\s+the\s+cost|what\s+does\s+it\s+cost|cost\s+of|pricing|price|rate\s+card|charge|hourly\s+rate|budget\s+required|estimate\s+cost)/i,
  ];

  for (const pattern of pricingPatterns) {
    if (pattern.test(query)) {
      return { intent: "pricing", confidence: 0.96 };
    }
  }

  // ──────────────────────────────────────────
  // 3. LEAD / PROJECT INTAKE INTENT
  // ──────────────────────────────────────────
  const leadPatterns = [
    /start\s+(?:a\s+)?project/i,
    /hire\s+(?:aayush|you)/i,
    /work\s+with\s+(?:aayush|you)/i,
    /project\s+requirement/i,
    /collaborate\s+on\s+a\s+project/i,
    /i\s+want\s+to\s+build\s+(?:a\s+web|an\s+app|a\s+platform|my\s+website)/i,
    /build\s+(?:a\s+website|an\s+app)\s+for\s+my\s+(?:business|startup|company)/i,
    /get\s+(?:a\s+)?quote/i,
    /discuss\s+(?:a\s+)?new\s+project/i,
  ];

  for (const pattern of leadPatterns) {
    if (pattern.test(query)) {
      return { intent: "lead", confidence: 0.95 };
    }
  }

  // ──────────────────────────────────────────
  // 4. CONTACT INTENT
  // ──────────────────────────────────────────
  const contactPatterns = [
    /contact(?:\s+info|\s+details|\s+aayush)?/i,
    /how\s+can\s+i\s+(?:reach|contact|email|message|touch)\s+(?:aayush|you)/i,
    /how\s+to\s+(?:reach|contact|email|message)\s+(?:aayush|you)/i,
    /get\s+in\s+touch/i,
    /email\s+address/i,
    /linkedin/i,
    /github\s+profile/i,
    /where\s+can\s+i\s+find\s+aayush\s+online/i,
    /connect\s+with\s+aayush/i,
  ];

  for (const pattern of contactPatterns) {
    if (pattern.test(query)) {
      return { intent: "contact", confidence: 0.96 };
    }
  }

  // ──────────────────────────────────────────
  // 5. PROJECT INTENT
  // ──────────────────────────────────────────
  const projectPatterns = [
    /(?:show|view|tell|list|display)\s+(?:me\s+)?(?:your\s+|aayush's\s+)?(?:featured\s+)?projects/i,
    /projects?\s+(?:portfolio|showcase|list|built)/i,
    /which\s+project/i,
    /tell\s+me\s+(?:more\s+)?about\s+(?:the\s+|your\s+)?(?:mern|ecommerce|ai|docker|portfolio)\s+project/i,
    /show\s+me\s+your\s+(?:best|featured|mern|ecommerce)\s+project/i,
    /what\s+(?:have\s+you|has\s+aayush)\s+built/i,
    /previous\s+work/i,
    /github\s+(?:repos?|repositories|code)/i,
  ];

  for (const pattern of projectPatterns) {
    if (pattern.test(query)) {
      return { intent: "project", confidence: 0.95 };
    }
  }

  // ──────────────────────────────────────────
  // 6. SERVICE INTENT
  // ──────────────────────────────────────────
  const servicePatterns = [
    /what\s+services/i,
    /services?\s+(?:offered|do\s+you|does\s+aayush)/i,
    /do\s+you\s+(?:build|offer|create|develop|provide)/i,
    /what\s+can\s+you\s+build/i,
    /i\s+need\s+an?\s+(?:e-?commerce|storefront|landing\s+page|web\s+app|full-?stack|devops)/i,
    /can\s+you\s+build\s+(?:a\s+portfolio|a\s+website|an\s+e-?commerce|a\s+landing\s+page)/i,
    /e-?commerce\s+(?:service|website|development|store)/i,
    /landing\s+page\s+(?:service|design|development)/i,
    /devops\s+(?:and\s+cloud|service|deployment|cicd)/i,
  ];

  for (const pattern of servicePatterns) {
    if (pattern.test(query)) {
      return { intent: "service", confidence: 0.95 };
    }
  }

  // ──────────────────────────────────────────
  // 7. PORTFOLIO INTENT (Identity, Skills, Bio, Location)
  // ──────────────────────────────────────────
  const portfolioPatterns = [
    /who\s+is\s+aayush/i,
    /about\s+(?:aayush|yourself|the\s+developer)/i,
    /what\s+(?:technologies|tech\s+stack|tools|languages)\s+does\s+aayush\s+use/i,
    /what\s+are\s+(?:aayush's|your)\s+skills/i,
    /where\s+is\s+aayush\s+(?:based|located|from)/i,
    /tell\s+me\s+about\s+aayush/i,
    /aayush's\s+(?:background|experience|bio|qualification)/i,
    /developer\s+profile/i,
    /skills?\s+(?:overview|list|set)/i,
  ];

  for (const pattern of portfolioPatterns) {
    if (pattern.test(query)) {
      return { intent: "portfolio", confidence: 0.95 };
    }
  }

  // ──────────────────────────────────────────
  // 8. TECHNICAL INTENT (Coding, Concepts, Architecture)
  // ──────────────────────────────────────────
  const technicalPatterns = [
    /explain\s+(?:jwt|auth|react|node|express|mongodb|docker|ci\/cd|tailwind|redux|oauth|cors|rest|state|props|hooks|middleware|indexing)/i,
    /how\s+(?:does|do|can)\s+.*?(?:jwt|react|mongodb|express|node|docker|indexing|async|await|event\s+loop|useeffect|usestate|redux|tailwind|cors|api|cache|token|cookie).*?(?:work|function|be\s+used|help)?/i,
    /why\s+does\s+react\s+(?:re-?render|render)/i,
    /why\s+do\s+we\s+use\s+(?:jwt|redis|docker|mongodb|redux|express|cors)/i,
    /difference\s+between/i,
    /best\s+practices?\s+for/i,
    /code\s+example/i,
    /how\s+to\s+(?:implement|create|handle|setup|configure|write|optimize)\s+(?:jwt|auth|api|dockerfile|middleware|schema|hook|index|query|state)/i,
    /what\s+is\s+(?:the\s+difference|virtual\s+dom|jwt|rest\s+api|nosql|docker|k8s|rbac|cors|middleware|indexing|mongoose)/i,
    /(?:jwt|mongodb|express|react|node|docker|kubernetes|redux|tailwind|css|html|javascript|typescript|ci\/cd|api)\s+(?:indexing|lifecycle|state|hooks|architecture|security|pattern|performance)/i,
  ];

  for (const pattern of technicalPatterns) {
    if (pattern.test(query)) {
      return { intent: "technical", confidence: 0.95 };
    }
  }

  // ──────────────────────────────────────────
  // 9. GREETING / GENERAL INTENT
  // ──────────────────────────────────────────
  const greetingPatterns = [
    /^(?:hi|hello|hey|greetings|hola|good\s+(?:morning|afternoon|evening|day))(?:\s+there|\s+aayush|\s+bot)?[\s.!]*$/i,
    /tell\s+me\s+a\s+joke/i,
    /how\s+are\s+you/i,
    /what\s+is\s+your\s+name/i,
    /who\s+are\s+you/i,
    /help(?:\s+me)?/i,
  ];

  for (const pattern of greetingPatterns) {
    if (pattern.test(query)) {
      return { intent: "general", confidence: 0.90 };
    }
  }

  // Context-aware multi-turn intent resolution if user query is very short / follow-up
  if (Array.isArray(history) && history.length > 0) {
    const lastUserTurn = [...history].reverse().find((m) => m && m.role === "user");
    if (lastUserTurn && typeof lastUserTurn.content === "string") {
      const lastIntent = classifyIntent(lastUserTurn.content, []).intent;
      // If user asks a short follow-up like "What features?", "What payment options?", "And what about admin panel?"
      if (
        query.includes("what payment") ||
        query.includes("what feature") ||
        query.includes("admin panel") ||
        query.includes("how long") ||
        query.includes("timeline")
      ) {
        if (lastIntent === "service" || lastIntent === "project" || lastIntent === "pricing") {
          return { intent: lastIntent, confidence: 0.88 };
        }
      }
    }
  }

  // Default fallback
  return { intent: "general", confidence: 0.70 };
}

/**
 * Validates and sanitizes classified intent.
 * @param {string} intent
 * @returns {string} Safe supported intent
 */
function sanitizeIntent(intent) {
  if (typeof intent === "string" && SUPPORTED_INTENTS.has(intent.toLowerCase())) {
    return intent.toLowerCase();
  }
  return "general";
}

module.exports = {
  classifyIntent,
  sanitizeIntent,
  SUPPORTED_INTENTS,
};
