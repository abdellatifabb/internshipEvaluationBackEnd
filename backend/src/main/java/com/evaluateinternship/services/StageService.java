package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Stage;
import com.evaluateinternship.repositories.StageRepository;

@Service
public class StageService {
    
    @Autowired
    StageRepository stageRepository;

    public Stage createStage(Stage stage) {
        return stageRepository.save(stage);
    }

    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }
    
    public Optional<Stage> getStageById(Long id) {
        return stageRepository.findById(id);
    }
    
    public Stage updateStage(Stage stage) {
        return stageRepository.save(stage);
    }
    
    public void deleteStage(Long id) {
        stageRepository.deleteById(id);
    }
}
