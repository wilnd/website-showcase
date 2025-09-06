package com.example.showcase.repository;

import com.example.showcase.entity.WebsiteClick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteClickRepository extends JpaRepository<WebsiteClick, Long> {
}