package com.example.springrelation.Controllers;

import com.example.springrelation.Repositories.CustomerRepo;
import com.example.springrelation.Repositories.FacilitatorRepo;
import com.example.springrelation.Repositories.PersonRepo;
import com.example.springrelation.exceptions.ResourceNotFoundException;
import com.example.springrelation.model.base.Address;
import com.example.springrelation.Repositories.AddressRepo;
import com.example.springrelation.model.base.Person;
import com.example.springrelation.model.facilitator.Facilitator;
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
public class AddressController {

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private PersonRepo personRepo;

    @Autowired
    private FacilitatorRepo facilitatorRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @PostMapping("/person/{personId}/address")
    public ResponseEntity<Address> createPersonAddress(@PathVariable(value = "personId") Long personId,
                                                 @RequestBody Address addressRequest) {
        Address address = personRepo.findById(personId).map(person -> {
            person.getAddresses().add(addressRequest);
            return addressRepo.save(addressRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Person with id = " + personId));
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @PostMapping("/facilitator/{facilitatorId}/address")
    public ResponseEntity<Address> createFacilitatorAddress(@PathVariable(value = "facilitatorId") Long facilitatorId,
                                                 @RequestBody Address addressRequest) {
        Address address = facilitatorRepo.findById(facilitatorId).map(facilitator -> {
            facilitator.getAddresses().add(addressRequest);
            return addressRepo.save(addressRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found facilitator with id = " + facilitatorId));
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @PostMapping("/customer/{customerId}/address")
    public ResponseEntity<Address> createCustomerAddress(@PathVariable(value = "customerId") Long customerId,
                                                            @RequestBody Address addressRequest) {
        Address address = customerRepo.findById(customerId).map(customer -> {
            customer.getAddresses().add(addressRequest);
            return addressRepo.save(addressRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Customer with id = " + customerId));
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @GetMapping("/person/{personId}/addresses")
    public ResponseEntity<List<Address>> getAllAddressesOfPerson(@PathVariable(value = "personId") Long personId) {
        Person person = personRepo.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Person with id = " + personId));
        List<Address> addresses = new ArrayList<Address>();
        addresses.addAll(person.getAddresses());

        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/facilitator/{facilitatorId}/addresses")
    public ResponseEntity<List<Address>> getAllAddressesOfFacilitator(@PathVariable(value = "facilitatorId") Long facilitatorId) {
        Facilitator facilitator = facilitatorRepo.findById(facilitatorId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Facilitator with id = " + facilitatorId));
        List<Address> addresses = new ArrayList<Address>();
        addresses.addAll(facilitator.getAddresses());

        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/customer/{customerId}/addresses")
    public ResponseEntity<List<Address>> getAllAddressesOfCustomer(@PathVariable(value = "customerId") Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Customer with id = " + customerId));
        List<Address> addresses = new ArrayList<Address>();
        addresses.addAll(customer.getAddresses());

        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/address/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable(value = "id") Long id) {
        Address address = addressRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Project with id = " + id));
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @PutMapping("/address/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable("id") Long id, @RequestBody Address addressRequest) {
        Address address = addressRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AddressId " + id + "not found"));
        address.setHouseNo(addressRequest.getHouseNo());
        address.setFax(addressRequest.getFax());
        address.setPhone(addressRequest.getPhone());
        address.setEmail(addressRequest.getEmail());
        address.setMobile(addressRequest.getMobile());
        address.setZip(addressRequest.getZip());
        address.setCity(addressRequest.getCity());
        address.setStreet(addressRequest.getStreet());
        return new ResponseEntity<>(addressRepo.save(address), HttpStatus.OK);
    }

    @DeleteMapping("/address/{id}")
    public ResponseEntity<Object> deleteAddress(@PathVariable Long id) {

        return addressRepo.findById(id).map(address -> {
            addressRepo.delete(address);
            return ResponseEntity.ok().build();

        }).orElseThrow(() ->new ResourceNotFoundException("Address id" + id + "not found"));
    }

}

