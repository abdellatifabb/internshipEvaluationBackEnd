"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Users, User } from "lucide-react";
import { CompetencyEvaluation } from "@/type";

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

export function CompetenciesPage({
  data,
  updateData,
  updateNestedData,
  errors,
  showErrors,
}: CompetenciesPageProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Évaluation des compétences
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Évaluez les compétences acquises par le stagiaire
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <User className="mr-2 h-5 w-5 text-blue-600" />
          Compétences individuelles
        </h3>

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
                    1
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    2
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    3
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    4
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-3 border-t">Autonomie</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="ind-comp-0"
                        value={data.individualCompetencies[0] || ""}
                        onValueChange={(value) =>
                          updateNestedData("individualCompetencies", 0, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border-t">Capacité d&apos;adaptation</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="ind-comp-1"
                        value={data.individualCompetencies[1] || ""}
                        onValueChange={(value) =>
                          updateNestedData("individualCompetencies", 1, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="p-3 border-t">Prise d&apos;initiative</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="ind-comp-2"
                        value={data.individualCompetencies[2] || ""}
                        onValueChange={(value) =>
                          updateNestedData("individualCompetencies", 2, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <Label
            htmlFor="individual-note"
            className="text-sm font-medium flex items-center"
          >
            <span className="text-red-500 mr-1">*</span>
            Note pour évaluer les Compétences individuelles
          </Label>
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
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-600" />
          Compétences en entreprise
        </h3>

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
                    1
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    2
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    3
                  </th>
                  <th className="p-3 text-center font-medium text-gray-700 w-20">
                    4
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="p-3 border-t">Travail en équipe</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="comp-comp-0"
                        value={data.companyCompetencies[0] || ""}
                        onValueChange={(value) =>
                          updateNestedData("companyCompetencies", 0, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border-t">Communication</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="comp-comp-1"
                        value={data.companyCompetencies[1] || ""}
                        onValueChange={(value) =>
                          updateNestedData("companyCompetencies", 1, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="p-3 border-t">Respect des délais</td>
                  {["na", "1", "2", "3", "4"].map((level) => (
                    <td key={level} className="p-3 text-center border-t">
                      <RadioGroup
                        name="comp-comp-2"
                        value={data.companyCompetencies[2] || ""}
                        onValueChange={(value) =>
                          updateNestedData("companyCompetencies", 2, value)
                        }
                        className="flex justify-center"
                      >
                        <RadioGroupItem
                          value={level}
                          className="h-5 w-5 text-blue-600"
                        />
                      </RadioGroup>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
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
