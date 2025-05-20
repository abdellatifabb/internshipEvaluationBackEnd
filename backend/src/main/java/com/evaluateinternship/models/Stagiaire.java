package com.evaluateinternship.models;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Stagiaire extends User {
    
    private String institution;


    public String getInstitution() {
        return institution;
    }
    
    public void setInstitution(String institution) {
        this.institution = institution;
    }

    @OneToMany(mappedBy = "stagiaire")
    private List<Periode> periodes;

    public List<Periode> getPeriodes() {
        return periodes;
    }

    public void setPeriodes(List<Periode> periodes) {
        this.periodes = periodes;
    }
}
