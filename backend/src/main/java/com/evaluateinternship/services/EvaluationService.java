package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Evaluation;
import com.evaluateinternship.repositories.EvaluationRepository;

@Service
public class EvaluationService {
    
    @Autowired
    EvaluationRepository evaluationRepository;

    public Evaluation createEvaluation(Evaluation evaluation) {
        return evaluationRepository.save(evaluation);
    }

    public List<Evaluation> createEvaluations(List<Evaluation> evaluations) {
        return evaluationRepository.saveAll(evaluations);
    }


    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }
    
    public Optional<Evaluation> getEvaluationById(Long id) {
        return evaluationRepository.findById(id);
    }
    
    public Evaluation updateEvaluation(Evaluation evaluation) {
        return evaluationRepository.save(evaluation);
    }
    
    public void deleteEvaluation(Long id) {
        evaluationRepository.deleteById(id);
    }
}
