package com.example.springrelation.Repositories;

import com.example.springrelation.model.base.Address;
import com.example.springrelation.model.timetracking.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CustomerRepo extends JpaRepository<Customer, Long> {

}
