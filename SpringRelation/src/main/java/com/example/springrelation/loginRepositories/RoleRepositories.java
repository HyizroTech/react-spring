package com.example.springrelation.loginRepositories;

import com.example.springrelation.auth.ERole;
import com.example.springrelation.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositories extends JpaRepository<Role,Long> {

    Optional<Role> findByName(ERole name);
}
