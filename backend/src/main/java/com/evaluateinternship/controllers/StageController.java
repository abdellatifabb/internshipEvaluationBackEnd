package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Stage;
import com.evaluateinternship.services.StageService;
import com.evaluateinternship.dto.StageDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stage")
public class StageController {
    private final StageService stageService;
    private final EntityDTOMapper mapper;
    
    public StageController(StageService stageService, EntityDTOMapper mapper) {
        this.stageService = stageService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<StageDTO> getAllStages() {
        List<Stage> stages = stageService.getAllStages();
        return stages.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @PostMapping("/")
    public StageDTO createStage(@RequestBody StageDTO stageDTO) {
        Stage stage = stageDTO.toEntity();
        Stage savedStage = stageService.createStage(stage);
        return mapper.toDTO(savedStage);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<StageDTO> getStageById(@PathVariable Long id) {
        Optional<Stage> stage = stageService.getStageById(id);
        return stage.map(s -> ResponseEntity.ok(mapper.toDTO(s)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<StageDTO> updateStage(@PathVariable Long id, @RequestBody StageDTO stageDTO) {
        if (!stageService.getStageById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Stage stage = stageDTO.toEntity();
        stage.setId(id);
        Stage updatedStage = stageService.updateStage(stage);
        return ResponseEntity.ok(mapper.toDTO(updatedStage));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
        if (!stageService.getStageById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        stageService.deleteStage(id);
        return ResponseEntity.noContent().build();
    }
}
