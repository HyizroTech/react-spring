package com.example.demo.Controller;

import com.example.demo.Repositories.FooterRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.constant.Footer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class FooterController {

    @Autowired
    private FooterRepo footerRepo;

    @GetMapping(value = "/footer/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Footer getFooter(@PathVariable Long id){
        if(footerRepo.findById(id).isPresent())

            return footerRepo.findById(id).get();

        else return null;
    }

    @PutMapping(value = "/footer/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Footer> updateFooter(@PathVariable("id") Long id, @RequestBody Footer footerRequest) {
        Footer footer = footerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FooterId " + id + "not found"));
        footer.setCompanyName(footerRequest.getCompanyName());
        footer.setStreet(footerRequest.getStreet());
        footer.setZip(footerRequest.getZip());
        footer.setCity(footerRequest.getCity());
        footer.setWebsite(footerRequest.getWebsite());
        footer.setTelephone(footerRequest.getTelephone());
        footer.setFax(footerRequest.getFax());
        footer.setEmail(footerRequest.getEmail());
        footer.setCompanyLocalCourt(footerRequest.getCompanyLocalCourt());
        footer.setPartnerLocalCourt(footerRequest.getPartnerLocalCourt());
        footer.setRegisteredOffice(footerRequest.getRegisteredOffice());
        footer.setSalesTaxId(footerRequest.getSalesTaxId());
        footer.setBank(footerRequest.getBank());
        footer.setIban(footerRequest.getIban());
        footer.setPartner(footerRequest.getPartner());
        footer.setDirector(footerRequest.getDirector());
        return new ResponseEntity<>(footerRepo.save(footer), HttpStatus.OK);
    }
}
