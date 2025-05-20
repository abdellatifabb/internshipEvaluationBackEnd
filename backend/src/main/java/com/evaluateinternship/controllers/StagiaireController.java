package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Stagiaire;
import com.evaluateinternship.services.StagiaireService;
import com.evaluateinternship.dto.StagiaireDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stagiaire")
public class StagiaireController {
    private final StagiaireService stagiaireService;
    private final EntityDTOMapper mapper;
    
    public StagiaireController(StagiaireService stagiaireService, EntityDTOMapper mapper) {
        this.stagiaireService = stagiaireService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<StagiaireDTO> getAllStagiaires() {
        List<Stagiaire> stagiaires = stagiaireService.getAllStagiaires();
        return stagiaires.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @PostMapping("/")
    public StagiaireDTO createStagiaire(@RequestBody StagiaireDTO stagiaireDTO) {
        Stagiaire stagiaire = stagiaireDTO.toEntity();
        Stagiaire savedStagiaire = stagiaireService.createStagiaire(stagiaire);
        return mapper.toDTO(savedStagiaire);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StagiaireDTO> getStagiaireById(@PathVariable Long id) {
        Optional<Stagiaire> stagiaire = stagiaireService.getStagiaireById(id);
        return stagiaire.map(s -> ResponseEntity.ok(mapper.toDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<StagiaireDTO> updateStagiaire(@PathVariable Long id, @RequestBody StagiaireDTO stagiaireDTO) {
        if (!stagiaireService.getStagiaireById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Stagiaire stagiaire = stagiaireDTO.toEntity();
        stagiaire.setId(id);
        Stagiaire updatedStagiaire = stagiaireService.updateStagiaire(stagiaire);
        return ResponseEntity.ok(mapper.toDTO(updatedStagiaire));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStagiaire(@PathVariable Long id) {
        if (!stagiaireService.getStagiaireById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stagiaireService.deleteStagiaire(id);
        return ResponseEntity.noContent().build();
    }
}
