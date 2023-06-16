package com.example.demo.Controller;

import com.example.demo.Repositories.ProductsRepo;
import com.example.demo.Repositories.UserProfileRepo;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.skills.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ProductsController {

    @Autowired
    private ProductsRepo productsRepo;

    @Autowired
    private UserProfileRepo userProfileRepo;


    @GetMapping("/user/{userId}/products")
    public ResponseEntity<List<Products>> getAllProducts(@PathVariable(value = "userId") Long userId) {

        UserProfile user = userProfileRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));
        List<Products> products = new ArrayList<Products>();
        products.addAll(user.getProducts());

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Products> getProduct(@PathVariable(value = "id") Long id) {

        Products product = productsRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + id));
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable (value = "id") Long productId,
                                                     @Valid @RequestBody Products productRequest) {

        Products product = productsRepo.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductId " + productId + "not found"));

        product.setProductName(productRequest.getProductName());
        return new ResponseEntity<>(productsRepo.save(product), HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable (value = "id") Long id){
        return productsRepo.findById(id).map(product -> {
            productsRepo.delete(product);
            return ResponseEntity.ok().build();
        }).orElseThrow(()-> new ResourceNotFoundException("Product id" + id + "not found"));

    }

}
