package com.example.backend.Service.IMPL;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Service.UserService;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public String saveUser(UserDTO userDTO) {
        User user = new User(
                userDTO.getUserId(),
                userDTO.getUserFirstName(),
                userDTO.getUserLastName(),
                new ArrayList<>(userDTO.getContactNumbers()), // Ensure it's an ArrayList
                userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.isActive()
        );

        userRepo.save(user);
        return "Saved " + userDTO.getUserFirstName();
    }

}
