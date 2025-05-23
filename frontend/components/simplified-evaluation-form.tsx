"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
} from "lucide-react";
import { FormData, ValidationErrors } from "../type";
// import { sendForm } from "../backend/evalution/evalution.api";

// Temporary mock function until the actual API is implemented
const sendForm = async (formData: FormData) => {
  console.log('Form data submitted:', formData);
  return Promise.resolve();
};
import ModifiedPersonalInfoPage from "./modified-personal-info";

// Import existing components from evaluation-form.tsx
import ProjectDetailsPage from "./evaluation-form";
import PerformanceEvaluationPage from "./evaluation-form";
import CompetenciesPage from "./evaluation-form";
import SpecificCompetenciesPage from "./evaluation-form";

// Initialize default form data
const initialFormData: FormData = {
  personalInfo: {
    studentName: "",
    companyName: "",
    tutorName: "",
    startDate: "",
    endDate: "",
  },
  projectDetails: {
    projectTheme: "",
    objectives: "",
  },
  performanceEvaluation: {
    implication: "tres-forte",
    openness: "tres-bonne",
    quality: "bonne-qualite",
    observations: "",
  },
  competencyEvaluation: {
    individualCompetencies: {},
    individualNote: "",
    companyCompetencies: {},
    companyNote: "",
  },
  specificCompetencies: {
    technicalCompetencies: {},
    technicalNote: "",
    specificCompetencies: Array(5).fill({ competency: "", evaluation: "" }),
  },
};

export default function SimplifiedEvaluationForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const totalPages = 5;

  // Update form data
  const updateFormData = (
    section: keyof FormData,
    field: string,
    value: string | Record<number, string>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Update nested form data
  const updateNestedFormData = (
    section: keyof FormData,
    nestedField: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section];
      if (
        "individualCompetencies" in sectionData ||
        "companyCompetencies" in sectionData ||
        "technicalCompetencies" in sectionData
      ) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [nestedField]: {
              ...(sectionData[
                nestedField as keyof typeof sectionData
              ] as Record<number, string>),
              [index]: value,
            },
          },
        };
      }
      return prev;
    });
  };

  // Update specific competencies
  const updateSpecificCompetency = (
    index: number,
    field: "competency" | "evaluation",
    value: string
  ) => {
    setFormData((prev) => {
      const newSpecificCompetencies = [
        ...prev.specificCompetencies.specificCompetencies,
      ];
      newSpecificCompetencies[index] = {
        ...newSpecificCompetencies[index],
        [field]: value,
      };
      return {
        ...prev,
        specificCompetencies: {
          ...prev.specificCompetencies,
          specificCompetencies: newSpecificCompetencies,
        },
      };
    });
  };

  // Validate personal info
  const validatePersonalInfo = (): boolean => {
    const { studentName, companyName, tutorName, startDate, endDate } =
      formData.personalInfo;
    const newErrors: ValidationErrors = { personalInfo: {} };
    let isValid = true;

    if (!studentName.trim()) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.studentName = "Le nom du stagiaire est requis";
      isValid = false;
    }

    if (!companyName.trim()) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.companyName = "Le stage est requis";
      isValid = false;
    }

    if (!tutorName.trim()) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.tutorName = "Le nom du tuteur est requis";
      isValid = false;
    }

    if (!startDate) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.startDate = "La date de début est requise";
      isValid = false;
    }

    if (!endDate) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.endDate = "La date de fin est requise";
      isValid = false;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      if (newErrors.personalInfo)
        newErrors.personalInfo.endDate =
          "La date de fin doit être après la date de début";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  // Validate current page
  const validateCurrentPage = (): boolean => {
    switch (currentPage) {
      case 1:
        return validatePersonalInfo();
      // Add other validation methods for other pages
      default:
        return true;
    }
  };

  // Next page
  const nextPage = () => {
    if (validateCurrentPage()) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setShowErrors(true);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all pages
    if (!validateCurrentPage()) {
      setShowErrors(true);
      return;
    }

    try {
      // Send form data to API
      await sendForm(formData);
      setSubmitted(true);
      
      // Reset form after successful submission
      setFormData(initialFormData);
      setCurrentPage(1);
      setShowErrors(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <ModifiedPersonalInfoPage
            data={formData.personalInfo}
            updateData={(field, value) =>
              updateFormData("personalInfo", field, value)
            }
            errors={errors.personalInfo}
            showErrors={showErrors}
          />
        );
      case 2:
        return (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-800">
                <FileText className="mr-2 h-5 w-5" />
                Détails du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectTheme">Thème du projet</Label>
                <textarea
                  id="projectTheme"
                  className="w-full min-h-24 p-2 border rounded-md"
                  value={formData.projectDetails.projectTheme}
                  onChange={(e) =>
                    updateFormData("projectDetails", "projectTheme", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="objectives">Objectifs</Label>
                <textarea
                  id="objectives"
                  className="w-full min-h-24 p-2 border rounded-md"
                  value={formData.projectDetails.objectives}
                  onChange={(e) =>
                    updateFormData("projectDetails", "objectives", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-800">
                <BookOpen className="mr-2 h-5 w-5" />
                Évaluation de la performance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Implication dans le travail</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.performanceEvaluation.implication}
                    onChange={(e) =>
                      updateFormData("performanceEvaluation", "implication", e.target.value)
                    }
                  >
                    <option value="tres-forte">Très forte</option>
                    <option value="forte">Forte</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="faible">Faible</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Ouverture aux conseils</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.performanceEvaluation.openness}
                    onChange={(e) =>
                      updateFormData("performanceEvaluation", "openness", e.target.value)
                    }
                  >
                    <option value="tres-bonne">Très bonne</option>
                    <option value="bonne">Bonne</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="faible">Faible</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Qualité du travail</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.performanceEvaluation.quality}
                    onChange={(e) =>
                      updateFormData("performanceEvaluation", "quality", e.target.value)
                    }
                  >
                    <option value="excellente-qualite">Excellente qualité</option>
                    <option value="bonne-qualite">Bonne qualité</option>
                    <option value="qualite-moyenne">Qualité moyenne</option>
                    <option value="qualite-insuffisante">Qualité insuffisante</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="observations">Observations</Label>
                  <textarea
                    id="observations"
                    className="w-full min-h-24 p-2 border rounded-md"
                    value={formData.performanceEvaluation.observations}
                    onChange={(e) =>
                      updateFormData("performanceEvaluation", "observations", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-800">
                <ClipboardList className="mr-2 h-5 w-5" />
                Évaluation des compétences
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Compétences individuelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {["Autonomie", "Créativité", "Initiative", "Organisation"].map((comp, index) => (
                    <div key={index} className="space-y-2">
                      <Label>{comp}</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.competencyEvaluation.individualCompetencies[index] || ""}
                        onChange={(e) =>
                          updateNestedFormData(
                            "competencyEvaluation",
                            "individualCompetencies",
                            index,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="excellent">Excellent</option>
                        <option value="bon">Bon</option>
                        <option value="moyen">Moyen</option>
                        <option value="insuffisant">Insuffisant</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="individualNote">Note sur les compétences individuelles</Label>
                  <textarea
                    id="individualNote"
                    className="w-full min-h-20 p-2 border rounded-md"
                    value={formData.competencyEvaluation.individualNote}
                    onChange={(e) =>
                      updateFormData("competencyEvaluation", "individualNote", e.target.value)
                    }
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Compétences en entreprise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {["Travail d'équipe", "Communication", "Adaptabilité", "Respect des délais"].map((comp, index) => (
                    <div key={index} className="space-y-2">
                      <Label>{comp}</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.competencyEvaluation.companyCompetencies[index] || ""}
                        onChange={(e) =>
                          updateNestedFormData(
                            "competencyEvaluation",
                            "companyCompetencies",
                            index,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="excellent">Excellent</option>
                        <option value="bon">Bon</option>
                        <option value="moyen">Moyen</option>
                        <option value="insuffisant">Insuffisant</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyNote">Note sur les compétences en entreprise</Label>
                  <textarea
                    id="companyNote"
                    className="w-full min-h-20 p-2 border rounded-md"
                    value={formData.competencyEvaluation.companyNote}
                    onChange={(e) =>
                      updateFormData("competencyEvaluation", "companyNote", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-800">
                <FileText className="mr-2 h-5 w-5" />
                Compétences spécifiques
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Compétences techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {["Maîtrise des outils", "Connaissances techniques", "Résolution de problèmes", "Qualité du code"].map((comp, index) => (
                    <div key={index} className="space-y-2">
                      <Label>{comp}</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.specificCompetencies.technicalCompetencies[index] || ""}
                        onChange={(e) =>
                          updateNestedFormData(
                            "specificCompetencies",
                            "technicalCompetencies",
                            index,
                            e.target.value
                          )
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="excellent">Excellent</option>
                        <option value="bon">Bon</option>
                        <option value="moyen">Moyen</option>
                        <option value="insuffisant">Insuffisant</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <Label htmlFor="technicalNote">Note sur les compétences techniques</Label>
                  <textarea
                    id="technicalNote"
                    className="w-full min-h-20 p-2 border rounded-md"
                    value={formData.specificCompetencies.technicalNote}
                    onChange={(e) =>
                      updateFormData("specificCompetencies", "technicalNote", e.target.value)
                    }
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Autres compétences spécifiques</h3>
                {formData.specificCompetencies.specificCompetencies.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Compétence {index + 1}</Label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={item.competency}
                        onChange={(e) =>
                          updateSpecificCompetency(index, "competency", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Évaluation</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={item.evaluation}
                        onChange={(e) =>
                          updateSpecificCompetency(index, "evaluation", e.target.value)
                        }
                      >
                        <option value="">Sélectionner</option>
                        <option value="excellent">Excellent</option>
                        <option value="bon">Bon</option>
                        <option value="moyen">Moyen</option>
                        <option value="insuffisant">Insuffisant</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {submitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h2 className="text-2xl font-bold text-green-700">
                Évaluation soumise avec succès !
              </h2>
              <p className="text-green-600 max-w-md">
                Merci d'avoir complété cette évaluation. Vos commentaires sont
                précieux pour l'amélioration continue de notre programme de
                stage.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                Commencer une nouvelle évaluation
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-800">
                <ClipboardList className="mr-2 h-5 w-5" />
                Formulaire d'évaluation de stage
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Étape {currentPage} sur {totalPages}
                  </span>
                  <span>{Math.round((currentPage / totalPages) * 100)}%</span>
                </div>
                <Progress
                  value={(currentPage / totalPages) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit}>
            {renderPage()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 1}
                variant="outline"
              >
                Précédent
              </Button>

              {currentPage === totalPages ? (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Soumettre l'évaluation
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextPage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Suivant
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
