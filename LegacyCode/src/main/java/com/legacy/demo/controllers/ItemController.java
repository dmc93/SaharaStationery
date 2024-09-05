package com.legacy.demo.controllers;

import com.legacy.demo.dtos.ItemDto;
import com.legacy.demo.entities.Item;
import com.legacy.demo.services.ItemService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<ItemDto>> getAll() {
        List<ItemDto> items = this.service.getAll();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/items/get/{id}")
    public ResponseEntity<?> getItem(@PathVariable Integer id) {
        return this.service.getItem(id);
    }

    @PostMapping("/items/getByIds")
    public ResponseEntity<List<ItemDto>> getItemsByIds(@RequestBody List<Integer> ids) {
        return this.service.getItemsByIds(ids);
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
    public ResponseEntity<?> updateItem(@PathVariable Integer id, @RequestBody Item itemUpdate) {
        return this.service.itemUpdate(
                id,
                itemUpdate.getName(),
                itemUpdate.getPrice(),
                itemUpdate.getQuantity(),
                itemUpdate.getImageUrl(),
                itemUpdate.getCategory()
        );
    }

    // Submit a rating for an item (directly pass the rating in ItemDto)
    @PostMapping("/item/{id}/rate")
    public ResponseEntity<?> rateItem(@PathVariable Integer id, @RequestBody ItemDto itemDto) {
        // Validate the rating (ensure it's between 1 and 5)
        if (itemDto.getRating() == null || itemDto.getRating() < 1 || itemDto.getRating() > 5) {
            return new ResponseEntity<>("Invalid rating. Rating should be between 1 and 5.", HttpStatus.BAD_REQUEST);
        }

        // Pass the rating to the service
        return this.service.rateItem(id, itemDto.getRating());
    }

    // Fetch the average rating of an item
    @GetMapping("/item/{id}/average-rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Integer id) {
        return this.service.getAverageRating(id);
    }

}
