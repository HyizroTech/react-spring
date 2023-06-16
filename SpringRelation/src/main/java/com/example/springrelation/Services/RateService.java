package com.example.springrelation.Services;
import com.example.springrelation.model.comtracking.Rate;
import com.example.springrelation.Repositories.RateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class RateService {

    @Autowired
    private RateRepo rateRepo;

    @Transactional
    public ResponseEntity<Object> createRate(Rate rate) {

        Rate rate1 = new Rate();
        rate1.setAmount(rate.getAmount());
        rate1.setEndDate(rate.getEndDate());
        rate1.setFixedPrice(rate.isFixedPrice());
        rate1.setName(rate.getName());
        rate1.setStartDate(rate.getStartDate());
        rate1.setProject(rate.getProject());
        rate1.setEmployees(rate.getEmployees());
        Rate savedRate = rateRepo.save(rate1);

        if (rateRepo.findById(savedRate.getId()).isPresent())

            return ResponseEntity.ok().body("Rate created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Rate specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateRate(Long id, Rate rate) {

        if (rateRepo.findById(id).isPresent()) {

            Rate rate1 = rateRepo.findById(id).get();
            rate1.setAmount(rate.getAmount());
            rate1.setEndDate(rate.getEndDate());
            rate1.setFixedPrice(rate.isFixedPrice());
            rate1.setName(rate.getName());
            rate1.setStartDate(rate.getStartDate());
            Rate savedRate = rateRepo.save(rate1);

            if(rateRepo.findById(savedRate.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Rate");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Rate");

        } else return ResponseEntity.unprocessableEntity().body("The specified Rate is not found");
    }
}


