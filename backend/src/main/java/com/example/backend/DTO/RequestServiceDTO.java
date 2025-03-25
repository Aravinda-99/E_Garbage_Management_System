package com.example.backend.DTO;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestServiceDTO {

    private String requesterName;
    private String email;
    private String contactNumbers; // Single contact number (frontend input)
    private String eventType;
    private String location;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private RequestStatus status = RequestStatus.New; // Default to "NEW"
    private Integer numberOfCleaners; // Number of cleaners (frontend input)
    private Double estimatedDuration; // Estimated duration in hours
}
