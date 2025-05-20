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
        newErrors.personalInfo.companyName =
          "Le nom de l'entreprise est requis";
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
      setErrors((prev) => ({ ...prev, personalInfo: newErrors.personalInfo }));
    } else {
      setErrors((prev) => ({ ...prev, personalInfo: undefined }));
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
      setErrors((prev) => ({ ...prev, projectDetails: undefined }));
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
      setErrors((prev) => ({ ...prev, performanceEvaluation: undefined }));
    }

    return isValid;
  };

  // Validate competency evaluation
  const validateCompetencyEvaluation = (): boolean => {
    const { individualNote, companyNote } = formData.competencyEvaluation;
    const newErrors: ValidationErrors = { competencyEvaluation: {} };
    let isValid = true;

    if (!individualNote.trim()) {
      if (newErrors.competencyEvaluation)
        newErrors.competencyEvaluation.individualNote = "La note est requise";
      isValid = false;
    } else if (
      isNaN(Number(individualNote)) ||
      Number(individualNote) < 0 ||
      Number(individualNote) > 20
    ) {
      if (newErrors.competencyEvaluation)
        newErrors.competencyEvaluation.individualNote =
          "La note doit être entre 0 et 20";
      isValid = false;
    }

    if (!companyNote.trim()) {
      if (newErrors.competencyEvaluation)
        newErrors.competencyEvaluation.companyNote = "La note est requise";
      isValid = false;
    } else if (
      isNaN(Number(companyNote)) ||
      Number(companyNote) < 0 ||
      Number(companyNote) > 20
    ) {
      if (newErrors.competencyEvaluation)
        newErrors.competencyEvaluation.companyNote =
          "La note doit être entre 0 et 20";
      isValid = false;
    }

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        competencyEvaluation: newErrors.competencyEvaluation,
      }));
    } else {
      setErrors((prev) => ({ ...prev, competencyEvaluation: undefined }));
    }

    return isValid;
  };

  // Validate specific competencies
  const validateSpecificCompetencies = (): boolean => {
    const { technicalNote } = formData.specificCompetencies;
    const newErrors: ValidationErrors = { specificCompetencies: {} };
    let isValid = true;

    if (!technicalNote.trim()) {
      if (newErrors.specificCompetencies)
        newErrors.specificCompetencies.technicalNote = "La note est requise";
      isValid = false;
    } else if (
      isNaN(Number(technicalNote)) ||
      Number(technicalNote) < 0 ||
      Number(technicalNote) > 20
    ) {
      if (newErrors.specificCompetencies)
        newErrors.specificCompetencies.technicalNote =
          "La note doit être entre 0 et 20";
      isValid = false;
    }

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        specificCompetencies: newErrors.specificCompetencies,
      }));
    } else {
      setErrors((prev) => ({ ...prev, specificCompetencies: undefined }));
    }

    return isValid;
  };

  // Validate current page
  const validateCurrentPage = (): boolean => {
    switch (currentPage) {
      case 1:
        return validatePersonalInfo();
      case 2:
        return validateProjectDetails();
      case 3:
        return validatePerformanceEvaluation();
      case 4:
        return validateCompetencyEvaluation();
      case 5:
        return validateSpecificCompetencies();
      default:
        return true;
    }
  };

  // Validate all pages
  const validateAllPages = (): boolean => {
    const isPersonalInfoValid = validatePersonalInfo();
    const isProjectDetailsValid = validateProjectDetails();
    const isPerformanceEvaluationValid = validatePerformanceEvaluation();
    const isCompetencyEvaluationValid = validateCompetencyEvaluation();
    const isSpecificCompetenciesValid = validateSpecificCompetencies();

    return (
      isPersonalInfoValid &&
      isProjectDetailsValid &&
      isPerformanceEvaluationValid &&
      isCompetencyEvaluationValid &&
      isSpecificCompetenciesValid
    );
  };

  const nextPage = () => {
    if (validateCurrentPage()) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0);
        setShowErrors(false);
      }
    } else {
      setShowErrors(true);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
      setShowErrors(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAllPages()) {
      // Form is valid, submit the data
      console.log("Form data:", formData);
      try {
        await sendForm(formData);
      } catch (error) {
        alert(error);
      }
      setSubmitted(true);
      alert("Formulaire envoyé avec succès!");
    } else {
      // Form is invalid, show errors
      setShowErrors(true);

      // Navigate to the first page with errors
      if (errors.personalInfo) {
        setCurrentPage(1);
      } else if (errors.projectDetails) {
        setCurrentPage(2);
      } else if (errors.performanceEvaluation) {
        setCurrentPage(3);
      } else if (errors.competencyEvaluation) {
        setCurrentPage(4);
      } else if (errors.specificCompetencies) {
        setCurrentPage(5);
      }
    }
  };

  const progressPercentage = (currentPage / totalPages) * 100;

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-8 border-none shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            Evaluation Stage Etudiants
          </CardTitle>
          <p className="text-xl mt-2 opacity-90">
            APPRECIATION DU TUTEUR DE STAGE
          </p>
        </CardHeader>

        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
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
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Veuillez corriger les erreurs ci-dessous avant de continuer.
              </AlertDescription>
            </Alert>
          )}

          {currentPage === 1 && (
            <PersonalInfoPage
              data={formData.personalInfo}
              updateData={(field, value) =>
                updateFormData("personalInfo", field, value)
              }
              errors={errors.personalInfo}
              showErrors={showErrors}
            />
          )}
          {currentPage === 2 && (
            <ProjectDetailsPage
              data={formData.projectDetails}
              updateData={(field, value) =>
                updateFormData("projectDetails", field, value)
              }
              errors={errors.projectDetails}
              showErrors={showErrors}
            />
          )}
          {currentPage === 3 && (
            <PerformanceEvaluationPage
              data={formData.performanceEvaluation}
              updateData={(field, value) =>
                updateFormData("performanceEvaluation", field, value)
              }
              errors={errors.performanceEvaluation}
              showErrors={showErrors}
            />
          )}
          {currentPage === 4 && (
            <CompetenciesPage
              data={formData.competencyEvaluation}
              updateData={(field, value) =>
                updateFormData("competencyEvaluation", field, value)
              }
              updateNestedData={(field, index, value) =>
                updateNestedFormData(
                  "competencyEvaluation",
                  field,
                  index,
                  value
                )
              }
              errors={errors.competencyEvaluation}
              showErrors={showErrors}
            />
          )}
          {currentPage === 5 && (
            <SpecificCompetenciesPage
              data={formData.specificCompetencies}
              updateData={(field, value) =>
                updateFormData("specificCompetencies", field, value)
              }
              updateNestedData={(field, index, value) =>
                updateNestedFormData(
                  "specificCompetencies",
                  field,
                  index,
                  value
                )
              }
              updateSpecificCompetency={updateSpecificCompetency}
              errors={errors.specificCompetencies}
              showErrors={showErrors}
            />
          )}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-6"
            >
              Précédent
            </Button>

            {currentPage === totalPages ? (
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8"
                disabled={submitted}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {submitted ? "Envoyé" : "Envoyer"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextPage}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8"
              >
                Suivant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

// Personal Info Page Component
interface PersonalInfoPageProps {
  data: PersonalInfo;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

function PersonalInfoPage({
  data,
  updateData,
  errors,
  showErrors,
}: PersonalInfoPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-blue-700 mb-4">
        <User className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Informations Personnelles</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="student-name"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
            NOM et Prénom du stagiaire
          </Label>
          <Input
            id="student-name"
            placeholder="Entrez le nom complet"
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.studentName ? "border-red-500" : ""
            }`}
            value={data.studentName}
            onChange={(e) => updateData("studentName", e.target.value)}
          />
          {showErrors && errors?.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="company-name"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
            Nom de l&apos;entreprise
          </Label>
          <Input
            id="company-name"
            placeholder="Entrez le nom de l'entreprise"
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.companyName ? "border-red-500" : ""
            }`}
            value={data.companyName}
            onChange={(e) => updateData("companyName", e.target.value)}
          />
          {showErrors && errors?.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="tutor-name"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            NOM et Prénom du tuteur
          </Label>
          <Input
            id="tutor-name"
            placeholder="Entrez le nom complet"
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.tutorName ? "border-red-500" : ""
            }`}
            value={data.tutorName}
            onChange={(e) => updateData("tutorName", e.target.value)}
          />
          {showErrors && errors?.tutorName && (
            <p className="text-red-500 text-sm mt-1">{errors.tutorName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center">
            <span className="text-red-500 mr-1">*</span>
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            Période du stage
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="date"
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                  showErrors && errors?.startDate ? "border-red-500" : ""
                }`}
                value={data.startDate}
                onChange={(e) => updateData("startDate", e.target.value)}
              />
              {showErrors && errors?.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>
            <span className="text-gray-500">au</span>
            <div className="flex-1">
              <Input
                type="date"
                className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                  showErrors && errors?.endDate ? "border-red-500" : ""
                }`}
                value={data.endDate}
                onChange={(e) => updateData("endDate", e.target.value)}
              />
              {showErrors && errors?.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <p className="text-sm text-blue-700">
          Veuillez remplir toutes les informations ci-dessus pour identifier
          correctement le stage et les parties concernées.
        </p>
      </div>
    </div>
  );
}

// Project Details Page Component
interface ProjectDetailsPageProps {
  data: ProjectDetails;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

function ProjectDetailsPage({
  data,
  updateData,
  errors,
  showErrors,
}: ProjectDetailsPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-blue-700 mb-4">
        <ClipboardList className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Détails du Projet</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="project-theme"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
            THEME DU PROJET PRINCIPAL CONFIE A L&apos;ETUDIANT(E)
          </Label>
          <Textarea
            id="project-theme"
            rows={6}
            placeholder="Décrivez le thème principal du projet..."
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.projectTheme ? "border-red-500" : ""
            }`}
            value={data.projectTheme}
            onChange={(e) => updateData("projectTheme", e.target.value)}
          />
          {showErrors && errors?.projectTheme && (
            <p className="text-red-500 text-sm mt-1">{errors.projectTheme}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="objectives"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <FileText className="h-4 w-4 mr-2 text-blue-600" />
            OBJECTIFS ASSIGNES A L&apos;ETUDIANT(E)
          </Label>
          <Textarea
            id="objectives"
            rows={6}
            placeholder="Listez les objectifs assignés à l'étudiant..."
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.objectives ? "border-red-500" : ""
            }`}
            value={data.objectives}
            onChange={(e) => updateData("objectives", e.target.value)}
          />
          {showErrors && errors?.objectives && (
            <p className="text-red-500 text-sm mt-1">{errors.objectives}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <p className="text-sm text-blue-700">
          Ces informations sont essentielles pour comprendre le contexte du
          stage et évaluer la pertinence des missions confiées.
        </p>
      </div>
    </div>
  );
}

// Performance Evaluation Page Component
interface PerformanceEvaluationPageProps {
  data: PerformanceEvaluation;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

function PerformanceEvaluationPage({
  data,
  updateData,
  errors,
  showErrors,
}: PerformanceEvaluationPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-blue-700 mb-4">
        <CheckCircle2 className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Évaluation de Performance</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 mb-1">
          APPRECIATIONS GLOBALES SUR L&apos;ETUDIANT(E)
        </h3>
        <p className="text-sm text-gray-600">
          Évaluez les différents aspects de la performance de l&apos;étudiant
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <Label className="flex items-start mb-4 font-medium text-gray-700">
            <span className="text-red-500 mr-1">*</span>
            IMPLICATION DANS SES ACTIVITES
          </Label>
          <RadioGroup
            value={data.implication}
            onValueChange={(value) => updateData("implication", value)}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {[
              { value: "paresseux", label: "Paresseux" },
              { value: "le-juste-necessaire", label: "Le juste nécessaire" },
              { value: "bonne-implication", label: "Bonne" },
              { value: "tres-forte", label: "Très forte" },
              { value: "depasse-objectifs", label: "Dépasse ses objectifs" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="text-blue-600"
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <Label className="flex items-start mb-4 font-medium text-gray-700">
            <span className="text-red-500 mr-1">*</span>
            OUVERTURE AUX AUTRES
          </Label>
          <RadioGroup
            value={data.openness}
            onValueChange={(value) => updateData("openness", value)}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {[
              { value: "isole", label: "Isolé(e) ou en opposition" },
              { value: "renferme", label: "Renfermé(e) ou obtus" },
              { value: "bonne-ouverture", label: "Bonne" },
              { value: "tres-bonne", label: "Très bonne" },
              { value: "excellente", label: "Excellente" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="text-blue-600"
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <Label className="flex items-start mb-4 font-medium text-gray-700">
            <span className="text-red-500 mr-1">*</span>
            QUALITE DE SES &quot;PRODUCTIONS&quot;
          </Label>
          <RadioGroup
            value={data.quality}
            onValueChange={(value) => updateData("quality", value)}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {[
              { value: "mediocre", label: "Médiocre" },
              { value: "acceptable", label: "Acceptable" },
              { value: "bonne-qualite", label: "Bonne" },
              { value: "tres-bonne-qualite", label: "Très bonne" },
              { value: "tres-professionnelle", label: "Très professionnelle" },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="text-blue-600"
                />
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="observations"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            <FileText className="h-4 w-4 mr-2 text-blue-600" />
            OBSERVATIONS SUR L&apos;ENSEMBLE DU TRAVAIL ACCOMPLI
          </Label>
          <Textarea
            id="observations"
            rows={4}
            placeholder="Vos observations générales sur le travail de l'étudiant..."
            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.observations ? "border-red-500" : ""
            }`}
            value={data.observations}
            onChange={(e) => updateData("observations", e.target.value)}
          />
          {showErrors && errors?.observations && (
            <p className="text-red-500 text-sm mt-1">{errors.observations}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Competencies Page Component
interface CompetenciesPageProps {
  data: CompetencyEvaluation;
  updateData: (field: string, value: string) => void;
  updateNestedData: (field: string, index: number, value: string) => void;
  errors?: {
    individualCompetencies?: Record<number, string>;
    individualNote?: string;
    companyCompetencies?: Record<number, string>;
    companyNote?: string;
  };
  showErrors: boolean;
}

function CompetenciesPage({
  data,
  updateData,
  updateNestedData,
  errors,
  showErrors,
}: CompetenciesPageProps) {
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

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-blue-700 mb-4">
        <GraduationCap className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Évaluation des Compétences</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 mb-1">
          EVALUATIONS DES COMPETENCES DE L&apos;ETUDIANT(E)
        </h3>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h4 className="font-medium text-gray-700">Niveaux d&apos;évaluation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-gray-700">NA</p>
            <p className="text-sm text-gray-600">
              Non applicable - Compétence non appliquée, ou trop peu
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-gray-700">DEBUTANT</p>
            <p className="text-sm text-gray-600">
              Applique, avec aide, les savoirs
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-gray-700">AUTONOME</p>
            <p className="text-sm text-gray-600">
              Applique les pratiques de façon autonome
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="font-medium text-gray-700">AUTONOME +</p>
            <p className="text-sm text-gray-600">
              Résout des problèmes selon la situation de travail - A un jugement
              critique
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Label className="text-sm font-medium flex items-center">
          <span className="text-red-500 mr-1">*</span>
          Compétences liées à l&apos;individu (cocher les cases)
        </Label>

        <div className="overflow-x-auto">
          <div className="border rounded-md overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <th className="p-3 text-left font-medium text-gray-700">
                    Compétence
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    NA
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    DEBUTANT
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    AUTONOME
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    AUTONOME +
                  </th>
                </tr>
              </thead>
              <tbody>
                {individualCompetencies.map((competence, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 border-t">{competence}</td>
                    {["na", "debutant", "autonome", "autonome-plus"].map(
                      (level) => (
                        <td key={level} className="p-3 text-center border-t">
                          <RadioGroup
                            name={`individual-comp-${index}`}
                            value={data.individualCompetencies[index] || ""}
                            onValueChange={(value) =>
                              updateNestedData(
                                "individualCompetencies",
                                index,
                                value
                              )
                            }
                            className="flex justify-center"
                          >
                            <RadioGroupItem
                              value={level}
                              className="h-5 w-5 text-blue-600"
                            />
                          </RadioGroup>
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-2">
          <Label
            htmlFor="individual-note"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            Note pour évaluer les Compétences liées à l&apos;individu
          </Label>
          <p className="text-sm text-gray-600">
            Cette note complète les évaluations qualitatives sans en être la
            conversion directe.
          </p>
          <p className="text-sm text-gray-600">Donnez une note sur 20</p>
          <Input
            id="individual-note"
            type="number"
            min="0"
            max="20"
            className={`w-48 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.individualNote ? "border-red-500" : ""
            }`}
            value={data.individualNote}
            onChange={(e) => updateData("individualNote", e.target.value)}
          />
          {showErrors && errors?.individualNote && (
            <p className="text-red-500 text-sm mt-1">{errors.individualNote}</p>
          )}
        </div>

        <Separator className="my-8" />

        <Label className="text-sm font-medium flex items-center">
          <span className="text-red-500 mr-1">*</span>
          Compétences liées à l&apos;entreprise (cocher les cases)
        </Label>

        <div className="overflow-x-auto">
          <div className="border rounded-md overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <th className="p-3 text-left font-medium text-gray-700">
                    Compétence
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    NA
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    DEBUTANT
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    AUTONOME
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    AUTONOME +
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyCompetencies.map((competence, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 border-t">{competence}</td>
                    {["na", "debutant", "autonome", "autonome-plus"].map(
                      (level) => (
                        <td key={level} className="p-3 text-center border-t">
                          <RadioGroup
                            name={`company-comp-${index}`}
                            value={data.companyCompetencies[index] || ""}
                            onValueChange={(value) =>
                              updateNestedData(
                                "companyCompetencies",
                                index,
                                value
                              )
                            }
                            className="flex justify-center"
                          >
                            <RadioGroupItem
                              value={level}
                              className="h-5 w-5 text-blue-600"
                            />
                          </RadioGroup>
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-2">
          <Label
            htmlFor="company-note"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            Note pour évaluer les Compétences liées à l&apos;entreprise
          </Label>
          <p className="text-sm text-gray-600">Donnez une note sur 20</p>
          <Input
            id="company-note"
            type="number"
            min="0"
            max="20"
            className={`w-48 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.companyNote ? "border-red-500" : ""
            }`}
            value={data.companyNote}
            onChange={(e) => updateData("companyNote", e.target.value)}
          />
          {showErrors && errors?.companyNote && (
            <p className="text-red-500 text-sm mt-1">{errors.companyNote}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Specific Competencies Page Component
interface SpecificCompetenciesPageProps {
  data: SpecificCompetencies;
  updateData: (field: string, value: string) => void;
  updateNestedData: (field: string, index: number, value: string) => void;
  updateSpecificCompetency: (
    index: number,
    field: "competency" | "evaluation",
    value: string
  ) => void;
  errors?: {
    technicalCompetencies?: Record<number, string>;
    technicalNote?: string;
  };
  showErrors: boolean;
}

function SpecificCompetenciesPage({
  data,
  updateData,
  updateNestedData,
  updateSpecificCompetency,
  errors,
  showErrors,
}: SpecificCompetenciesPageProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-blue-700 mb-4">
        <ClipboardList className="h-6 w-6" />
        <h2 className="text-xl font-semibold">Compétences Spécifiques</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="border rounded-md overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <th className="p-3 text-left font-medium text-gray-700">
                  Compétence
                </th>
                <th className="p-3 text-center font-medium text-gray-700 w-20">
                  NA
                </th>
                <th className="p-3 text-center font-medium text-gray-700 w-20">
                  DEBUTANT
                </th>
                <th className="p-3 text-center font-medium text-gray-700 w-20">
                  AUTONOME
                </th>
                <th className="p-3 text-center font-medium text-gray-700 w-20">
                  AUTONOME +
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-3 border-t">
                  Être capable d&apos;assurer la conception préliminaire de
                  produits / services / processus / usages
                </td>
                {["na", "debutant", "autonome", "autonome-plus"].map(
                  (level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="tech-comp-0"
                        value={data.technicalCompetencies[0] || ""}
                        onValueChange={(value) =>
                          updateNestedData("technicalCompetencies", 0, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-2">
        <Label
          htmlFor="tech-note"
          className="text-sm font-medium flex items-center"
        >
          <span className="text-red-500 mr-1">*</span>
          Note pour évaluer les Compétences scientifiques et techniques
        </Label>
        <p className="text-sm text-gray-600">Donnez une note sur 20</p>
        <Input
          id="tech-note"
          type="number"
          min="0"
          max="20"
          className={`w-48 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
            showErrors && errors?.technicalNote ? "border-red-500" : ""
          }`}
          value={data.technicalNote}
          onChange={(e) => updateData("technicalNote", e.target.value)}
        />
        {showErrors && errors?.technicalNote && (
          <p className="text-red-500 text-sm mt-1">{errors.technicalNote}</p>
        )}
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-700">
            Compétences spécifiques métier (à ajouter selon besoin)
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Évaluez chaque compétence avec un des trois niveaux suivants :
            DEBUTANT, AUTONOME ou AUTONOME +.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="border rounded-md overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <th className="p-3 text-center font-medium text-gray-700 w-16">
                    #
                  </th>
                  <th className="p-3 text-left font-medium text-gray-700">
                    Compétence
                  </th>
                  <th className="p-3 text-left font-medium text-gray-700">
                    Évaluation
                  </th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 text-center border-t">{index + 1}</td>
                    <td className="p-3 border-t">
                      <Input
                        placeholder="Décrivez la compétence"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={
                          data.specificCompetencies[index]?.competency || ""
                        }
                        onChange={(e) =>
                          updateSpecificCompetency(
                            index,
                            "competency",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-3 border-t">
                      <Input
                        placeholder="DEBUTANT / AUTONOME / AUTONOME +"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={
                          data.specificCompetencies[index]?.evaluation || ""
                        }
                        onChange={(e) =>
                          updateSpecificCompetency(
                            index,
                            "evaluation",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <p className="text-sm text-blue-700">
          Merci de compléter cette évaluation avec soin. Vos commentaires sont
          précieux pour l&apos;amélioration continue de notre programme de
          stage.
        </p>
      </div>
    </div>
  );
}
