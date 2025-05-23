// src/types/dtos.ts

export interface Stagiaire {
  id?: number;
  nom: string;
  prenom: string;
  email?: string;
  institution?: string;
  periodeIds?: number[];
}

export interface Tutor {
  id?: number;
  nom: string;
  prenom: string;
  email?: string;
  entreprise: string;
}

export interface Periode {
  id?: number;
  datedebut: string; // ISO string format for dates in JSON
  datefin: string;
  stagiaireId?: number;
  stagiaireName?: string;
  stageId?: number;
  stageEntreprise?: string;
}

export interface Stage {
  id?: number;
  description: string;
  objectif: string;
  entreprise: string;
  periodeIds?: number[];
}

export interface Evaluation {
  id?: number;
  category: string;
  value: string;
  appreciationId?: number;
}

export interface Category {
  id?: number;
  intitule: string;
  value: string;
  competenceId: number;
}

export interface Competence {
  id?: number;
  intitule: string;
  note: number;
  appreciationId?: number;
}

export interface Appreciation {
  id?: number;
  tutorId: number;
  tutorName?: string;
  periodeId: number;
  evaluationIds?: number[];
  competenceIds?: number[];
}

// Define form state types
export type PersonalInfo = {
  studentName: string;
  companyName: string;
  tutorName: string;
  startDate: string;
  endDate: string;
  stagiaireId: number;
  tutorId: number;
  stageId: number;
};

export type ProjectDetails = {
  projectTheme: string;
  objectives: string;
};

export type PerformanceEvaluation = {
  implication: string;
  openness: string;
  quality: string;
  observations: string;
};

export type CompetencyEvaluation = {
  individualCompetencies: Record<number, string>;
  individualNote: string;
  companyCompetencies: Record<number, string>;
  companyNote: string;
};

export type SpecificCompetencies = {
  technicalCompetencies: Record<number, string>;
  technicalNote: string;
  specificCompetencies: Array<{
    competency: string;
    evaluation: string;
  }>;
};

export type FormData = {
  personalInfo: PersonalInfo;
  projectDetails: ProjectDetails;
  performanceEvaluation: PerformanceEvaluation;
  competencyEvaluation: CompetencyEvaluation;
  specificCompetencies: SpecificCompetencies;
};

// Define validation error types
export type ValidationErrors = {
  personalInfo?: {
    studentName?: string;
    companyName?: string;
    tutorName?: string;
    startDate?: string;
    endDate?: string;
  };
  projectDetails?: {
    projectTheme?: string;
    objectives?: string;
  };
  performanceEvaluation?: {
    implication?: string;
    openness?: string;
    quality?: string;
    observations?: string;
  };
  competencyEvaluation?: {
    individualCompetencies?: Record<number, string>;
    individualNote?: string;
    companyCompetencies?: Record<number, string>;
    companyNote?: string;
  };
  specificCompetencies?: {
    technicalCompetencies?: Record<number, string>;
    technicalNote?: string;
  };
};
