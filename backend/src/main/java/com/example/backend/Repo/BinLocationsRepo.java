package com.example.backend.Repo;

import com.example.backend.entity.BinLocations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BinLocationsRepo extends JpaRepository<BinLocations,Integer> {
}
