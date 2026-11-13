# Academic, Patent & Collegiate Research Portfolio (Class of March 2027)

An **Editorial Research Lab & Academic Monograph** portfolio built with **Next.js, TypeScript, and Tailwind CSS**. Designed specifically to showcase undergraduate research, **filed utility patents**, capstone & coursework projects, publications, semester-by-semester curriculum progress toward **March 2027 graduation**, and campus leadership—while maintaining a clean bridge to your commercial freelance portfolio.

## ✨ Key Features

- **Editorial Monograph Aesthetic**: Warm archival paper palette (`#FAF7F2`) with a 1-click **Night Lab Dark Mode** (`#0D0F12`), pairing *Newsreader* serif typography with *Plus Jakarta Sans* prose and *JetBrains Mono* registry stamps.
- **§ 01 — Intellectual Property & Patent Registry**: Dedicated patent dossiers with application numbers, filing dates, status badges (`Patent Filed`, `Published`), inventor chips, expandable technical claims, and 1-click **Copy Citation / BibTeX**.
- **§ 02 — Scalable Project Dossier Explorer**:
  - Filter by category (`Capstone & Thesis`, `Lab Research`, `Coursework Systems`, `Hackathon & Hardware`) and search by keyword/tech stack.
  - Toggle between **Editorial Monograph Cards** and a dense **Archival Index Table** (ideal when you have many projects).
  - Click **Inspect Technical Dossier** on any project to open a modal with its Problem Formulation, Methodology, Empirical Outcomes, and links.
- **§ 03 — Publications & Technical Reports**: Academic paper cards with expandable BibTeX entries.
- **§ 04 — Curriculum & Road to March 2027**: Live graduation progress tracker (`2023 – March 2027`) with an interactive semester-by-semester coursework explorer (`Sem I` through `Sem VIII`).
- **§ 05 & § 06 — Labs, TA Roles & Campus Leadership**: Highlights undergraduate research fellowships, teaching assistantships, hackathons, and student clubs.
- **Single-File Content Config**: All content lives in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts).

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub & Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial academic & patent portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
   - Framework Preset: **Next.js** (auto-detected).
   - Click **Deploy** — zero extra configuration required!

