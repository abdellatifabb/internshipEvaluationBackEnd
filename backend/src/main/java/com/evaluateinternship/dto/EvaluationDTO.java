package com.evaluateinternship.dto;

import com.evaluateinternship.models.Appreciation;
import com.evaluateinternship.models.Evaluation;

public class EvaluationDTO {
    private Long id;
    private String category;
    private String value;
    private Long appreciationId;

    // Constructors
    public EvaluationDTO() {
    }

    public EvaluationDTO(Evaluation evaluation) {
        this.id = evaluation.getId();
        this.category = evaluation.getCategory();
        this.value = evaluation.getValue();
        
        if (evaluation.getAppreciation() != null) {
            this.appreciationId = evaluation.getAppreciation().getId();
        }
    }

    // Convert DTO to Entity
    public Evaluation toEntity() {
        Evaluation evaluation = new Evaluation();
        evaluation.setId(this.id);
        evaluation.setCategory(this.category);
        evaluation.setValue(this.value);
        // Note: The appreciation relationship would typically be set in the service layer
        if (this.appreciationId != null) {
            Appreciation appreciation = new Appreciation();
            appreciation.setId(this.appreciationId);
            evaluation.setAppreciation(appreciation);
        }
        return evaluation;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getAppreciationId() {
        return appreciationId;
    }

    public void setAppreciationId(Long appreciationId) {
        this.appreciationId = appreciationId;
    }
}
