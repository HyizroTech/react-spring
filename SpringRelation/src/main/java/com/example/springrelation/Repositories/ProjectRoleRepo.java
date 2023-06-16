package com.example.springrelation.Repositories;

import com.example.springrelation.model.timetracking.ProjectRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRoleRepo extends JpaRepository<ProjectRole,Long> {
}
