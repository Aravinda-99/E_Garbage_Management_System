package com.example.backend.Service.IMPL;


import com.example.backend.Repo.RoleRepo;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Service.UserService;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User registerNewUser(User user) {
        user.setUserPassword(getEncodedPassword(user.getUserPassword())); // Encode password before saving
        return userRepo.save(user);
    }


    public void initRoleAndUsers() {
        // Create ADMIN role if it doesn't exist
        if (!roleRepo.existsById("ADMIN")) {

            Role adminRole = new Role();
            adminRole.setRoleName("ADMIN");
            adminRole.setRoleDescription("Admin Role");
            roleRepo.save(adminRole);
        }

        // Create USER role if it doesn't exist
        if (!roleRepo.existsById("USER")) {
            Role userRole = new Role();
            userRole.setRoleName("USER");
            userRole.setRoleDescription("USER Role");
            roleRepo.save(userRole);
        }

        // Fetch roles after ensuring they exist
        Role adminRole = roleRepo.findById("ADMIN").orElse(new Role("ADMIN", "Admin Role"));
        Role userRole = roleRepo.findById("USER").orElse(new Role("USER", "USER Role"));

        // Create admin user if it doesn't exist
        if (!userRepo.existsById("admin123")) {
            User user = new User();
            user.setUserName("admin123@gmail.com");
            user.setUserPassword(getEncodedPassword("admin@123"));
            user.setUserFirstName("Aravinda");
            user.setUserLastName("Varaj");

            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);

            user.setRole(adminRoles);
            userRepo.save(user);
        }

        // Create regular user if it doesn't exist
        if (!userRepo.existsById("user123")) {
            User user = new User();
            user.setUserName("user123@gmail.com");
            user.setUserPassword(getEncodedPassword("user@123"));
            user.setUserFirstName("viraj");
            user.setUserLastName("Subhasingha");

            Set<Role> userRoles = new HashSet<>();
            userRoles.add(userRole);

            user.setRole(userRoles);
            userRepo.save(user);
        }
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}