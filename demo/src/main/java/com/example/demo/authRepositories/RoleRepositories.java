package com.example.demo.authRepositories;

import com.example.demo.auth.ERole;
import com.example.demo.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositories extends JpaRepository<Role,Long> {

    Optional<Role> findByName(ERole name);
}
