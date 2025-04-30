package com.example.backend.DTO;

import lombok.*;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BinLocationsDTO {
    private int locationId;
    private String address;
    private String coordinates;
    private int type;
    private int status;
    private Date lastUpdated;
}
