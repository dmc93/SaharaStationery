package com.legacy.demo.services;

import com.legacy.demo.repos.ItemRepo;
import com.legacy.demo.entities.Item;
import com.legacy.demo.dtos.ItemDto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class ItemService {

    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    public List<ItemDto> getAll() {
        List<ItemDto> dtos = new ArrayList<>();
        List<Item> found = this.repo.findAll();
        for (Item Item : found) {
            dtos.add(new ItemDto(Item));
        }
        return dtos;
    }

    public ResponseEntity<?> getItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new ItemDto(found.get()));
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

    public ResponseEntity<?> ItemUpdate(Integer id,
                                            String name,
                                            Double price,
                                            Integer quantity,
                                        String imageUrl){

        Optional<Item> found = this.repo.findById(Math.toIntExact(id));
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with ID " + id, HttpStatus.NOT_FOUND);
        }

        Item toUpdate = found.get();


        if (name != null) toUpdate.setName(name);
        if (price != null) toUpdate.setPrice(price);
        if (quantity != null) toUpdate.setQuantity(quantity);
        if (imageUrl != null) toUpdate.setImageUrl(imageUrl);

        Item updated = this.repo.save(toUpdate);
        return ResponseEntity.ok(new ItemDto(updated));
    }
}