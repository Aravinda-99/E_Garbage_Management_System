package com.example.backend.Service;

import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserService  {
    String saveUser(UserDTO userDTO);
}
