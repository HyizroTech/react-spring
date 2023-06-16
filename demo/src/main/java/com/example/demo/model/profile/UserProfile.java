package com.example.demo.model.profile;

import com.example.demo.model.projects.Project;
import com.example.demo.model.skills.Knowledge;
import com.example.demo.model.skills.Products;
import com.example.demo.model.skills.Programming;
import com.example.demo.model.skills.Standards;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String education;
    private String yearOfBirth;
    private String nationality;
    @Lob
    private byte[] photo;

    @OneToMany(targetEntity = Language.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Language> languages;

    @OneToMany(targetEntity = Knowledge.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Knowledge> knowledges;

    @OneToMany(targetEntity = Products.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Products> products;

    @OneToMany(targetEntity = Programming.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Programming> programmings;

    @OneToMany(targetEntity = Standards.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Standards> standards;

    @OneToMany(targetEntity = Project.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private List<Project> projects;

}
