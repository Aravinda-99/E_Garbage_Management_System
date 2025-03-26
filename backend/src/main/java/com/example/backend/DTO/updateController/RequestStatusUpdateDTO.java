package com.example.backend.DTO.updateController;

import com.example.backend.entity.enums.RequestStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestStatusUpdateDTO {
    private RequestStatus status;
}
