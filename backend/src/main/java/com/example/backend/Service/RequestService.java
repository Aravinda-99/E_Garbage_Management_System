package com.example.backend.Service;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestServiceUpdateDTO;

import java.util.List;

public interface RequestService {
    String saveRequest(RequestServiceDTO dto);

    String updateRequest(RequestServiceUpdateDTO requestServiceUpdateDTO);

    List<RequestServiceDTO> getAllRequest();
//    String saveRequest(RequestServiceDTO requestServiceDTO);
}
