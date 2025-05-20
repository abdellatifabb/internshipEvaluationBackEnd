package com.evaluateinternship.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.evaluateinternship.models.Stagiaire;

public class StagiaireDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String institution;
    private List<Long> periodeIds;

    // Constructors
    public StagiaireDTO() {
    }

    public StagiaireDTO(Stagiaire stagiaire) {
        this.id = stagiaire.getId();
        this.nom = stagiaire.getNom();
        this.prenom = stagiaire.getPrenom();
        this.email = stagiaire.getEmail();
        this.institution = stagiaire.getInstitution();
        
        if (stagiaire.getPeriodes() != null) {
            this.periodeIds = stagiaire.getPeriodes().stream()
                .map(periode -> periode.getId())
                .collect(Collectors.toList());
        }
    }

    // Convert DTO to Entity
    public Stagiaire toEntity() {
        Stagiaire stagiaire = new Stagiaire();
        stagiaire.setId(this.id);
        stagiaire.setNom(this.nom);
        stagiaire.setPrenom(this.prenom);
        stagiaire.setEmail(this.email);
        stagiaire.setInstitution(this.institution);
        // Note: The periodes relationship would typically be set in the service layer
        return stagiaire;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public List<Long> getPeriodeIds() {
        return periodeIds;
    }

    public void setPeriodeIds(List<Long> periodeIds) {
        this.periodeIds = periodeIds;
    }
}
