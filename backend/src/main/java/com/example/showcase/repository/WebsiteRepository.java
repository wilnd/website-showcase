package com.example.showcase.repository;

import com.example.showcase.entity.Website;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, Long> {
    Page<Website> findByIsActiveTrueOrderByClickCountDesc(Pageable pageable);

    List<Website> findByIsActiveTrueOrderByCreatedAtDesc();

    @Modifying
// 用 :websiteId 命名参数，替代 ?1
    @Query("UPDATE Website w SET w.clickCount = w.clickCount + 1 WHERE w.id = :websiteId")
    int incrementClickCount(@Param("websiteId") Long websiteId);  // @Param 与 SQL 中的 :websiteId 对应
}