package com.example.demo.service;

import com.example.demo.Repositories.HeaderRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.model.constant.Header;
import com.example.demo.model.profile.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
public class PhotoService {

    @Autowired
    private HeaderRepo headerRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;

    @Transactional
    public ResponseEntity<Object> headerPhoto(MultipartFile file, Long id) throws IOException {
        if (headerRepo.findById(id).isPresent()) {

            Header logo = headerRepo.findById(id).get();
            logo.setCompanyLogo(file.getBytes());
            headerRepo.save(logo);


            if (headerRepo.findById(logo.getHeaderId()).isPresent())
                return ResponseEntity.ok().body("Successfully Uploaded Photo");

            else return ResponseEntity.unprocessableEntity().body("Failed to Upload Photo");

        } else return ResponseEntity.unprocessableEntity().body("The specified Header is not found");
    }

    public ResponseEntity<Object> userPhoto(MultipartFile file, Long id) throws IOException {
        if (userProfileRepo.findById(id).isPresent()) {

            UserProfile photo = userProfileRepo.findById(id).get();
            photo.setPhoto(file.getBytes());
            userProfileRepo.save(photo);


            if (userProfileRepo.findById(photo.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Uploaded Photo");

            else return ResponseEntity.unprocessableEntity().body("Failed to Upload Photo");

        } else return ResponseEntity.unprocessableEntity().body("The specified Person is not found");
    }
}
