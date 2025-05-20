package com.evaluateinternship.models;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Periode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate datedebut; // Date début
    private LocalDate datefin; // Date fin

    @ManyToOne
    @JoinColumn(name = "stagiaire_id")
    private Stagiaire stagiaire;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;
    

    public Stagiaire getStagiaire() {
        return stagiaire;
    }
    public void setStagiaire(Stagiaire stagiaire) {
        this.stagiaire = stagiaire;
    }
    public Stage getStage() {
        return stage;
    }
    public void setStage(Stage stage) {
        this.stage = stage;
    }   
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatedebut() {
        return datedebut;
    }

    public void setDatedebut(LocalDate datedebut) {
        this.datedebut = datedebut;
    }

    public LocalDate getDatefin() {
        return datefin;
    }

    public void setDatefin(LocalDate datefin) {
        this.datefin = datefin;
    }

   
}
