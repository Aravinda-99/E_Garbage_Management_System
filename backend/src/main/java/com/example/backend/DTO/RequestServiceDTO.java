package com.example.backend.DTO;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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

    // Method to transform DTO fields into entity fields
    public List<String> getContactNumbersAsList() {
        return List.of(contactNumbers); // Convert single contact number to List<String>
    }

    // Method to transform numberOfCleaners into assignedCleaners
    public List<String> getAssignedCleanersAsList() {
        List<String> cleaners = new ArrayList<>();
        if (numberOfCleaners != null && numberOfCleaners > 0) {
            for (int i = 1; i <= numberOfCleaners; i++) {
                cleaners.add("Cleaner " + i);
            }
        }
        return cleaners;
    }
}