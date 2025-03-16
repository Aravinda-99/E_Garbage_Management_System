package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/user")
@CrossOrigin //Security Perpose walata use krnne
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody UserDTO userDTO) {

        String massage = userService.saveUser(userDTO);
        return massage;
    }

}
