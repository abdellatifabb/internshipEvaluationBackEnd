"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Printer, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { fetchEvaluationById } from "@/backend/evalution/evalution.api";

type Evaluation = any; // Using any for now, but ideally would define a proper type

export default function EvaluationPrintPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvaluation = async () => {
      try {
        setLoading(true);
        console.log(`Fetching evaluation with ID: ${id}`);
        const data = await fetchEvaluationById(Number(id));
        console.log('Received evaluation data:', data);
        console.log('Stagiaire data:', data.stagiaire);
        console.log('Tutor data:', data.tutor);
        console.log('Stage data:', data.stage);
        console.log('Periode data:', data.periode);
        console.log('Evaluations data:', data.evaluations);
        console.log('Competences data:', data.competences);
        console.log('Categories data:', data.categories);
        
        // Process competences data to match the expected format for the UI
        if (data.competences) {
          // Map competences to their types (individual, company, technical)
          const processedCompetences = [];
          
          // Process categories and add them as competences with proper level
          if (data.categories && data.categories.length > 0) {
            console.log('Processing categories for UI display');
            data.categories.forEach(category => {
              console.log('Processing category:', category);
              const parentCompetence = data.competences.find(c => c.id === category.competenceId);
              if (parentCompetence) {
                console.log('Found parent competence:', parentCompetence);
                console.log('Category value:', category.value);
                
                // Create a processed competence with the correct level format
                const processedCompetence = {
                  ...category,
                  intitule: category.intitule,
                  level: category.value, // Use value as level for UI (NA, DEBUTANT, AUTONOME, AUTONOME +)
                  competenceType: parentCompetence.intitule // individual, company, or specific
                };
                
                console.log('Created processed competence:', processedCompetence);
                processedCompetences.push(processedCompetence);
              }
            });
          } else {
            console.log('No categories found, creating default competences');
            
            // Create default competences for UI display
            const individualCompetencies = [
              "Être capable d'analyse et de synthèse",
              "Être capable de proposer des méthodes et des axes de travail",
              "Être capable de faire adhérer les acteurs",
              "Être capable de travailler dans un contexte international et interculturel",
              "Être capable de s'autoévaluer",
              "Être capable d'identifier des problèmes complexes"
            ];
            
            const companyCompetencies = [
              "Être capable d'analyser le fonctionnement de l'entreprise d'accueil",
              "Être capable d'identifier la réglementation, hiérarchie, droit du travail, etc.",
              "Être capable d'analyser la démarche projet, et d'organiser un projet",
              "Être capable de comprendre la politique environnementale de l'entreprise",
              "Être capable de rechercher l'information nécessaire à ses activités"
            ];
            
            // Add individual competencies
            individualCompetencies.forEach(competency => {
              processedCompetences.push({
                intitule: competency,
                level: 'NA',
                competenceType: 'individual'
              });
            });
            
            // Add company competencies
            companyCompetencies.forEach(competency => {
              processedCompetences.push({
                intitule: competency,
                level: 'NA',
                competenceType: 'company'
              });
            });
            
            // Add technical competency
            processedCompetences.push({
              intitule: "Être capable d'assurer la conception préliminaire de produits / services / processus / usages",
              level: 'NA',
              competenceType: 'specific'
            });
          }
          
          console.log('Final processed competences:', processedCompetences);
          // Add the processed competences to the data
          data.processedCompetences = processedCompetences;
        }
        
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

  useEffect(() => {
    // Auto-print when the page loads and data is available
    if (evaluation && !loading && !error) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [evaluation, loading, error]);

  const handlePrint = () => {
    window.print();
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

  // Extract data from the evaluation object and handle nested objects
  // First, log the entire evaluation object to see its structure
  console.log('Full evaluation object:', JSON.stringify(evaluation, null, 2));

  // Get periode data - check both direct properties and nested objects
  let periode = evaluation.periode || {};
  if (typeof periode === 'number') {
    // If periode is just an ID, try to get the actual periode object
    periode = evaluation.periodeObj || {};
  }
  
  const startDate = periode && periode.datedebut ? new Date(periode.datedebut).toLocaleDateString() : 'Non spécifié';
  const endDate = periode && periode.datefin ? new Date(periode.datefin).toLocaleDateString() : 'Non spécifié';
  const periodeDisplay = startDate !== 'Non spécifié' && endDate !== 'Non spécifié' ? `${startDate} - ${endDate}` : 'Non spécifié';
  
  // Get stagiaire data - check both direct properties and nested objects
  let stagiaire = evaluation.stagiaire || {};
  if (typeof stagiaire === 'number') {
    // If stagiaire is just an ID, try to get the actual stagiaire object
    stagiaire = evaluation.stagiaireObj || {};
  }
  // If stagiaire is still not found, try to get it from periode
  if ((!stagiaire || Object.keys(stagiaire).length === 0) && periode && periode.stagiaire) {
    stagiaire = periode.stagiaire;
  }
  
  const stagiaireFullName = stagiaire && stagiaire.nom && stagiaire.prenom ? 
    `${stagiaire.prenom} ${stagiaire.nom}` : 
    (evaluation.stagiaireNom ? evaluation.stagiaireNom : 'Non spécifié');
  
  // Get tutor data - check both direct properties and nested objects
  let tutor = evaluation.tutor || {};
  if (typeof tutor === 'number') {
    // If tutor is just an ID, try to get the actual tutor object
    tutor = evaluation.tutorObj || {};
  }
  
  const tutorFullName = tutor && tutor.nom && tutor.prenom ? 
    `${tutor.prenom} ${tutor.nom}` : 
    (evaluation.tutorNom ? evaluation.tutorNom : 'Non spécifié');
  
  // Get stage data - check both direct properties and nested objects
  let stage = evaluation.stage || {};
  if (typeof stage === 'number') {
    // If stage is just an ID, try to get the actual stage object
    stage = evaluation.stageObj || {};
  }
  // If stage is still not found, try to get it from periode
  if ((!stage || Object.keys(stage).length === 0) && periode && periode.stage) {
    stage = periode.stage;
  }
  
  const projectTheme = stage && stage.description ? stage.description : 
    (evaluation.projectTheme ? evaluation.projectTheme : 'Non spécifié');
    
  const objectives = stage && stage.objectif ? stage.objectif : 
    (evaluation.objectives ? evaluation.objectives : 'Non spécifié');
    
  const companyName = stage && stage.entreprise ? stage.entreprise : 
    (evaluation.companyName ? evaluation.companyName : 'Non spécifié');
  
  // Get evaluations data - handle both array and object formats
  let evaluations = [];
  if (evaluation.evaluations && Array.isArray(evaluation.evaluations)) {
    evaluations = evaluation.evaluations;
  } else if (evaluation.performanceEvaluation && Array.isArray(evaluation.performanceEvaluation)) {
    evaluations = evaluation.performanceEvaluation;
  }
  
  // Get competences data - handle both array and object formats
  let competences = [];
  if (evaluation.competences && Array.isArray(evaluation.competences)) {
    competences = evaluation.competences;
  } else if (evaluation.competencyEvaluation && Array.isArray(evaluation.competencyEvaluation)) {
    competences = evaluation.competencyEvaluation;
  }
  
  console.log('Processed data:', {
    stagiaireFullName,
    tutorFullName,
    companyName,
    periodeDisplay,
    projectTheme,
    objectives,
    evaluations,
    competences
  });

  return (
    <div className="container mx-auto py-8">
      <div className="print:hidden flex justify-between items-center mb-8">
        <Link href={`/evaluations/${id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Retour
          </Button>
        </Link>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" /> Imprimer
        </Button>
      </div>

      <div className="print:py-0 space-y-8">
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold mb-2">Évaluation de Stage</h1>
          <p className="text-gray-600">Rapport d'évaluation généré le {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 print:gap-4">
          <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Informations Personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Stagiaire:</p>
                <p className="text-gray-700">{stagiaireFullName}</p>
              </div>
              <div>
                <p className="font-medium">Tuteur:</p>
                <p className="text-gray-700">{tutorFullName}</p>
              </div>
              <div>
                <p className="font-medium">Entreprise:</p>
                <p className="text-gray-700">{companyName}</p>
              </div>
              <div>
                <p className="font-medium">Période:</p>
                <p className="text-gray-700">Du {startDate} au {endDate}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Détails du Projet</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Thème du projet:</p>
                <p className="text-gray-700">{projectTheme}</p>
              </div>
              <div>
                <p className="font-medium">Objectifs:</p>
                <p className="text-gray-700">{objectives}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Évaluation de la Performance</h2>
            <div className="space-y-4">
              {/* Fixed performance evaluation categories */}
              {[
                { id: 'implication', label: 'Implication' },
                { id: 'openness', label: 'Ouverture' },
                { id: 'quality', label: 'Qualité' }
              ].map((item: any, index: number) => {
                // Find the evaluation for this category if it exists
                const evaluation = evaluations?.find((e: any) => 
                  e.category === item.id || e.criteria === item.id || e.id === item.id
                );
                
                // Get the value, defaulting to 3 if not found
                const value = evaluation?.value || evaluation?.rating || '3';
                const valueNum = parseInt(value.toString());
                
                // Get the text value directly
                const textValue = valueNum === 1 ? 'Insuffisant' : 
                                 valueNum === 2 ? 'Passable' : 
                                 valueNum === 3 ? 'Satisfaisant' : 
                                 valueNum === 4 ? 'Bon' : 'Excellent';
                
                return (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <p className="font-medium">{item.label}: <span className="text-gray-700">{textValue}</span></p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Évaluation des Compétences</h2>
            
            {/* First competency section - Individual competencies */}
            <div className="mb-8">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Compétence</th>
                    <th className="border p-2 text-center w-16">NA</th>
                    <th className="border p-2 text-center w-24">DEBUTANT</th>
                    <th className="border p-2 text-center w-24">AUTONOME</th>
                    <th className="border p-2 text-center w-28">AUTONOME +</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Être capable d'analyse et de synthèse",
                    "Être capable de proposer des méthodes et des axes de travail",
                    "Être capable de faire adhérer les acteurs",
                    "Être capable de travailler dans un contexte international et interculturel",
                    "Être capable de s'autoévaluer",
                    "Être capable d'identifier des problèmes complexes"
                  ].map((competence, index) => {
                    // Find the evaluation for this competence if it exists
                    const competenceEval = evaluation?.processedCompetences?.find((c: any) => 
                      (c.intitule === competence || c.competency === competence) && 
                      c.competenceType === 'individual'
                    );
                    
                    console.log(`Competence: ${competence}`, competenceEval);
                    
                    // Get the level (NA, DEBUTANT, AUTONOME, AUTONOME +)
                    let level = (competenceEval?.level || 'NA').toUpperCase();
                    console.log(`Level for ${competence}:`, level);
                    
                    return (
                      <tr key={index} className="border">
                        <td className="border p-2">{competence}</td>
                        <td className="border p-2 text-center">{level === 'NA' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'DEBUTANT' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'AUTONOME' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'AUTONOME +' || level === 'AUTONOME+' || level === 'AUTONOME-PLUS' ? '✓' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-2">
                <p className="font-medium">NOTE</p>
                <p className="text-sm text-gray-600 mt-1">
                  {evaluation?.competences?.find((c: any) => c.intitule === 'individual')?.note || competences?.find((c: any) => c.intitule === 'individual')?.note || 'Non spécifié'}
                </p>
              </div>
            </div>
            
            {/* Second competency section - Company competencies */}
            <div className="mb-8">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Compétence</th>
                    <th className="border p-2 text-center w-16">NA</th>
                    <th className="border p-2 text-center w-24">DEBUTANT</th>
                    <th className="border p-2 text-center w-24">AUTONOME</th>
                    <th className="border p-2 text-center w-28">AUTONOME +</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Être capable d'analyser le fonctionnement de l'entreprise d'accueil",
                    "Être capable d'identifier la réglementation, hiérarchie, droit du travail, etc.",
                    "Être capable d'analyser la démarche projet, et d'organiser un projet",
                    "Être capable de comprendre la politique environnementale de l'entreprise",
                    "Être capable de rechercher l'information nécessaire à ses activités"
                  ].map((competence, index) => {
                    // Find the evaluation for this competence if it exists
                    const competenceEval = evaluation?.processedCompetences?.find((c: any) => 
                      (c.intitule === competence || c.competency === competence) && 
                      c.competenceType === 'company'
                    );
                    
                    console.log(`Company competence: ${competence}`, competenceEval);
                    
                    // Get the level (NA, DEBUTANT, AUTONOME, AUTONOME +)
                    let level = (competenceEval?.level || 'NA').toUpperCase();
                    console.log(`Level for company competence ${competence}:`, level);
                    
                    return (
                      <tr key={index} className="border">
                        <td className="border p-2">{competence}</td>
                        <td className="border p-2 text-center">{level === 'NA' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'DEBUTANT' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'AUTONOME' ? '✓' : ''}</td>
                        <td className="border p-2 text-center">{level === 'AUTONOME +' || level === 'AUTONOME+' || level === 'AUTONOME-PLUS' ? '✓' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="mt-2">
                <p className="font-medium">Donnez une note sur 20</p>
                <p className="text-sm text-gray-600 mt-1">
                  {evaluation?.competences?.find((c: any) => c.intitule === 'company')?.note || competences?.find((c: any) => c.intitule === 'company')?.note || 'Non spécifié'}
                </p>
              </div>
            </div>
            
            {/* Third competency section - Technical competency */}
            <div>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Compétence</th>
                    <th className="border p-2 text-center w-16">NA</th>
                    <th className="border p-2 text-center w-24">DEBUTANT</th>
                    <th className="border p-2 text-center w-24">AUTONOME</th>
                    <th className="border p-2 text-center w-28">AUTONOME +</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="border p-2">Être capable d'assurer la conception préliminaire de produits / services / processus / usages</td>
                    {(() => {
                      const techCompetence = evaluation?.processedCompetences?.find((c: any) => 
                        c.intitule === "Être capable d'assurer la conception préliminaire de produits / services / processus / usages" && 
                        c.competenceType === 'specific'
                      );
                      
                      console.log('Technical competence:', techCompetence);
                      
                      const level = (techCompetence?.level || 'NA').toUpperCase();
                      console.log('Technical competence level:', level);
                      
                      return (
                        <>
                          <td className="border p-2 text-center">{level === 'NA' ? '✓' : ''}</td>
                          <td className="border p-2 text-center">{level === 'DEBUTANT' ? '✓' : ''}</td>
                          <td className="border p-2 text-center">{level === 'AUTONOME' ? '✓' : ''}</td>
                          <td className="border p-2 text-center">{level === 'AUTONOME +' || level === 'AUTONOME+' || level === 'AUTONOME-PLUS' ? '✓' : ''}</td>
                        </>
                      );
                    })()}
                  </tr>
                </tbody>
              </table>
              <div className="mt-2">
                <p className="font-medium">Donnez une note sur 20</p>
                <p className="text-sm text-gray-600 mt-1">
                  {evaluation?.competences?.find((c: any) => c.intitule === 'specific')?.note || competences?.find((c: any) => c.intitule === 'specific')?.note || 'Non spécifié'}
                </p>
              </div>
            </div>
          </div>

          {evaluation.finalEvaluation && (
            <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">Évaluation Finale</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Commentaire général:</p>
                  <p className="text-gray-700">{evaluation.finalEvaluation.generalComment || 'Aucun commentaire'}</p>
                </div>
                <div>
                  <p className="font-medium">Points forts:</p>
                  <p className="text-gray-700">{evaluation.finalEvaluation.strengths || 'Non spécifié'}</p>
                </div>
                <div>
                  <p className="font-medium">Points à améliorer:</p>
                  <p className="text-gray-700">{evaluation.finalEvaluation.areasForImprovement || 'Non spécifié'}</p>
                </div>
                <div>
                  <p className="font-medium">Note finale:</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                      {evaluation.finalEvaluation.finalGrade || 'N/A'}
                    </div>
                    <span className="ml-3 text-gray-600">/20</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border rounded-lg p-6 print:border-none print:p-0 print:break-inside-avoid print:mt-8">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Signatures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div>
                <p className="font-medium mb-2">Tuteur:</p>
                <div className="border-b border-dashed border-gray-400 h-16 mb-2"></div>
                <p className="text-gray-600">{tutorFullName}</p>
              </div>
              <div>
                <p className="font-medium mb-2">Stagiaire:</p>
                <div className="border-b border-dashed border-gray-400 h-16 mb-2"></div>
                <p className="text-gray-600">{stagiaireFullName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
