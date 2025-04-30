package com.example.backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ComplainsDTO {

    private Integer complainID;
    private String name;
    private String complain;
    private String image;
}
