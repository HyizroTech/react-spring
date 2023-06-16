package com.example.springrelation.Controllers;

import com.example.springrelation.Repositories.ProjectRepo;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.comtracking.Rate;
import com.example.springrelation.Repositories.RateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RateController {

    @Autowired
    private RateRepo rateRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @PostMapping("/project/{projectId}/rate")
    public Rate createRate(@PathVariable (value = "projectId") Long projectId,
                                 @Valid @RequestBody Rate rate) {

        return projectRepo.findById(projectId).map(project -> {
            rate.setProject(project);

            return rateRepo.save(rate);
        }).orElseThrow(() -> new ResourceNotFoundException("ProjectId " + projectId + " not found"));
    }

    @DeleteMapping("/rate/{rateId}")
    public ResponseEntity<Object> deleteRate(@PathVariable (value = "rateId") Long rateId) {

        return rateRepo.findById(rateId).map(rate -> {
            rateRepo.delete(rate);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Rate not found with id " + rateId));
    }

    @GetMapping("/project/{projectId}/rates")
    public List<Rate> getAllRates(@PathVariable (value = "projectId") Long projectId) {

        return rateRepo.findAllByProjectId(projectId);
    }

    @GetMapping("/rate/{id}")
    public ResponseEntity<Rate> getRate(@PathVariable(value = "id") Long id) {

        Rate rate = rateRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Rate with id = " + id));
        return new ResponseEntity<>(rate, HttpStatus.OK);
    }


    @PutMapping("/rate/{rateId}")
    public ResponseEntity<Rate> updateRate(@PathVariable (value = "rateId") Long rateId,
                                 @Valid @RequestBody Rate rateRequest) {

        Rate rate = rateRepo.findById(rateId)
                .orElseThrow(() -> new ResourceNotFoundException("RateId " + rateId + "not found"));

        rate.setName(rateRequest.getName());
        rate.setStartDate(rateRequest.getStartDate());
        rate.setFixedPrice(rateRequest.isFixedPrice());
        rate.setAmount(rateRequest.getAmount());
        rate.setEndDate(rateRequest.getEndDate());

        return new ResponseEntity<>(rateRepo.save(rate), HttpStatus.OK);
    }
}