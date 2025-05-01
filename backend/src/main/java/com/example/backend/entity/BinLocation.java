package com.example.backend.entity;

import java.time.LocalDateTime;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Entity representing a waste bin location in the system.
 */
@Entity
@Table(name = "bin_locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BinLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, precision = 10, scale = 6)
    private Double latitude;

    @Column(nullable = false, precision = 10, scale = 6)
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BinStatus status;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    /**
     * Enum representing different types of waste bins.
     */
    public enum WasteType {
        ORGANIC, PLASTIC, PAPER, METAL
    }

    /**
     * Enum representing different statuses a bin can have.
     */
    public enum BinStatus {
        EMPTY, HALF_FULL, FULL
    }

}