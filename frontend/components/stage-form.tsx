"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Textarea } from "../components/ui/textarea";
import { Stage } from "../type";
import { createStage, updateStage } from "../backend/entities/entities.api";

interface StageFormProps {
  onStageCreated?: () => void;
  editStage?: Stage;
}

export default function StageForm({ onStageCreated, editStage }: StageFormProps) {
  const [formData, setFormData] = useState<Stage>(
    editStage || {
      description: "",
      objectif: "",
      entreprise: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateFormData = (field: keyof Stage, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }
    
    if (!formData.objectif.trim()) {
      newErrors.objectif = "L'objectif est requis";
    }
    
    if (!formData.entreprise.trim()) {
      newErrors.entreprise = "L'entreprise est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");
    
    try {
      if (editStage?.id) {
        await updateStage(editStage.id, formData);
      } else {
        await createStage(formData);
      }
      
      setSubmitSuccess(true);
      
      if (!editStage) {
        // Reset form if it's a new stage
        setFormData({
          description: "",
          objectif: "",
          entreprise: "",
        });
      }
      
      if (onStageCreated) {
        onStageCreated();
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <FileText className="h-5 w-5" />
          {editStage ? "Modifier un stage" : "Ajouter un stage"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {submitSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {editStage 
                ? "Le stage a été mis à jour avec succès" 
                : "Le stage a été ajouté avec succès"}
            </AlertDescription>
          </Alert>
        )}
        
        {submitError && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {submitError}
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entreprise">Entreprise</Label>
            <Input
              id="entreprise"
              value={formData.entreprise}
              onChange={(e) => updateFormData("entreprise", e.target.value)}
              className={errors.entreprise ? "border-red-500" : ""}
            />
            {errors.entreprise && (
              <p className="text-red-500 text-sm">{errors.entreprise}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="objectif">Objectifs</Label>
            <Textarea
              id="objectif"
              value={formData.objectif}
              onChange={(e) => updateFormData("objectif", e.target.value)}
              className={errors.objectif ? "border-red-500" : ""}
              rows={4}
            />
            {errors.objectif && (
              <p className="text-red-500 text-sm">{errors.objectif}</p>
            )}
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting 
                ? "Traitement en cours..." 
                : editStage 
                  ? "Mettre à jour" 
                  : "Ajouter le stage"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
