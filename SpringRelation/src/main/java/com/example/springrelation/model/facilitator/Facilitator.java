package com.example.springrelation.model.facilitator;
import com.example.springrelation.model.base.Address;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class Facilitator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(targetEntity = Address.class,fetch = FetchType.LAZY ,
            cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "facilitator_id", referencedColumnName = "id")
    private Set<Address> addresses;
}
