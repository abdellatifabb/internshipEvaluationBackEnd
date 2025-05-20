package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Periode;
import com.evaluateinternship.services.PeriodeService;
import com.evaluateinternship.dto.PeriodeDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/periode")
public class PeriodeController {
    private final PeriodeService periodeService;
    private final EntityDTOMapper mapper;
    
    public PeriodeController(PeriodeService periodeService, EntityDTOMapper mapper) {
        this.periodeService = periodeService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<PeriodeDTO> getAllPeriodes() {
        List<Periode> periodes = periodeService.getAllPeriodes();
        return periodes.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @PostMapping("/")
    public PeriodeDTO createPeriode(@RequestBody PeriodeDTO periodeDTO) {
        System.out.println("Creating periode with name: " + periodeDTO.getStageId());
        Periode periode = periodeDTO.toEntity();
        Periode savedPeriode = periodeService.createPeriode(periode);
        return mapper.toDTO(savedPeriode);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PeriodeDTO> getPeriodeById(@PathVariable Long id) {
        Optional<Periode> periode = periodeService.getPeriodeById(id);
        return periode.map(p -> ResponseEntity.ok(mapper.toDTO(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PeriodeDTO> updatePeriode(@PathVariable Long id, @RequestBody PeriodeDTO periodeDTO) {
        if (!periodeService.getPeriodeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Periode periode = periodeDTO.toEntity();
        periode.setId(id);
        Periode updatedPeriode = periodeService.updatePeriode(periode);
        return ResponseEntity.ok(mapper.toDTO(updatedPeriode));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeriode(@PathVariable Long id) {
        if (!periodeService.getPeriodeById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        periodeService.deletePeriode(id);
        return ResponseEntity.noContent().build();
    }
}
