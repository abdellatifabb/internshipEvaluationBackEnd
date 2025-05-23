"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";
import { PerformanceEvaluation } from "@/type";

interface PerformanceEvaluationPageProps {
  data: PerformanceEvaluation;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

export function PerformanceEvaluationPage({
  data,
  updateData,
  errors,
  showErrors,
}: PerformanceEvaluationPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 flex items-center">
          <Briefcase className="mr-2 h-5 w-5" />
          Évaluation de la performance
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Évaluez la performance du stagiaire pendant son stage
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Implication dans le travail
            </h3>
            <p className="text-sm text-gray-600">
              Évaluez l&apos;implication du stagiaire dans son travail
            </p>
          </div>

          <RadioGroup
            value={data.implication}
            onValueChange={(value) => updateData("implication", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="tres-forte"
                id="implication-tres-forte"
                className="text-blue-600"
              />
              <Label
                htmlFor="implication-tres-forte"
                className="text-gray-700 cursor-pointer"
              >
                Très forte implication
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="forte"
                id="implication-forte"
                className="text-blue-600"
              />
              <Label
                htmlFor="implication-forte"
                className="text-gray-700 cursor-pointer"
              >
                Forte implication
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="moyenne"
                id="implication-moyenne"
                className="text-blue-600"
              />
              <Label
                htmlFor="implication-moyenne"
                className="text-gray-700 cursor-pointer"
              >
                Implication moyenne
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="faible"
                id="implication-faible"
                className="text-blue-600"
              />
              <Label
                htmlFor="implication-faible"
                className="text-gray-700 cursor-pointer"
              >
                Faible implication
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Ouverture aux conseils
            </h3>
            <p className="text-sm text-gray-600">
              Évaluez la capacité du stagiaire à recevoir et appliquer les
              conseils
            </p>
          </div>

          <RadioGroup
            value={data.openness}
            onValueChange={(value) => updateData("openness", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="tres-bonne"
                id="openness-tres-bonne"
                className="text-blue-600"
              />
              <Label
                htmlFor="openness-tres-bonne"
                className="text-gray-700 cursor-pointer"
              >
                Très bonne ouverture
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="bonne"
                id="openness-bonne"
                className="text-blue-600"
              />
              <Label
                htmlFor="openness-bonne"
                className="text-gray-700 cursor-pointer"
              >
                Bonne ouverture
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="moyenne"
                id="openness-moyenne"
                className="text-blue-600"
              />
              <Label
                htmlFor="openness-moyenne"
                className="text-gray-700 cursor-pointer"
              >
                Ouverture moyenne
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="faible"
                id="openness-faible"
                className="text-blue-600"
              />
              <Label
                htmlFor="openness-faible"
                className="text-gray-700 cursor-pointer"
              >
                Faible ouverture
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Qualité du travail
            </h3>
            <p className="text-sm text-gray-600">
              Évaluez la qualité du travail fourni par le stagiaire
            </p>
          </div>

          <RadioGroup
            value={data.quality}
            onValueChange={(value) => updateData("quality", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="excellente-qualite"
                id="quality-excellente"
                className="text-blue-600"
              />
              <Label
                htmlFor="quality-excellente"
                className="text-gray-700 cursor-pointer"
              >
                Excellente qualité
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="bonne-qualite"
                id="quality-bonne"
                className="text-blue-600"
              />
              <Label
                htmlFor="quality-bonne"
                className="text-gray-700 cursor-pointer"
              >
                Bonne qualité
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="qualite-moyenne"
                id="quality-moyenne"
                className="text-blue-600"
              />
              <Label
                htmlFor="quality-moyenne"
                className="text-gray-700 cursor-pointer"
              >
                Qualité moyenne
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="qualite-insuffisante"
                id="quality-insuffisante"
                className="text-blue-600"
              />
              <Label
                htmlFor="quality-insuffisante"
                className="text-gray-700 cursor-pointer"
              >
                Qualité insuffisante
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Observations <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-600">
              Ajoutez vos observations générales sur la performance du stagiaire
            </p>
          </div>

          <Textarea
            placeholder="Vos observations..."
            className={`min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
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
