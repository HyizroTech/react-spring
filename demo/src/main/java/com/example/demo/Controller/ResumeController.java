package com.example.demo.Controller;

import com.example.demo.service.PdfGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ResumeController {

    @Autowired
    private PdfGenerator pdfGenerator;

    @PostMapping("/user/{userId}/resume")
    public ResponseEntity <?> resumeBuilder(@PathVariable(value = "userId") Long userId) {
       pdfGenerator.generatePdfReport(userId);


       return ResponseEntity.ok("Pdf_Generated_Successfully");
    }

}
