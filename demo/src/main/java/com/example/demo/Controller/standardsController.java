package com.example.demo.Controller;

import com.example.demo.Repositories.StandardsRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.skills.Standards;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class StandardsController {

    @Autowired
    private StandardsRepo standardsRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;




    @GetMapping("/user/{userId}/standards")
    public ResponseEntity<List<Standards>> getAllStandards(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Standards> standards = new ArrayList<Standards>();
        standards.addAll(user.getStandards());

        return new ResponseEntity<>(standards, HttpStatus.OK);
    }

    @GetMapping("/standard/{id}")
    public ResponseEntity<Standards> getStandard(@PathVariable(value = "id") Long id) {

        Standards standard = standardsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Standard with id = " + id));
        return new ResponseEntity<>(standard, HttpStatus.OK);
    }

    @PutMapping("/standard/{id}")
    public ResponseEntity<Standards> updateStandard(@PathVariable (value = "id") Long standardId, @Valid @RequestBody Standards standardRequest) {

        Standards standard = standardsRepo.findById(standardId)
                .orElseThrow(() -> new ResourceNotFoundException("StandardId " + standardId + "not found"));

        standard.setStandard(standardRequest.getStandard());
        return new ResponseEntity<>(standardsRepo.save(standard), HttpStatus.OK);
    }

    @DeleteMapping("/standard/{id}")
    public ResponseEntity<Object> deleteStandard(@PathVariable (value = "id") Long id){
        return standardsRepo.findById(id).map(standard -> {
            standardsRepo.delete(standard);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Standard id" + id + "not found"));

    }

}
