# Portfolio Projects

## Skills

- Personal Site: ([code](https://github.com/Kuhrt/kuhrt.codes?tab=readme-ov-file#kuhrtcodes) | [live demo](https://kuhrt.codes))
   - NextJS
   - Design
   - Advanced Animations
   - GSAP
   - Three.js
- Practice Hub ([code](https://github.com/Kuhrt/portfolio-practice-hub))
   - Python API
   - NextJS Web App
   - Postgres DB
   - Keycloak Authentication
   - Redis Caching
- Board Game Tracker ([code](https://github.com/Kuhrt/portfolio-board-game-tracker)) _WIP_
   - .NET API
   - Vite/Vue Web App
   - MSSql DB

## Clients

- [The Kid's Clinic](https://thekids.clinic)
   - Design
   - Hosting

# Kuhrt.Codes

## Overview

This project is my personal website and is part of my portfolio demonstrating my front-end capabilities as a web developer. It represents my approach to project structure, modern React understanding, TypeScript and showcases my ability to use animations tastefully, create advanced interactions, and maintain performance.

## Live Demo

🔗 **[View Live Project](https://kuhrt.codes)**

## Skills Demonstrated

This project showcases the following technical skills and concepts:

- **TypeScript**: Ability to use TypeScript properly with and without libraries
- **React**: Advanced React understanding. Performance optimization, state management (context and stores), advanced hooks, etc.
- **Custom UI**: Using my own components with no UI library for this one, showing how I handle this
- **Animations**: Use CSS, GSAP, and Three.js to show simple to extremely advanced interactions
- **Testing**: Demonstrates handling multiple types of tests spanning unit, integration, component, and E2E
- **DevOps**: Using GitHub Actions for CI/CD and Docker for full deployment

## Technology Stack

### Core Technologies

- **Next.js**: For React projects, Next.js is my favorite choice. There are a lot of haters online, so below I've listed why I like it and address most concerns I see about it.
  - It's very opinionated. I tend to work with all levels of developers from all around the globe. Its opinionated approach makes patterns and documentation easy to find/follow and are readily available.
  - Use what you need and ignore the rest. If I create a React Router project or pure React project, I always end up building what Next has out of the box. People argue that Next is bloated, but you don't have to use what you don't want to. It can be light as a feather, this project being an example of that.
  - It's the standard, even across Vue and Angular projects. When React comes out with a new feature, Next has it implemented first. Its patterns and features are also followed closely and copied by frameworks like Nuxt and Angular.
  - With the introduction of Turbopack, development is no longer slow or lags with hot-reloading. I'll admit, Vite still probably has it beat, but it's hardly noticeable.
  - It can be deployed anywhere. No, you're not stuck with Vercel. I've deployed Next.js projects to containers (Docker, Kubernetes, and more), stand-alone servers, in .NET projects, AWS, Azure, and yes, Vercel. For example, this project is deployed to a Digital Ocean droplet running multiple Docker images and serving this site.
  - It is not just for SSR and SEO. I see this a lot for some reason being an argument against using Next. Yes, it has these features out of the box, but you don't have to use either. Also, this should not be the only reasons you're choosing a stack for a web application or site.
  - I don't hate other libraries/frameworks/approaches at all. I prototype all the time with Vite, React Router, and even Astro. These and more are all great solutions, however, I'm wanting to show my go to for enterprise solutions
- **Three.js**: I've made several sites using Three.js and I wanted to use WebGL to show this skill off. It's a flat out amazing way to create stunning 3D environments.
- **GSAP**: Showing the use of creating my own simple and intermediate interactions. GSAP is a leader for animations.
- **TailwindCSS**: I did use Tailwind in this project. I really like its flexibility when working with components.
- **Zustand**: For seamless state management. Much cleaner and easier to use than Redux.
- **Jest**: Classic for unit/integration tests
- **Cypress**: I like Cypress over Playwright as just a personal preference. Excellent component and E2E testing

### Deployment

- **Digital Ocean**: A single droplet running containers via Docker Compose
- **Docker**: Needed a container solution so my droplet can host multiple projects
- **Nginx**: Control traffic to different containers
- **Cloudflare**: My favorite DNS, CDN, and everything else you can think of
- **GitHub Actions**: Workflow for a seamless CI/CD process

## Local Development Setup

### Prerequisites

Before running this project locally, ensure you have the following installed:

- **NPM**: [Download](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  - Package manager
  - Latest version recommended

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/kuhrt/kuhrt.codes.git
   cd kuhrt.codes
   ```

2. **Install dependencies**

   ```bash
   npm i
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**

   Open your browser and navigate to: `http://localhost:3000`

### Available Scripts

- `npm run build`: Builds the project for production
- `npm run lint`: Lints the project and fixes any errors it can
- `npm run test:all`: Runs unit, integration, component and E2E tests
- `npm run test:unit|component|e2e`: Runs specific tests (_Only choose one_)
- `npm run cy:open`: Open up Cypress tests in a browser

---

## Repository Information

- **Status**: In Development
- **Type**: Personal Website
- **Contributions**: This repository does not accept contributions as it's designed to showcase individual technical skills

---
