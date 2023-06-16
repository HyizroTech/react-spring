package com.example.springrelation.Repositories;

import com.example.springrelation.model.base.GroupRock;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GroupRepo extends JpaRepository<GroupRock,Long> {
}
