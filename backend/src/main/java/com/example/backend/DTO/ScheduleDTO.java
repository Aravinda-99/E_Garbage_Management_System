package com.example.backend.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.backend.entity.enums.WasteType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleDTO {

    private Long id;

    private LocalDate date;

    private LocalTime time;

    private String location;

    private WasteType wasteType;
}