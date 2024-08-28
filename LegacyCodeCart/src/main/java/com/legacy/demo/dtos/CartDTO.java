package com.legacy.demo.dtos;

import com.legacy.demo.classes.CartItemData;
import java.util.List;

public class CartDTO {
    private List<CartItemData> items;
    private String status;

    // Getters and Setters

    public List<CartItemData> getItems() {
        return items;
    }

    public void setItems(List<CartItemData> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
