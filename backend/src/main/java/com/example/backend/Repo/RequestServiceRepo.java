// RequestServiceRepo.java
package com.example.backend.Repo;

import com.example.backend.entity.RequestServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestServiceRepo extends JpaRepository<RequestServiceEntity, Integer> {
    // Add any specific query methods if needed
}