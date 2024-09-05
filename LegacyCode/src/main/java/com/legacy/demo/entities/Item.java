package com.legacy.demo.entities;

import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;
    private String category;

    private Integer totalRatingsCount = 0;  // Number of ratings received
    private Integer totalRatingSum = 0;     // Sum of all ratings (to calculate average)

    public Item() {
    }

    public Item(Integer id, String name, Double price, Integer quantity, String imageUrl, String category) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    public Item(String name, Double price, String imageUrl, String category) {
        super();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
    }


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

    // Method to calculate average rating
    @Transient
    public Double getAverageRating() {
        if (totalRatingsCount == null || totalRatingsCount == 0) {
            return 0.0;
        }
        return (totalRatingSum == null ? 0 : (double) totalRatingSum) / totalRatingsCount;
    }


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
}
