package com.example.demo.Repositories;

import com.example.demo.model.skills.Knowledge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KnowledgeRepo extends JpaRepository<Knowledge,Long> {

}
