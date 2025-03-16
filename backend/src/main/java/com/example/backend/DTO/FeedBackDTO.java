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

public class FeedBackDTO {

    private Long feedbackID;

    private String username;

    private String message;

    private int rating;
}
