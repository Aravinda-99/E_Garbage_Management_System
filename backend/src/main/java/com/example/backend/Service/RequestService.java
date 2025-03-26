package com.example.backend.Service;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestServiceUpdateDTO;
import com.example.backend.DTO.updateController.RequestStatusUpdateDTO;

import java.util.List;

public interface RequestService {
    String saveRequest(RequestServiceDTO dto);

    String updateRequest(RequestServiceUpdateDTO requestServiceUpdateDTO);

    List<RequestServiceDTO> getAllRequest();

    RequestServiceDTO updateRequestStatus(Integer requestId, RequestStatusUpdateDTO updateDTO);

    String deleteRequest(Integer requestId);
//    String saveRequest(RequestServiceDTO requestServiceDTO);
}
