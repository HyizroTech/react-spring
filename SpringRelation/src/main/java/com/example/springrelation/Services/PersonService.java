package com.example.springrelation.Services;
import  com.example.springrelation.model.base.Person;
import  com.example.springrelation.Repositories.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;


@Service
public class PersonService {

    @Autowired
    private PersonRepo personRepo;

    @Transactional
    public ResponseEntity<Object> createPerson(Person person) {

        Person person1 = new Person();
        person1.setCompanyName(person.getCompanyName());
        person1.setDateOfBirth(person.getDateOfBirth());
        person1.setEmail(person.getEmail());
        person1.setFacebookReference(person.getFacebookReference());
        person1.setFirstName(person.getFirstName());
        person1.setGithubReference(person.getGithubReference());
        person1.setHomePage(person.getHomePage());
        person1.setInstagramReference(person.getInstagramReference());
        person1.setLastName(person.getLastName());
        person1.setLinkedinReference(person.getLinkedinReference());
        person1.setPhoto(person.getPhoto());
        person1.setStackOverFlowReference(person.getStackOverFlowReference());
        person1.setTitle(person.getTitle());
        person1.setTwitterReference(person.getTwitterReference());
        person1.setXingReference(person.getXingReference());
        Person savedPerson = personRepo.save(person1);

        if (personRepo.findById(savedPerson.getId()).isPresent())

            return ResponseEntity.ok().body("Person created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Person specified.");
    }

    @Transactional
    public ResponseEntity<Object> updatePerson(Long id, Person person) {

        if (personRepo.findById(id).isPresent()) {

            Person person1 = personRepo.findById(id).get();
            person1.setCompanyName(person.getCompanyName());
            person1.setDateOfBirth(person.getDateOfBirth());
            person1.setEmail(person.getEmail());
            person1.setFacebookReference(person.getFacebookReference());
            person1.setFirstName(person.getFirstName());
            person1.setGithubReference(person.getGithubReference());
            person1.setHomePage(person.getHomePage());
            person1.setInstagramReference(person.getInstagramReference());
            person1.setLastName(person.getLastName());
            person1.setLinkedinReference(person.getLinkedinReference());
//            person1.setPhoto(person.getPhoto());
            person1.setStackOverFlowReference(person.getStackOverFlowReference());
            person1.setTitle(person.getTitle());
            person1.setTwitterReference(person.getTwitterReference());
            person1.setXingReference(person.getXingReference());
            Person savedPerson = personRepo.save(person1);

            if(personRepo.findById(savedPerson.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Person");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Person");

        } else return ResponseEntity.unprocessableEntity().body("The specified Person is not found");

    }

    @Transactional
    public ResponseEntity<Object> save(MultipartFile file,Long id) throws IOException {
        if (personRepo.findById(id).isPresent()) {

            Person doc = personRepo.findById(id).get();
            doc.setPhoto(file.getBytes());
            personRepo.save(doc);


            if (personRepo.findById(doc.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Uploaded Photo");

            else return ResponseEntity.unprocessableEntity().body("Failed to Upload tPhoto");

        } else return ResponseEntity.unprocessableEntity().body("The specified Person is not found");
    }

}
