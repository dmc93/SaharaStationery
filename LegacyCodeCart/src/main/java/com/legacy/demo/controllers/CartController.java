package com.legacy.demo.controllers;

import com.legacy.demo.classes.CartItemData;
import com.legacy.demo.entities.Cart;
import com.legacy.demo.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItemData>> getCart(@PathVariable String cartId) {
        try {
            List<CartItemData> items = cartService.getCart(cartId);
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addItems(@RequestBody List<CartItemData> items) {
        String cartId = cartService.createCartWithItems(items);
        return new ResponseEntity<>(cartId, HttpStatus.CREATED);
    }

    @PatchMapping("/update/{cartId}")
    public ResponseEntity<?> updateCart(@PathVariable String cartId,
                                         @RequestBody Cart updateRequest){
        return this.cartService.updateCart(
                cartId,
                updateRequest.getItems(),
                updateRequest.getStatus()
        );
    }



}
