package com.example.demo.Repositories;

import com.example.demo.model.skills.Products;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductsRepo extends JpaRepository<Products,Long> {

}
