package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Competence;
import com.evaluateinternship.services.CompetenceService;
import com.evaluateinternship.dto.CompetenceDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/competence")
public class CompetenceController {
    private final CompetenceService competenceService;
    private final EntityDTOMapper mapper;
    
    public CompetenceController(CompetenceService competenceService, EntityDTOMapper mapper) {
        this.competenceService = competenceService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<CompetenceDTO> getAllCompetences() {
        List<Competence> competences = competenceService.getAllCompetences();
        return competences.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/appreciation/{appreciationId}")
    public List<CompetenceDTO> getCompetencesByAppreciationId(@PathVariable Long appreciationId) {
        List<Competence> competences = competenceService.getCompetencesByAppreciationId(appreciationId);
        return competences.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
//    @PostMapping("/")
//    public CompetenceDTO createCompetence(@RequestBody CompetenceDTO competenceDTO) {
//        Competence competence = competenceDTO.toEntity();
//        Competence savedCompetence = competenceService.createCompetence(competence);
//        return mapper.toDTO(savedCompetence);
//    }

    @PostMapping("/")
    public List<CompetenceDTO> createCompetences(@RequestBody List<CompetenceDTO> competenceDTOs) {
        // Convert DTOs to entities
        List<Competence> competences = competenceDTOs.stream()
                .map(CompetenceDTO::toEntity)
                .collect(Collectors.toList());

        // Save all competences
        List<Competence> savedCompetences = competenceService.createCompetences(competences);

        // Convert entities back to DTOs
        return savedCompetences.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompetenceDTO> getCompetenceById(@PathVariable Long id) {
        Optional<Competence> competence = competenceService.getCompetenceById(id);
        return competence.map(c -> ResponseEntity.ok(mapper.toDTO(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CompetenceDTO> updateCompetence(@PathVariable Long id, @RequestBody CompetenceDTO competenceDTO) {
        if (!competenceService.getCompetenceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Competence competence = competenceDTO.toEntity();
        competence.setId(id);
        Competence updatedCompetence = competenceService.updateCompetence(competence);
        return ResponseEntity.ok(mapper.toDTO(updatedCompetence));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetence(@PathVariable Long id) {
        if (!competenceService.getCompetenceById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        competenceService.deleteCompetence(id);
        return ResponseEntity.noContent().build();
    }
}
