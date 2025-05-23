import {
  Category,
  Evaluation,
  Periode,
  Stage,
  Stagiaire,
  Tutor,
  FormData,
  Competence,
  Appreciation,
} from "@/type";
import { apiInstance } from "../axios/axios.api";

export const createStagiaire = async (stagiaireData: Stagiaire) => {
  try {
    const response = await apiInstance.post("/api/stagiaire/", stagiaireData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTutor = async (tutorData: Tutor) => {
  try {
    const response = await apiInstance.post("/api/tutor/", tutorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPeriode = async (periodeData: Periode) => {
  try {
    const response = await apiInstance.post("/api/periode/", periodeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStage = async (stageData: Stage) => {
  try {
    const response = await apiInstance.post("/api/stage/", stageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvaluations = async (evaluationsData: Evaluation[]) => {
  try {
    const response = await apiInstance.post(
      "/api/evaluation/",
      evaluationsData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch all evaluations with related data
export const fetchEvaluations = async (): Promise<any[]> => {
  try {
    console.log('Fetching all evaluations');
    const response = await apiInstance.get('/api/appreciation/');
    const appreciations = response.data;
    console.log('Fetched appreciations:', appreciations);
    
    // Fetch related data for each appreciation
    const enhancedEvaluations = await Promise.all(appreciations.map(async (appreciation: any) => {
      try {
        let periode = null;
        let stagiaire = null;
        let tutor = null;
        let stage = null;
        
        // Get the periode if periodeId exists
        if (appreciation.periodeId) {
          try {
            const periodeResponse = await apiInstance.get(`/api/periode/${appreciation.periodeId}`);
            periode = periodeResponse.data;
            
            // Get the stagiaire if stagiaireId exists
            if (periode.stagiaireId) {
              try {
                const stagiaireResponse = await apiInstance.get(`/api/stagiaire/${periode.stagiaireId}`);
                stagiaire = stagiaireResponse.data;
              } catch (stagiaireError) {
                console.warn(`Could not fetch stagiaire with ID ${periode.stagiaireId}:`, stagiaireError);
              }
            }
            
            // Get the stage if stageId exists
            if (periode.stageId) {
              try {
                const stageResponse = await apiInstance.get(`/api/stage/${periode.stageId}`);
                stage = stageResponse.data;
              } catch (stageError) {
                console.warn(`Could not fetch stage with ID ${periode.stageId}:`, stageError);
              }
            }
          } catch (periodeError) {
            console.warn(`Could not fetch periode with ID ${appreciation.periodeId}:`, periodeError);
          }
        }
        
        // Get the tutor if tutorId exists
        if (appreciation.tutorId) {
          try {
            const tutorResponse = await apiInstance.get(`/api/tutor/${appreciation.tutorId}`);
            tutor = tutorResponse.data;
          } catch (tutorError) {
            console.warn(`Could not fetch tutor with ID ${appreciation.tutorId}:`, tutorError);
          }
        }
        
        return {
          ...appreciation,
          periode,
          stagiaire,
          tutor,
          stage
        };
      } catch (error) {
        console.warn(`Error enhancing appreciation ${appreciation.id}:`, error);
        return appreciation;
      }
    }));
    
    console.log('Enhanced evaluations with related data:', enhancedEvaluations);
    return enhancedEvaluations;
  } catch (error: any) {
    console.error("Error fetching evaluations:", error);
    throw new Error(`Error fetching evaluations: ${error.message}`);
  }
};

// Function to fetch a single evaluation by ID with all related data
export const fetchEvaluationById = async (id: number): Promise<any> => {
  try {
    console.log(`Fetching evaluation with ID: ${id}`);
    
    // Get the appreciation
    try {
      const appreciationResponse = await apiInstance.get(`/api/appreciation/${id}`);
      const appreciation = appreciationResponse.data;
      console.log('Appreciation data:', appreciation);
      
      let periode = null;
      let stagiaire = null;
      let tutor = null;
      let stage = null;
      let evaluations = [];
      let competences = [];
      let categories = [];
      
      // Get the periode if periodeId exists
      if (appreciation.periodeId) {
        try {
          console.log(`Fetching periode with ID: ${appreciation.periodeId}`);
          const periodeResponse = await apiInstance.get(`/api/periode/${appreciation.periodeId}`);
          periode = periodeResponse.data;
          console.log('Periode data:', periode);
          
          // Get the stagiaire if stagiaireId exists
          if (periode.stagiaireId) {
            try {
              console.log(`Fetching stagiaire with ID: ${periode.stagiaireId}`);
              const stagiaireResponse = await apiInstance.get(`/api/stagiaire/${periode.stagiaireId}`);
              stagiaire = stagiaireResponse.data;
              console.log('Stagiaire data:', stagiaire);
            } catch (stagiaireError) {
              console.warn(`Could not fetch stagiaire with ID ${periode.stagiaireId}:`, stagiaireError);
            }
          } else {
            console.log('No stagiaireId found in periode data');
          }
          
          // Get the stage if stageId exists
          if (periode.stageId) {
            try {
              console.log(`Fetching stage with ID: ${periode.stageId}`);
              const stageResponse = await apiInstance.get(`/api/stage/${periode.stageId}`);
              stage = stageResponse.data;
              console.log('Stage data:', stage);
            } catch (stageError) {
              console.warn(`Could not fetch stage with ID ${periode.stageId}:`, stageError);
            }
          } else {
            console.log('No stageId found in periode data');
          }
        } catch (periodeError) {
          console.warn(`Could not fetch periode with ID ${appreciation.periodeId}:`, periodeError);
        }
      } else {
        console.log('No periodeId found in appreciation data');
      }
      
      // Get the tutor if tutorId exists
      if (appreciation.tutorId) {
        try {
          console.log(`Fetching tutor with ID: ${appreciation.tutorId}`);
          const tutorResponse = await apiInstance.get(`/api/tutor/${appreciation.tutorId}`);
          tutor = tutorResponse.data;
          console.log('Tutor data:', tutor);
        } catch (tutorError) {
          console.warn(`Could not fetch tutor with ID ${appreciation.tutorId}:`, tutorError);
        }
      } else {
        console.log('No tutorId found in appreciation data');
      }
      
      // Get evaluations
      try {
        console.log(`Fetching evaluations for appreciation ID: ${id}`);
        const evaluationsResponse = await apiInstance.get(`/api/evaluation/appreciation/${id}`);
        evaluations = evaluationsResponse.data || [];
        console.log('Evaluations data:', evaluations);
        
        // Map evaluations to the expected format if needed
        evaluations = evaluations.map((evaluation: any) => ({
          ...evaluation,
          // Ensure these fields exist for the UI
          category: evaluation.category || evaluation.criteria || 'unknown',
          value: evaluation.value || evaluation.rating || '3'
        }));
      } catch (evaluationsError) {
        console.warn(`Could not fetch evaluations for appreciation ID ${id}:`, evaluationsError);
      }
      
      // Get competences
      try {
        console.log(`Fetching competences for appreciation ID: ${id}`);
        try {
          const competencesResponse = await apiInstance.get(`/api/competence/appreciation/${id}`);
          competences = competencesResponse.data || [];
          console.log('Competences data:', competences);
        } catch (competencesError) {
          console.warn(`Could not fetch competences for appreciation ID ${id}, this might be normal if no competences exist yet:`, competencesError);
          competences = [];
        }
        
        // Fetch categories for each competence
        if (competences && competences.length > 0) {
          try {
            // Get all categories for all competences
            const categoriesPromises = competences.map(async (competence: any) => {
              try {
                console.log(`Fetching categories for competence ID: ${competence.id}`);
                const categoriesResponse = await apiInstance.get(`/api/category/competence/${competence.id}`);
                return categoriesResponse.data || [];
              } catch (error) {
                console.warn(`Could not fetch categories for competence ID ${competence.id}:`, error);
                return [];
              }
            });
            
            const categoriesResults = await Promise.all(categoriesPromises);
            categories = categoriesResults.flat();
            console.log('All categories data:', categories);
            
            // Enhance competences with their categories
            competences = competences.map((competence: any) => {
              const competenceCategories = categories.filter(
                (category: any) => category.competenceId === competence.id
              );
              return {
                ...competence,
                categories: competenceCategories,
                // Add flags to identify special competences
                isNote: competence.intitule === 'individual',
                isCompanyNote: competence.intitule === 'company',
                isTechnicalNote: competence.intitule === 'specific'
              };
            });
            
            // Add categories as standalone competences for the UI
            const enhancedCompetences = [...competences];
            categories.forEach((category: any) => {
              // Find the parent competence to determine the type
              const parentCompetence = competences.find((c: any) => c.id === category.competenceId);
              
              // Map the value to a proper level (NA, DEBUTANT, AUTONOME, AUTONOME +)
              let level = 'NA';
              if (category.value) {
                const valueStr = String(category.value).toUpperCase();
                
                // Convert numeric values to levels if needed
                if (valueStr === '1') {
                  level = 'DEBUTANT';
                } else if (valueStr === '2') {
                  level = 'AUTONOME';
                } else if (valueStr === '3') {
                  level = 'AUTONOME +';
                } else {
                  // Handle various string formats
                  if (valueStr === 'NA' || valueStr === 'N/A') {
                    level = 'NA';
                  } else if (valueStr === 'DEBUTANT' || valueStr.includes('DEBUT')) {
                    level = 'DEBUTANT';
                  } else if (valueStr === 'AUTONOME' && !valueStr.includes('+') && !valueStr.includes('PLUS')) {
                    level = 'AUTONOME';
                  } else if (valueStr === 'AUTONOME +' || valueStr === 'AUTONOME+' || 
                            valueStr.includes('AUTONOME') && (valueStr.includes('+') || valueStr.includes('PLUS'))) {
                    level = 'AUTONOME +';
                  }
                }
              }
              
              enhancedCompetences.push({
                ...category,
                intitule: category.intitule,
                level: level, // Use the mapped level for UI
                competenceType: parentCompetence?.intitule || 'unknown'
              });
            });
            
            competences = enhancedCompetences;
          } catch (categoriesError) {
            console.warn(`Error processing categories:`, categoriesError);
          }
        }
      } catch (competencesError) {
        console.warn(`Could not fetch competences for appreciation ID ${id}:`, competencesError);
      }
      
      // Combine all data
      const result = {
        ...appreciation,
        periode,
        stagiaire,
        tutor,
        stage,
        evaluations,
        competences,
        categories
      };
      
      console.log('Final combined evaluation data:', result);
      return result;
    } catch (appreciationError: any) {
      console.error(`Error fetching appreciation with ID ${id}:`, appreciationError);
      throw new Error(`Error fetching appreciation: ${appreciationError.message}`);
    }
  } catch (error: any) {
    console.error(`Error in fetchEvaluationById with ID ${id}:`, error);
    throw new Error(`Error fetching evaluation: ${error.message}`);
  }
};

// Function to delete an evaluation
export const deleteEvaluation = async (id: number): Promise<void> => {
  try {
    await apiInstance.delete(`/api/appreciation/${id}`);
  } catch (error: any) {
    console.error(`Error deleting evaluation with ID ${id}:`, error);
    throw new Error(`Error deleting evaluation: ${error.message}`);
  }
};

export const createCategories = async (categories: Category[]) => {
  try {
    const response = await apiInstance.post("/api/category/", categories);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCompetence = async (competencies: Competence[]) => {
  try {
    const response = await apiInstance.post("/api/competence/", competencies);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAppreciation = async (appreciation: Appreciation) => {
  try {
    const response = await apiInstance.post("/api/appreciation/", appreciation);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// function sendForm

const individualCompetencies = [
  "Être capable d'analyse et de synthèse",
  "Être capable de proposer des méthodes et des axes de travail",
  "Être capable de faire adhérer les acteurs",
  "Être capable de travailler dans un contexte international et interculturel",
  "Être capable de s'autoévaluer",
  "Être capable d'identifier des problèmes complexes",
];

const companyCompetencies = [
  "Être capable d'analyser le fonctionnement de l'entreprise d'accueil",
  "Être capable d'identifier la réglementation, hiérarchie, droit du travail, etc.",
  "Être capable d'analyser la démarche projet, et d'organiser un projet",
  "Être capable de comprendre la politique environnementale de l'entreprise",
  "Être capable de rechercher l'information nécessaire à ses activités",
];

export const sendForm = async (formData: FormData) => {
  try {
    // Use existing entity IDs instead of creating new ones
    const { stagiaireId, tutorId, stageId } = formData.personalInfo;
    
    // Create a new periode using the existing entities
    const periodeData: Periode = {
      datedebut: formData.personalInfo.startDate,
      datefin: formData.personalInfo.endDate,
      stagiaireId: stagiaireId,
      stageId: stageId,
    };
    const periode = await createPeriode(periodeData);

    const appreciationData: Appreciation = {
      periodeId: periode.id,
      tutorId: tutorId,
    };

    const appreciation = await createAppreciation(appreciationData);

    const performanceEvaluation = formData.performanceEvaluation;

    const evaluations: Evaluation[] = Object.entries(performanceEvaluation)
      .slice(0, -1) // removes the last entry
      .map(([category, value]) => ({
        category,
        value,
        appreciationId: appreciation.id,
      }));
    await createEvaluations(evaluations);

    const Competencies: Competence[] = [
      {
        intitule: "individual",
        note: Number(formData.competencyEvaluation.individualNote),
        appreciationId: appreciation.id,
      },
      {
        intitule: "company",
        note: Number(formData.competencyEvaluation.companyNote),
        appreciationId: appreciation.id,
      },
      {
        intitule: "specific",
        note: Number(formData.specificCompetencies.technicalNote),
        appreciationId: appreciation.id,
      },
    ];
    // Créer la compétence principale
    const competence = await createCompetence(Competencies);
    console.log("Competence créée :", competence);
    // Extraire les valeurs depuis formData
    const {
      competencyEvaluation: {
        individualCompetencies: individualValues,
        companyCompetencies: companyValues,
      },
    } = formData;

    // Fusionner les catégories individuelles et collectives
    const technicalCompetence =
      formData.specificCompetencies.technicalCompetencies[0];

    const mergedCompetencies = [
      ...individualCompetencies.map((intitule: string, index: number) => ({
        intitule,
        value: individualValues?.[index] ?? "N/A",
        competenceId: competence[0].id,
      })),
      ...(companyCompetencies || []).map((intitule: string, index: number) => ({
        intitule,
        value: companyValues?.[index] ?? "N/A",
        competenceId: competence[1].id,
      })),
      {
        intitule:
          "Être capable d'assurer la conception préliminaire de produits / services / processus / usages",
        value: technicalCompetence,
        competenceId: competence[2].id,
      },
    ];

    // Ajouter si competency et evaluation sont non vides
    const additionals = formData.specificCompetencies.specificCompetencies; // { competency: "...", evaluation: "..." }

    additionals.forEach((additional) => {
      if (
        additional?.competency?.trim() !== "" &&
        additional?.evaluation?.trim() !== ""
      ) {
        mergedCompetencies.push({
          intitule: additional.competency.toLocaleLowerCase(),
          value: additional.evaluation.toLocaleLowerCase(),
          competenceId: competence[2].id, // ou adapter selon logique métier
        });
      }
    });

    console.log(mergedCompetencies);
    // Créer les catégories
    await createCategories(mergedCompetencies);

    return { success: true };
  } catch (error) {
    throw error;
  }
};
