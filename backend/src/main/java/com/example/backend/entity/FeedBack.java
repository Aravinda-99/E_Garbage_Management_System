package com.example.backend.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;

@Entity
@Table(name = "feedback")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//@TypeDefs({
//        @TypeDef(name = "json", typeClass = JsonType.class)
//})

public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackID;

    @Column(name = "username", nullable = false)
    private String username;

//    @Column(name = "email", nullable = false)
//    private String email;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "rating")
    private int rating;
}
