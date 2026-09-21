# Tayyab Tufail | Portfolio

This folder contains Tayyab Tufail's professional portfolio website and the supporting project review.

**Folder name:** `tayyab-tufail-portfolio`  
**Portfolio focus:** Apps, websites, AI, machine learning, robotics, and IT solutions

The website presents 15 distinct projects from 16 source packages. The fire/smoke research and GUI deliveries are combined into one case study.

## Open the website

The local development preview is at **http://127.0.0.1:3000/** while the server is running.

To restart it, run `./start-portfolio.ps1` from this folder. The script uses the project-local Node runtime and starts the website. Open the printed local URL in your browser.

The website source is in `website/`. Project descriptions, results, captions, and image references are in `website/lib/projects.ts`. Contact links use the supplied email and WhatsApp number.

## Project review

- [Review of all 16 project packages](docs/project-review.md): purpose, technology, implementation, evidence, and limitations.
- [Portfolio content plan](docs/portfolio-plan.md): suggested featured projects, page sections, and information to add before building the website.

## Folder structure

```text
tayyab-tufail-portfolio/
  README.md
  docs/
    project-review.md
    portfolio-plan.md
  assets/
    images/
    videos/
  website/
    app/
    components/
    lib/projects.ts
    public/images/
    public/videos/
  start-portfolio.ps1
```

The asset folders contain selected project screenshots, evaluation outputs, and demonstration clips. Original project folders remain in their existing locations.

## Current stage

The responsive website includes project case studies, enlarged image links, robotics videos, service areas, an about section, and email/WhatsApp contact links. It is prepared for local viewing; it has not been published to an external hosting service.

The review inspects documentation, dependencies, representative source, and saved result artifacts. Some frontend interfaces were rendered for screenshots. Training jobs, complete backend integrations, and physical-robot tests were not rerun; reported evaluation figures remain saved project evidence.
