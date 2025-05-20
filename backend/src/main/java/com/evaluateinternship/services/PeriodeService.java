package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Periode;
import com.evaluateinternship.repositories.PeriodeRepository;

@Service
public class PeriodeService {
    
    @Autowired
    PeriodeRepository periodeRepository;

    public Periode createPeriode(Periode periode) {
        return periodeRepository.save(periode);
    }

    public List<Periode> getAllPeriodes() {
        return periodeRepository.findAll();
    }
    
    public Optional<Periode> getPeriodeById(Long id) {
        return periodeRepository.findById(id);
    }
    
    public Periode updatePeriode(Periode periode) {
        return periodeRepository.save(periode);
    }
    
    public void deletePeriode(Long id) {
        periodeRepository.deleteById(id);
    }
}
