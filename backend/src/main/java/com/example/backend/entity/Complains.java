package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "complains")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Complains {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer complainID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "complain", columnDefinition = "TEXT", nullable = false)
    private String complain;

    @Column(name = "image", columnDefinition = "TEXT")
    private String image; // Store image URL or base64 string
}
