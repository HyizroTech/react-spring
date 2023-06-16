package com.example.springrelation.Repositories;

import com.example.springrelation.model.configData.DataConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataConfigRepo extends JpaRepository<DataConfig,Long> {
}
