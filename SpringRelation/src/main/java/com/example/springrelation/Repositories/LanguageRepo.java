package com.example.springrelation.Repositories;

import com.example.springrelation.model.role.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepo extends JpaRepository<Language,Long> {
}
