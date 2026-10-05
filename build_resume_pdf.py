import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    PageBreak,
)
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import pymupdf

# Palette
PRIMARY = colors.HexColor("#0f172a")      # Slate-900 (deep readable charcoal/black)
SECONDARY = colors.HexColor("#334155")    # Slate-700 for subtitles/roles
ACCENT = colors.HexColor("#1d4ed8")       # Crisp Blue for links
LINE_COLOR = colors.HexColor("#cbd5e1")   # Slate-300 for clean subtle dividers
MUTED = colors.HexColor("#475569")        # Slate-600 for dates/location

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        if page_count > 1:
            self.setFont("Helvetica", 8)
            self.setFillColor(MUTED)
            self.drawRightString(letter[0] - 36, 20, f"Page {self._pageNumber} of {page_count}")


def get_styles():
    base = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "ResumeTitle",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=21,
        leading=25,
        alignment=1, # Center
        textColor=PRIMARY,
    )

    subtitle_style = ParagraphStyle(
        "ResumeSubtitle",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        alignment=1,
        textColor=SECONDARY,
    )

    contact_style = ParagraphStyle(
        "ResumeContact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12.5,
        alignment=1,
        textColor=MUTED,
    )

    section_heading = ParagraphStyle(
        "SectionHeading",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=13,
        textColor=PRIMARY,
        spaceBefore=0,
        spaceAfter=0,
    )

    body_style = ParagraphStyle(
        "ResumeBody",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=12.2,
        textColor=PRIMARY,
    )

    bullet_style = ParagraphStyle(
        "ResumeBullet",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.7,
        leading=12.0,
        textColor=PRIMARY,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=2,
    )

    item_title_left = ParagraphStyle(
        "ItemTitleLeft",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.3,
        leading=12.5,
        textColor=PRIMARY,
    )

    item_title_right = ParagraphStyle(
        "ItemTitleRight",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12.5,
        alignment=2, # Right
        textColor=MUTED,
    )

    deep_dive_title = ParagraphStyle(
        "DeepDiveTitle",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.2,
        leading=12.5,
        textColor=PRIMARY,
        spaceBefore=4,
        spaceAfter=1,
    )

    return {
        "title": title_style,
        "subtitle": subtitle_style,
        "contact": contact_style,
        "section": section_heading,
        "body": body_style,
        "bullet": bullet_style,
        "item_left": item_title_left,
        "item_right": item_title_right,
        "deep_dive_title": deep_dive_title,
    }


def add_section_header(title, styles, elements, space_before=4, space_after=5):
    if space_before > 0:
        elements.append(Spacer(1, space_before))
    elements.append(Paragraph(title, styles["section"]))
    elements.append(HRFlowable(width="100%", thickness=0.8, color=LINE_COLOR, spaceBefore=2, spaceAfter=space_after))


def build_1page_pdf(output_path):
    # Dimensions: Letter (612 x 792 pt). Usable width: 552 pt, usable height ~736 pt
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=26,
        bottomMargin=20,
    )
    styles = get_styles()
    story = []

    # Header
    story.append(Paragraph("Muhammad Furqan Tahir", styles["title"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph("Software & Automation Engineer", styles["subtitle"]))
    story.append(Spacer(1, 2.5))
    story.append(Paragraph(
        "Rawalpindi, Pakistan &nbsp;|&nbsp; +92 315 0727514 &nbsp;|&nbsp; furqantahir2222@gmail.com",
        styles["contact"],
    ))
    story.append(Paragraph(
        'Portfolio: <a href="https://furqan-portfolio2.vercel.app" color="#1d4ed8"><u>furqan-portfolio2.vercel.app</u></a> &nbsp;|&nbsp; '
        'GitHub: <a href="https://github.com/furqan-ops" color="#1d4ed8"><u>github.com/furqan-ops</u></a> &nbsp;|&nbsp; '
        'LinkedIn: <a href="https://linkedin.com/in/furqan-ops" color="#1d4ed8"><u>linkedin.com/in/furqan-ops</u></a>',
        styles["contact"],
    ))
    story.append(Spacer(1, 4))

    # SUMMARY
    add_section_header("SUMMARY", styles, story, space_before=3, space_after=4)
    summary_text = (
        "Software & Automation Engineer building multi-agent AI systems, resilient data pipelines, and internal tools "
        "with Python, n8n, and Playwright. Focused on production reliability: confidence scoring for data accuracy, "
        "exponential backoff error recovery, and measurable ROI (cut manual business operations by 75%+)."
    )
    story.append(Paragraph(summary_text, styles["body"]))

    # SKILLS
    add_section_header("SKILLS", styles, story, space_before=6, space_after=4)
    skills_data = [
        [
            Paragraph("<b>Languages:</b> Python, TypeScript, JavaScript, SQL, HTML5/CSS3", styles["body"]),
            Paragraph("<b>Automation & AI:</b> Multi-Agent Systems, n8n, Playwright, Selenium, LLM Prompting & Function Calling", styles["body"]),
        ],
        [
            Paragraph("<b>Web & Databases:</b> Next.js 15, Streamlit, Supabase (PostgreSQL), React, Node.js, Tailwind CSS, Firebase", styles["body"]),
            Paragraph("<b>Tools & Ops:</b> Git/GitHub, Docker, Power BI, Google Apps Script, REST/Sheets APIs, ERPNext, Vercel", styles["body"]),
        ],
    ]
    t_skills = Table(skills_data, colWidths=[270, 282])
    t_skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_skills)

    # EXPERIENCE
    add_section_header("EXPERIENCE", styles, story, space_before=6, space_after=4)
    exp_header = [
        [
            Paragraph("<b>Data Operations Analyst (Automation & Data)</b> | <i>Applivity, Islamabad</i>", styles["item_left"]),
            Paragraph("May 2024 – Present", styles["item_right"]),
        ]
    ]
    t_exp = Table(exp_header, colWidths=[390, 162])
    t_exp.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_exp)

    story.append(Paragraph(
        "• <b>Resume Pipeline & OCR Accuracy:</b> Built an n8n workflow extracting candidate data from Google Drive PDFs to Sheets, cutting manual entry by 75% across 5,000+ applicants. Integrated Claude 3 Haiku for OCR confidence scoring on ambiguous entries—flags low-confidence fields for human review, sustaining &gt;99% extraction accuracy.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>MedRim Portal Automation:</b> Wrote Playwright scripts in Node.js to register employee family dependents on MedRim portal without manual form-filling across 200+ employee records; implemented retry budgets and network error recovery.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>Verified Lead Scraping:</b> Built Python + Selenium scrapers targeting LinkedIn, Upwork, and industry portals to ingest verified contacts into ERPNext with rotating proxies and exponential backoff (2s–120s) to handle rate-limiting.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>Hiring & Expense Dashboards:</b> Created automated Power BI dashboards connected to live Google Sheets data tracking hiring throughput (pipeline → offer → hire) and departmental expenses, replacing manual executive reporting.",
        styles["bullet"],
    ))

    # PROJECTS
    add_section_header("PROJECTS", styles, story, space_before=6, space_after=4)

    # Project 1: SentinelFlow
    p1_header = [
        [
            Paragraph("<b>SentinelFlow: Autonomous Incident Response Fleet</b>", styles["item_left"]),
            Paragraph('<a href="https://github.com/furqan-ops/sentinelflow" color="#1d4ed8"><u>github.com/furqan-ops/sentinelflow</u></a>', styles["item_right"]),
        ]
    ]
    t_p1 = Table(p1_header, colWidths=[305, 247])
    t_p1.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_p1)
    story.append(Paragraph(
        "• Engineered a multi-agent self-healing fleet (Watchdog, Diagnostician, Remediator) using Gemini 2.0 Flash to triage webhook errors, diagnose root causes (RCA), and auto-patch failing pipeline components in real-time.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• Built an interactive SaaS ops dashboard (Streamlit) monitoring agent cluster latency, incident MTTR, and 99.8% SLA uptime health.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 2.5))

    # Project 2: Dining Concierge
    p2_header = [
        [
            Paragraph("<b>Autonomous Multi-Agent Dining Concierge & Voice Assistant</b>", styles["item_left"]),
            Paragraph('<a href="https://multi-ai-agents-customer-support.vercel.app" color="#1d4ed8"><u>multi-ai-agents-customer-support.vercel.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p2 = Table(p2_header, colWidths=[305, 247])
    t_p2.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_p2)
    story.append(Paragraph(
        "• Full-stack AI concierge handling bookings and dietary queries; routed requests across 7 specialized sub-agents with multi-turn memory, typo auto-correction, and Web Speech API karaoke highlighting (Next.js 15 → Supabase → n8n → Claude/GPT).",
        styles["bullet"],
    ))
    story.append(Spacer(1, 2.5))

    # Project 3: Governance Center
    p3_header = [
        [
            Paragraph("<b>Multi-Agent Performance & Cost Governance Center</b>", styles["item_left"]),
            Paragraph('<a href="https://multiple-agent-governance-dashboard.streamlit.app" color="#1d4ed8"><u>multiple-agent-governance-dashboard.streamlit.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p3 = Table(p3_header, colWidths=[300, 252])
    t_p3.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_p3)
    story.append(Paragraph(
        "• Real-time Streamlit dashboard tracking multi-agent cluster latency, token consumption, and spend. Implemented semantic caching via Supabase pgvector (embedding distance &lt;0.01), cutting repeat query costs by 40%+ with runaway query circuit breakers.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 2.5))

    # Project 4: Attendance App
    p4_header = [
        [
            Paragraph("<b>Enterprise Attendance Web App</b> (In Production at Applivity)", styles["item_left"]),
            Paragraph('<a href="https://applivity-attendance-app.web.app" color="#1d4ed8"><u>applivity-attendance-app.web.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p4 = Table(p4_header, colWidths=[305, 247])
    t_p4.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_p4)
    story.append(Paragraph(
        "• Replaced manual paper timesheets for 50+ staff with zero-hosting-cost web app; features separate Employee and Admin portals, live check-in/out stamps, leave approval workflows, and automated monthly payroll hour compilation.",
        styles["bullet"],
    ))

    # EDUCATION & CERTIFICATIONS IN A BALANCED 2-COLUMN TABLE
    edu_cert = [
        [
            Paragraph("<b>EDUCATION</b>", styles["section"]),
            Paragraph("<b>CERTIFICATIONS</b>", styles["section"]),
        ],
        [
            HRFlowable(width="100%", thickness=0.8, color=LINE_COLOR, spaceBefore=2, spaceAfter=4),
            HRFlowable(width="100%", thickness=0.8, color=LINE_COLOR, spaceBefore=2, spaceAfter=4),
        ],
        [
            Paragraph("<b>Bachelor of Software Engineering</b><br/>International Islamic University, Islamabad<br/><font color='#475569'>2019 – 2024</font>", styles["body"]),
            Paragraph("• Microsoft Power BI Data Analytics<br/>• n8n Workflow Automation Expert<br/>• Claude 101 AI Fluency & Prompt Engineering<br/>• Google Cloud Generative AI Fundamentals", styles["body"]),
        ],
    ]
    t_bottom = Table(edu_cert, colWidths=[270, 282])
    t_bottom.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(Spacer(1, 6))
    story.append(t_bottom)

    doc.build(story, canvasmaker=NumberedCanvas)


def build_extended_pdf(output_path):
    # 2-Page Extended Edition with Technical Deep Dives
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=34,
        rightMargin=34,
        topMargin=26,
        bottomMargin=26,
    )
    styles = get_styles()
    story = []

    # Header
    story.append(Paragraph("Muhammad Furqan Tahir", styles["title"]))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Software & Automation Engineer", styles["subtitle"]))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "Rawalpindi, Pakistan &nbsp;|&nbsp; +92 315 0727514 &nbsp;|&nbsp; furqantahir2222@gmail.com",
        styles["contact"],
    ))
    story.append(Paragraph(
        'Portfolio: <a href="https://furqan-portfolio2.vercel.app" color="#1d4ed8"><u>furqan-portfolio2.vercel.app</u></a> &nbsp;|&nbsp; '
        'GitHub: <a href="https://github.com/furqan-ops" color="#1d4ed8"><u>github.com/furqan-ops</u></a> &nbsp;|&nbsp; '
        'LinkedIn: <a href="https://linkedin.com/in/furqan-ops" color="#1d4ed8"><u>linkedin.com/in/furqan-ops</u></a>',
        styles["contact"],
    ))
    story.append(Spacer(1, 6))

    # SUMMARY
    add_section_header("SUMMARY", styles, story, space_before=2, space_after=4)
    summary_text = (
        "Software & Automation Engineer building practical multi-agent AI systems, internal tools, and web applications. "
        "Extensive experience shipping end-to-end workflows with Python, n8n, Playwright, and LLM orchestration. "
        "Currently at Applivity automating recruitment pipelines and web data extraction with an uncompromising focus on "
        "production reliability: confidence scoring for data accuracy, defensive error handling, and measurable ROI."
    )
    story.append(Paragraph(summary_text, styles["body"]))
    story.append(Spacer(1, 4))

    # SKILLS
    add_section_header("SKILLS", styles, story, space_before=4, space_after=4)
    skills_data = [
        [
            Paragraph("<b>Languages:</b> Python, TypeScript, JavaScript, SQL, HTML5/CSS3", styles["body"]),
            Paragraph("<b>Automation & AI:</b> Multi-Agent Systems, n8n, Playwright, Selenium, LLM Prompting & Function Calling", styles["body"]),
        ],
        [
            Paragraph("<b>Web & Databases:</b> Next.js 15, Streamlit, Supabase (PostgreSQL), React, Node.js, Tailwind CSS, Firebase", styles["body"]),
            Paragraph("<b>Tools & Ops:</b> Git/GitHub, Docker, Power BI, Google Apps Script, REST/Sheets APIs, ERPNext, Vercel", styles["body"]),
        ],
    ]
    t_skills = Table(skills_data, colWidths=[265, 279])
    t_skills.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 4))

    # EXPERIENCE
    add_section_header("EXPERIENCE", styles, story, space_before=4, space_after=4)
    exp_header = [
        [
            Paragraph("<b>Data Operations Analyst (Automation & Data)</b> | <i>Applivity, Islamabad</i>", styles["item_left"]),
            Paragraph("May 2024 – Present", styles["item_right"]),
        ]
    ]
    t_exp = Table(exp_header, colWidths=[385, 159])
    t_exp.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_exp)

    story.append(Paragraph(
        "• <b>Resume Pipeline & OCR Accuracy:</b> Built an n8n workflow to extract candidate data from Google Drive PDFs to Google Sheets. Integrated Claude 3 Haiku for OCR confidence scoring on ambiguous entries—flags unclear details for manual review instead of guessing. Cut manual resume entry by 75% across 5,000+ applicants while maintaining extraction accuracy &gt;99%.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>MedRim Portal Automation:</b> Wrote Playwright scripts in Node.js to automate employee dependent registration on the MedRim portal. Automated form-filling across 200+ employee records; added exponential retry logic and explicit waits for network flakiness.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>Verified Lead Scraping:</b> Built Python + Selenium scrapers targeting LinkedIn, Upwork, and talent portals to gather verified contact leads. Implemented duplicate detection, data normalization, and direct ingestion into ERPNext with rotating proxies.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• <b>Hiring & Expense Dashboards:</b> Created automated Power BI dashboards tracking hiring throughput (pipeline → offer → hire), departmental spend, and budget variance connected to live Google Sheets data, replacing manual monthly executive reporting.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 4))

    # PROJECTS
    add_section_header("PROJECTS & TECHNICAL WORK", styles, story, space_before=4, space_after=4)

    # SentinelFlow
    p1_header = [
        [
            Paragraph("<b>SentinelFlow: Autonomous Incident Response Fleet</b>", styles["item_left"]),
            Paragraph('<a href="https://github.com/furqan-ops/sentinelflow" color="#1d4ed8"><u>github.com/furqan-ops/sentinelflow</u></a>', styles["item_right"]),
        ]
    ]
    t_p1 = Table(p1_header, colWidths=[305, 239])
    t_p1.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("BOTTOMPADDING", (0, 0), (-1, -1), 1), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p1)
    story.append(Paragraph(
        "• Autonomous self-healing system for data pipelines. A multi-agent fleet (Watchdog, Diagnostician, Remediator) triages webhook failures, performs root cause analysis (RCA) via Gemini 2.0 Flash, and applies auto-patches without human intervention.",
        styles["bullet"],
    ))
    story.append(Paragraph(
        "• Built an interactive SaaS ops dashboard in Streamlit displaying MTTR benchmarks, SLA uptime health (99.8%), and real-time agent fleet logs.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 3))

    # Dining Concierge
    p2_header = [
        [
            Paragraph("<b>Autonomous Multi-Agent Dining Concierge & Voice Assistant</b>", styles["item_left"]),
            Paragraph('<a href="https://multi-ai-agents-customer-support.vercel.app" color="#1d4ed8"><u>multi-ai-agents-customer-support.vercel.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p2 = Table(p2_header, colWidths=[305, 239])
    t_p2.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("BOTTOMPADDING", (0, 0), (-1, -1), 1), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p2)
    story.append(Paragraph(
        "• Full-stack AI concierge handling bookings, menus, and dietary needs via real-time text and low-latency voice. Built 7 specialized sub-agents orchestrated via LLM routing with multi-turn memory, typo auto-correction, and Web Speech API karaoke text highlighting.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 3))

    # Governance Center
    p3_header = [
        [
            Paragraph("<b>Multi-Agent Performance & Cost Governance Center</b>", styles["item_left"]),
            Paragraph('<a href="https://multiple-agent-governance-dashboard.streamlit.app" color="#1d4ed8"><u>multiple-agent-governance-dashboard.streamlit.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p3 = Table(p3_header, colWidths=[300, 244])
    t_p3.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("BOTTOMPADDING", (0, 0), (-1, -1), 1), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p3)
    story.append(Paragraph(
        "• Real-time Streamlit dashboard tracking multi-agent cluster latency, token consumption, and cost tracking. Implemented semantic caching with Supabase pgvector (embedding distance &lt;0.01), cutting repeat query costs by 40%+ with runaway query breakers.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 3))

    # Attendance App
    p4_header = [
        [
            Paragraph("<b>Attendance Tracking App</b> (Deployed in Production at Applivity)", styles["item_left"]),
            Paragraph('<a href="https://applivity-attendance-app.web.app" color="#1d4ed8"><u>applivity-attendance-app.web.app</u></a>', styles["item_right"]),
        ]
    ]
    t_p4 = Table(p4_header, colWidths=[305, 239])
    t_p4.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("BOTTOMPADDING", (0, 0), (-1, -1), 1), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(t_p4)
    story.append(Paragraph(
        "• Cloud-based attendance system replacing paper timesheets for 50+ active staff. Built dual portals (Employee/Admin) for check-in/out stamps, leave requests, and automated monthly payroll calculation with zero hosting costs.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 6))

    # TECHNICAL DEEP DIVES (THE KILLER SECTION) - Placed cleanly on Page 2
    story.append(PageBreak())
    add_section_header("TECHNICAL DEEP DIVES & ARCHITECTURAL DECISIONS", styles, story, space_before=0, space_after=6)

    story.append(Paragraph("<b>Resume Parsing Reliability & OCR Confidence Scoring:</b>", styles["deep_dive_title"]))
    story.append(Paragraph(
        "n8n's native JSON extraction failed on 15–20% of messy resume PDFs (multi-column layouts, inconsistent headings). Solved by inserting a Claude 3 Haiku step to re-extract with OCR and assign confidence scores (0–100) per field. Applied a strict rule: only auto-write high-confidence (&gt;95%) fields; flag medium-confidence entries for rapid human validation. Result: sustained extraction accuracy &gt;99% while automating 75% of ingestion.",
        styles["bullet"],
    ))

    story.append(Paragraph("<b>pgvector Semantic Caching for LLM Cost Optimization:</b>", styles["deep_dive_title"]))
    story.append(Paragraph(
        "The Governance Dashboard constantly queries agent logs for similar incident patterns. Using Supabase pgvector, we cache identical queries (detected via cosine embedding distance &lt;0.01) for 60 seconds. Result: 40% reduction in token consumption and sub-second response times, accepting a controlled 60-second staleness trade-off for operational telemetry.",
        styles["bullet"],
    ))

    story.append(Paragraph("<b>Web Scraping Resiliency at Scale:</b>", styles["deep_dive_title"]))
    story.append(Paragraph(
        "To counter aggressive anti-scraping and rate-limits on professional portals, engineered retry logic with exponential backoff (starting at 2s, capped at 120s) and rotating proxy pools. Replaced arbitrary sleeps with explicit condition waits on critical DOM nodes to eliminate flaky test runs.",
        styles["bullet"],
    ))

    story.append(Paragraph("<b>Multi-Agent Routing & Failover Architecture:</b>", styles["deep_dive_title"]))
    story.append(Paragraph(
        "The Dining Concierge and SentinelFlow route incoming events using strict function schemas. Each specialized sub-agent is scoped to explicit boundaries (e.g. booking agent only executes reservation APIs, never menus). When an agent encounters an anomaly, the supervisor agent catches the error, dispatches an alert, and executes deterministic rollback.",
        styles["bullet"],
    ))
    story.append(Spacer(1, 6))

    # EDUCATION & CERTIFICATIONS
    edu_cert = [
        [
            Paragraph("<b>EDUCATION</b>", styles["section"]),
            Paragraph("<b>CERTIFICATIONS</b>", styles["section"]),
        ],
        [
            HRFlowable(width="100%", thickness=0.8, color=LINE_COLOR, spaceBefore=2, spaceAfter=4),
            HRFlowable(width="100%", thickness=0.8, color=LINE_COLOR, spaceBefore=2, spaceAfter=4),
        ],
        [
            Paragraph("<b>Bachelor of Software Engineering</b><br/>International Islamic University, Islamabad<br/><font color='#475569'>2019 – 2024</font>", styles["body"]),
            Paragraph("• Microsoft Power BI Data Analytics<br/>• n8n Workflow Automation Expert<br/>• Claude 101 AI Fluency & Prompt Engineering<br/>• Google Cloud Generative AI Fundamentals", styles["body"]),
        ],
    ]
    t_bottom = Table(edu_cert, colWidths=[265, 279])
    t_bottom.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(t_bottom)

    doc.build(story, canvasmaker=NumberedCanvas)


def render_previews(pdf_path, out_prefix):
    doc = pymupdf.open(pdf_path)
    paths = []
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        p = f"{out_prefix}_page_{i+1}.png"
        pix.save(p)
        paths.append(p)
    return paths


if __name__ == "__main__":
    out_dir = r"D:\furqan-portfolio"
    out_1page = os.path.join(out_dir, "Muhammad_Furqan_Tahir_Resume.pdf")
    out_ext = os.path.join(out_dir, "Muhammad_Furqan_Tahir_Resume_Extended.pdf")

    print(f"Building 1-page PDF: {out_1page}")
    build_1page_pdf(out_1page)

    print(f"Building extended PDF: {out_ext}")
    build_extended_pdf(out_ext)

    # Render preview images
    render_previews(out_1page, os.path.join(out_dir, "resume_1page"))
    render_previews(out_ext, os.path.join(out_dir, "resume_ext"))
    print("Done!")
