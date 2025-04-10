package com.example.backend.DTO;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FeedBackDTO {

    private Integer feedbackId;

    private String username;

    private String message;

    private int rating;
}
