package com.legacy.demo.dtos;

import com.legacy.demo.entities.Item;

public class ItemDto {
    private Integer id;
    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;
    private String category;

    // Fields for displaying average rating data
    private Integer totalRatingsCount;
    private Integer totalRatingSum;
    private Double averageRating;

    // New field to handle individual rating submissions (only for input)
    private Integer rating;  // This will be used when submitting a new rating

    // Default constructor
    public ItemDto() {
        super();
    }

    // Constructor for fetching items (including rating info)
    public ItemDto(Integer id, String name, Double price, Integer quantity, String imageUrl, String category,
                   Integer totalRatingsCount, Integer totalRatingSum) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl  = imageUrl;
        this.category = category;
        this.totalRatingsCount = totalRatingsCount;
        this.totalRatingSum = totalRatingSum;
        this.averageRating = (totalRatingsCount == 0) ? 0.0 : (double) totalRatingSum / totalRatingsCount;
    }

    // Constructor to convert from Item entity to ItemDto
    public ItemDto(Item item) {
        super();
        this.id = item.getId();
        this.name = item.getName();
        this.price = item.getPrice();
        this.quantity = item.getQuantity();
        this.imageUrl = item.getImageUrl();
        this.category = item.getCategory();
        this.totalRatingsCount = item.getTotalRatingsCount();
        this.totalRatingSum = item.getTotalRatingSum();
        this.averageRating = item.getAverageRating();  // Calls the transient method in the entity
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Ratings related fields
    public Integer getTotalRatingsCount() {
        return totalRatingsCount;
    }

    public void setTotalRatingsCount(Integer totalRatingsCount) {
        this.totalRatingsCount = totalRatingsCount;
    }

    public Integer getTotalRatingSum() {
        return totalRatingSum;
    }

    public void setTotalRatingSum(Integer totalRatingSum) {
        this.totalRatingSum = totalRatingSum;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    // Getter and setter for rating (input for user rating submission)
    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
