"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { AlertCircle, CheckCircle2, User } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Stagiaire } from "../type";
import { createStagiaire, updateStagiaire } from "../backend/entities/entities.api";

interface StagiaireFormProps {
  onStagiaireCreated?: () => void;
  editStagiaire?: Stagiaire;
}

export default function StagiaireForm({ onStagiaireCreated, editStagiaire }: StagiaireFormProps) {
  const [formData, setFormData] = useState<Stagiaire>(
    editStagiaire || {
      nom: "",
      prenom: "",
      email: "",
      institution: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateFormData = (field: keyof Stagiaire, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formData.institution?.trim()) {
      newErrors.institution = "L'institution est requise";
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
      if (editStagiaire?.id) {
        await updateStagiaire(editStagiaire.id, formData);
      } else {
        await createStagiaire(formData);
      }
      
      setSubmitSuccess(true);
      
      if (!editStagiaire) {
        // Reset form if it's a new stagiaire
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          institution: "",
        });
      }
      
      if (onStagiaireCreated) {
        onStagiaireCreated();
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
          <User className="h-5 w-5" />
          {editStagiaire ? "Modifier un stagiaire" : "Ajouter un stagiaire"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {submitSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {editStagiaire 
                ? "Le stagiaire a été mis à jour avec succès" 
                : "Le stagiaire a été ajouté avec succès"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => updateFormData("nom", e.target.value)}
                className={errors.nom ? "border-red-500" : ""}
              />
              {errors.nom && (
                <p className="text-red-500 text-sm">{errors.nom}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => updateFormData("prenom", e.target.value)}
                className={errors.prenom ? "border-red-500" : ""}
              />
              {errors.prenom && (
                <p className="text-red-500 text-sm">{errors.prenom}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => updateFormData("institution", e.target.value)}
              className={errors.institution ? "border-red-500" : ""}
            />
            {errors.institution && (
              <p className="text-red-500 text-sm">{errors.institution}</p>
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
                : editStagiaire 
                  ? "Mettre à jour" 
                  : "Ajouter le stagiaire"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
