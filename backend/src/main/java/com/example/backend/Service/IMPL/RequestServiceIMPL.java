package com.example.backend.Service.IMPL;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.Repo.RequestServiceRepo;
import com.example.backend.Service.RequestService;
import com.example.backend.entity.RequestServiceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class RequestServiceIMPL implements RequestService {

    @Autowired
    private RequestServiceRepo requestServiceRepo;

    @Override
    public String saveRequest(RequestServiceDTO requestServiceDTO) {
        RequestServiceEntity requestServiceEntity = new RequestServiceEntity( // 🟢 Use the correct entity class
                requestServiceDTO.getRequestId(),
                requestServiceDTO.getRequesterName(),
                requestServiceDTO.getEmail(),
                new ArrayList<>(requestServiceDTO.getContactNumbers()), // Ensure it's an ArrayList
                requestServiceDTO.getEventType(),
                requestServiceDTO.getLocation(),
                requestServiceDTO.getEventDate(),
                requestServiceDTO.getEventTime(),
                LocalDateTime.now(), // Automatically set request date
                requestServiceDTO.getStatus(),
                new ArrayList<>(requestServiceDTO.getAssignedCleaners()) // Ensure it's an ArrayList
        );

        requestServiceRepo.save(requestServiceEntity);

        return "Request saved for " + requestServiceDTO.getRequesterName();
    }
}

