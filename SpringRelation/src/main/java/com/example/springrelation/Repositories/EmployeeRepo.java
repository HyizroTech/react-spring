package com.example.springrelation.Repositories;

import com.example.springrelation.model.base.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,Long> {

}
