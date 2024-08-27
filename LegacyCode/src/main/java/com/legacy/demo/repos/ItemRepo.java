package com.legacy.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.legacy.demo.entities.Item;

@Repository
public interface ItemRepo extends JpaRepository <Item, Integer> {

}
