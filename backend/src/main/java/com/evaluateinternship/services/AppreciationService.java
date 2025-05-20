package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.*;
import com.evaluateinternship.repositories.*;

@Service
public class AppreciationService {
    
    @Autowired
    AppreciationRepository appreciationRepository;

    public Appreciation createAppreciation(Appreciation appreciation) {
        return appreciationRepository.save(appreciation);
    }

    public List<Appreciation> getAllAppreciations() {
        return appreciationRepository.findAll();
    }
    
    public Optional<Appreciation> getAppreciationById(Long id) {
        return appreciationRepository.findById(id);
    }
    
    public Appreciation updateAppreciation(Appreciation appreciation) {
        return appreciationRepository.save(appreciation);
    }
    
    public void deleteAppreciation(Long id) {
        appreciationRepository.deleteById(id);
    }
}
