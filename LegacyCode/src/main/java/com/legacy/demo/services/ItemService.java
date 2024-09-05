package com.legacy.demo.services;

import com.legacy.demo.repos.ItemRepo;
import com.legacy.demo.entities.Item;
import com.legacy.demo.dtos.ItemDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemService {

    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    public List<ItemDto> getAll() {
        List<ItemDto> dto = new ArrayList<>();
        List<Item> found = this.repo.findAll();
        for (Item item : found) {
            dto.add(new ItemDto(item));  // Convert Item to ItemDto
        }
        return dto;
    }

    public ResponseEntity<?> getItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new ItemDto(found.get()));  // Convert Item to ItemDto
    }

    public ResponseEntity<List<ItemDto>> getItemsByIds(List<Integer> ids) {
        List<Item> items = (List<Item>) this.repo.findAllById(ids); // Use findAllById
        List<ItemDto> itemDto = new ArrayList<>();
        for (Item item : items) {
            itemDto.add(new ItemDto(item));
        }
        return ResponseEntity.ok(itemDto);
    }

    public ResponseEntity<ItemDto> addItem(Item newItem) {
        Item created = this.repo.save(newItem);
        return new ResponseEntity<>(new ItemDto(created), HttpStatus.CREATED);
    }

    public ResponseEntity<?> removeItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        this.repo.deleteById(id);
        return ResponseEntity.ok("Item with id " + id + " has been deleted.");
    }

    public ResponseEntity<?> itemUpdate(Integer id,
                                        String name,
                                        Double price,
                                        Integer quantity,
                                        String imageUrl,
                                        String category) {

        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with ID " + id, HttpStatus.NOT_FOUND);
        }

        Item toUpdate = found.get();

        if (name != null) toUpdate.setName(name);
        if (price != null) toUpdate.setPrice(price);
        if (quantity != null) toUpdate.setQuantity(quantity);
        if (imageUrl != null) toUpdate.setImageUrl(imageUrl);
        if (category != null) toUpdate.setCategory(category);

        Item updated = this.repo.save(toUpdate);
        return ResponseEntity.ok(new ItemDto(updated));
    }

    // Handle rating submission
    // Handle rating submission
    public ResponseEntity<?> rateItem(Integer id, Integer rating) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }

        Item item = found.get();

        // Update total rating count and sum
        item.setTotalRatingsCount(item.getTotalRatingsCount() + 1);
        item.setTotalRatingSum(item.getTotalRatingSum() + rating);

        // Save the updated item
        this.repo.save(item);

        // Return the updated rating data in the response
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("averageRating", item.getAverageRating());
        responseBody.put("totalRatingsCount", item.getTotalRatingsCount());

        return ResponseEntity.ok(responseBody);
    }


    // Get the average rating of an item
    public ResponseEntity<Double> getAverageRating(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Item item = found.get();
        return ResponseEntity.ok(item.getAverageRating());
    }
}
