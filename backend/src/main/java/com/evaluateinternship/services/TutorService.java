package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Tutor;
import com.evaluateinternship.repositories.TutorRepository;

@Service
public class TutorService {
    
    @Autowired
    TutorRepository tutorRepository;

    public Tutor createTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }
    
    public Optional<Tutor> getTutorById(Long id) {
        return tutorRepository.findById(id);
    }
    
    public Tutor updateTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }
    
    public void deleteTutor(Long id) {
        tutorRepository.deleteById(id);
    }
}
