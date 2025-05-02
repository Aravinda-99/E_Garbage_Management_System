package com.example.backend.Service.IMPL;


import com.example.backend.Repo.RoleRepo;
import com.example.backend.Service.RoleService;
import com.example.backend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepo repo;

    @Override
    public Role createNewRole(Role role) {
        if (repo.existsById(role.getRoleName())) {
            throw new RuntimeException("Role already exists: " + role.getRoleName());
        }
        return repo.save(role);
    }
}
