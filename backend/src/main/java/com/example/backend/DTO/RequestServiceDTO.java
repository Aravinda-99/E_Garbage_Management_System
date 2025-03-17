// RequestServiceDTO.java
package com.example.backend.DTO;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestServiceDTO {

    private Integer requestId;
    private String requesterName;
    private String email;
    private List<String> contactNumbers;
    private String eventType;
    private String location;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private RequestStatus status;
    private List<String> assignedCleaners;
}