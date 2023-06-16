package com.example.demo.Repositories;

import com.example.demo.model.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project,Long> {

}
