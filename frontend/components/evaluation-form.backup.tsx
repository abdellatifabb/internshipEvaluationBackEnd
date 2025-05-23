"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  User,
  Users,
} from "lucide-react";
import {
  CompetencyEvaluation,
  FormData,
  PerformanceEvaluation,
  PersonalInfo,
  ProjectDetails,
  SpecificCompetencies,
  ValidationErrors,
} from "@/type";
import { sendForm } from "@/backend/evalution/evalution.api";
import { SelectStagiaire, SelectTutor, SelectStage } from "./select-entities";
// Import all pages except ProjectDetailsPage since we're skipping it
import { PerformanceEvaluationPage } from "./performance-evaluation-page";
import { CompetenciesPage } from "./competencies-page";
import { SpecificCompetenciesPage } from "./specific-competencies-page";

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

export default function EvaluationForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Add state for selected entities
  const [selectedStagiaireId, setSelectedStagiaireId] = useState("");
  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [selectedStageId, setSelectedStageId] = useState("");
  
  // Skip project details page since it's populated from stage data
  const totalPages = 4;

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
        newErrors.personalInfo.companyName = "Le nom de l'entreprise est requis";
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

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        personalInfo: newErrors.personalInfo,
      }));
    } else {
      setErrors((prev) => ({ ...prev, personalInfo: {} }));
    }

    return isValid;
  };

  // Validate project details
  const validateProjectDetails = (): boolean => {
    const { projectTheme, objectives } = formData.projectDetails;
    const newErrors: ValidationErrors = { projectDetails: {} };
    let isValid = true;

    if (!projectTheme.trim()) {
      if (newErrors.projectDetails)
        newErrors.projectDetails.projectTheme = "Le thème du projet est requis";
      isValid = false;
    }

    if (!objectives.trim()) {
      if (newErrors.projectDetails)
        newErrors.projectDetails.objectives = "Les objectifs sont requis";
      isValid = false;
    }

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        projectDetails: newErrors.projectDetails,
      }));
    } else {
      setErrors((prev) => ({ ...prev, projectDetails: {} }));
    }

    return isValid;
  };

  // Validate performance evaluation
  const validatePerformanceEvaluation = (): boolean => {
    const { observations } = formData.performanceEvaluation;
    const newErrors: ValidationErrors = { performanceEvaluation: {} };
    let isValid = true;

    if (!observations.trim()) {
      if (newErrors.performanceEvaluation)
        newErrors.performanceEvaluation.observations =
          "Les observations sont requises";
      isValid = false;
    }

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        performanceEvaluation: newErrors.performanceEvaluation,
      }));
    } else {
      setErrors((prev) => ({ ...prev, performanceEvaluation: {} }));
    }

    return isValid;
  };

  // Validate current page
  const validateCurrentPage = (): boolean => {
    switch (currentPage) {
      case 1:
        return validatePersonalInfo();
      case 2: // Now this is performance evaluation (skipped project details)
        return validatePerformanceEvaluation();
      default:
        return true;
    }
  };

  // Next page
  const nextPage = () => {
    if (validateCurrentPage()) {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        setShowErrors(false);
      }
    } else {
      setShowErrors(true);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setShowErrors(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateCurrentPage()) {
      try {
        setSubmitted(true);
        
        // Send the form data to the API
        const response = await sendForm(formData);
        
        // Handle successful submission
        console.log("Form submitted successfully:", response);
        
        // Reset form or redirect
        // setFormData(initialFormData);
        // setCurrentPage(1);
        
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitted(false);
      }
    } else {
      setShowErrors(true);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentPage / totalPages) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-600" />
            Formulaire d&apos;évaluation de stage
          </CardTitle>
        </CardHeader>

        <div className="px-6 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>
              Étape {currentPage} sur {totalPages}
            </span>
            <span>{Math.round(progressPercentage)}% complété</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <CardContent className="p-6">
          {showErrors && Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="mb-6">

    function PersonalInfoPage({
      data,
      updateData,
      errors,
      showErrors,
      selectedStagiaireId,
      setSelectedStagiaireId,
      selectedTutorId,
      setSelectedTutorId,
      selectedStageId,
      setSelectedStageId,
    }: PersonalInfoPageProps) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-700 flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informations personnelles
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Sélectionnez le stagiaire, le tuteur et le stage pour cette évaluation
            </p>
                variant="outline"
                onClick={prevPage}
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Précédent
              </Button>
            ) : (
              <div></div>
            )}

            {currentPage < totalPages ? (
              <Button
                type="button"
                onClick={nextPage}
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                Suivant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 flex items-center"
                disabled={submitted}
              >
                {submitted ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Soumettre l&apos;évaluation
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Personal Info Page Component
interface PersonalInfoPageProps {
  data: PersonalInfo;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
  selectedStagiaireId: string;
  setSelectedStagiaireId: (id: string) => void;
  selectedTutorId: string;
  setSelectedTutorId: (id: string) => void;
  selectedStageId: string;
  setSelectedStageId: (id: string) => void;
}

function PersonalInfoPage({
  data,
  updateData,
  errors,
  showErrors,
  selectedStagiaireId,
  setSelectedStagiaireId,
  selectedTutorId,
  setSelectedTutorId,
  selectedStageId,
  setSelectedStageId,
}: PersonalInfoPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 flex items-center">
          <User className="mr-2 h-5 w-5" />
          Informations personnelles
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Sélectionnez le stagiaire, le tuteur et le stage pour cette évaluation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <SelectStagiaire
                value={selectedStagiaireId}
                onChange={(value, stagiaireData) => {
                  // Store the ID for the select component
                  setSelectedStagiaireId(value);
                  
                  // If we have stagiaire data, use the full name
                  if (stagiaireData) {
                    console.log("Selected stagiaire:", stagiaireData);
                    const fullName = `${stagiaireData.prenom || ''} ${stagiaireData.nom || ''}`.trim();
                    updateData("studentName", fullName);
                  } else {
                    // Clear the field if no stagiaire is selected
                    updateData("studentName", "");
                  }
                }}
                error={showErrors && errors?.studentName ? errors.studentName : undefined}
                label="Stagiaire"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <SelectTutor
                value={selectedTutorId}
                onChange={(value, tutorData) => {
                  // Store the ID for the select component
                  setSelectedTutorId(value);
                  
                  // If we have tutor data, use the full name and company
                  if (tutorData) {
                    console.log("Selected tutor:", tutorData);
                    const fullName = `${tutorData.prenom || ''} ${tutorData.nom || ''}`.trim();
                    updateData("tutorName", fullName);
                    
                    // If company name is not already set, use the tutor's company
                    if (!data.companyName && tutorData.entreprise) {
                      updateData("companyName", tutorData.entreprise);
                    }
                  } else {
            <div className="space-y-2">
              <Label
                htmlFor="start-date"
                className="flex items-center text-gray-700"
              >
                Date de début <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <Input
                  id="start-date"
                  type="date"
                  className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    showErrors && errors?.startDate ? "border-red-500" : ""
                  }`}
                  value={data.startDate}
                  onChange={(e) => updateData("startDate", e.target.value)}
                />
              </div>
              {showErrors && errors?.startDate && (
                <p className="text-red-500 text-sm">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="end-date"
                className="flex items-center text-gray-700"
              >
                Date de fin <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <Input
                  id="end-date"
                  type="date"
                  className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                    showErrors && errors?.endDate ? "border-red-500" : ""
                  }`}
                  value={data.endDate}
                  onChange={(e) => updateData("endDate", e.target.value)}
                />
              </div>
              {showErrors && errors?.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
