package com.example.backend.DTO.updateController;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestUpdateUserDTO {

    private Integer requestId; // Required to identify which request to update
    private String requesterName;
    private String email;
    private String contactNumbers;
    private String eventType;
    private String location;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private Integer numberOfCleaners;
    private Double estimatedDuration;


}
