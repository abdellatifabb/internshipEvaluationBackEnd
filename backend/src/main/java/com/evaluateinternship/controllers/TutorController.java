package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Tutor;
import com.evaluateinternship.services.TutorService;
import com.evaluateinternship.dto.TutorDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tutor")
public class TutorController {
    private final TutorService tutorService;
    private final EntityDTOMapper mapper;
    
    public TutorController(TutorService tutorService, EntityDTOMapper mapper) {
        this.tutorService = tutorService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<TutorDTO> getAllTutors() {
        List<Tutor> tutors = tutorService.getAllTutors();
        return tutors.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @PostMapping("/")
    public TutorDTO createTutor(@RequestBody TutorDTO tutorDTO) {
        Tutor tutor = tutorDTO.toEntity();
        Tutor savedTutor = tutorService.createTutor(tutor);
        return mapper.toDTO(savedTutor);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TutorDTO> getTutorById(@PathVariable Long id) {
        Optional<Tutor> tutor = tutorService.getTutorById(id);
        return tutor.map(t -> ResponseEntity.ok(mapper.toDTO(t)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TutorDTO> updateTutor(@PathVariable Long id, @RequestBody TutorDTO tutorDTO) {
        if (!tutorService.getTutorById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Tutor tutor = tutorDTO.toEntity();
        tutor.setId(id);
        Tutor updatedTutor = tutorService.updateTutor(tutor);
        return ResponseEntity.ok(mapper.toDTO(updatedTutor));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Long id) {
        if (!tutorService.getTutorById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tutorService.deleteTutor(id);
        return ResponseEntity.noContent().build();
    }
}
