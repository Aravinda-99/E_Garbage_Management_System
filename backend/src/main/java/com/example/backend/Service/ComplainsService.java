package com.example.backend.Service;

import com.example.backend.DTO.ComplainsDTO;

import java.util.List;

public interface ComplainsService {
    String saveComplain(ComplainsDTO complainDTO);

    List<ComplainsDTO> getAllComplains();

    String deleteComplain(Integer complainId);

    ComplainsDTO updateComplain(ComplainsDTO updateDTO);
}
