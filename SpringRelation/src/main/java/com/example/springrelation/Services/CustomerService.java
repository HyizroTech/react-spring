package com.example.springrelation.Services;


import com.example.springrelation.Repositories.PersonRepo;
import com.example.springrelation.model.base.Person;
import com.example.springrelation.model.timetracking.Customer;
import com.example.springrelation.Repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private PersonRepo personRepo;

    @Transactional
    public ResponseEntity<Object> createCustomer(Customer customer) {

        Customer customer1 = new Customer();
        customer1.setName(customer.getName());
        customer1.setRemoteCustomerId(customer.getRemoteCustomerId());
        customer1.setPerson(customer.getPerson());

        Customer savedCustomer = customerRepo.save(customer1);

        if (customerRepo.findById(savedCustomer.getId()).isPresent())

            return ResponseEntity.ok().body("Customer created successfully.");

        else return ResponseEntity.unprocessableEntity().body("Failed to create the Customer specified.");
    }

    @Transactional
    public ResponseEntity<Object> updateCustomer(Long id, Customer customer) {

        if (customerRepo.findById(id).isPresent()) {

            Customer customer1 = customerRepo.findById(id).get();
            customer1.setName(customer.getName());
            customer1.setRemoteCustomerId(customer.getRemoteCustomerId());

            Person person = personRepo.findById(customer1.getPerson().getId()).get();
            person.setCompanyName(customer.getPerson().getCompanyName());
            person.setDateOfBirth(customer.getPerson().getDateOfBirth());
            person.setEmail(customer.getPerson().getEmail());
            person.setFacebookReference(customer.getPerson().getFacebookReference());
            person.setFirstName(customer.getPerson().getFirstName());
            person.setGithubReference(customer.getPerson().getGithubReference());
            person.setHomePage(customer.getPerson().getHomePage());
            person.setInstagramReference(customer.getPerson().getInstagramReference());
            person.setLastName(customer.getPerson().getLastName());
            person.setLinkedinReference(customer.getPerson().getLinkedinReference());
            person.setPhoto(customer.getPerson().getPhoto());
            person.setStackOverFlowReference(customer.getPerson().getStackOverFlowReference());
            person.setTitle(customer.getPerson().getTitle());
            person.setTwitterReference(customer.getPerson().getTwitterReference());
            person.setXingReference(customer.getPerson().getXingReference());
            personRepo.save(person);
            customer1.setPerson(person);

            Customer savedCustomer = customerRepo.save(customer1);

            if(customerRepo.findById(savedCustomer.getId()).isPresent())
                return ResponseEntity.ok().body("Successfully Updated Customer");

            else return ResponseEntity.unprocessableEntity().body("Failed to update the specified Customer");

        } else return ResponseEntity.unprocessableEntity().body("The specified Customer is not found");
    }
}