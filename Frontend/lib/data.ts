export interface Feature {
  icon: string
  title: string
  desc: string
}
// Centralized data definitions for features and stats used across the frontend
export interface Stat {
  label: string
  numeric: number
  format: (n: number) => string
}

export const features: Feature[] = [
  {
    icon: '🏗️',
    title: 'Architecture-Aware Code Generation',
    desc: 'Intelligent project scaffolding and code generation powered by Machine Learning and LLMs. Automatically analyzes existing project structures (Layered, MVC, Clean) and uses Dynamic Prompt Construction to inject live project constraints for structurally valid code.',
  },
  {
    icon: '🔍',
    title: 'RAG-Based Runtime Error Analysis',
    desc: 'AI-powered debugging assistance without leaving the IDE. Uses Cosine Similarity Search on a vector database to retrieve semantically relevant documentation and fixes, achieving >75% precision and >90% fix accuracy.',
  },
  {
    icon: '🎯',
    title: 'AI-Driven Code Quality Assurance',
    desc: 'Structural health and anti-pattern detection using a Dual-Engine AI Architecture. Employs an Anti-Pattern Classifier and Quality Score Regression model (0–100) to detect business logic placement issues and tight coupling.',
  },
  {
    icon: '🚀',
    title: 'Intelligent CI/CD & Infrastructure Assistant',
    desc: 'Secure DevOps artifact generation powered by Claude, MCP, and multi-layer validation. Automatically generates Dockerfiles, Docker Compose, and GitHub Actions with line-by-line AI explanations for DevSecOps education.',
  },
]

export const stats: Stat[] = [
  { label: 'AI Components', numeric: 4,   format: (n) => String(n) },
  { label: 'Fix Accuracy',  numeric: 90,  format: (n) => `>${n}%` },
  { label: 'Time Saved',    numeric: 50,  format: (n) => `≥${n}%` },
  { label: 'IDE Native',    numeric: 100, format: (n) => `${n}%` },
]
