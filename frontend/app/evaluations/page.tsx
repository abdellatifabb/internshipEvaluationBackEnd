"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Printer, 
  Trash2, 
  AlertCircle, 
  Calendar, 
  User, 
  Briefcase,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { fetchEvaluations, deleteEvaluation } from "@/backend/evalution/evalution.api";

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEvaluations = async () => {
    setLoading(true);
    try {
      const data = await fetchEvaluations();
      console.log('Loaded evaluations:', data);
      setEvaluations(data);
    } catch (error: any) {
      console.error('Error loading evaluations:', error);
      setError(error.message || "Une erreur est survenue lors du chargement des évaluations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvaluations();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette évaluation ?")) {
      return;
    }

    try {
      await deleteEvaluation(id);
      // Refresh the list
      loadEvaluations();
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Liste des évaluations</h1>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Nouvelle évaluation
          </Button>
        </Link>
      </div>

      {evaluations.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">Aucune évaluation trouvée</h3>
              <p className="text-gray-500 mt-2">
                Commencez par créer une nouvelle évaluation
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4">
                <CardTitle className="flex items-center text-blue-800 text-lg">
                  <FileText className="h-5 w-5 mr-2" />
                  Évaluation #{evaluation.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-2">
                    <User className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Stagiaire</p>
                      <p className="text-gray-800">
                        {evaluation.stagiaire ? 
                          `${evaluation.stagiaire.prenom || ''} ${evaluation.stagiaire.nom || ''}`.trim() || "Non spécifié" : 
                          "Non spécifié"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Entreprise</p>
                      <p className="text-gray-800">
                        {evaluation.stage?.entreprise || "Non spécifiée"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Période</p>
                      <p className="text-gray-800">
                        {evaluation.periode?.datedebut ? 
                          `${new Date(evaluation.periode.datedebut).toLocaleDateString()} - ${evaluation.periode.datefin ? new Date(evaluation.periode.datefin).toLocaleDateString() : '?'}` : 
                          "Non spécifiée"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Tuteur: {evaluation.tutor ? 
                      `${evaluation.tutor.prenom || ''} ${evaluation.tutor.nom || ''}`.trim() || "Non spécifié" : 
                      "Non spécifié"}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/evaluations/${evaluation.id}`}>
                      <Button variant="outline" className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>Voir</span>
                      </Button>
                    </Link>
                    
                    <Link href={`/evaluations/${evaluation.id}/print`}>
                      <Button variant="outline" className="flex items-center space-x-1">
                        <Printer className="h-4 w-4" />
                        <span>Imprimer</span>
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(evaluation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
