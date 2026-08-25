import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Server,
  Code2,
  Database,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  FileCode2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function ProductionNodejsRestApiArchitecture() {
  return (
    <div className="space-y-12 text-gray-200">
      {/* Introduction */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-gray-100">
          Node.js and Express make it trivial to spin up an HTTP server in fewer than twenty lines of code. However, as web applications grow from single-developer prototypes into multi-feature platforms, monolithic route files and "Fat Controllers" quickly become difficult to maintain, test, and debug.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          When route definitions, database queries, business calculations, input sanitization, and error responses are crammed into a single callback function, modifying one feature often breaks unrelated endpoints. In this guide, we walk through a clean, layered architecture for Node.js and Express applications using the <strong>Controller-Service-Repository</strong> pattern with Mongoose, centralized error handling, JWT authentication, and defensive security middleware—the exact principles underpinning my <Link to="/services" className="text-[#BE93FD] underline hover:text-[#FF6F91]">Full-Stack MERN services</Link>.
        </p>
      </section>

      {/* AEO Key Takeaways Callout Box */}
      <section className="p-6 rounded-3xl glass-card border border-[#BE93FD]/40 bg-[#BE93FD]/5 space-y-4">
        <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF6F91]" />
          <span>Architecture Snapshot (Executive Summary)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <strong className="text-[#BE93FD] block mb-1">Controllers:</strong>
            Thin HTTP interface. Extracts params, validates request payloads, and formats status codes.
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <strong className="text-[#BE93FD] block mb-1">Services:</strong>
            Pure business logic. Handles domain rules, calculations, and orchestrates repository calls.
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <strong className="text-[#BE93FD] block mb-1">Repositories:</strong>
            Data access abstraction. Performs Mongoose/MongoDB queries decoupled from domain rules.
          </div>
          <div className="p-3 rounded-xl bg-black/30 border border-white/5">
            <strong className="text-[#BE93FD] block mb-1">Middleware:</strong>
            Cross-cutting concerns: JWT auth, RBAC permissions, rate limiting, and centralized error catches.
          </div>
        </div>
      </section>

      {/* 01. What Makes a Node.js REST API Maintainable? */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">01.</span> What Makes a Node.js REST API Maintainable?
        </h2>

        {/* AEO Direct Answer Block */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What is a modular Express architecture?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            A modular Express architecture is a software design pattern that separates application responsibilities into discrete, decoupled layers: HTTP routing (Routes), request/response mediation (Controllers), business logic (Services), and database operations (Repositories/Models). This ensures single responsibility, testability, and reusable business code.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A maintainable backend system exhibits four essential architectural qualities:
        </p>

        <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 pl-2">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Separation of Concerns:</strong> HTTP transport logic (headers, cookies, status codes) never leaks into database queries or business calculations.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Unit Testability:</strong> Business services can be tested in complete isolation without mocking the entire Express <code className="text-[#BE93FD] font-mono-tech text-xs">req</code> and <code className="text-[#BE93FD] font-mono-tech text-xs">res</code> objects.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Predictable Error Boundaries:</strong> Asynchronous errors bubble up to a single centralized handler rather than unhandled promise rejections crashing the process.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span><strong>Uniform Response Contracts:</strong> Frontend consumers—such as our <Link to="/articles/technical-seo-react-vite" className="text-[#BE93FD] underline hover:text-[#FF6F91]">React + Vite client applications</Link>—always receive standardized JSON response envelopes.</span>
          </li>
        </ul>
      </section>

      {/* 02. Recommended Express Project Structure */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">02.</span> Recommended Express Project Structure
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          A scalable directory structure organizes code by technical layer while grouping domain entities cleanly. Below is the production directory layout used across professional Node.js projects:
        </p>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto leading-relaxed">
          <div className="text-gray-400 mb-2">// Express Clean Layered Project Architecture</div>
          <span className="text-[#BE93FD]">src/</span><br />
          ├── <span className="text-[#FF6F91]">config/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Environment variables, database connections, CORS settings</span><br />
          │&nbsp;&nbsp;&nbsp;├── db.js<br />
          │&nbsp;&nbsp;&nbsp;└── environment.js<br />
          ├── <span className="text-[#FF6F91]">routes/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Express router endpoint definitions & route-level middleware</span><br />
          │&nbsp;&nbsp;&nbsp;├── index.js<br />
          │&nbsp;&nbsp;&nbsp;├── auth.routes.js<br />
          │&nbsp;&nbsp;&nbsp;└── lead.routes.js<br />
          ├── <span className="text-[#FF6F91]">controllers/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Request payload extraction, status code returns, thin delegation</span><br />
          │&nbsp;&nbsp;&nbsp;├── auth.controller.js<br />
          │&nbsp;&nbsp;&nbsp;└── lead.controller.js<br />
          ├── <span className="text-[#FF6F91]">services/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Core business logic, domain rules, notifications</span><br />
          │&nbsp;&nbsp;&nbsp;├── auth.service.js<br />
          │&nbsp;&nbsp;&nbsp;└── lead.service.js<br />
          ├── <span className="text-[#FF6F91]">repositories/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Database queries (Mongoose queries isolated from services)</span><br />
          │&nbsp;&nbsp;&nbsp;├── user.repository.js<br />
          │&nbsp;&nbsp;&nbsp;└── lead.repository.js<br />
          ├── <span className="text-[#FF6F91]">models/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Mongoose schemas, document interfaces, validation rules</span><br />
          │&nbsp;&nbsp;&nbsp;├── User.js<br />
          │&nbsp;&nbsp;&nbsp;└── Lead.js<br />
          ├── <span className="text-[#FF6F91]">middleware/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Auth guards, role checks, rate limiting, error handler</span><br />
          │&nbsp;&nbsp;&nbsp;├── auth.middleware.js<br />
          │&nbsp;&nbsp;&nbsp;├── rateLimiter.middleware.js<br />
          │&nbsp;&nbsp;&nbsp;└── errorHandler.middleware.js<br />
          ├── <span className="text-[#FF6F91]">utils/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Custom AppError, response envelopes, async wrapper</span><br />
          │&nbsp;&nbsp;&nbsp;├── AppError.js<br />
          │&nbsp;&nbsp;&nbsp;├── ApiResponse.js<br />
          │&nbsp;&nbsp;&nbsp;└── asyncHandler.js<br />
          ├── <span className="text-[#BE93FD]">app.js</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Express app instantiation, global middleware pipeline</span><br />
          └── <span className="text-[#BE93FD]">server.js</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// HTTP server listen, database connection, graceful shutdown</span>
        </div>
      </section>

      {/* 03. Keeping Controllers Thin */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">03.</span> Keeping Controllers Thin
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What should an Express controller contain?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            An Express controller should only contain request extraction (reading <code className="text-[#BE93FD]">req.body</code>, <code className="text-[#BE93FD]">req.params</code>, <code className="text-[#BE93FD]">req.query</code>), invocation of the corresponding Service method, and sending the formatted HTTP response with the appropriate status code. It should never perform database queries or enforce business logic directly.
          </p>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Here is a concise example of a clean, thin controller method wrapped in an asynchronous error handler:
        </p>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// controllers/lead.controller.js</div>
          <span className="text-[#FF6F91]">import</span> asyncHandler <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../utils/asyncHandler.js"</span>;<br />
          <span className="text-[#FF6F91]">import</span> leadService <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../services/lead.service.js"</span>;<br />
          <span className="text-[#FF6F91]">import</span> ApiResponse <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../utils/ApiResponse.js"</span>;<br /><br />

          <span className="text-[#FF6F91]">export const</span> createLead = asyncHandler(<span className="text-[#FF6F91]">async</span> (req, res) =&gt; &#123;<br />
          &nbsp;&nbsp;<span className="text-gray-500">// 1. Extract inputs</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> &#123; name, email, projectScope, budget &#125; = req.body;<br /><br />
          &nbsp;&nbsp;<span className="text-gray-500">// 2. Delegate to business service layer</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> newLead = <span className="text-[#FF6F91]">await</span> leadService.registerInquiry(&#123; name, email, projectScope, budget &#125;);<br /><br />
          &nbsp;&nbsp;<span className="text-gray-500">// 3. Emit standardized HTTP 201 Created response</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">return</span> res.status(201).json(ApiResponse.success(newLead, <span className="text-emerald-400">"Inquiry registered successfully"</span>));<br />
          &#125;);
        </div>
      </section>

      {/* 04. Service Layer Responsibilities */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">04.</span> Service Layer Responsibilities
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: What is the purpose of a service layer in Node.js?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            The service layer encapsulates domain rules, data transformations, duplicate record checks, and external integrations (e.g., sending emails or payment processing). It remains agnostic of the HTTP transport protocol, enabling it to be invoked from REST endpoints, WebSocket handlers, or scheduled cron workers interchangeably.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// services/lead.service.js</div>
          <span className="text-[#FF6F91]">import</span> leadRepository <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../repositories/lead.repository.js"</span>;<br />
          <span className="text-[#FF6F91]">import</span> AppError <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../utils/AppError.js"</span>;<br /><br />

          <span className="text-[#FF6F91]">class</span> LeadService &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">async</span> registerInquiry(data) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Enforce domain validation rules</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">if</span> (!data.email || !data.email.includes(<span className="text-emerald-400">"@"</span>)) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">throw new</span> AppError(<span className="text-emerald-400">"A valid email address is required"</span>, 400);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Check for rapid duplicate submissions</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> existing = <span className="text-[#FF6F91]">await</span> leadRepository.findByEmail(data.email);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">if</span> (existing &amp;&amp; existing.isRecent) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">throw new</span> AppError(<span className="text-emerald-400">"An inquiry from this email was recently received"</span>, 429);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Persist via repository layer</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return await</span> leadRepository.create(data);<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;<br /><br />
          <span className="text-[#FF6F91]">export default new</span> LeadService();
        </div>
      </section>

      {/* 05. Repository and Database Access */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">05.</span> Repository and Database Access
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: Why separate database access into repositories?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            The repository pattern isolates direct database queries (Mongoose methods like <code className="text-[#BE93FD]">find</code>, <code className="text-[#BE93FD]">findOneAndUpdate</code>, and aggregations) from the rest of the application. This centralizes query optimization, simplifies mocking during tests, and prevents ODM-specific syntax from polluting business logic.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// repositories/lead.repository.js</div>
          <span className="text-[#FF6F91]">import</span> Lead <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../models/Lead.js"</span>;<br /><br />

          <span className="text-[#FF6F91]">class</span> LeadRepository &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">async</span> create(data) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return await</span> Lead.create(data);<br />
          &nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">async</span> findByEmail(email) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return await</span> Lead.findOne(&#123; email: email.toLowerCase().trim() &#125;).lean();<br />
          &nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">async</span> listWithPagination(page = 1, limit = 20) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> skip = (page - 1) * limit;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return await</span> Lead.find()<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.sort(&#123; createdAt: -1 &#125;)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.skip(skip)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.limit(limit)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.lean();<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;<br /><br />
          <span className="text-[#FF6F91]">export default new</span> LeadRepository();
        </div>
      </section>

      {/* 06. Mongoose Schema Validation */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">06.</span> Mongoose Schema Validation
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Database integrity starts at the schema level. In MongoDB, documents are schema-less by default, but Mongoose provides deterministic validation, indexing declarations, and document lifecycles:
        </p>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// models/Lead.js</div>
          <span className="text-[#FF6F91]">import</span> mongoose <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"mongoose"</span>;<br /><br />

          <span className="text-[#FF6F91]">const</span> leadSchema = <span className="text-[#FF6F91]">new</span> mongoose.Schema(<br />
          &nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;name: &#123; <span className="text-[#BE93FD]">type</span>: String, <span className="text-[#BE93FD]">required</span>: [<span className="text-[#FF6F91]">true</span>, <span className="text-emerald-400">"Name is required"</span>], <span className="text-[#BE93FD]">trim</span>: <span className="text-[#FF6F91]">true</span>, <span className="text-[#BE93FD]">maxlength</span>: 100 &#125;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;email: &#123; <span className="text-[#BE93FD]">type</span>: String, <span className="text-[#BE93FD]">required</span>: [<span className="text-[#FF6F91]">true</span>, <span className="text-emerald-400">"Email is required"</span>], <span className="text-[#BE93FD]">lowercase</span>: <span className="text-[#FF6F91]">true</span>, <span className="text-[#BE93FD]">trim</span>: <span className="text-[#FF6F91]">true</span>, <span className="text-[#BE93FD]">index</span>: <span className="text-[#FF6F91]">true</span> &#125;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;projectScope: &#123; <span className="text-[#BE93FD]">type</span>: String, <span className="text-[#BE93FD]">enum</span>: [<span className="text-emerald-400">"Web App"</span>, <span className="text-emerald-400">"E-Commerce"</span>, <span className="text-emerald-400">"SEO & Optimization"</span>, <span className="text-emerald-400">"Custom API"</span>], <span className="text-[#BE93FD]">default</span>: <span className="text-emerald-400">"Web App"</span> &#125;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;status: &#123; <span className="text-[#BE93FD]">type</span>: String, <span className="text-[#BE93FD]">enum</span>: [<span className="text-emerald-400">"new"</span>, <span className="text-emerald-400">"in-review"</span>, <span className="text-emerald-400">"contacted"</span>], <span className="text-[#BE93FD]">default</span>: <span className="text-emerald-400">"new"</span>, <span className="text-[#BE93FD]">index</span>: <span className="text-[#FF6F91]">true</span> &#125;<br />
          &nbsp;&nbsp;&#125;,<br />
          &nbsp;&nbsp;&#123; <span className="text-[#BE93FD]">timestamps</span>: <span className="text-[#FF6F91]">true</span> &#125;<br />
          );<br /><br />

          <span className="text-[#FF6F91]">export default</span> mongoose.model(<span className="text-emerald-400">"Lead"</span>, leadSchema);
        </div>
      </section>

      {/* 07. Centralized Error Handling */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">07.</span> Centralized Error Handling
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: How does centralized Express error handling work?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Centralized error handling uses an asynchronous wrapper function to catch rejected promises from route handlers and forward them to a global Express error-handling middleware <code className="text-[#BE93FD]">(err, req, res, next)</code>. This eliminates repetitive try/catch blocks in every controller and provides a single location to format error logs, status codes, and user-facing messages.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// middleware/errorHandler.middleware.js</div>
          <span className="text-[#FF6F91]">export default function</span> errorHandler(err, req, res, next) &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> statusCode = err.statusCode || 500;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> message = err.isOperational ? err.message : <span className="text-emerald-400">"Internal Server Error"</span>;<br /><br />

          &nbsp;&nbsp;<span className="text-gray-500">// Log unexpected errors for monitoring without leaking stack traces in production</span><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">if</span> (!err.isOperational) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;console.error(<span className="text-emerald-400">"[CRITICAL UNHANDLED ERROR]"</span>, err);<br />
          &nbsp;&nbsp;&#125;<br /><br />

          &nbsp;&nbsp;res.status(statusCode).json(&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;success: <span className="text-[#FF6F91]">false</span>,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;message,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;stack: process.env.NODE_ENV === <span className="text-emerald-400">"development"</span> ? err.stack : <span className="text-[#BE93FD]">undefined</span><br />
          &nbsp;&nbsp;&#125;);<br />
          &#125;
        </div>
      </section>

      {/* 08. JWT Authentication and Protected Routes */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">08.</span> JWT Authentication and Protected Routes
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: How should JWT-protected routes be structured in Express?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            JWT-protected routes are guarded by an authentication middleware that extracts the token from the <code className="text-[#BE93FD]">Authorization: Bearer &lt;token&gt;</code> header or HTTP-only cookie, verifies its signature with <code className="text-[#BE93FD]">jwt.verify()</code>, and attaches the decoded user claims to <code className="text-[#BE93FD]">req.user</code> before proceeding to the controller.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// middleware/auth.middleware.js</div>
          <span className="text-[#FF6F91]">import</span> jwt <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"jsonwebtoken"</span>;<br />
          <span className="text-[#FF6F91]">import</span> AppError <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"../utils/AppError.js"</span>;<br /><br />

          <span className="text-[#FF6F91]">export const</span> verifyToken = (req, res, next) =&gt; &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> authHeader = req.headers.authorization;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">if</span> (!authHeader || !authHeader.startsWith(<span className="text-emerald-400">"Bearer "</span>)) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return</span> next(<span className="text-[#FF6F91]">new</span> AppError(<span className="text-emerald-400">"Authentication token missing or invalid"</span>, 401));<br />
          &nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> token = authHeader.split(<span className="text-emerald-400">" "</span>)[1];<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">try</span> &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">const</span> decoded = jwt.verify(token, process.env.JWT_SECRET);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;req.user = decoded;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;next();<br />
          &nbsp;&nbsp;&#125; <span className="text-[#FF6F91]">catch</span> (error) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return</span> next(<span className="text-[#FF6F91]">new</span> AppError(<span className="text-emerald-400">"Invalid or expired authentication session"</span>, 403));<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;;
        </div>
      </section>

      {/* 09. API Rate Limiting */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">09.</span> API Rate Limiting
        </h2>

        {/* AEO Direct Answer */}
        <div className="p-4 rounded-2xl bg-black/40 border border-[#BE93FD]/30 space-y-1.5">
          <div className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#FF6F91]" />
            <span>Direct Answer: Why use API rate limiting in Express?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            API rate limiting protects backend servers from brute-force authentication attacks, credential stuffing, scraping bots, and unintentional request loops. Stricter limits should be applied to sensitive endpoints (e.g. login and contact forms) than general read-only endpoints.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// middleware/rateLimiter.middleware.js</div>
          <span className="text-[#FF6F91]">import</span> rateLimit <span className="text-[#FF6F91]">from</span> <span className="text-emerald-400">"express-rate-limit"</span>;<br /><br />

          <span className="text-[#FF6F91]">export const</span> contactFormLimiter = rateLimit(&#123;<br />
          &nbsp;&nbsp;windowMs: 15 * 60 * 1000, <span className="text-gray-500">// 15 minutes</span><br />
          &nbsp;&nbsp;max: 5, <span className="text-gray-500">// Limit each IP to 5 submissions per window</span><br />
          &nbsp;&nbsp;message: &#123; success: <span className="text-[#FF6F91]">false</span>, message: <span className="text-emerald-400">"Too many inquiries sent. Please try again in 15 minutes."</span> &#125;,<br />
          &nbsp;&nbsp;standardHeaders: <span className="text-[#FF6F91]">true</span>,<br />
          &nbsp;&nbsp;legacyHeaders: <span className="text-[#FF6F91]">false</span><br />
          &#125;);
        </div>
      </section>

      {/* 10. Standardized JSON Responses */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">10.</span> Standardized JSON Responses
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Client applications should never guess whether an API response succeeded or where data is nested. Use a single predictable response wrapper across all endpoints:
        </p>

        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono-tech text-xs text-gray-200 overflow-x-auto">
          <div className="text-gray-400 mb-2">// utils/ApiResponse.js</div>
          <span className="text-[#FF6F91]">class</span> ApiResponse &#123;<br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">static</span> success(data, message = <span className="text-emerald-400">"Success"</span>, meta = <span className="text-[#BE93FD]">null</span>) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return</span> &#123; success: <span className="text-[#FF6F91]">true</span>, message, data, meta &#125;;<br />
          &nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;<span className="text-[#FF6F91]">static</span> error(message = <span className="text-emerald-400">"An error occurred"</span>, errors = <span className="text-[#BE93FD]">null</span>) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FF6F91]">return</span> &#123; success: <span className="text-[#FF6F91]">false</span>, message, errors &#125;;<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;<br /><br />
          <span className="text-[#FF6F91]">export default</span> ApiResponse;
        </div>
      </section>

      {/* 11. Production Deployment Considerations */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">11.</span> Production Deployment Considerations
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
          Deploying an Express API requires operational safeguards beyond the code:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">1. Graceful Shutdown (SIGTERM)</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Listen to <code className="text-[#BE93FD]">process.on('SIGTERM')</code> to close existing HTTP connections and disconnect from MongoDB cleanly before the process exits.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">2. Security Headers (Helmet)</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Add <code className="text-[#BE93FD]">helmet()</code> middleware to set strict HTTP security headers (HSTS, X-Content-Type-Options, Frameguard) automatically.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">3. Strict CORS Origin Whitelisting</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Never use <code className="text-[#BE93FD]">origin: "*"</code> with credentials in production. Whitelist specific frontend domains.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1.5">
            <span className="text-xs font-mono-tech text-[#BE93FD] font-bold uppercase">4. Process Monitoring (PM2 / Docker)</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Run instances in cluster mode with automatic restart policies to utilize multi-core host machines efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Common Express Architecture Mistakes */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">12.</span> Common Express Architecture Mistakes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">1. Mixing DB Queries in Controllers</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Placing <code className="text-[#BE93FD]">Model.find()</code> inside route handlers tightly couples HTTP endpoints to specific database implementations.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">2. Unhandled Async Errors</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Forgetting to wrap async route handlers causes unhandled promise rejections that terminate the Node.js event loop.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">3. Hardcoded Configuration</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Embedding JWT secret strings or database connection strings directly in application code creates major security vulnerabilities.
            </p>
          </div>
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col gap-1.5">
            <span className="text-xs font-mono-tech text-[#FF6F91] font-bold uppercase">4. Missing Request Rate Limits</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Exposing unprotected authentication endpoints allows malicious bots to perform brute-force attacks unabated.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Production Checklist */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
          <span className="text-[#BE93FD]">13.</span> Production Checklist
        </h2>
        <div className="p-6 rounded-3xl glass-card border border-[#BE93FD]/30 space-y-3">
          {[
            "Controllers are thin, handling only input extraction and status code responses.",
            "Business logic is isolated in dedicated, unit-testable Service classes.",
            "All database queries are decoupled into Repository modules.",
            "Mongoose schemas enforce strict types, required fields, and index declarations.",
            "Centralized error middleware formats clean responses without leaking production stack traces.",
            "JWT verification guards protected endpoints with proper Bearer token headers.",
            "Rate limiting middleware protects contact forms, login endpoints, and public APIs.",
            "Standardized JSON response envelope ({ success, data, message }) applied across all routes.",
            "Security headers enabled via Helmet and strict CORS origin whitelisting configured.",
            "Graceful shutdown handlers (SIGTERM / SIGINT) ensure clean database disconnections."
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
