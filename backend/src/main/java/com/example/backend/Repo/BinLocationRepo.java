package com.example.backend.Repo;

import com.example.backend.entity.BinLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BinLocationRepo extends JpaRepository<BinLocation, Long> {
}
