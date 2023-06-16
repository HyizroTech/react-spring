package com.example.springrelation.Repositories;

import com.example.springrelation.model.facilitator.Facilitator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilitatorRepo extends JpaRepository<Facilitator,Long> {
}
