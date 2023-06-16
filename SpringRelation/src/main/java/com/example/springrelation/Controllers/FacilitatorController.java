package com.example.springrelation.Controllers;

import com.example.springrelation.Services.FacilitatorService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.facilitator.Facilitator;
import com.example.springrelation.Repositories.FacilitatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class FacilitatorController {

    @Autowired
    private FacilitatorRepo facilitatorRepo;

    @Autowired
    private FacilitatorService facilitatorService;

    @PostMapping("/facilitator/create")
    public ResponseEntity<Object> createFacilitator(@RequestBody Facilitator facilitator) {

        return facilitatorService.createFacilitator(facilitator);
    }

    @DeleteMapping("/facilitator/delete/{id}")
    public ResponseEntity<Object> deleteFacilitator(@PathVariable Long id) {

        return facilitatorRepo.findById(id).map(facilitator -> {
            facilitatorRepo.delete(facilitator);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("Facilitator id" + id + "not found"));

    }

    @GetMapping("/facilitator/get/{id}")
    public Facilitator getFacilitator(@PathVariable Long id) {

        if(facilitatorRepo.findById(id).isPresent())

            return facilitatorRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/facilitator/get")
    public List<Facilitator> getFacilitators() {

        return facilitatorRepo.findAll();

    }

    @PutMapping("/facilitator/update/{id}")
    public ResponseEntity<Object> updateFacilitator(@PathVariable Long id, @RequestBody Facilitator facilitator) {

        return facilitatorService.updateFacilitator(id, facilitator);

    }

}

