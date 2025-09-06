package com.example.showcase.repository;

import com.example.showcase.entity.Website;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, Long> {
    Page<Website> findByIsActiveTrueOrderByCreatedAtDesc(Pageable pageable);
    List<Website> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Modifying
    @Query("UPDATE Website w SET w.clickCount = w.clickCount + 1 WHERE w.id = ?1")
    int incrementClickCount(Long websiteId);
}