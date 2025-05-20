package com.evaluateinternship.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Appreciation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany (mappedBy = "appreciation")
    private List<Evaluation> evaluations;

    @OneToMany (mappedBy = "appreciation")
    private List<Competence> competences;
    
    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "periode_id")
    private Periode periode;


    public Periode getPeriode() {
        return periode;
    }
    public void setPeriode(Periode periode) {
        this.periode = periode;
    }       
    public Tutor getTutor() {
        return tutor;
    }
    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public List<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(List<Competence> competences) {
        this.competences = competences;
    }
}
