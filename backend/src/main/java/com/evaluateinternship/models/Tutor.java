package com.evaluateinternship.models;

import jakarta.persistence.*;

@Entity
public class Tutor extends User {

    private String entreprise;


    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

}
