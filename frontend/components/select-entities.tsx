"use client";

import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../components/ui/select";
import { Label } from "../components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Stagiaire, Tutor, Stage, Periode } from "../type";
import { fetchStagiaires, fetchTutors, fetchStages } from "../backend/entities/entities.api";
import { Skeleton } from "../components/ui/skeleton";

interface SelectStagiaireProps {
  value: string;
  onChange: (value: string, stagiaireData?: Stagiaire) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export function SelectStagiaire({ 
  value, 
  onChange, 
  error, 
  label = "Stagiaire", 
  required = true 
}: SelectStagiaireProps) {
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch stagiaires on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchStagiairesData = async () => {
      try {
        setLoading(true);
        const data = await fetchStagiaires();
        if (isMounted) {
          setStagiaires(data);
          setFetchError("");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching stagiaires:", error);
          setFetchError(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des stagiaires");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStagiairesData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle selection change
  const handleValueChange = (selectedValue: string) => {
    console.log("Selected stagiaire ID:", selectedValue);
    
    // Find the selected stagiaire by ID
    const selectedStagiaire = stagiaires.find(stagiaire => 
      stagiaire.id !== undefined && stagiaire.id !== null && 
      stagiaire.id.toString() === selectedValue
    );
    
    console.log("Found stagiaire:", selectedStagiaire);
    
    // Call the onChange handler with the selected value and stagiaire data
    onChange(selectedValue, selectedStagiaire);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="stagiaire-select">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {fetchError && (
        <Alert className="mb-2 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{fetchError}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select 
          value={value} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger id="stagiaire-select" className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner un stagiaire" />
          </SelectTrigger>
          <SelectContent>
            {stagiaires.length === 0 ? (
              <div className="p-2 text-center text-sm text-gray-500">Aucun stagiaire trouvé</div>
            ) : (
              stagiaires.map((stagiaire) => (
                <SelectItem 
                  key={stagiaire.id || `stagiaire-${stagiaire.nom}-${stagiaire.prenom}`} 
                  value={stagiaire.id?.toString() || ''}
                >
                  {stagiaire.prenom} {stagiaire.nom}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

interface SelectTutorProps {
  value: string;
  onChange: (value: string, tutorData?: Tutor) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export function SelectTutor({ 
  value, 
  onChange, 
  error, 
  label = "Tuteur", 
  required = true 
}: SelectTutorProps) {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch tutors on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchTutorsData = async () => {
      try {
        setLoading(true);
        const data = await fetchTutors();
        if (isMounted) {
          setTutors(data);
          setFetchError("");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching tutors:", error);
          setFetchError(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des tuteurs");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTutorsData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle selection change
  const handleValueChange = (selectedValue: string) => {
    console.log("Selected tutor ID:", selectedValue);
    
    // Find the selected tutor by ID
    const selectedTutor = tutors.find(tutor => 
      tutor.id !== undefined && tutor.id !== null && 
      tutor.id.toString() === selectedValue
    );
    
    console.log("Found tutor:", selectedTutor);
    
    // Call the onChange handler with the selected value and tutor data
    onChange(selectedValue, selectedTutor);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="tutor-select">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {fetchError && (
        <Alert className="mb-2 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{fetchError}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select 
          value={value} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger id="tutor-select" className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner un tuteur" />
          </SelectTrigger>
          <SelectContent>
            {tutors.length === 0 ? (
              <div className="p-2 text-center text-sm text-gray-500">Aucun tuteur trouvé</div>
            ) : (
              tutors.map((tutor) => (
                <SelectItem 
                  key={tutor.id || `tutor-${tutor.nom}-${tutor.prenom}`} 
                  value={tutor.id?.toString() || ''}
                >
                  {tutor.prenom} {tutor.nom}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

interface SelectStageProps {
  value: string;
  onChange: (value: string, stageData?: Stage) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

export function SelectStage({ 
  value, 
  onChange, 
  error, 
  label = "Stage", 
  required = true 
}: SelectStageProps) {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch stages on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchStagesData = async () => {
      try {
        setLoading(true);
        const data = await fetchStages();
        if (isMounted) {
          setStages(data);
          setFetchError("");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching stages:", error);
          setFetchError(error instanceof Error ? error.message : "Une erreur est survenue lors du chargement des stages");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStagesData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle selection change
  const handleValueChange = (selectedValue: string) => {
    console.log("Selected stage ID:", selectedValue);
    
    // Find the selected stage by ID
    const selectedStage = stages.find(stage => 
      stage.id !== undefined && stage.id !== null && 
      stage.id.toString() === selectedValue
    );
    
    console.log("Found stage:", selectedStage);
    
    // Call the onChange handler with the selected value and stage data
    onChange(selectedValue, selectedStage);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="stage-select">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {fetchError && (
        <Alert className="mb-2 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{fetchError}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select 
          value={value} 
          onValueChange={handleValueChange}
        >
          <SelectTrigger id="stage-select" className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner un stage" />
          </SelectTrigger>
          <SelectContent>
            {stages.length === 0 ? (
              <div className="p-2 text-center text-sm text-gray-500">Aucun stage trouvé</div>
            ) : (
              stages.map((stage) => (
                <SelectItem 
                  key={stage.id || `stage-${stage.entreprise}`} 
                  value={stage.id?.toString() || ''}
                >
                  Stage chez {stage.entreprise}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
