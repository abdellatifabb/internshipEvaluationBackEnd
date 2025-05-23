"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Loader2 } from "lucide-react";
import { apiInstance } from "@/backend/axios/axios.api";
import { Periode, Stage, Stagiaire, Tutor } from "@/type";

interface InternshipSelectorProps {
  onSelectionComplete: (data: {
    studentName: string;
    companyName: string;
    tutorName: string;
    startDate: string;
    endDate: string;
    projectTheme: string;
    objectives: string;
    // Added entity IDs
    stagiaireId: number;
    tutorId: number;
    stageId: number;
  }) => void;
}

export function InternshipSelector({ onSelectionComplete }: InternshipSelectorProps) {
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState<Stage[]>([]);
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [periodes, setPeriodes] = useState<Periode[]>([]);
  
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedStagiaire, setSelectedStagiaire] = useState<string>("");
  const [selectedTutor, setSelectedTutor] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [stagesRes, stagiairesRes, tutorsRes, periodesRes] = await Promise.all([
          apiInstance.get('/api/stage/'),
          apiInstance.get('/api/stagiaire/'),
          apiInstance.get('/api/tutor/'),
          apiInstance.get('/api/periode/')
        ]);
        
        setStages(stagesRes.data);
        setStagiaires(stagiairesRes.data);
        setTutors(tutorsRes.data);
        setPeriodes(periodesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleContinue = () => {
    // Find the selected objects
    const stage = stages.find(s => s.id === Number(selectedStage));
    const stagiaire = stagiaires.find(s => s.id === Number(selectedStagiaire));
    const tutor = tutors.find(t => t.id === Number(selectedTutor));
    
    if (stage && stagiaire && tutor && startDate && endDate) {
      onSelectionComplete({
        studentName: `${stagiaire.nom} ${stagiaire.prenom}`,
        companyName: stage.entreprise,
        tutorName: `${tutor.nom} ${tutor.prenom}`,
        startDate: startDate,
        endDate: endDate,
        projectTheme: stage.description,
        objectives: stage.objectif,
        // Pass entity IDs
        stagiaireId: stagiaire.id as number,
        tutorId: tutor.id as number,
        stageId: stage.id as number
      });
    }
  };
  
  const isSelectionComplete = selectedStage && selectedStagiaire && selectedTutor && startDate && endDate;
  
  if (loading) {
    return (
      <Card className="mb-8 border-none shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            Chargement des données...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-8 border-none shadow-lg">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold">
          Sélection du Stage à Évaluer
        </CardTitle>
        <p className="text-xl mt-2 opacity-90">
          Veuillez sélectionner les informations du stage
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="stagiaire-select" className="text-sm font-medium">
              Stagiaire
            </Label>
            <Select value={selectedStagiaire} onValueChange={setSelectedStagiaire}>
              <SelectTrigger id="stagiaire-select">
                <SelectValue placeholder="Sélectionnez un stagiaire" />
              </SelectTrigger>
              <SelectContent>
                {stagiaires.map((stagiaire) => (
                  <SelectItem key={stagiaire.id} value={String(stagiaire.id)}>
                    {stagiaire.nom} {stagiaire.prenom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stage-select" className="text-sm font-medium">
              Stage
            </Label>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger id="stage-select">
                <SelectValue placeholder="Sélectionnez un stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={String(stage.id)}>
                    {stage.description} ({stage.entreprise})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tutor-select" className="text-sm font-medium">
              Tuteur
            </Label>
            <Select value={selectedTutor} onValueChange={setSelectedTutor}>
              <SelectTrigger id="tutor-select">
                <SelectValue placeholder="Sélectionnez un tuteur" />
              </SelectTrigger>
              <SelectContent>
                {tutors.map((tutor) => (
                  <SelectItem key={tutor.id} value={String(tutor.id)}>
                    {tutor.nom} {tutor.prenom} ({tutor.entreprise})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="periode-dates" className="text-sm font-medium">
              Période du stage
            </Label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Label htmlFor="start-date" className="text-xs text-gray-500 flex items-center mb-1">
                  <Calendar className="h-3 w-3 mr-1" /> Date de début
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <span className="text-gray-500 mt-6">au</span>
              <div className="flex-1">
                <Label htmlFor="end-date" className="text-xs text-gray-500 flex items-center mb-1">
                  <Calendar className="h-3 w-3 mr-1" /> Date de fin
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4" 
            onClick={handleContinue}
            disabled={!isSelectionComplete}
          >
            Continuer avec cette sélection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
