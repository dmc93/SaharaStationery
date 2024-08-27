package com.legacy.demo.repos;

import com.legacy.demo.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, String> {
    Optional<Cart> findByCartId(String cartId);
    void deleteByCartId(String cartId);
}