package com.example.springrelation.model.base;
import lombok.*;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private Date dateOfBirth;
    private String email;
    private String facebookReference;
    private String firstName;
    private String lastName;
    private String githubReference;
    private String homePage;
    private String instagramReference;
    private String linkedinReference;
    @Lob
    private byte[] photo;
    private String stackOverFlowReference;
    private String title;
    private String twitterReference;
    private String xingReference;

    @OneToMany(targetEntity = Address.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Set<Address> addresses;

}
