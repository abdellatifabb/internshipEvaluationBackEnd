package com.evaluateinternship.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String value;
    
    @ManyToOne
    private Appreciation appreciation;
    
    public Appreciation getAppreciation() {
        return appreciation;
    }
    public void setAppreciation(Appreciation appreciation) {
        this.appreciation = appreciation;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }
    public String getValue() {
        return value;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public void setValue(String value) {
        this.value = value;
    }
}
