package com.example.demo.Controller;

import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.authRepositories.UserRepositories;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.service.PhotoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserProfileController {

    @Autowired
    private UserProfileRepo userProfileRepo;

    @Autowired
    private PhotoService photoService;

    @Autowired
    private UserRepositories userAuthRepo;

    private static final Logger logger = LoggerFactory.getLogger(UserProfileController.class);

    @PostMapping("/userLogin/{userId}/profile")
        public UserProfile createUser(@PathVariable(value = "userId")Long userId,@RequestBody UserProfile userProfile){

        return userAuthRepo.findById(userId).map(userAuth -> {

        UserProfile user = new UserProfile();
        user.setFirstName(userProfile.getFirstName());
        user.setLastName(userProfile.getLastName());
        user.setEducation(userProfile.getEducation());
        user.setNationality(userProfile.getNationality());
        user.setYearOfBirth(userProfile.getYearOfBirth());
        user.setProjects(userProfile.getProjects());
        user.setKnowledges(userProfile.getKnowledges());
        user.setLanguages(userProfile.getLanguages());
        user.setProducts(userProfile.getProducts());
        user.setProgrammings(userProfile.getProgrammings());
        user.setStandards(userProfile.getStandards());
        userAuth.setUserProfile(user);

       return userProfileRepo.save(user);
        }).orElseThrow(()->new ResourceNotFoundException("User not Found"));
    }

    @PostMapping(value = "/user/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity upload(@RequestParam(value="file") MultipartFile file, @PathVariable Long id) throws IOException {

        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
        return photoService.userPhoto(file, id);
    }

    @GetMapping(value = "/user/{id}")
    public UserProfile getUser(@PathVariable Long id){
        if(userProfileRepo.findById(id).isPresent())

            return userProfileRepo.findById(id).get();

        else return null;
    }

    @GetMapping("/user/get")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserProfile> getUsers() {

        return userProfileRepo.findAll();

    }

    @PutMapping(value = "/user/{id}")
    public ResponseEntity<UserProfile> updateUser(@PathVariable("id") Long id, @RequestBody UserProfile userProfileRequest) {
        UserProfile userProfile = userProfileRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserId " + id + "not found"));
        userProfile.setFirstName(userProfileRequest.getFirstName());
        userProfile.setLastName(userProfileRequest.getLastName());
        userProfile.setEducation(userProfileRequest.getEducation());
        userProfile.setNationality(userProfileRequest.getNationality());
        userProfile.setYearOfBirth(userProfileRequest.getYearOfBirth());
        return new ResponseEntity<>(userProfileRepo.save(userProfile), HttpStatus.OK);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {

        return userProfileRepo.findById(id).map(user -> {
            userProfileRepo.delete(user);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("User id" + id + "not found"));

    }

}
