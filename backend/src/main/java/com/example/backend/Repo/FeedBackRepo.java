package com.example.backend.Repo;

import com.example.backend.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedBackRepo extends JpaRepository<FeedBack,Integer> {
}
