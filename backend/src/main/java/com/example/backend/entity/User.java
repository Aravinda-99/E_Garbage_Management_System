package com.example.backend.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonType.class)
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_firstName", length = 100, nullable = false)
    private String userFirstName;

    @Column(name = "user_lasttName", length = 100, nullable = false)
    private String userLastName;

    @Type(type = "json")  // ✅ Correct for Hibernate 5.x
    @Column(name = "contact_numbers", columnDefinition = "json")
    private List<String> contactNumbers = new ArrayList<>();

    @Column( name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "active_state", columnDefinition = "TINYINT default 0")
    private boolean active;


}
