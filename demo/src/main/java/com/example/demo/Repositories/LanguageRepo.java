package com.example.demo.Repositories;

import com.example.demo.model.profile.Language;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LanguageRepo extends JpaRepository<Language,Long> {

}
