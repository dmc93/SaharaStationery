package com.legacy.demo.dtos;


import com.legacy.demo.entities.Item;
import jakarta.persistence.OneToMany;


public class ItemDto {
    @OneToMany
    private Integer id;
    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;

    public ItemDto(Integer id, String name, Double price, Integer quantity, String imageUrl) {
        super();
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl  =  imageUrl ;
    }
    public ItemDto() {
        super();
    }

    public ItemDto(Item item){
         super();
        this.id = item.getId();
        this.name = item.getName();
        this.price = item.getPrice();
        this.quantity = item.getQuantity();
        this.imageUrl = item.getImageUrl();
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
}
