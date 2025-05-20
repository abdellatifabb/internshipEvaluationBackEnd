package com.evaluateinternship.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.evaluateinternship.dto.*;
import com.evaluateinternship.models.*;

@Component
public class EntityDTOMapper {
    
    // Appreciation mappers
    public AppreciationDTO toDTO(Appreciation appreciation) {
        return new AppreciationDTO(appreciation);
    }
    
    public List<AppreciationDTO> toAppreciationDTOList(List<Appreciation> appreciations) {
        return appreciations.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Category mappers
    public CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category);
    }
    
    public List<CategoryDTO> toCategoryDTOList(List<Category> categories) {
        return categories.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Competence mappers
    public CompetenceDTO toDTO(Competence competence) {
        return new CompetenceDTO(competence);
    }
    
    public List<CompetenceDTO> toCompetenceDTOList(List<Competence> competences) {
        return competences.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Evaluation mappers
    public EvaluationDTO toDTO(Evaluation evaluation) {
        return new EvaluationDTO(evaluation);
    }
    
    public List<EvaluationDTO> toEvaluationDTOList(List<Evaluation> evaluations) {
        return evaluations.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Periode mappers
    public PeriodeDTO toDTO(Periode periode) {

        PeriodeDTO dto = new PeriodeDTO();
        dto.setId(periode.getId());
        dto.setDatedebut(periode.getDatedebut());
        dto.setDatefin(periode.getDatefin());

        if (periode.getStagiaire() != null) {
            dto.setStagiaireId(periode.getStagiaire().getId());
            dto.setStagiaireName(periode.getStagiaire().getNom());
        }

        if (periode.getStage() != null) {
            dto.setStageId(periode.getStage().getId());
            dto.setStageEntreprise(periode.getStage().getEntreprise());
        }

        return dto;
    }
    
    public List<PeriodeDTO> toPeriodeDTOList(List<Periode> periodes) {
        return periodes.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Stage mappers
    public StageDTO toDTO(Stage stage) {
        return new StageDTO(stage);
    }
    
    public List<StageDTO> toStageDTOList(List<Stage> stages) {
        return stages.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Stagiaire mappers
    public StagiaireDTO toDTO(Stagiaire stagiaire) {
        return new StagiaireDTO(stagiaire);
    }
    
    public List<StagiaireDTO> toStagiaireDTOList(List<Stagiaire> stagiaires) {
        return stagiaires.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    // Tutor mappers
    public TutorDTO toDTO(Tutor tutor) {
        return new TutorDTO(tutor);
    }
    
    public List<TutorDTO> toTutorDTOList(List<Tutor> tutors) {
        return tutors.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
