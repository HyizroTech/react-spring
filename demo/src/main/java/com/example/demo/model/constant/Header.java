package com.example.demo.model.constant;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Header {
   @Id
    private Long headerId;
    private String companyName;
    private String street;
    private String zipCode;
    private String city;
    @Lob
    private byte[] companyLogo;
}
