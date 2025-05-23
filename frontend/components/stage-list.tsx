"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Edit, FileText, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Stage } from "../type";
import StageForm from "./stage-form";
import { fetchStages as fetchStagesApi, deleteStage as deleteStageApi } from "../backend/entities/entities.api";

export default function StageList() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);

  const fetchStages = async () => {
    setLoading(true);
    try {
      const data = await fetchStagesApi();
      setStages(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      console.error("Error fetching stages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce stage ?")) {
      return;
    }

    try {
      await deleteStageApi(id);
      fetchStages(); // Refresh the list after deletion
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue lors de la suppression");
      console.error("Error deleting stage:", error);
    }
  };

  const handleEdit = (stage: Stage) => {
    setEditingStage(stage);
    setShowAddForm(false);
  };

  const handleFormSuccess = () => {
    fetchStages();
    setShowAddForm(false);
    setEditingStage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Stages</h2>
        <Button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingStage(null);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un stage
        </Button>
      </div>

      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {showAddForm && (
        <div className="mb-6">
          <StageForm onStageCreated={handleFormSuccess} />
        </div>
      )}

      {editingStage && (
        <div className="mb-6">
          <StageForm 
            editStage={editingStage} 
            onStageCreated={handleFormSuccess} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-4">Chargement des stages...</p>
        ) : stages.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-gray-500">Aucun stage trouvé</p>
            </CardContent>
          </Card>
        ) : (
          stages.map((stage) => (
            <Card key={stage.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-3">
                <CardTitle className="flex items-center text-blue-800 text-lg">
                  <FileText className="h-5 w-5 mr-2" />
                  Stage chez {stage.entreprise}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="mt-1">{stage.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Objectifs</p>
                    <p className="mt-1">{stage.objectif}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(stage)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => stage.id && handleDelete(stage.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
