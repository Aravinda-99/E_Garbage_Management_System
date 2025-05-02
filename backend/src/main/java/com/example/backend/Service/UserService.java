package com.example.backend.Service;


import com.example.backend.entity.User;

public interface UserService {
    User registerNewUser(User user);
    public void initRoleAndUsers();
}