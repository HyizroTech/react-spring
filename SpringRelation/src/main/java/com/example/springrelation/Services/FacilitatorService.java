package com.example.springrelation.Services;

import com.example.springrelation.model.facilitator.Facilitator;
import com.example.springrelation.Repositories.FacilitatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FacilitatorService {

    @Autowired
    private FacilitatorRepo facilitatorRepo;

    @Transactional
    public ResponseEntity<Object> createFacilitator(Facilitator facilitator) {

        Facilitator facilitator1 = new Facilitator();
        facilitator1.setName(facilitator.getName());
        Facilitator savedFacilitator = facilitatorRepo.save(facilitator1);

        if (facilitatorRepo.findById(savedFacilitator.getId()).isPresent())

            return ResponseEntity.ok().body("Facilitator created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Facilitator specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateFacilitator(Long id, Facilitator facilitator) {

        if (facilitatorRepo.findById(id).isPresent()) {

            Facilitator facilitator1 = facilitatorRepo.findById(id).get();
            facilitator1.setName(facilitator.getName());
            Facilitator savedFacilitator = facilitatorRepo.save(facilitator1);

            if(facilitatorRepo.findById(savedFacilitator.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Person");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Person");

        } else return ResponseEntity.unprocessableEntity().body("The specified Person is not found");

    }
}
