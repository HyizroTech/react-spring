package com.example.demo.Repositories;

import com.example.demo.model.constant.Header;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeaderRepo extends JpaRepository<Header,Long> {
}
