"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ClipboardList } from "lucide-react";
import { SpecificCompetencies } from "@/type";

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

export function SpecificCompetenciesPage({
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
