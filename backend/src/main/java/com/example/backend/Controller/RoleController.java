package com.example.backend.Controller;

//import com.example.JWT.entity.Role;
//import com.example.JWT.service.RoleService;
import com.example.backend.Service.RoleService;
import com.example.backend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/create-new-role")
    @ResponseStatus(HttpStatus.CREATED)
    public Role createNewRole(@RequestBody Role role) {

        return roleService.createNewRole(role);
    }
}
