package com.legacy.demo.services;

import com.legacy.demo.entities.Cart;
import com.legacy.demo.classes.CartItemData;
import com.legacy.demo.repos.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    private static final int ID_LENGTH = 6;
    private static final Set<String> generatedIds = new HashSet<>();
    private static final Random random = new Random();

    @Transactional
    public String createCartWithItems(List<CartItemData> items, String status, String discountCode, double discountPercentage) {
        String cartId = generateOrderId();
        Cart cart = new Cart();
        cart.setCartId(cartId);
        cart.setItems(items);
        cart.setStatus(status);
        cart.setDiscountCode(discountCode);
        cart.setDiscountPercentage(discountPercentage);
        cartRepository.save(cart);
        return cartId;
    }


    public Cart getCart(String cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    private String generateOrderId() {
        String orderId;
        do {
            orderId = String.format("%06d", random.nextInt(1000000));
        } while (generatedIds.contains(orderId));
        generatedIds.add(orderId);
        return orderId;
    }

    public ResponseEntity<?> updateCart(String cartId, List<CartItemData> items, String status, String discountCode, double discountPercentage) {
        Optional<Cart> found = cartRepository.findByCartId(cartId);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Cart found with ID " + cartId, HttpStatus.NOT_FOUND);
        }

        Cart toUpdate = found.get();
        if (items != null) toUpdate.setItems(items);
        if (status != null) toUpdate.setStatus(status);
        if (discountCode != null) toUpdate.setDiscountCode(discountCode);
        if (discountPercentage >= 0) toUpdate.setDiscountPercentage(discountPercentage);

        Cart updated = cartRepository.save(toUpdate);
        return ResponseEntity.ok(updated);
    }

}
