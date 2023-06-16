package com.example.demo.model.constant;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Footer {
    @Id
    private Long footerId;
    private String companyName;
    private String street;
    private String zip;
    private String city;
    private String website;
    private String telephone;
    private String fax;
    private String email;
    private String companyLocalCourt;
    private String partnerLocalCourt;
    private String registeredOffice;
    private String salesTaxId;
    private String bank;
    private String iban;
    private String partner;
    private String director;
}
