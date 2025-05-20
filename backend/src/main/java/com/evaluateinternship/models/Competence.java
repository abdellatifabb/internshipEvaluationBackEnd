package com.evaluateinternship.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Competence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String intitule;
    private float note;

//    @ManyToOne
//    private Category category;

    @ManyToOne
    private Appreciation appreciation;

    @OneToMany(mappedBy = "competence")
    private List<Category> categories;


    public Appreciation getAppreciation() {
        return appreciation;
    }
    public void setAppreciation(Appreciation appreciation) {
        this.appreciation = appreciation;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    //    public Category getCategory() {
//        return category;
//    }
//    public void setCategory(Category category) {
//        this.category = category;
//    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }
    public float getNote() {
        return note;
    }
    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }
    public void setNote(float note) {
        this.note = note;
    }

}
