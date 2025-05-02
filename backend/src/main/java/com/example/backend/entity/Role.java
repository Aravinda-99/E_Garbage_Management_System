package com.example.backend.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Role {


    @Id
    @Column(name = "role_name", nullable = false, unique = true)
    private String roleName;

    @Column(name = "role_description")
    private String roleDescription;



}