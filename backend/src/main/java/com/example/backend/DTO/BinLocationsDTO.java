package com.example.backend.DTO;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class BinLocationsDTO {


    private int locationId;
    private String locationName;
    private String address;
    private int binCapacity;
    private int currentLevel;
    private String status;
}
