package com.example.springrelation.Repositories;

import com.example.springrelation.model.role.UserRock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserRock,Long> {
}
