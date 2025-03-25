package com.example.backend.DTO.updateController;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestServiceAdminUpdateDTO {

    private Integer requestId; // Add requestId to identify which request to update
    private RequestStatus status; // New status of the request
    private Integer numberOfCleaners; // Number of cleaners
    private List<String> assignedCleaners; // Names of assigned cleaners
}
