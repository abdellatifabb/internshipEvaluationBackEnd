package com.evaluateinternship.repositories;

import com.evaluateinternship.models.Competence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence, Long> {
    List<Competence> findByAppreciationId(Long appreciationId);
}
