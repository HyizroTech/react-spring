package com.example.springrelation.Controllers;

import com.example.springrelation.Services.PersonService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.base.Person;
import com.example.springrelation.Repositories.PersonRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class PersonController {

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepo personRepo;

    private static final Logger logger = LoggerFactory.getLogger(PersonController.class);
    @PostMapping("/person/create")
    public ResponseEntity<Object> createPerson(@RequestBody Person person) {

        return personService.createPerson(person);

    }

    @PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity upload(@RequestParam(value="file") MultipartFile file,@PathVariable Long id) throws IOException {
        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
        return personService.save(file, id);
    }

    @DeleteMapping("/person/delete/{id}")
    public ResponseEntity<Object> deletePerson(@PathVariable Long id) {

        return personRepo.findById(id).map(person -> {
            personRepo.delete(person);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("Person id" + id + "not found"));

    }

    @GetMapping("/person/get/{id}")
    public Person getPerson(@PathVariable Long id) {

        if(personRepo.findById(id).isPresent())

            return personRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/person/get")
    public List<Person> getPersons() {

        return personRepo.findAll();

    }

    @PutMapping("/person/update/{id}")
    public ResponseEntity<Object> updatePerson(@PathVariable Long id, @RequestBody Person person) {

        return personService.updatePerson(id, person);

    }

}

