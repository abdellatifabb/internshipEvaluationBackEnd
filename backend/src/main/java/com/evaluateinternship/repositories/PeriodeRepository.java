package com.evaluateinternship.repositories;

import com.evaluateinternship.models.Periode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodeRepository extends JpaRepository<Periode, Long> {
}
