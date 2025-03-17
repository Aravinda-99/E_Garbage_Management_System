package com.example.backend.Repo;


import com.example.backend.entity.RequestServiceEntity;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestServiceRepo extends JpaRepository<RequestServiceEntity,Integer>  {
}
