package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Evaluation;
import com.evaluateinternship.services.EvaluationService;
import com.evaluateinternship.dto.EvaluationDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/evaluation")
public class EvaluationController {
    private final EvaluationService evaluationService;
    private final EntityDTOMapper mapper;
    
    public EvaluationController(EvaluationService evaluationService, EntityDTOMapper mapper) {
        this.evaluationService = evaluationService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<EvaluationDTO> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationService.getAllEvaluations();
        return evaluations.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/appreciation/{appreciationId}")
    public List<EvaluationDTO> getEvaluationsByAppreciationId(@PathVariable Long appreciationId) {
        List<Evaluation> evaluations = evaluationService.getEvaluationsByAppreciationId(appreciationId);
        return evaluations.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

//    @PostMapping("/")
//    public EvaluationDTO createEvaluation(@RequestBody EvaluationDTO evaluationDTO) {
//        Evaluation evaluation = evaluationDTO.toEntity();
//        Evaluation savedEvaluation = evaluationService.createEvaluation(evaluation);
//        return mapper.toDTO(savedEvaluation);
//    }
    @PostMapping("/")
    public List<EvaluationDTO> createEvaluations(@RequestBody List<EvaluationDTO> evaluationDTOs) {
        // Convert DTOs to entities
        List<Evaluation> evaluations = evaluationDTOs.stream()
                .map(EvaluationDTO::toEntity)
                .collect(Collectors.toList());

        // Save all evaluations
        List<Evaluation> savedEvaluations = evaluationService.createEvaluations(evaluations);

        // Convert entities back to DTOs
        return savedEvaluations.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<EvaluationDTO> getEvaluationById(@PathVariable Long id) {
        Optional<Evaluation> evaluation = evaluationService.getEvaluationById(id);
        return evaluation.map(e -> ResponseEntity.ok(mapper.toDTO(e)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EvaluationDTO> updateEvaluation(@PathVariable Long id, @RequestBody EvaluationDTO evaluationDTO) {
        if (!evaluationService.getEvaluationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Evaluation evaluation = evaluationDTO.toEntity();
        evaluation.setId(id);
        Evaluation updatedEvaluation = evaluationService.updateEvaluation(evaluation);
        return ResponseEntity.ok(mapper.toDTO(updatedEvaluation));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        if (!evaluationService.getEvaluationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        evaluationService.deleteEvaluation(id);
        return ResponseEntity.noContent().build();
    }
}
