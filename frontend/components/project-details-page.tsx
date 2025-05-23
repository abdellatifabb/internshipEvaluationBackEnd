"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { ProjectDetails } from "@/type";

interface ProjectDetailsPageProps {
  data: ProjectDetails;
  updateData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  showErrors: boolean;
}

export function ProjectDetailsPage({
  data,
  updateData,
  errors,
  showErrors,
}: ProjectDetailsPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-700 flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Détails du projet
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Décrivez le thème du projet et ses objectifs
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-theme" className="text-gray-700">
            Thème du projet <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="project-theme"
            placeholder="Décrivez le thème général du projet"
            className={`min-h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.projectTheme ? "border-red-500" : ""
            }`}
            value={data.projectTheme}
            onChange={(e) => updateData("projectTheme", e.target.value)}
          />
          {showErrors && errors?.projectTheme && (
            <p className="text-red-500 text-sm">{errors.projectTheme}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives" className="text-gray-700">
            Objectifs <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="objectives"
            placeholder="Listez les objectifs principaux du stage"
            className={`min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
              showErrors && errors?.objectives ? "border-red-500" : ""
            }`}
            value={data.objectives}
            onChange={(e) => updateData("objectives", e.target.value)}
          />
          {showErrors && errors?.objectives && (
            <p className="text-red-500 text-sm">{errors.objectives}</p>
          )}
        </div>
      </div>
    </div>
  );
}
