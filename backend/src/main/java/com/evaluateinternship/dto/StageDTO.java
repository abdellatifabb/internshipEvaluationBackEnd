package com.evaluateinternship.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.evaluateinternship.models.Stage;

public class StageDTO {
    private Long id;
    private String description;
    private String objectif;
    private String entreprise;
    private List<Long> periodeIds;

    // Constructors
    public StageDTO() {
    }

    public StageDTO(Stage stage) {
        this.id = stage.getId();
        this.description = stage.getDescription();
        this.objectif = stage.getObjectif();
        this.entreprise = stage.getEntreprise();
        
        if (stage.getPeriodes() != null) {
            this.periodeIds = stage.getPeriodes().stream()
                .map(periode -> periode.getId())
                .collect(Collectors.toList());
        }
    }

    // Convert DTO to Entity
    public Stage toEntity() {
        Stage stage = new Stage();
        stage.setId(this.id);
        stage.setDescription(this.description);
        stage.setObjectif(this.objectif);
        stage.setEntreprise(this.entreprise);
        // Note: The periodes relationship would typically be set in the service layer
        return stage;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObjectif() {
        return objectif;
    }

    public void setObjectif(String objectif) {
        this.objectif = objectif;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public List<Long> getPeriodeIds() {
        return periodeIds;
    }

    public void setPeriodeIds(List<Long> periodeIds) {
        this.periodeIds = periodeIds;
    }
}
