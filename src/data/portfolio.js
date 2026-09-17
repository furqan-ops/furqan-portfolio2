export const profile = {
  prompt: "furqan@portfolio",
  name: "Muhammad Furqan Tahir",
  tagline: "Software Engineer · Automation · AI Workflows",
  location: "Rawalpindi, PK",
  status: "online",
  role: "Software Engineer",
  current: "Automation & Data @ Applivity",
  blurb:
    "Software engineer focused on automation. I build Python scripts, n8n workflows, and Google Apps Script tools that replace manual work — from resume parsing and RFP lead generation to full attendance systems.",
  email: "furqantahir2222@gmail.com",
  phone: "+92 315 0727514",
  github: "https://github.com/furqan-ops",
};

export const stats = [
  { value: 20, suffix: "+", label: "Automations shipped" },
  { value: 5000, suffix: "+", label: "Records processed" },
  { value: 8, suffix: "+", label: "Languages & tools" },
  { value: 100, suffix: "%", label: "Remote-capable" },
];

export const about = [
  "I'm a software engineer focused on automation. Most of my work lives at the intersection of Python, n8n, and Google Apps Script — building systems that connect apps, move data reliably, and remove manual steps from recurring workflows.",
  "I come from a data operations background, so I care as much about the accuracy of what an automation touches as I do about its speed. I've built resume parsers, RFP lead generators, PDF extraction tools, and full attendance applications — mostly shipped end-to-end, from design to deployment.",
  "Currently based in Rawalpindi, working remote-first with distributed teams. Open to software engineering, automation engineering, and AI-adjacent roles.",
];

export const services = [
  {
    cmd: "automation.build",
    title: "Workflow Automation",
    desc: "n8n and Google Apps Script automations that connect Drive, Sheets, Gmail, and internal tools — replacing copy-paste with reliable pipelines.",
  },
  {
    cmd: "python.run",
    title: "Python Scripting & Tooling",
    desc: "Custom Python scripts for scraping, data extraction, PDF parsing, and desktop tools — built to run unattended or on a schedule.",
  },
  {
    cmd: "integration.api",
    title: "API & System Integration",
    desc: "Connecting services via REST APIs and OAuth — Google Workspace, LLM providers, internal dashboards, and third-party data sources.",
  },
  {
    cmd: "data.pipeline",
    title: "Data Pipelines & Reporting",
    desc: "End-to-end data flows — ingestion, cleaning, deduplication, and Power BI dashboards that leadership can actually read.",
  },
];

export const experience = [
  {
    role: "Automation & Data Operations",
    company: "Applivity",
    location: "Islamabad, Pakistan",
    period: "2024 — Present",
    bullets: [
      "Built an n8n automation that watches Google Drive for new resumes, extracts name / phone / email, deduplicates against existing records, and syncs clean entries to Google Sheets — replacing a 4-step manual process.",
      "Added a confidence-check layer so the parser flags uncertain extractions instead of silently writing wrong data.",
      "Wrote Python + Selenium scripts for web scraping and resume data extraction at scale.",
      "Built Power BI dashboards for operations and expense reporting.",
      "Managed and cleaned 5,000+ records across Excel, Sheets, OpenCATS, and ERPNext — with deduplication, verification, and enrichment steps.",
      "Verified contact data across Apollo.io and internal sources before ingestion.",
    ],
  },
];

export const projects = [
  {
    name: "attendance-app",
    tags: ["Google Apps Script", "JavaScript", "Firebase", "Sheets"],
    desc: "Full attendance system built in Google Apps Script with vanilla JavaScript. Separate admin and employee views — check-in / check-out, leave requests, and monthly summaries, running entirely in Google Workspace and deployed as a live web app.",
    link: "https://applivity-attendance-app.web.app/",
    linkLabel: "view live",
    screenshot: "/projects/attendance-app.png",
  },
  {
    name: "rfp-lead-generator",
    tags: ["Python", "Gemini API", "Sheets", "Gmail", "XML"],
    desc: "Scheduled Python automation that polls an RFP XML feed, generates an AI summary of each listing using Gemini, logs new leads to Google Sheets, and emails a formatted HTML alert — with deduplication against existing entries.",
    code: `def process_rfps():
    rfps = fetch_rfps()
    existing = get_existing_links()

    for rfp in rfps[:5]:
        if rfp['link'].lower() not in existing:
            summary = generate_summary(rfp)
            write_to_sheet(rfp, summary)
            send_email(rfp, summary)
            existing.add(rfp['link'].lower())

schedule.every(24).hours.do(process_rfps)`,
    codeLang: "python",
  },
  {
    name: "pdf-extraction-tool",
    tags: ["Python", "pdfplumber", "Tkinter", "pandas"],
    desc: "Desktop tool with a Tkinter GUI that batch-processes resumes from a folder or single file. Extracts name, email, phone, companies, skills, and education via regex, then exports everything to a styled Excel workbook.",
    code: `def extract_details_from_text(text, ...):
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
    phone_pattern = r"(\\+92|0092|92|0)?3\\d{2}[-.\\s]?\\d{7}"

    result = {}
    result["Email"] = re.search(email_pattern, text)
    result["Phone"] = re.search(phone_pattern, text)
    result["Skills"] = extract_skills(text)
    result["Education"] = extract_education(text)
    return result`,
    codeLang: "python",
  },
  {
    name: "recruitment-intake-automation",
    tags: ["n8n", "Google Drive", "Google Sheets"],
    desc: "Self-hosted n8n workflow that reads incoming resumes from Drive, extracts structured data, skips duplicates by email, and logs candidates to Sheets — no paid tools, fully free stack.",
  },
  {
    name: "web-data-extraction",
    tags: ["Python", "Selenium"],
    desc: "Python + Selenium scripts that collect, clean, and export web data into structured Excel / CSV files for downstream analysis.",
  },
  {
    name: "competitor-research-db",
    tags: ["Python", "Data Ops"],
    desc: "Multi-source research pipeline that aggregates company, product, and contact data into a single organized database for competitive analysis.",
  },
];

export const skills = {
  languages: ["Python", "JavaScript", "SQL", "HTML/CSS"],
  automation: ["n8n", "Google Apps Script", "Selenium", "Docker", "API / OAuth", "Error Handling", "Workflow Triggers"],
  "ai-and-data": ["Gemini API", "Power BI", "pandas", "pdfplumber", "Excel", "Google Sheets / Drive", "Web Scraping"],
  tools: ["Cursor", "Antigravity", "Git", "VS Code", "OpenCATS", "ERPNext"],
};

export const process = [
  { step: "01", title: "Understand", desc: "Map the current manual process, data sources, and failure points before writing any code." },
  { step: "02", title: "Design", desc: "Choose the right stack — n8n for orchestration, Python for heavy lifting, Apps Script for Workspace-native tools." },
  { step: "03", title: "Build", desc: "Implement the automation or script with error handling, logging, and confidence checks built in." },
  { step: "04", title: "Test", desc: "Run against real data, catch edge cases, verify no duplicates or silent failures slip through." },
  { step: "05", title: "Ship & Monitor", desc: "Deploy, schedule, and iterate — keep the automation reliable as inputs and requirements change." },
];

export const certifications = [
  "Microsoft Power BI Data Analytics",
  "Google Analytics Certification",
  "n8n Workflow Automation",
  "Power BI for Beginners",
  "Claude 101 — AI Fluency Framework",
];

export const faq = [
  {
    q: "What kind of roles are you open to?",
    a: "Software engineering, automation engineering, and AI-adjacent roles — remote or hybrid, anywhere Python, n8n, or workflow automation is core to the work.",
  },
  {
    q: "Do you have remote work experience?",
    a: "Yes. I've worked fully remote with distributed teams, communicating async across Slack, Teams, and Jira.",
  },
  {
    q: "What's your main automation stack?",
    a: "n8n for orchestration, Python for scraping and data processing, Google Apps Script for Workspace-native tools, and LLM APIs (Gemini) for AI-assisted steps.",
  },
  {
    q: "Can you build end-to-end, or just scripts?",
    a: "End-to-end. My projects span full applications (attendance system with admin + employee views), scheduled automations, desktop tools with GUIs, and reporting dashboards.",
  },
  {
    q: "What do you automate most often?",
    a: "Data intake and enrichment workflows — resume parsing, RFP / lead generation, scraping pipelines, PDF extraction, and reporting.",
  },
];

export const footer = {
  message: "build · ship · automate · repeat",
};
