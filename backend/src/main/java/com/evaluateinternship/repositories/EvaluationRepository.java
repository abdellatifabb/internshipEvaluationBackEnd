package com.evaluateinternship.repositories;

import com.evaluateinternship.models.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByAppreciationId(Long appreciationId);
}
