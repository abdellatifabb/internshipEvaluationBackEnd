package com.evaluateinternship.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.evaluateinternship.models.Appreciation;
import com.evaluateinternship.models.Periode;
import com.evaluateinternship.models.Tutor;

public class AppreciationDTO {
    private Long id;
    private Long tutorId;
    private String tutorName;
    private Long periodeId;
    private List<Long> evaluationIds;
    private List<Long> competenceIds;

    // Constructors
    public AppreciationDTO() {
    }

    public AppreciationDTO(Appreciation appreciation) {
        this.id = appreciation.getId();
        
        if (appreciation.getTutor() != null) {
            this.tutorId = appreciation.getTutor().getId();
            this.tutorName = appreciation.getTutor().getNom() + " " + appreciation.getTutor().getPrenom();
        }
        
        if (appreciation.getPeriode() != null) {
            this.periodeId = appreciation.getPeriode().getId();
        }
        
        if (appreciation.getEvaluations() != null) {
            this.evaluationIds = appreciation.getEvaluations().stream()
                .map(evaluation -> evaluation.getId())
                .collect(Collectors.toList());
        }

        if (appreciation.getCompetences() != null) {
            this.competenceIds = appreciation.getCompetences().stream()
                .map(competence -> competence.getId())
                .collect(Collectors.toList());
        }
    }

    // Convert DTO to Entity
    public Appreciation toEntity() {
        Appreciation appreciation = new Appreciation();
        appreciation.setId(this.id);
        // Note: The relationships (tutor, periode, evaluations, competences)
        if (this.tutorId != null) {
            Tutor tutor = new Tutor();
            tutor.setId(this.tutorId);
            appreciation.setTutor(tutor);
        }

        if (this.periodeId != null) {
            Periode periode = new Periode();
            periode.setId(this.periodeId);
            appreciation.setPeriode(periode);
        }
        // would typically be set in the service layer
        return appreciation;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public String getTutorName() {
        return tutorName;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    public Long getPeriodeId() {
        return periodeId;
    }

    public void setPeriodeId(Long periodeId) {
        this.periodeId = periodeId;
    }

    public List<Long> getEvaluationIds() {
        return evaluationIds;
    }

    public void setEvaluationIds(List<Long> evaluationIds) {
        this.evaluationIds = evaluationIds;
    }

    public List<Long> getCompetenceIds() {
        return competenceIds;
    }

    public void setCompetenceIds(List<Long> competenceIds) {
        this.competenceIds = competenceIds;
    }
}
