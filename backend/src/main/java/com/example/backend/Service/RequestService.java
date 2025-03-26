package com.example.backend.Service;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestStatusUpdateDTO;
import com.example.backend.DTO.updateController.RequestUpdateUserDTO;

import java.util.List;

public interface RequestService {
    String saveRequest(RequestServiceDTO dto);

//    String updateRequest(RequestServiceUpdateDTO requestServiceUpdateDTO);

    List<RequestServiceDTO> getAllRequest();

    RequestServiceDTO updateRequestStatus(Integer requestId, RequestStatusUpdateDTO updateDTO);

    String deleteRequest(Integer requestId);

    RequestServiceDTO updateUserRequest(RequestUpdateUserDTO updateDTO);
//    String saveRequest(RequestServiceDTO requestServiceDTO);
}
