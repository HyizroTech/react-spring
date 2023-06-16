package com.example.springrelation.Repositories;

import com.example.springrelation.model.base.Person;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PersonRepo extends JpaRepository<Person,Long> {

}
