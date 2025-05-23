// API service functions for Stagiaire, Tutor, and Stage entities

import { Stagiaire, Tutor, Stage, Periode } from "../../type";
import { apiInstance } from "../axios/axios.api";

// Base API URL - already configured in axios instance

// Stagiaire API functions
export const fetchStagiaires = async (): Promise<Stagiaire[]> => {
  try {
    const response = await apiInstance.get('/api/stagiaire/');
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching stagiaires: ${error.message}`);
  }
};

export const createStagiaire = async (stagiaire: Stagiaire): Promise<Stagiaire> => {
  try {
    const response = await apiInstance.post('/api/stagiaire/', stagiaire);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating stagiaire: ${error.message}`);
  }
};

export const updateStagiaire = async (id: number, stagiaire: Stagiaire): Promise<Stagiaire> => {
  try {
    const response = await apiInstance.put(`/api/stagiaire/${id}`, stagiaire);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating stagiaire: ${error.message}`);
  }
};

export const deleteStagiaire = async (id: number): Promise<void> => {
  try {
    await apiInstance.delete(`/api/stagiaire/${id}`);
  } catch (error: any) {
    throw new Error(`Error deleting stagiaire: ${error.message}`);
  }
};

// Tutor API functions
export const fetchTutors = async (): Promise<Tutor[]> => {
  try {
    const response = await apiInstance.get('/api/tutor/');
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching tutors: ${error.message}`);
  }
};

export const createTutor = async (tutor: Tutor): Promise<Tutor> => {
  try {
    const response = await apiInstance.post('/api/tutor/', tutor);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating tutor: ${error.message}`);
  }
};

export const updateTutor = async (id: number, tutor: Tutor): Promise<Tutor> => {
  try {
    const response = await apiInstance.put(`/api/tutor/${id}`, tutor);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating tutor: ${error.message}`);
  }
};

export const deleteTutor = async (id: number): Promise<void> => {
  try {
    await apiInstance.delete(`/api/tutor/${id}`);
  } catch (error: any) {
    throw new Error(`Error deleting tutor: ${error.message}`);
  }
};

// Stage API functions
export const fetchStages = async (): Promise<Stage[]> => {
  try {
    const response = await apiInstance.get('/api/stage/');
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching stages: ${error.message}`);
  }
};

export const createStage = async (stage: Stage): Promise<Stage> => {
  try {
    const response = await apiInstance.post('/api/stage/', stage);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating stage: ${error.message}`);
  }
};

export const updateStage = async (id: number, stage: Stage): Promise<Stage> => {
  try {
    const response = await apiInstance.put(`/api/stage/${id}`, stage);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error updating stage: ${error.message}`);
  }
};

export const deleteStage = async (id: number): Promise<void> => {
  try {
    await apiInstance.delete(`/api/stage/${id}`);
  } catch (error: any) {
    throw new Error(`Error deleting stage: ${error.message}`);
  }
};

// Periode API functions
export const createPeriode = async (periode: Periode): Promise<Periode> => {
  try {
    const response = await apiInstance.post('/api/periode/', periode);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating periode: ${error.message}`);
  }
};

// Function to create a new evaluation with selected entities
export const createEvaluationWithEntities = async (
  stagiaireId: number,
  tutorId: number,
  stageId: number,
  startDate: string,
  endDate: string
): Promise<Periode> => {
  // First create a periode linking the stagiaire and stage
  const periode: Periode = {
    datedebut: startDate,
    datefin: endDate,
    stagiaireId,
    stageId,
  };
  
  // Create the periode
  const createdPeriode = await createPeriode(periode);
  
  return createdPeriode;
};
