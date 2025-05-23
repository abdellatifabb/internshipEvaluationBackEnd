"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Edit, Plus, Trash2, User } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Stagiaire } from "../type";
import StagiaireForm from "./stagiaire-form";
import { fetchStagiaires as fetchStagiairesApi, deleteStagiaire as deleteStagiaireApi } from "../backend/entities/entities.api";

export default function StagiaireList() {
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStagiaire, setEditingStagiaire] = useState<Stagiaire | null>(null);

  const fetchStagiaires = async () => {
    setLoading(true);
    try {
      const data = await fetchStagiairesApi();
      setStagiaires(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      console.error("Error fetching stagiaires:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStagiaires();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce stagiaire ?")) {
      return;
    }

    try {
      await deleteStagiaireApi(id);
      fetchStagiaires(); // Refresh the list after deletion
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue lors de la suppression");
      console.error("Error deleting stagiaire:", error);
    }
  };

  const handleEdit = (stagiaire: Stagiaire) => {
    setEditingStagiaire(stagiaire);
    setShowAddForm(false);
  };

  const handleFormSuccess = () => {
    fetchStagiaires();
    setShowAddForm(false);
    setEditingStagiaire(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Stagiaires</h2>
        <Button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingStagiaire(null);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un stagiaire
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
          <StagiaireForm onStagiaireCreated={handleFormSuccess} />
        </div>
      )}

      {editingStagiaire && (
        <div className="mb-6">
          <StagiaireForm 
            editStagiaire={editingStagiaire} 
            onStagiaireCreated={handleFormSuccess} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-4">Chargement des stagiaires...</p>
        ) : stagiaires.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-gray-500">Aucun stagiaire trouvé</p>
            </CardContent>
          </Card>
        ) : (
          stagiaires.map((stagiaire) => (
            <Card key={stagiaire.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-3">
                <CardTitle className="flex items-center text-blue-800 text-lg">
                  <User className="h-5 w-5 mr-2" />
                  {stagiaire.prenom} {stagiaire.nom}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{stagiaire.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p>{stagiaire.institution}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(stagiaire)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => stagiaire.id && handleDelete(stagiaire.id)}
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
