package com.example.backend.DTO;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {


    private Integer userId;
    private String userFirstName;
    private String userLastName;
    private List<String> contactNumbers = new ArrayList<>();
    private String email;
    private String password;
    private boolean active;
}
