package com.example.springrelation.Repositories;

import com.example.springrelation.model.role.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TenantRepo extends JpaRepository<Tenant,Long> {
}
