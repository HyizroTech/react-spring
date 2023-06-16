package com.example.demo.Repositories;

import com.example.demo.model.projects.Description;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepo extends JpaRepository<Description,Long> {

}
