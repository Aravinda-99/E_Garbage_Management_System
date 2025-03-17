package com.example.backend.Service;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestServiceUpdateDTO;

public interface RequestService {
    String saveRequest(RequestServiceDTO dto);

    String updateRequest(RequestServiceUpdateDTO requestServiceUpdateDTO);
//    String saveRequest(RequestServiceDTO requestServiceDTO);
}
