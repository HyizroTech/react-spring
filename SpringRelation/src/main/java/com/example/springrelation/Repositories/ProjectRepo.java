package com.example.springrelation.Repositories;

import com.example.springrelation.model.comtracking.Rate;
import com.example.springrelation.model.timetracking.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepo extends JpaRepository<Project,Long> {
    List<Project> findAllByCustomerId(Long customerId);
}
