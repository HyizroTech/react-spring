package com.example.springrelation.Controllers;

import com.example.springrelation.Services.DataConfigService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.configData.DataConfig;
import com.example.springrelation.Repositories.DataConfigRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class DataConfigController {

    @Autowired
    private DataConfigRepo dataConfigRepo;

    @Autowired
    private DataConfigService dataConfigService;

    @PostMapping("/configData/create")
    public ResponseEntity<Object> createConfigData(@RequestBody DataConfig dataConfig) {

        return dataConfigService.createDataConfig(dataConfig);

    }

    @DeleteMapping("/configData/delete/{id}")
    public ResponseEntity<Object> deleteConfigData(@PathVariable Long id) {

        return dataConfigRepo.findById(id).map(dataConfig -> {
            dataConfigRepo.delete(dataConfig);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("ConfigData id" + id + "not found"));

    }

    @GetMapping("/configData/get/{id}")
    public DataConfig getConfigData(@PathVariable Long id) {

        if(dataConfigRepo.findById(id).isPresent())

            return dataConfigRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/configData/get")
    public List<DataConfig> getDataConfigs() {

        return dataConfigRepo.findAll();

    }

    @PutMapping("/configData/update/{id}")
    public ResponseEntity<Object> updateDataConfig(@PathVariable Long id, @RequestBody DataConfig dataConfig) {

        return dataConfigService.updateDataConfig(id, dataConfig);

    }

}

