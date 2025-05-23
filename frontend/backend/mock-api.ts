// Mock API implementation for testing the frontend without a backend

import { Stagiaire, Tutor, Stage, Periode } from "../type";

// Mock data storage
let stagiaires: Stagiaire[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    institution: "Université de Paris"
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.com",
    institution: "École Polytechnique"
  }
];

let tutors: Tutor[] = [
  {
    id: 1,
    nom: "Lefevre",
    prenom: "Michel",
    email: "michel.lefevre@example.com",
    entreprise: "Tech Solutions"
  },
  {
    id: 2,
    nom: "Bernard",
    prenom: "Claire",
    email: "claire.bernard@example.com",
    entreprise: "Innovate Inc."
  }
];

let stages: Stage[] = [
  {
    id: 1,
    description: "Développement d'une application web",
    objectif: "Créer une application web responsive avec React",
    entreprise: "Tech Solutions"
  },
  {
    id: 2,
    description: "Analyse de données marketing",
    objectif: "Analyser les données marketing pour améliorer les campagnes",
    entreprise: "Innovate Inc."
  }
];

let periodes: Periode[] = [
  {
    id: 1,
    datedebut: "2025-06-01",
    datefin: "2025-08-31",
    stagiaireId: 1,
    stageId: 1
  },
  {
    id: 2,
    datedebut: "2025-07-01",
    datefin: "2025-09-30",
    stagiaireId: 2,
    stageId: 2
  }
];

// Helper function to generate IDs
const generateId = (items: any[]): number => {
  return items.length > 0 ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
};

// Mock API functions for Stagiaire
export const mockFetchStagiaires = async (): Promise<Stagiaire[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...stagiaires]), 300);
  });
};

export const mockCreateStagiaire = async (stagiaire: Stagiaire): Promise<Stagiaire> => {
  return new Promise((resolve) => {
    const newStagiaire = { ...stagiaire, id: generateId(stagiaires) };
    stagiaires.push(newStagiaire);
    setTimeout(() => resolve(newStagiaire), 300);
  });
};

export const mockUpdateStagiaire = async (id: number, stagiaire: Stagiaire): Promise<Stagiaire> => {
  return new Promise((resolve, reject) => {
    const index = stagiaires.findIndex(s => s.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Stagiaire not found")), 300);
      return;
    }
    
    const updatedStagiaire = { ...stagiaire, id };
    stagiaires[index] = updatedStagiaire;
    setTimeout(() => resolve(updatedStagiaire), 300);
  });
};

export const mockDeleteStagiaire = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = stagiaires.findIndex(s => s.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Stagiaire not found")), 300);
      return;
    }
    
    stagiaires = stagiaires.filter(s => s.id !== id);
    setTimeout(() => resolve(), 300);
  });
};

// Mock API functions for Tutor
export const mockFetchTutors = async (): Promise<Tutor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...tutors]), 300);
  });
};

export const mockCreateTutor = async (tutor: Tutor): Promise<Tutor> => {
  return new Promise((resolve) => {
    const newTutor = { ...tutor, id: generateId(tutors) };
    tutors.push(newTutor);
    setTimeout(() => resolve(newTutor), 300);
  });
};

export const mockUpdateTutor = async (id: number, tutor: Tutor): Promise<Tutor> => {
  return new Promise((resolve, reject) => {
    const index = tutors.findIndex(t => t.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Tutor not found")), 300);
      return;
    }
    
    const updatedTutor = { ...tutor, id };
    tutors[index] = updatedTutor;
    setTimeout(() => resolve(updatedTutor), 300);
  });
};

export const mockDeleteTutor = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = tutors.findIndex(t => t.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Tutor not found")), 300);
      return;
    }
    
    tutors = tutors.filter(t => t.id !== id);
    setTimeout(() => resolve(), 300);
  });
};

// Mock API functions for Stage
export const mockFetchStages = async (): Promise<Stage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...stages]), 300);
  });
};

export const mockCreateStage = async (stage: Stage): Promise<Stage> => {
  return new Promise((resolve) => {
    const newStage = { ...stage, id: generateId(stages) };
    stages.push(newStage);
    setTimeout(() => resolve(newStage), 300);
  });
};

export const mockUpdateStage = async (id: number, stage: Stage): Promise<Stage> => {
  return new Promise((resolve, reject) => {
    const index = stages.findIndex(s => s.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Stage not found")), 300);
      return;
    }
    
    const updatedStage = { ...stage, id };
    stages[index] = updatedStage;
    setTimeout(() => resolve(updatedStage), 300);
  });
};

export const mockDeleteStage = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = stages.findIndex(s => s.id === id);
    if (index === -1) {
      setTimeout(() => reject(new Error("Stage not found")), 300);
      return;
    }
    
    stages = stages.filter(s => s.id !== id);
    setTimeout(() => resolve(), 300);
  });
};

// Mock API functions for Periode
export const mockCreatePeriode = async (periode: Periode): Promise<Periode> => {
  return new Promise((resolve) => {
    const newPeriode = { ...periode, id: generateId(periodes) };
    periodes.push(newPeriode);
    setTimeout(() => resolve(newPeriode), 300);
  });
};

// Function to create a new evaluation with selected entities
export const mockCreateEvaluationWithEntities = async (
  stagiaireId: number,
  tutorId: number,
  stageId: number,
  startDate: string,
  endDate: string
): Promise<Periode> => {
  // Create a periode linking the stagiaire and stage
  const periode: Periode = {
    datedebut: startDate,
    datefin: endDate,
    stagiaireId,
    stageId
  };
  
  // Create the periode
  const createdPeriode = await mockCreatePeriode(periode);
  
  return createdPeriode;
};
