"use client";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { User, Calendar, Briefcase } from "lucide-react";
import { PersonalInfo } from "../type";
import { SelectStagiaire, SelectTutor, SelectStage } from "./select-entities";

interface PersonalInfoPageProps {
  data: PersonalInfo;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

export default function ModifiedPersonalInfoPage({
  data,
  updateData,
  errors,
  showErrors,
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
                value={data.studentName}
                onChange={(value) => updateData("studentName", value)}
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
                value={data.tutorName}
                onChange={(value) => updateData("tutorName", value)}
                error={showErrors && errors?.tutorName ? errors.tutorName : undefined}
                label="Tuteur"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <SelectStage
              value={data.companyName}
              onChange={(value) => updateData("companyName", value)}
              error={showErrors && errors?.companyName ? errors.companyName : undefined}
              label="Stage"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date de début
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={data.startDate}
                  onChange={(e) => updateData("startDate", e.target.value)}
                  className={
                    showErrors && errors?.startDate ? "border-red-500" : ""
                  }
                />
                {showErrors && errors?.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date de fin
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={data.endDate}
                  onChange={(e) => updateData("endDate", e.target.value)}
                  className={
                    showErrors && errors?.endDate ? "border-red-500" : ""
                  }
                />
                {showErrors && errors?.endDate && (
                  <p className="text-red-500 text-sm">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
