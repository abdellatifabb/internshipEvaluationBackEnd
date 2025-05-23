"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Printer, ArrowLeft, AlertCircle, Trash2, User, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { fetchEvaluationById, deleteEvaluation } from "@/backend/evalution/evalution.api";

type Evaluation = any; // Using any for now, but ideally would define a proper type

export default function EvaluationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvaluation = async () => {
      try {
        setLoading(true);
        const data = await fetchEvaluationById(Number(id));
        setEvaluation(data);
        setError("");
      } catch (err) {
        console.error("Error loading evaluation:", err);
        setError("Erreur lors du chargement de l'évaluation");
      } finally {
        setLoading(false);
      }
    };

    loadEvaluation();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette évaluation ?")) {
      try {
        await deleteEvaluation(Number(id));
        router.push("/evaluations");
      } catch (err) {
        console.error("Error deleting evaluation:", err);
        setError("Erreur lors de la suppression de l'évaluation");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>Évaluation non trouvée</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Extract data from the evaluation object
  // Get periode data
  const periode = evaluation.periode || {};
  const startDate = periode && periode.datedebut ? new Date(periode.datedebut).toLocaleDateString() : 'Non spécifié';
  const endDate = periode && periode.datefin ? new Date(periode.datefin).toLocaleDateString() : 'Non spécifié';
  const periodeDisplay = startDate !== 'Non spécifié' && endDate !== 'Non spécifié' ? `${startDate} - ${endDate}` : 'Non spécifié';
  
  // Get stagiaire data
  const stagiaire = evaluation.stagiaire || {};
  const stagiaireFullName = stagiaire && stagiaire.nom && stagiaire.prenom ? `${stagiaire.nom} ${stagiaire.prenom}` : 'Non spécifié';
  
  // Get tutor data
  const tutor = evaluation.tutor || {};
  const tutorFullName = tutor && tutor.nom && tutor.prenom ? `${tutor.nom} ${tutor.prenom}` : 'Non spécifié';
  
  // Get stage data
  const stage = evaluation.stage || {};
  const projectTheme = stage && stage.description ? stage.description : 'Non spécifié';
  const objectives = stage && stage.objectif ? stage.objectif : 'Non spécifié';
  const companyName = stage && stage.entreprise ? stage.entreprise : 'Non spécifié';
  
  // Get evaluations data
  const evaluations = evaluation.evaluations || [];
  
  // Get competences data
  const competences = evaluation.competences || [];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/evaluations">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Évaluation de Stage</h1>
        </div>
        <div className="flex space-x-2">
          <Link href={`/evaluations/${id}/print`}>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" /> Imprimer
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" /> Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  <h3 className="font-medium">Stagiaire:</h3>
                </div>
                <p className="text-gray-700">{stagiaireFullName}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  <h3 className="font-medium">Tuteur:</h3>
                </div>
                <p className="text-gray-700">{tutorFullName}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <h3 className="font-medium">Période:</h3>
                </div>
                <p className="text-gray-700">{periodeDisplay}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Détails du Projet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Entreprise:</span>
                <p className="text-gray-700 mt-1">{companyName}</p>
              </div>
              <div className="mt-4">
                <span className="font-medium">Thème du projet:</span>
                <p className="text-gray-700 mt-1">{projectTheme}</p>
              </div>
              <div className="mt-4">
                <span className="font-medium">Objectifs:</span>
                <p className="text-gray-700 mt-1">{objectives}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
