export const initialJobs = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    salary: "$130k - $160k",
    description: "We are looking for a Senior Frontend Engineer to lead the development of our core web platforms, craft premium user experiences, and establish frontend standards.",
    requirements: ["React", "JavaScript", "HTML5", "CSS3", "State Management (Redux/Zustand)", "Responsive Design"],
    preferred: ["TypeScript", "Vite", "Web Performance Optimization", "CSS Modules", "CI/CD Setup"],
    status: "Active"
  },
  {
    id: "job-2",
    title: "AI Research Scientist",
    department: "AI & Insights",
    location: "Hybrid (San Francisco)",
    salary: "$160k - $210k",
    description: "Join our core AI team to design, fine-tune, and deploy large language models and NLP pipelines for resume intelligence, automatic mapping, and screening recommendations.",
    requirements: ["Python", "PyTorch/TensorFlow", "NLP", "Machine Learning", "Transformers", "SQL"],
    preferred: ["Ph.D. in AI/CS", "FastAPI", "Vector Databases (Pinecone/Milvus)", "Docker"],
    status: "Active"
  },
  {
    id: "job-3",
    title: "Product Manager - Tech",
    department: "Product Management",
    location: "New York, NY",
    salary: "$120k - $150k",
    description: "Seeking a Technical Product Manager to own our developer experience products, defining the roadmap, coordinating with engineering, and driving customer adoption.",
    requirements: ["Product Roadmap", "Agile/Scrum", "API Design Concepts", "Data Analytics", "User Research"],
    preferred: ["Technical background (CS degree/coding experience)", "SaaS Product experience", "A/B Testing"],
    status: "Active"
  }
];

export const initialCandidates = [
  {
    id: "cand-1",
    name: "Alex Rivera",
    email: "alex.rivera@devmail.net",
    phone: "+1 (555) 234-5678",
    title: "Lead React Developer",
    experience: "7 years",
    skills: ["React", "JavaScript", "CSS3", "HTML5", "TypeScript", "Redux", "Vite", "Responsive Design", "Git"],
    education: "B.S. Computer Science - UT Austin",
    summary: "Experienced React Developer specializing in design systems, performance tuning, and creating fluid, interactive user interfaces. Passionate about clean code and CSS architecture.",
    workHistory: [
      {
        role: "Lead Frontend Engineer",
        company: "PixelPerfect Solutions",
        duration: "2023 - Present",
        details: "Directed frontend engineering for high-traffic SaaS dashboard. Improved page-speed scores by 35% through dynamic code-splitting and asset pipeline optimization. Established a UI system used across 3 departments."
      },
      {
        role: "Senior React Developer",
        company: "AppLaunch Inc",
        duration: "2020 - 2023",
        details: "Built responsive dashboards and complex search panels. Mentored junior devs and enforced code quality through automated styling and testing lint rules."
      }
    ],
    stage: "Interviewing",
    matchScores: {
      "job-1": 95,
      "job-2": 25,
      "job-3": 60
    },
    recruiterNotes: "Alex showed excellent knowledge of CSS layouts (Flexbox, Grid) and React optimization hooks during screen. Strong communication skills.",
    aiFitAnalysis: {
      strengths: [
        "Perfect core frontend technology match (React, JS, HTML5, CSS3)",
        "Includes preferred experience in TypeScript and Vite",
        "Proven history of improving web performance metrics"
      ],
      weaknesses: [
        "Lacks backend integration details in resume",
        "Limited cloud-deployment experience listed"
      ],
      screeningQuestions: [
        "Explain how you would optimize a React component rendering a large list of dynamic cards.",
        "How do you configure Vite for production build chunk-splitting?",
        "Describe your process for building highly accessible (WCAG compliant) custom modals."
      ]
    }
  },
  {
    id: "cand-2",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@ai-academy.org",
    phone: "+1 (555) 876-5432",
    title: "Senior AI Researcher",
    experience: "5 years",
    skills: ["Python", "PyTorch", "NLP", "Machine Learning", "Transformers", "SQL", "Docker", "FastAPI", "Git"],
    education: "Ph.D. in Deep Learning - MIT",
    summary: "AI Researcher with a focus on natural language processing, LLM fine-tuning, and embedding models. Published in top ML conferences (NeurIPS, ACL).",
    workHistory: [
      {
        role: "AI Scientist",
        company: "NeuralLabs",
        duration: "2021 - Present",
        details: "Led the development of a custom BERT model for semantic text classification, boosting matching accuracy by 18%. Deployed model serving endpoints using FastAPI."
      },
      {
        role: "Research Fellow",
        company: "MIT CSAIL",
        duration: "2019 - 2021",
        details: "Conducted research on Transformer attention mechanisms and memory footprint reduction."
      }
    ],
    stage: "Screening",
    matchScores: {
      "job-1": 30,
      "job-2": 98,
      "job-3": 55
    },
    recruiterNotes: "Ph.D. credential from MIT is stellar. Technically elite. Need to assess interest in business application vs. pure academic research.",
    aiFitAnalysis: {
      strengths: [
        "Exceptional match for AI role requirements (Python, NLP, PyTorch, SQL)",
        "Academic publication history in top ML conferences",
        "Preferred skills in FastAPI and Docker are present"
      ],
      weaknesses: [
        "High salary expectation indicator",
        "Minimal experience with commercial project management cycles"
      ],
      screeningQuestions: [
        "How do you handle domain adaptation for resume parsing tasks where layouts vary?",
        "Explain the tradeoff between parameter-efficient fine-tuning (PEFT) and full training of LLMs.",
        "How do you containerize and monitor a FastAPI service serving an NLP model?"
      ]
    }
  },
  {
    id: "cand-3",
    name: "Marcus Chen",
    email: "marcus.chen@productfocus.com",
    phone: "+1 (555) 432-1098",
    title: "Technical Product Manager",
    experience: "6 years",
    skills: ["Product Roadmap", "Agile/Scrum", "API Design Concepts", "Data Analytics", "User Research", "SQL", "JavaScript"],
    education: "M.B.A. - Wharton; B.S. Electrical Eng - Stanford",
    summary: "Technical PM bridging the gap between product design and engineering execution. Background in software engineering helps me align developer priorities with user needs.",
    workHistory: [
      {
        role: "Product Manager",
        company: "SaaSify Corp",
        duration: "2022 - Present",
        details: "Launched 4 major features for our API integration product line. Wrote product specifications and coordinated 3 Scrum teams. Raised NPS score from 30 to 45."
      },
      {
        role: "Software Engineer",
        company: "SaaSify Corp",
        duration: "2020 - 2022",
        details: "Full stack developer implementing user telemetry dashboards using JavaScript and Node.js."
      }
    ],
    stage: "Applied",
    matchScores: {
      "job-1": 50,
      "job-2": 40,
      "job-3": 92
    },
    recruiterNotes: "Great combination of MBA plus technical engineering background. Very communicative. Strong candidate.",
    aiFitAnalysis: {
      strengths: [
        "Strong fit for technical product manager role",
        "Dual business and engineering background",
        "Experienced in Agile frameworks and API product delivery"
      ],
      weaknesses: [
        "No prior experience managing high-growth platform products directly",
        "Lacks formal A/B testing framework certifications"
      ],
      screeningQuestions: [
        "How do you prioritize developers' tech-debt tickets against product-feature requests?",
        "Describe a product launch that failed, what you learned, and how you recovered.",
        "How do you define success metrics for an internal developer platform or API tool?"
      ]
    }
  },
  {
    id: "cand-4",
    name: "Julia Vance",
    email: "julia.vance@frontendweb.org",
    phone: "+1 (555) 901-2345",
    title: "Senior UI Engineer",
    experience: "5 years",
    skills: ["React", "JavaScript", "CSS3", "HTML5", "Responsive Design", "Zustand", "Sass", "Web Accessibility", "Git"],
    education: "B.A. Interactive Media - NYU",
    summary: "Creative UI Engineer with an eye for typography, layout spacing, and animation detail. Dedicated to delivering pixel-perfect, accessible digital interfaces.",
    workHistory: [
      {
        role: "Senior UI Developer",
        company: "DesignFlow Studio",
        duration: "2021 - Present",
        details: "Implemented modern web apps utilizing advanced animations. Reduced user friction points leading to a 22% increase in signup conversion. Conducted accessibility audits."
      }
    ],
    stage: "Applied",
    matchScores: {
      "job-1": 88,
      "job-2": 15,
      "job-3": 50
    },
    recruiterNotes: "Exceptional UI design sense. Portfolio is highly animated and interactive. Less heavy architecture focus but great styling.",
    aiFitAnalysis: {
      strengths: [
        "Strong React and CSS foundation",
        "Passionate about design details and accessibility (WCAG)",
        "Experienced in modern state management (Zustand)"
      ],
      weaknesses: [
        "No TypeScript listed in resume",
        "Limited infrastructure/build tool configurations (Webpack, Vite)"
      ],
      screeningQuestions: [
        "How do you handle CSS animation performance to prevent layout thrashing?",
        "What are your strategies for writing CSS that scales across a multi-brand project?",
        "Explain screen reader testing and how you make custom components fully accessible."
      ]
    }
  }
];

export const initialInterviews = [
  {
    id: "int-1",
    candidateId: "cand-1",
    jobId: "job-1",
    interviewer: "David Lee (Engineering Manager)",
    date: "2026-07-10",
    time: "14:00",
    type: "Technical Panel",
    status: "Scheduled"
  },
  {
    id: "int-2",
    candidateId: "cand-2",
    jobId: "job-2",
    interviewer: "Dr. Sarah Chen (Chief AI Architect)",
    date: "2026-07-12",
    time: "10:30",
    type: "System Design & NLP",
    status: "Scheduled"
  }
];

export const initialResumeTemplates = [
  {
    fileName: "John_Doe_React_Resume.pdf",
    candidate: {
      name: "John Doe",
      email: "john.doe@techmail.com",
      phone: "+1 (555) 789-0123",
      title: "Senior React Engineer",
      experience: "8 years",
      skills: ["React", "JavaScript", "HTML5", "CSS3", "TypeScript", "Redux", "Vite", "Web Performance Optimization", "CSS Modules", "Git"],
      education: "B.S. Software Engineering - UC Berkeley",
      summary: "Senior developer focused on React infrastructure, component libraries, and build tools. Passionate about modern workflows and performance optimization.",
      workHistory: [
        {
          role: "Staff Engineer",
          company: "SpeedyWeb",
          duration: "2023 - Present",
          details: "Created full custom build configuration and bundler pipeline. Mentored 8 engineers. Decreased bundle sizes by 50% across 3 large-scale React apps."
        }
      ],
      stage: "Applied",
      matchScores: {
        "job-1": 97,
        "job-2": 20,
        "job-3": 65
      },
      recruiterNotes: "Perfect technical fit for job-1. Heavy infrastructure background, great with Webpack/Vite.",
      aiFitAnalysis: {
        strengths: ["Excellent React matching score", "Vite and TypeScript skills are prominent", "Senior lead experience"],
        weaknesses: ["Less product-oriented developer, more technical platform focused"],
        screeningQuestions: ["Explain your strategies for code-splitting a multi-route React application.", "How do you enforce styling guidelines in shared teams?"]
      }
    }
  },
  {
    fileName: "Samantha_Miller_ML_CV.docx",
    candidate: {
      name: "Samantha Miller",
      email: "sam.miller@dataline.io",
      phone: "+1 (555) 345-6789",
      title: "Machine Learning Engineer",
      experience: "4 years",
      skills: ["Python", "PyTorch", "NLP", "Machine Learning", "Transformers", "SQL", "FastAPI", "Docker", "Git"],
      education: "M.S. Artificial Intelligence - Carnegie Mellon",
      summary: "Data scientist and engineer specializing in transformers, classification systems, and production model serving.",
      workHistory: [
        {
          role: "ML Engineer",
          company: "InsightAI",
          duration: "2022 - Present",
          details: "Deployed BERT and GPT screening classifiers. Configured CI/CD for model deployment using Docker and Kubernetes."
        }
      ],
      stage: "Applied",
      matchScores: {
        "job-1": 20,
        "job-2": 93,
        "job-3": 45
      },
      recruiterNotes: "Strong candidate for the AI Scientist role. Has solid industry experience deploying models rather than just research.",
      aiFitAnalysis: {
        strengths: ["Strong deployment experience (Docker/Kubernetes)", "PyTorch and FastAPI matching requirements"],
        weaknesses: ["Fewer years of deep-learning theoretical research compared to Elena"],
        screeningQuestions: ["How do you optimize Transformer models for production latency?", "Describe a production failure when model data drifted, and how you handled it."]
      }
    }
  }
];
