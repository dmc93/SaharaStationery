package com.legacy.demo.controllers;

import com.legacy.demo.entities.Item;
import com.legacy.demo.services.ItemService;
import com.legacy.demo.dtos.ItemDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping("/items/getAll")
    public List<ItemDto> getAll() {
        return this.service.getAll();
    }

    @GetMapping("/items/get/{id}")
    public ResponseEntity<?> getItem(@PathVariable Integer id) {
        return this.service.getItem(id);
    }

    @PostMapping("/item/add")
    public ResponseEntity<?> addItem(@RequestBody Item item) {
        return this.service.addItem(item);
    }

    @DeleteMapping("/item/remove/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Integer id) {
        return this.service.removeItem(id);
    }

    @PatchMapping("/item/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id,
                                        @RequestBody Item itemUpdate) {
        return this.service.itemUpdate(
                id,
                itemUpdate.getName(),
                itemUpdate.getPrice(),
                itemUpdate.getQuantity(),
                itemUpdate.getImageUrl(),
                itemUpdate.getCategory() // Added category to the update parameters
        );
    }
}
