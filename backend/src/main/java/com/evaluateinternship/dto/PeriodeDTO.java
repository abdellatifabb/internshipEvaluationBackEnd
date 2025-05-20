package com.evaluateinternship.dto;

import java.time.LocalDate;

import com.evaluateinternship.models.Periode;
import com.evaluateinternship.models.Stage;
import com.evaluateinternship.models.Stagiaire;

public class PeriodeDTO {
    private Long id;
    private LocalDate datedebut;
    private LocalDate datefin;
    private Long stagiaireId;
    private String stagiaireName;
    private Long stageId;
    private String stageEntreprise;

    // Constructors
    public PeriodeDTO() {
    }

    public PeriodeDTO(Periode periode) {
        this.id = periode.getId();
        this.datedebut = periode.getDatedebut();
        this.datefin = periode.getDatefin();
        
        if (periode.getStagiaire() != null) {
            this.stagiaireId = periode.getStagiaire().getId();
            this.stagiaireName = periode.getStagiaire().getNom() + " " + periode.getStagiaire().getPrenom();
        }
        
        if (periode.getStage() != null) {
            this.stageId = periode.getStage().getId();
            this.stageEntreprise = periode.getStage().getEntreprise();
        }
    }

    // Convert DTO to Entity
    public Periode toEntity() {
        Periode periode = new Periode();
        periode.setId(this.id);
        periode.setDatedebut(this.datedebut);
        periode.setDatefin(this.datefin);

        if (this.stagiaireId != null) {
            Stagiaire stagiaire = new Stagiaire();
            stagiaire.setId(this.stagiaireId);
            periode.setStagiaire(stagiaire);
        }

        if (this.stageId != null) {
            Stage stage = new Stage();
            stage.setId(this.stageId);
            periode.setStage(stage);
        }

        return periode;
    }


    // Getters and Setters
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

    public Long getStagiaireId() {
        return stagiaireId;
    }

    public void setStagiaireId(Long stagiaireId) {
        this.stagiaireId = stagiaireId;
    }

    public String getStagiaireName() {
        return stagiaireName;
    }

    public void setStagiaireName(String stagiaireName) {
        this.stagiaireName = stagiaireName;
    }

    public Long getStageId() {
        return stageId;
    }

    public void setStageId(Long stageId) {
        this.stageId = stageId;
    }

    public String getStageEntreprise() {
        return stageEntreprise;
    }

    public void setStageEntreprise(String stageEntreprise) {
        this.stageEntreprise = stageEntreprise;
    }
}
