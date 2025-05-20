package com.evaluateinternship.dto;

import com.evaluateinternship.models.Tutor;

public class TutorDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String entreprise;

    // Constructors
    public TutorDTO() {
    }

    public TutorDTO(Tutor tutor) {
        this.id = tutor.getId();
        this.nom = tutor.getNom();
        this.prenom = tutor.getPrenom();
        this.email = tutor.getEmail();
        this.entreprise = tutor.getEntreprise();
    }

    // Convert DTO to Entity
    public Tutor toEntity() {
        Tutor tutor = new Tutor();
        tutor.setId(this.id);
        tutor.setNom(this.nom);
        tutor.setPrenom(this.prenom);
        tutor.setEmail(this.email);
        tutor.setEntreprise(this.entreprise);
        return tutor;
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

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }
}
