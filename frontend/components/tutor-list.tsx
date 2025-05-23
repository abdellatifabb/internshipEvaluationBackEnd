"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Briefcase, Edit, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tutor } from "../type";
import TutorForm from "./tutor-form";
import { fetchTutors as fetchTutorsApi, deleteTutor as deleteTutorApi } from "../backend/entities/entities.api";

export default function TutorList() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const data = await fetchTutorsApi();
      setTutors(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue");
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce tuteur ?")) return;
    
    try {
      await deleteTutorApi(id);
      fetchTutors();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue lors de la suppression");
      console.error("Error deleting tutor:", error);
    }
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setShowAddForm(false);
  };

  const handleFormSuccess = () => {
    fetchTutors();
    setShowAddForm(false);
    setEditingTutor(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Tuteurs</h2>
        <Button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingTutor(null);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un tuteur
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
          <TutorForm onTutorCreated={handleFormSuccess} />
        </div>
      )}

      {editingTutor && (
        <div className="mb-6">
          <TutorForm 
            editTutor={editingTutor} 
            onTutorCreated={handleFormSuccess} 
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center py-4">Chargement des tuteurs...</p>
        ) : tutors.length === 0 ? (
          <Card>
            <CardContent className="py-4">
              <p className="text-center text-gray-500">Aucun tuteur trouvé</p>
            </CardContent>
          </Card>
        ) : (
          tutors.map((tutor) => (
            <Card key={tutor.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-3">
                <CardTitle className="flex items-center text-blue-800 text-lg">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {tutor.prenom} {tutor.nom}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{tutor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Entreprise</p>
                    <p>{tutor.entreprise}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(tutor)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => tutor.id && handleDelete(tutor.id)}
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
