package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Competence;
import com.evaluateinternship.repositories.CompetenceRepository;

@Service
public class CompetenceService {
    
    @Autowired
    CompetenceRepository competenceRepository;

    public Competence createCompetence(Competence competence) {
        return competenceRepository.save(competence);
    }

    public List<Competence> createCompetences(List<Competence> competences) {
        return competenceRepository.saveAll(competences);
    }

    public List<Competence> getAllCompetences() {
        return competenceRepository.findAll();
    }
    
    public List<Competence> getCompetencesByAppreciationId(Long appreciationId) {
        return competenceRepository.findByAppreciationId(appreciationId);
    }
    
    public Optional<Competence> getCompetenceById(Long id) {
        return competenceRepository.findById(id);
    }
    
    public Competence updateCompetence(Competence competence) {
        return competenceRepository.save(competence);
    }
    
    public void deleteCompetence(Long id) {
        competenceRepository.deleteById(id);
    }
}
