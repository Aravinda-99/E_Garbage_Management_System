package com.example.backend.entity;

import com.example.backend.entity.enums.RequestStatus;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "request_service")
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonType.class)
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RequestServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Integer requestId;

    @Column(name = "requester_name", length = 100, nullable = false)
    private String requesterName;

    @Column(name = "user_email", nullable = false)
    private String email;

    @Type(type = "json")
    @Column(name = "contact_numbers", columnDefinition = "json")
    private List<String> contactNumbers = new ArrayList<>();

    @Column(name = "event_type", length = 50, nullable = false)
    private String eventType;

    @Column(name = "location", length = 255, nullable = false)
    private String location;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "event_time", nullable = false)
    private LocalTime eventTime;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20, nullable = false)
    private RequestStatus status = RequestStatus.New;

    @Type(type = "json")
    @Column(name = "assigned_cleaners", columnDefinition = "json")
    private List<String> assignedCleaners = new ArrayList<>();

    @Column(name = "number_of_cleaners", nullable = false)
    private Integer numberOfCleaners = 0;

    @Column(name = "estimated_duration")
    private Double estimatedDuration;
}
