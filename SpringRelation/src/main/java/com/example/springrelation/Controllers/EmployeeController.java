package com.example.springrelation.Controllers;

import com.example.springrelation.Repositories.*;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.base.Employee;
import com.example.springrelation.model.comtracking.Rate;
import com.example.springrelation.model.timetracking.BookingEntry;
import com.example.springrelation.model.timetracking.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private RateRepo rateRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private BookingEntryRepo bookingEntryRepo;



    @PostMapping("/customer/{customerId}/employee")
    public ResponseEntity<Employee> createCustomerEmployee(@PathVariable(value = "customerId") Long customerId,
                                                       @RequestBody Employee employeeRequest) {
        Employee employee = customerRepo.findById(customerId).map(customer -> {
            customer.getEmployees().add(employeeRequest);
            return employeeRepo.save(employeeRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Customer with id = " + customerId));
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @PostMapping("/bookingEntry/{bookingEntryId}/employee")
    public ResponseEntity<Employee> createBookingEntryEmployee(@PathVariable(value = "bookingEntryId") Long bookingEntryId,
                                                           @RequestBody Employee employeeRequest) {
        Employee employee = bookingEntryRepo.findById(bookingEntryId).map(bookingEntry -> {
            bookingEntry.getEmployees().add(employeeRequest);
            return employeeRepo.save(employeeRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found BookingEntry with id = " + bookingEntryId));
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @PostMapping("/rate/{rateId}/employee")
    public ResponseEntity<Employee> createRateEmployee(@PathVariable(value = "rateId") Long rateId,
                                                      @RequestBody Employee employeeRequest){
        Employee employee=rateRepo.findById(rateId).map(rate -> {
            rate.getEmployees().add(employeeRequest);
            return employeeRepo.save(employeeRequest);
        }).orElseThrow(()->new ResourceNotFoundException("Not Found Rate with id ="+ rateId));
        return new ResponseEntity<>(employee,HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}/employees")
    public ResponseEntity<List<Employee>> getAllEmployeesOfCustomer(@PathVariable(value = "customerId") Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Customer with id = " + customerId));
        List<Employee> employees = new ArrayList<Employee>();
        employees.addAll(customer.getEmployees());

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/rate/{rateId}/employees")
    public ResponseEntity<List<Employee>> getAllEmployeesOfRate(@PathVariable(value = "rateId") Long rateId) {
        Rate rate = rateRepo.findById(rateId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Rate with id = " + rateId));
        List<Employee> employees = new ArrayList<Employee>();
        employees.addAll(rate.getEmployees());

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/bookingEntry/{bookingEntryId}/employees")
    public ResponseEntity<List<Employee>> getAllEmployeesOfBookingEntry(@PathVariable(value = "bookingEntryId") Long bookingEntryId) {
        BookingEntry bookingEntry = bookingEntryRepo.findById(bookingEntryId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found BookingEntry with id = " + bookingEntryId));
        List<Employee> employees = new ArrayList<Employee>();
        employees.addAll(bookingEntry.getEmployees());

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable(value = "id") Long id) {
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Employee with id = " + id));
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employeeRequest) {
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("EmployeeId " + id + "not found"));
        employee.setHrId(employeeRequest.getHrId());
        employee.setExternal(employeeRequest.isExternal());
        employee.setIntern(employeeRequest.isIntern());
        employee.setActive(employeeRequest.isActive());
        employee.setRemoteId(employeeRequest.getRemoteId());
        return new ResponseEntity<>(employeeRepo.save(employee), HttpStatus.OK);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("id") Long id) {
        employeeRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}

