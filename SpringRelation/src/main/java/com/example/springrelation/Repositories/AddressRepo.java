package com.example.springrelation.Repositories;

import com.example.springrelation.model.base.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AddressRepo extends JpaRepository<Address, Long> {

}
