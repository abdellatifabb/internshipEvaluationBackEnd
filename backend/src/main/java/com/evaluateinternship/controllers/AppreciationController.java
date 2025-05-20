package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Appreciation;
import com.evaluateinternship.services.AppreciationService;
import com.evaluateinternship.dto.AppreciationDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appreciation")
public class AppreciationController {
    private final AppreciationService appreciationService;
    private final EntityDTOMapper mapper;
    
    public AppreciationController(AppreciationService appreciationService, EntityDTOMapper mapper) {
        this.appreciationService = appreciationService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<AppreciationDTO> getAllAppreciations() {
        System.out.println("Fetching all appreciations");
        List<Appreciation> appreciations = appreciationService.getAllAppreciations();
        return appreciations.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @PostMapping("/")
    public AppreciationDTO createAppreciation(@RequestBody AppreciationDTO appreciationDTO) {
        Appreciation appreciation = appreciationDTO.toEntity();
        Appreciation savedAppreciation = appreciationService.createAppreciation(appreciation);
        return mapper.toDTO(savedAppreciation);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AppreciationDTO> getAppreciationById(@PathVariable Long id) {
        Optional<Appreciation> appreciation = appreciationService.getAppreciationById(id);
        return appreciation.map(a -> ResponseEntity.ok(mapper.toDTO(a)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<AppreciationDTO> updateAppreciation(@PathVariable Long id, @RequestBody AppreciationDTO appreciationDTO) {
        if (!appreciationService.getAppreciationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Appreciation appreciation = appreciationDTO.toEntity();
        appreciation.setId(id);
        Appreciation updatedAppreciation = appreciationService.updateAppreciation(appreciation);
        return ResponseEntity.ok(mapper.toDTO(updatedAppreciation));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppreciation(@PathVariable Long id) {
        if (!appreciationService.getAppreciationById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        appreciationService.deleteAppreciation(id);
        return ResponseEntity.noContent().build();
    }
}
