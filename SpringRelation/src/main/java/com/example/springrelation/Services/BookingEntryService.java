package com.example.springrelation.Services;

import com.example.springrelation.model.comtracking.Rate;
import com.example.springrelation.model.timetracking.BookingEntry;
import com.example.springrelation.Repositories.*;
import com.example.springrelation.model.timetracking.Project;
import com.example.springrelation.model.timetracking.ProjectRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class BookingEntryService {

    @Autowired
    private BookingEntryRepo bookingEntryRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private ProjectRoleRepo projectRoleRepo;

    @Autowired
    private RateRepo rateRepo;

    @Transactional
    public ResponseEntity<Object> createBookingEntry(BookingEntry bookingEntry) {

        BookingEntry bookingEntry1 = new BookingEntry();
        bookingEntry1.setAltRate(bookingEntry.getAltRate());
        bookingEntry1.setApproved(bookingEntry.isApproved());
        bookingEntry1.setBillable(bookingEntry.isBillable());
        bookingEntry1.setBilled(bookingEntry.isBilled());
        bookingEntry1.setBillingDate(bookingEntry.getBillingDate());
        bookingEntry1.setCreated(bookingEntry.getCreated());
        bookingEntry1.setDuration(bookingEntry.getDuration());
        bookingEntry1.setEndDate(bookingEntry.getEndDate());
        bookingEntry1.setIncomingPayment(bookingEntry.getIncomingPayment());
        bookingEntry1.setLastChange(bookingEntry.getLastChange());
        bookingEntry1.setLastWTChange(bookingEntry.getLastWTChange());
        bookingEntry1.setLocked(bookingEntry.isLocked());
        bookingEntry1.setLockingDate(bookingEntry.getLockingDate());
        bookingEntry1.setRemoteId(bookingEntry.getRemoteId());
        bookingEntry1.setStartDate(bookingEntry.getStartDate());
        bookingEntry1.setProject(bookingEntry.getProject());
        bookingEntry1.setProjectRole(bookingEntry.getProjectRole());
        bookingEntry1.setRate(bookingEntry.getRate());

        BookingEntry savedBookingEntry = bookingEntryRepo.save(bookingEntry1);

        if (bookingEntryRepo.findById(savedBookingEntry.getId()).isPresent())

            return ResponseEntity.ok().body("BookingEntry created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the BookingEntry specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateBookingEntry(Long id, BookingEntry bookingEntry) {

        if (bookingEntryRepo.findById(id).isPresent()) {

            BookingEntry bookingEntry1 = bookingEntryRepo.findById(id).get();
            bookingEntry1.setAltRate(bookingEntry.getAltRate());
            bookingEntry1.setApproved(bookingEntry.isApproved());
            bookingEntry1.setBillable(bookingEntry.isBillable());
            bookingEntry1.setBilled(bookingEntry.isBilled());
            bookingEntry1.setBillingDate(bookingEntry.getBillingDate());
            bookingEntry1.setCreated(bookingEntry.getCreated());
            bookingEntry1.setDuration(bookingEntry.getDuration());
            bookingEntry1.setEndDate(bookingEntry.getEndDate());
            bookingEntry1.setIncomingPayment(bookingEntry.getIncomingPayment());
            bookingEntry1.setLastChange(bookingEntry.getLastChange());
            bookingEntry1.setLastWTChange(bookingEntry.getLastWTChange());
            bookingEntry1.setLocked(bookingEntry.isLocked());
            bookingEntry1.setLockingDate(bookingEntry.getLockingDate());
            bookingEntry1.setRemoteId(bookingEntry.getRemoteId());
            bookingEntry1.setStartDate(bookingEntry.getStartDate());

            Project project = projectRepo.findById(bookingEntry1.getProject().getId()).get();
            project.setActive(bookingEntry.getProject().isActive());
            project.setBillable(bookingEntry.getProject().isBillable());
            project.setBudget(bookingEntry.getProject().getBudget());
            project.setContractId(bookingEntry.getProject().getContractId());
            project.setCurrency(bookingEntry.getProject().getCurrency());
            project.setDiscount(bookingEntry.getProject().getDiscount());
            project.setEndDate(bookingEntry.getProject().getEndDate());
            project.setFinished(bookingEntry.getProject().isFinished());
            project.setFixedPrice(bookingEntry.getProject().isFixedPrice());
            project.setName(bookingEntry.getProject().getName());
            project.setRecruiterId(bookingEntry.getProject().getRecruiterId());
            project.setRemoteContractId(bookingEntry.getProject().getRemoteContractId());
            project.setRemoteId(bookingEntry.getProject().getRemoteId());
            project.setStartDate(bookingEntry.getProject().getStartDate());
            project.setTimeBudget(bookingEntry.getProject().getTimeBudget());
            projectRepo.save(project);
            bookingEntry1.setProject(project);

            Rate rate = rateRepo.findById(bookingEntry1.getRate().getId()).get();
            rate.setAmount(bookingEntry.getRate().getAmount());
            rate.setEndDate(bookingEntry.getRate().getEndDate());
            rate.setFixedPrice(bookingEntry.getRate().isFixedPrice());
            rate.setName(bookingEntry.getRate().getName());
            rate.setStartDate(bookingEntry.getRate().getStartDate());
            rateRepo.save(rate);
            bookingEntry1.setRate(rate);

            ProjectRole projectRole = projectRoleRepo.findById(bookingEntry1.getProjectRole().getId()).get();
            projectRole.setDescription(bookingEntry.getProjectRole().getDescription());
            projectRole.setName(bookingEntry.getProjectRole().getName());
            projectRole.setRemoteId(bookingEntry.getProjectRole().getRemoteId());
            projectRoleRepo.save(projectRole);
            bookingEntry1.setProjectRole(projectRole);

            BookingEntry savedBookingEntry = bookingEntryRepo.save(bookingEntry1);

            if(bookingEntryRepo.findById(savedBookingEntry.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated BookingEntry");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified BookingEntry");

        } else return ResponseEntity.unprocessableEntity().body("The specified BookingEntry is not found");
    }
}
