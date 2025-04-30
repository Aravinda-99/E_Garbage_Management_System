package com.example.backend.Repo;

import com.example.backend.entity.Complains;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplainsRepo extends JpaRepository<Complains,Integer> {
}
