package com.example.backend.Controller;

//import com.example.JWT.entity.User;
//import com.example.JWT.service.UserService;
import com.example.backend.Service.UserService;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/register-new-user")
    public User registerNewUser(@RequestBody User user) {
        return userService.registerNewUser(user);
    }

    @PostConstruct
    public void initRoleAndUsers() {
        userService.initRoleAndUsers();
    }

    @GetMapping("for-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String forAdmin() {
        return "this url only  For Admin";
    }

    @GetMapping("for-user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String forUser() {
        return "For User";
    }
}