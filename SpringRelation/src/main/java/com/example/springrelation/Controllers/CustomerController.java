package com.example.springrelation.Controllers;

import com.example.springrelation.Services.CustomerService;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.timetracking.Customer;
import com.example.springrelation.Repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CustomerService customerService;



    @PostMapping("/customer/create")
    public ResponseEntity<Object> createCustomer(@RequestBody Customer customer) {

        return customerService.createCustomer(customer);
    }

    @DeleteMapping("/customer/delete/{id}")
    public ResponseEntity<Object> deleteCustomer(@PathVariable(value = "id") Long id) {

        return customerRepo.findById(id).map(customer -> {
            customerRepo.delete(customer);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("Customer id" + id + "not found"));

    }

    @GetMapping("/customer/get/{id}")
    public Customer getCustomer(@PathVariable(value = "id") Long id) {

        if(customerRepo.findById(id).isPresent())

            return customerRepo.findById(id).get();

        else return null;

    }

    @GetMapping("/customer/get")
    public List<Customer> getCustomers() {

        return customerRepo.findAll();

    }

    @PutMapping("/customer/update/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {

        return customerService.updateCustomer(id, customer);

    }

}
