package com.evaluateinternship.models;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // or SINGLE_TABLE
public class User {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nom;
    private String prenom;
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public String getEmail() {
        return email;
    }   

    public void setEmail(String email) {
        this.email = email;
    }


}
