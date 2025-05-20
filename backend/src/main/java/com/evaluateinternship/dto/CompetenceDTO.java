package com.evaluateinternship.dto;

import com.evaluateinternship.models.Appreciation;
import com.evaluateinternship.models.Competence;

public class CompetenceDTO {
    private Long id;
    private String intitule;
    private float note;
//    private Long categoryId;
//    private String categoryName;
    private Long appreciationId;

    // Constructors
    public CompetenceDTO() {
    }

    public CompetenceDTO(Competence competence) {
        this.id = competence.getId();
        this.intitule = competence.getIntitule();
        this.note = competence.getNote();
        
//        if (competence.getCategory() != null) {
//            this.categoryId = competence.getCategory().getId();
//            this.categoryName = competence.getCategory().getIntitule();
//        }
        
        if (competence.getAppreciation() != null) {
            this.appreciationId = competence.getAppreciation().getId();
        }
    }

    // Convert DTO to Entity
    public Competence toEntity() {
        Competence competence = new Competence();
        competence.setId(this.id);
        competence.setIntitule(this.intitule);
        competence.setNote(this.note);
        // Note: The relationships (category, appreciation) would typically be set in the service layer
        if (this.appreciationId != null) {
            Appreciation appreciation = new Appreciation();
            appreciation.setId(this.appreciationId);
            competence.setAppreciation(appreciation);
        }
        return competence;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public float getNote() {
        return note;
    }

    public void setNote(float note) {
        this.note = note;
    }

//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }
//
//    public String getCategoryName() {
//        return categoryName;
//    }
//
//    public void setCategoryName(String categoryName) {
//        this.categoryName = categoryName;
//    }

    public Long getAppreciationId() {
        return appreciationId;
    }

    public void setAppreciationId(Long appreciationId) {
        this.appreciationId = appreciationId;
    }
}
