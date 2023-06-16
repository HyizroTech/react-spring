package com.example.demo.Controller;

import com.example.demo.Repositories.HeaderRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.constant.Header;
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

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class HeaderController {

    @Autowired
    private HeaderRepo headerRepo;

    @Autowired
    private PhotoService photoService;

    private static final Logger logger = LoggerFactory.getLogger(HeaderController.class);



    @PostMapping(value = "/header/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity upload(@RequestParam(value="file") MultipartFile file, @PathVariable Long id) throws IOException {

        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
        return photoService.headerPhoto(file, id);
    }   

    @GetMapping(value = "/header/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Header getHeader(@PathVariable Long id){
        if(headerRepo.findById(id).isPresent())

            return headerRepo.findById(id).get();

        else return null;
    }

    @PutMapping(value = "/header/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Header> updateHeader(@PathVariable("id") Long id, @RequestBody Header headerRequest) {
        Header header = headerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HeaderId " + id + "not found"));
        header.setCompanyName(headerRequest.getCompanyName());
        header.setStreet(headerRequest.getStreet());
        header.setZipCode(headerRequest.getZipCode());
        header.setCity(headerRequest.getCity());
        return new ResponseEntity<>(headerRepo.save(header), HttpStatus.OK);
    }

}
