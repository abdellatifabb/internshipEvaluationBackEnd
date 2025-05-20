package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Stagiaire;
import com.evaluateinternship.repositories.StagiaireRepository;

@Service
public class StagiaireService {
    
    @Autowired
    StagiaireRepository stagiaireRepository;

    public Stagiaire createStagiaire(Stagiaire stagiaire) {
        return stagiaireRepository.save(stagiaire);
    }

    public List<Stagiaire> getAllStagiaires() {
        return stagiaireRepository.findAll();
    }
    
    public Optional<Stagiaire> getStagiaireById(Long id) {
        return stagiaireRepository.findById(id);
    }
    
    public Stagiaire updateStagiaire(Stagiaire stagiaire) {
        return stagiaireRepository.save(stagiaire);
    }
    
    public void deleteStagiaire(Long id) {
        stagiaireRepository.deleteById(id);
    }
}
