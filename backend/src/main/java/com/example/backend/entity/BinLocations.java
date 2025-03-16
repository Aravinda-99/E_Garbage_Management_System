package com.example.backend.entity;

import lombok.*;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Entity
@Table(name= "Locations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString


public class BinLocations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private int locationId;

    @Column(name = "locationName")
    private String locationName;

    @Column(name = "Address")
    private String address;

    @Column(name = "binCapacity")
    private int binCapacity;

    @Column(name = "currentLevel")
    private int currentLevel;

    @Column(name = "status")
    private String status;
}
