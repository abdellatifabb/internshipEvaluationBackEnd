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
    // create all table in this functions
    const stagiaireData: Stagiaire = {
      nom: formData.personalInfo.studentName.split(" ")[0],
      prenom: formData.personalInfo.studentName.split(" ")[1],
    };
    const stagiaire = await createStagiaire(stagiaireData);
    const tutorData: Tutor = {
      nom: formData.personalInfo.tutorName.split(" ")[0],
      prenom: formData.personalInfo.tutorName.split(" ")[1],
      entreprise: formData.personalInfo.companyName,
    };
    const tutor = await createTutor(tutorData);

    const stageData: Stage = {
      description: formData.projectDetails.projectTheme,
      objectif: formData.projectDetails.objectives,
      entreprise: formData.personalInfo.companyName,
    };
    const stage = await createStage(stageData);

    const periodeData: Periode = {
      datedebut: formData.personalInfo.startDate,
      datefin: formData.personalInfo.endDate,
      stagiaireId: stagiaire ? stagiaire.id : undefined,
      stageId: stage ? stage.id : undefined,
    };
    const periode = await createPeriode(periodeData);

    const appreciationData: Appreciation = {
      periodeId: periode.id,
      tutorId: tutor.id,
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
