package com.example.demo.Controller;

import com.example.demo.Repositories.LanguageRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.Language;
import com.example.demo.model.profile.UserProfile;
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
public class LanguageController {

    @Autowired
    private LanguageRepo languageRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @GetMapping("/user/{userId}/languages")
    public ResponseEntity<List<Language>> getAllLanguages(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Language> languages = new ArrayList<Language>();
        languages.addAll(user.getLanguages());

        return new ResponseEntity<>(languages, HttpStatus.OK);
    }

    @GetMapping("/language/{id}")
    public ResponseEntity<Language> getLanguage(@PathVariable(value = "id") Long id) {

        Language language = languageRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Language with id = " + id));
        return new ResponseEntity<>(language, HttpStatus.OK);
    }

    @PutMapping("/language/{id}")
    public ResponseEntity<Language> updateLanguage(@PathVariable (value = "id") Long languageId, @Valid @RequestBody Language languageRequest) {

        Language language = languageRepo.findById(languageId)
                .orElseThrow(() -> new ResourceNotFoundException("LanguageId " + languageId + "not found"));

       language.setLanguage(languageRequest.getLanguage());
       language.setProficiency(languageRequest.getProficiency());

        return new ResponseEntity<>(languageRepo.save(language), HttpStatus.OK);
    }

    @DeleteMapping("/language/{id}")
    public ResponseEntity<Object> deleteLanguage(@PathVariable (value = "id") Long id){
        return languageRepo.findById(id).map(language -> {
            languageRepo.delete(language);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Language id" + id + "not found"));

    }


}
