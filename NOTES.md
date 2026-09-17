# Portfolio Editing Guide

All content lives in: src/data/portfolio.js

## Quick Reference

| Change | Where |
|---|---|
| Name, email, LinkedIn, GitHub | profile |
| Tagline / blurb | profile.tagline, profile.blurb |
| Current job | profile.role, profile.current |
| Stats | stats |
| About paragraphs | about |
| Service cards | services |
| Job history | experience |
| Projects | projects |
| Skills | skills |
| Process steps | process |
| Certifications | certifications |
| FAQ | faq |
| Footer | footer.message |

## Add a Job

In experience array:

    {
      role: "HR Intern",
      company: "Some Company",
      location: "Lahore, Pakistan",
      period: "2023 - 2024",
      bullets: [
        "Did this thing.",
        "Did that thing.",
      ],
    },

## Add a Project

In projects array:

    {
      name: "attendance-tracker",
      tags: ["n8n", "Google Sheets"],
      desc: "Automated daily attendance reconciliation.",
    },

## Animations

Import: import { motion } from "framer-motion";

Fade + slide:
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>

Fade + scale:
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >

Staggered:
    transition={{ delay: i * 0.1 }}

## Workflow

Local: edit portfolio.js, Ctrl+S, browser refreshes.
Live: git add . && git commit -m "msg" && git push

## Rules

DO edit portfolio.js for content
DO keep commas between array items
DO commit often

DONT rename keys in portfolio.js
DONT delete export const lines
DONT touch node_modules/

## Troubleshooting

White screen? Open F12 Console, look for error.
Undo: Ctrl+Z in VS Code
Restore file: git checkout -- src/data/portfolio.js
Restart: npm run dev
