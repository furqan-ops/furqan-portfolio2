export const profile = {
  prompt: "furqan@portfolio",
  name: "Muhammad Furqan Tahir",
  tagline: "I make computers do the boring stuff",
  location: "Rawalpindi, PK",
  status: "online",
  role: "Software Engineer — Automation & AI Agents",
  current: "Automation & Data @ Applivity",
  blurb:
    "I build autonomous AI agents, resilient Python automations, and enterprise n8n workflows that eliminate repetitive work. From self-healing incident fleets (SentinelFlow) to full-stack attendance systems and document extraction engines, I turn manual bottlenecks into scalable, zero-maintenance systems.",
  email: "furqantahir2222@gmail.com",
  phone: "+92 315 0727514",
  github: "https://github.com/furqan-ops",
};

export const stats = [
  { value: 8, suffix: "+", label: "Production Tools Shipped" },
  { value: 10000, suffix: "+", label: "Records Processed & Cleaned" },
  { value: 99, suffix: ".8%", label: "Average SLA & Uptime" },
  { value: 24, suffix: "/7", label: "Autonomous Uptime" },
];

export const about = [
  "I'm a software engineer specializing in autonomous workflow automation, multi-agent AI systems, and robust data pipelines. Whether it's orchestrating self-healing incident response fleets with Gemini 2.0, designing enterprise n8n workflows, or shipping custom internal web tools, I focus on turning complex, manual operations into automated, reliable systems.",
  "At Applivity, I've built end-to-end production tools that teams rely on daily — including full-stack attendance systems, intelligent resume parsing pipelines with validation checks, and automated RFP lead scanners. I don't just write scripts; I build resilient systems with proper error-handling, logging, and confidence checks so they run without babysitting.",
  "When I'm not writing code, I'm analyzing workflows to identify bottlenecks. If a repetitive business process takes more than 15 minutes a day, my immediate instinct is to write a script or build an autonomous agent to handle it permanently.",
];

export const services = [
  {
    cmd: "ai.agent",
    title: "Autonomous AI Agents",
    desc: "Multi-agent systems powered by Gemini 2.0 Flash and LLMs that triage events, perform root cause analysis (RCA), and execute automated remediation without manual intervention.",
  },
  {
    cmd: "automation.build",
    title: "Workflow Automation",
    desc: "Production n8n workflows connecting Drive, Sheets, Gmail, Slack, and REST APIs — with error logging and confidence checks so data moves reliably on its own.",
  },
  {
    cmd: "python.run",
    title: "Python Scripts & Microservices",
    desc: "Resilient web scrapers (Selenium/Playwright), PDF extractors, automated data cleaners, and FastAPI services built to run reliably on schedules or event triggers.",
  },
  {
    cmd: "dashboard.saas",
    title: "Interactive Ops Dashboards",
    desc: "Real-time SaaS dashboards (Streamlit, React) tracking SLA health, pipeline throughput, and MTTR benchmarks with live telemetry visualization.",
  },
  {
    cmd: "integration.api",
    title: "API Integrations",
    desc: "Wiring platforms together through REST APIs, Webhooks, and OAuth 2.0 — Google Workspace, LLM providers, and internal databases.",
  },
  {
    cmd: "data.pipeline",
    title: "Data Pipelines & Analytics",
    desc: "Pulling messy data in, cleaning, deduplicating, and delivering to Power BI dashboards and databases for automated decision-making.",
  },
];

export const experience = [
  {
    role: "Automation & Data Operations",
    company: "Applivity",
    location: "Islamabad, Pakistan",
    period: "2024 — Present",
    summary:
      "I work across three areas: building automation for recruitment operations, keeping data clean across internal systems, and shipping tools that people in the company actually use every day. The attendance app below is one I built end-to-end here.",
    bullets: [
      "Built an n8n automation that watches a Google Drive folder, parses resumes as they arrive, extracts name / phone / email, checks for duplicates, and logs new candidates to Google Sheets — replacing a 4-step manual process that used to take hours per batch.",
      "Added a confidence-check layer so the parser flags uncertain extractions (like unclear names) instead of silently writing wrong data. This caught several edge cases that would have polluted the candidate database.",
      "Wrote Python + Selenium scripts to scrape and clean web data at scale — used for sourcing and enrichment across multiple internal pipelines.",
      "Designed and shipped a full attendance web app (Google Apps Script + Firebase + Sheets) with separate admin and employee views. Handles check-in / check-out, leave requests, monthly summaries, and role-based access. Now used daily across the team.",
      "Built Power BI dashboards for operations and expense reporting, replacing manual spreadsheet compilations that leadership previously waited on each month.",
      "Managed and cleaned 5,000+ records across Excel, Google Sheets, OpenCATS, and ERPNext — deduplication, verification, and enrichment before ingestion.",
      "Set up expense-claim escalation rules based on amount thresholds and approval chains — cut manual follow-ups significantly.",
    ],
  },
];

export const projects = [
  {
    name: "sentinelflow",
    featured: true,
    tags: ["Python", "Streamlit", "Gemini 2.0 Flash", "SQLite", "Multi-Agent AI"],
    desc: "An autonomous incident response and self-healing system for data pipelines. A multi-agent fleet (Watchdog, Diagnostician, Remediator) automatically triages webhook failures, diagnoses root causes via Gemini 2.0 Flash, applies synthesized auto-patches, and tracks MTTR and SLA health on a real-time SaaS ops dashboard.",
    link: "https://github.com/furqan-ops/sentinelflow",
    linkLabel: "view github",
    slides: [
      { type: "image", src: "/projects/sentinelflow.png" },
      {
        type: "terminal",
        title: "sentinelflow --fleet-status",
        lines: [
          "[*] Initializing SentinelFlow Multi-Agent Engine...",
          "[OK] Watchdog Agent: Active (Ingesting Webhooks)",
          "[OK] Diagnostician Agent: Ready (Gemini 2.0 Flash / RCA)",
          "[OK] Remediator Agent: Armed (Auto-Heal & HITL)",
          "[NEW] Incident INC-B2B79: HTTP 429 Too Many Requests detected",
          "[*] Diagnostician Agent: Root cause diagnosed in 142ms",
          "[OK] Remediator Agent: Auto-patch applied. Incident resolved",
          "[OK] Fleet Active: 99.8% SLA uptime preserved",
        ],
      },
      {
        type: "code",
        lang: "python",
        title: "agents/orchestrator.py",
        code: "class FleetOrchestrator:\n    def __init__(self):\n        self.watchdog = WatchdogAgent()\n        self.diagnostician = DiagnosticianAgent(model=\"gemini-2.0-flash\")\n        self.remediator = RemediatorAgent()\n\n    def process_event(self, event: dict):\n        incident = self.watchdog.triage(event)\n        diagnosis = self.diagnostician.analyze_root_cause(incident)\n        if diagnosis.confidence >= 0.90:\n            patch = self.remediator.auto_heal(incident, diagnosis)\n            return self.db.resolve_incident(incident.id, patch)\n        return self.escalate_to_human(incident, diagnosis)",
      },
    ],
  },
  {
    name: "apex-dental-ai",
    featured: true,
    tags: ["Meta WhatsApp Cloud API", "Google Gemini 3.5 Flash", "n8n", "Vercel Edge", "Tailwind CSS"],
    desc: "An enterprise omnichannel AI front-desk receptionist and 24/7 automated WhatsApp booking system for a private dental clinic. Features real-time clinical triage, dynamic fee quotes ($80 cleaning, $250 whitening, $0 consultation), and autonomous multi-step intake. Deployed on Vercel Edge Serverless functions with sub-50ms Meta webhook response time, instant retry deduplication, and zero hosting costs.",
    link: "https://apex-dental-clinic-theta.vercel.app/",
    linkLabel: "view live",
    slides: [
      { type: "image", src: "/projects/apex-dental-clinic.png" },
      { type: "image", src: "/projects/apex-dental-mobile.png" },
      {
        type: "terminal",
        title: "apex-receptionist --telemetry",
        lines: [
          "[*] Ingesting Meta WhatsApp Webhook: 200 OK (34ms)",
          "[OK] Patient Connected: +92 325 5997229 (wamid.HBgMOTIz...)",
          "[*] Reasoning Engine: Gemini 3.5 Flash Lite invoked",
          "[TRIAGE] Intent: In-Office Laser Teeth Whitening Inquiry ($250)",
          "[INTAKE] Captured: Patient Name, Phone, Desired Slot (Tomorrow 2:00 PM)",
          "[DISPATCH] Meta Graph API: Outbound reply delivered to WhatsApp",
          "[OK] 24/7 Edge Fleet: Active | $0.00 Monthly Cost | 99.99% Uptime",
        ],
      },
      {
        type: "code",
        lang: "javascript",
        title: "api/webhook.js",
        code: "// Vercel Edge Serverless WhatsApp AI Receptionist\nexport default async function handler(req, res) {\n  if (req.method === 'GET') {\n    return verifyMetaChallenge(req, res);\n  }\n  const { from, text, messageId } = extractWhatsAppPayload(req.body);\n  if (isDuplicate(messageId)) return res.status(200).send('DUPLICATE_IGNORED');\n\n  // Generate medical-grade response via Gemini 3.5 Flash\n  const reply = await callGemini(from, text);\n  await sendWhatsApp(from, reply);\n  return res.status(200).send('EVENT_RECEIVED');\n}",
      },
    ],
  },
  {
    name: "attendance-app",
    featured: true,
    tags: ["Google Apps Script", "JavaScript", "Firebase", "Sheets"],
    desc: "An attendance system that runs entirely inside Google Workspace. Separate admin and employee views — check-in, check-out, leave requests, and monthly summaries. No server, no hosting costs.",
    link: "https://applivity-attendance-app.web.app/",
    linkLabel: "view live",
    slides: [
      { type: "image", src: "/projects/attendance-app.png" },
      { type: "image", src: "/projects/dashboard.png" },
      { type: "image", src: "/projects/dashboard2.png" },
    ],
  },
  {
    name: "rfp-lead-generator",
    featured: true,
    tags: ["Python", "Gemini API", "Sheets", "Gmail"],
    desc: "Runs once a day, checks an RFP feed for new listings, writes a short AI summary of each one, logs it to Sheets, and emails a formatted alert. Skips anything already seen.",
    slides: [
      { type: "terminal", title: "python rfp_agent.py", lines: ["[*] Fetching RFPs from RFPMart...", "[OK] Found 24 RFPs in feed", "[*] Found 87 existing RFPs in sheet", "[NEW] Processing: AI Chatbot Development...", "[*] Generating summary with Gemini...", "[OK] Written to sheet", "[OK] Email sent", "[OK] Processed 3 new RFPs", "[INFO] Next run in 24 hours..."] },
      { type: "code", lang: "python", title: "fetch_rfps()", code: "def fetch_rfps():\n    response = requests.get(RFP_FEED_URL, timeout=10)\n    response.raise_for_status()\n    root = ET.fromstring(response.content)\n\n    rfps = []\n    for item in root.findall('.//item'):\n        rfps.append({\n            'title': item.find('title').text,\n            'link': item.find('link').text,\n            'pubDate': item.find('pubDate').text,\n        })\n    return rfps" },
      { type: "code", lang: "python", title: "process_rfps()", code: "def process_rfps():\n    rfps = fetch_rfps()\n    existing = get_existing_links()\n\n    for rfp in rfps[:5]:\n        if rfp['link'].lower() not in existing:\n            summary = generate_summary(rfp)\n            write_to_sheet(rfp, summary)\n            send_email(rfp, summary)\n            existing.add(rfp['link'].lower())\n\nschedule.every(24).hours.do(process_rfps)" },
    ],
  },
  {
    name: "pdf-extraction-tool",
    featured: true,
    tags: ["Python", "pdfplumber", "Tkinter", "pandas"],
    desc: "A small desktop app for pulling structured info out of resumes. Pick a folder or a single PDF, and it spits out name, email, phone, skills, and education into an Excel file. Has a checkbox UI so you choose which fields to extract.",
    slides: [
      { type: "terminal", title: "python Extractor.py", lines: ["[*] Loading PDF files from folder...", "[OK] Found 12 resumes", "[*] Extracting text with pdfplumber...", "[OK] 11 extracted successfully", "[ERROR] Failed: corrupted_resume.pdf", "[*] Regex: matching emails...", "[*] Regex: matching phone numbers...", "[*] Writing to extracted_details.xlsx", "[OK] Extraction complete. Success: 11, Failed: 1"] },
      { type: "code", lang: "python", title: "extract_details_from_text()", code: "def extract_details_from_text(text, ...):\n    email_pattern = r\"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\"\n    phone_pattern = r\"(\\+92|0092|92|0)?3\\d{2}[-.\\s]?\\d{7}\"\n\n    result = {}\n    result[\"Email\"] = re.search(email_pattern, text)\n    result[\"Phone\"] = re.search(phone_pattern, text)\n    result[\"Skills\"] = extract_skills(text)\n    result[\"Education\"] = extract_education(text)\n    return result" },
      { type: "code", lang: "python", title: "process_pdfs_from_folder()", code: "def process_pdfs_from_folder(folder_path, ...):\n    pdf_files = [f for f in os.listdir(folder_path)\n                 if f.endswith(\".pdf\")]\n\n    for pdf_file in pdf_files:\n        text = extract_text_from_pdf(pdf_file)\n        details = extract_details_from_text(text, ...)\n        extracted_details.append(details)\n\n    df = pd.DataFrame(extracted_details)\n    df.to_excel(\"extracted_details.xlsx\", index=False)" },
    ],
  },
  {
    name: "recruitment-intake-automation",
    tags: ["n8n", "Google Drive", "Google Sheets"],
    desc: "An n8n workflow that reads incoming resumes from Drive, pulls out the useful fields, skips duplicates by email, and logs clean rows to Sheets. Built entirely on free tools.",
  },
  {
    name: "web-data-extraction",
    tags: ["Python", "Selenium"],
    desc: "Python + Selenium scripts for pulling structured data off websites and exporting it to Excel or CSV.",
  },
  {
    name: "competitor-research-db",
    tags: ["Python", "Data Ops"],
    desc: "Pulled company, product, and contact data from multiple sources into one searchable database for competitive research.",
  },
];

export const skills = {
  "AI Agents & LLMs": [
    "Multi-Agent Orchestration",
    "Gemini 3.5 / 2.0 Flash",
    "Conversational Intake AI",
    "Groq / Llama 3.3",
    "Claude & OpenAI APIs",
    "Autonomous Self-Healing (RCA)",
    "Structured Outputs (JSON Schema)",
    "Prompt Engineering",
    "Tool Use & Function Calling",
  ],
  "Workflow Automation": [
    "Meta WhatsApp Cloud API",
    "n8n (Self-Hosted & Docker)",
    "Google Apps Script",
    "Webhooks & Event Triggers",
    "WhatsApp & Telegram Bots",
    "Selenium & Playwright",
    "REST APIs & OAuth 2.0",
    "Cron & Scheduled Jobs",
  ],
  "Languages & Frameworks": [
    "Python (Asyncio, FastAPI)",
    "JavaScript (ES6+) & React",
    "Streamlit (SaaS Dashboards)",
    "SQL (PostgreSQL, SQLite)",
    "HTML5 / CSS3 / Tailwind",
    "Bash & PowerShell",
  ],
  "Data Engineering & BI": [
    "Pandas & NumPy",
    "Power BI (DAX & Data Modeling)",
    "pdfplumber & Regex Parsing",
    "Data Cleaning & Deduplication",
    "ETL Pipelines",
    "Excel & Sheets Advanced",
  ],
  "Cloud & Databases": [
    "Vercel Edge & Serverless",
    "Cloudflare Tunnels",
    "SQLite3",
    "Supabase & PostgreSQL",
    "Firebase & Firestore",
    "Docker & Containers",
    "Google Cloud Platform",
  ],
  "Developer Tools & Ops": [
    "Git & GitHub (CI/CD)",
    "Cursor & VS Code",
    "Postman & cURL",
    "Linux / Shell",
    "OpenCATS",
    "ERPNext",
  ],
};

export const process = [
  { step: "01", title: "Look at the problem", desc: "Find out what's actually manual or broken before writing anything." },
  { step: "02", title: "Pick the right tool", desc: "n8n when it's orchestration. Python when there's real compute. Apps Script inside Google. LLMs when reasoning is needed." },
  { step: "03", title: "Build with resilience", desc: "Strict type checks, structured logging, retries, and confidence layers so it never fails silently." },
  { step: "04", title: "Test on edge cases", desc: "Run against real-world malformed inputs. Fix every failure mode before shipping." },
  { step: "05", title: "Ship and monitor", desc: "Deploy with live telemetry, automated health alerts, and self-healing agent recovery." },
];

export const certifications = [
  "n8n Workflow Automation Expert",
  "Microsoft Power BI Data Analytics",
  "Google Cloud Generative AI Fundamentals",
  "Python for Data Science & Automation",
  "Prompt Engineering for Enterprise LLMs",
];

export const faq = [
  {
    q: "What kind of roles are you open to?",
    a: "Software engineering, automation engineering, and AI-adjacent roles. Remote or hybrid — anywhere Python, n8n, AI agents, or workflow automation is central to the work.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I work remote-first with distributed international teams, primarily async on GitHub, Slack, and Jira.",
  },
  {
    q: "How do your automations handle reliability and unexpected failures?",
    a: "Every automation I build incorporates defense-in-depth: confidence validation checks, structured error logging, automated retries with exponential backoff, and instant alert dispatches. In projects like SentinelFlow, autonomous agents diagnose root causes and auto-patch issues in real-time.",
  },
  {
    q: "What's your main technology stack?",
    a: "Python (Asyncio, FastAPI, Streamlit) for heavy compute and agent logic, n8n for workflow orchestration, Gemini/Groq APIs for generative reasoning, Google Apps Script for Workspace automation, and modern React/Vite for frontend interfaces.",
  },
  {
    q: "Can you build full web apps or just backend automations?",
    a: "Both. While my core strength is backend automation and AI agents, I regularly design and ship complete full-stack web applications and SaaS ops centers (Streamlit, React, Firebase, Google Apps Script) tailored for business operations.",
  },
];

export const footer = { message: "build · ship · automate · repeat" };
