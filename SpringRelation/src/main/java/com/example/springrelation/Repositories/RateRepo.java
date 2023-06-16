package com.example.springrelation.Repositories;

import com.example.springrelation.model.comtracking.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RateRepo extends JpaRepository<Rate,Long> {

    Optional<Rate> findByIdAndProjectId(Long id, Long projectId);

    List<Rate> findAllByProjectId(Long projectId);

   Rate findRateByIdAndProjectId(Long id,Long projectId);

   List<Rate> findRatesByEmployeesId(Long employeeId);
}
