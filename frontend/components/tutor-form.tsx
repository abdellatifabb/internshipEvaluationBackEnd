"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { AlertCircle, CheckCircle2, Briefcase } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tutor } from "../type";
import { createTutor, updateTutor } from "../backend/entities/entities.api";

interface TutorFormProps {
  onTutorCreated?: () => void;
  editTutor?: Tutor;
}

export default function TutorForm({ onTutorCreated, editTutor }: TutorFormProps) {
  const [formData, setFormData] = useState<Tutor>(
    editTutor || {
      nom: "",
      prenom: "",
      email: "",
      entreprise: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateFormData = (field: keyof Tutor, value: string) => {
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
      if (editTutor?.id) {
        await updateTutor(editTutor.id, formData);
      } else {
        await createTutor(formData);
      }
      
      setSubmitSuccess(true);
      
      if (!editTutor) {
        // Reset form if it's a new tutor
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          entreprise: "",
        });
      }
      
      if (onTutorCreated) {
        onTutorCreated();
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
          <Briefcase className="h-5 w-5" />
          {editTutor ? "Modifier un tuteur" : "Ajouter un tuteur"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {submitSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {editTutor 
                ? "Le tuteur a été mis à jour avec succès" 
                : "Le tuteur a été ajouté avec succès"}
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
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting 
                ? "Traitement en cours..." 
                : editTutor 
                  ? "Mettre à jour" 
                  : "Ajouter le tuteur"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
