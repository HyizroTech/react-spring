package com.example.springrelation.model.base;
import lombok.*;
import javax.persistence.*;


@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String email;
    private String fax;
    private String houseNo;
    private String mobile;
    private String phone;
    private String street;
    private String zip;

}
