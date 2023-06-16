package com.example.springrelation.Controllers;

import com.example.springrelation.Services.BookingEntryService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.timetracking.BookingEntry;
import com.example.springrelation.Repositories.BookingEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BookingEntryController {

    @Autowired
    private BookingEntryRepo bookingEntryRepo;

    @Autowired
    private BookingEntryService bookingEntryService;


    @PostMapping("/bookingEntry/create")
    public ResponseEntity<Object> createBookingEntry(@RequestBody BookingEntry bookingEntry) {

        return bookingEntryService.createBookingEntry(bookingEntry);
    }


    @DeleteMapping("/bookingEntry/delete/{id}")
    public ResponseEntity<Object> deleteBookingEntry(@PathVariable Long id) {

        return bookingEntryRepo.findById(id).map(bookingEntry -> {
            bookingEntryRepo.delete(bookingEntry);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("BookingEntry id" + id + "not found"));

    }

    @GetMapping("/bookingEntry/get/{id}")
    public BookingEntry getBookingEntry(@PathVariable Long id) {

        if(bookingEntryRepo.findById(id).isPresent())

            return bookingEntryRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/bookingEntry/get")
    public List<BookingEntry> getBookingEntrys() {

        return bookingEntryRepo.findAll();

    }

    @PutMapping("/bookingEntry/update/{id}")
    public ResponseEntity<Object> updateBookingEntry(@PathVariable Long id, @RequestBody BookingEntry bookingEntry) {

        return bookingEntryService.updateBookingEntry(id, bookingEntry);

    }
}
