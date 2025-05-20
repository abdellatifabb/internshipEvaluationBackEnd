package com.evaluateinternship.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String intitule;
    private String value;

//    @OneToMany(mappedBy = "category")
//    private List<Competence> competences;

    @ManyToOne
    private Competence competence;


    public String getIntitule() {
        return intitule;
    }
    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public List<Competence> getCompetences() {
//        return competences;
//    }

//    public void setCompetences(List<Competence> competences) {
//        this.competences = competences;
//    }

    public Competence getCompetence() {
        return competence;
    }

    public void setCompetence(Competence competence) {
        this.competence = competence;
    }
}
