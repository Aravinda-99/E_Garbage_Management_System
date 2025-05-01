package com.example.backend.DTO;

import java.time.LocalDateTime;



import com.example.backend.entity.BinLocation.BinStatus;
import com.example.backend.entity.BinLocation.WasteType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BinLocationDTO {

    private Long id;


    private String address;


    private Double latitude;


    private Double longitude;


    private WasteType wasteType;


    private BinStatus status;

    private LocalDateTime lastUpdated;

    // Formatted coordinates string for display purposes
    public String getFormattedCoordinates() {
        if (latitude != null && longitude != null) {
            return latitude.toString().substring(0, Math.min(latitude.toString().length(), 8)) + ", " +
                    longitude.toString().substring(0, Math.min(longitude.toString().length(), 8));
        }
        return "";
    }
}