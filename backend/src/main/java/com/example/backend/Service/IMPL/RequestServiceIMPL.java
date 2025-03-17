// RequestServiceIMPL.java
package com.example.backend.Service.IMPL;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestServiceUpdateDTO;
import com.example.backend.Repo.RequestServiceRepo;
import com.example.backend.Service.RequestService;
import com.example.backend.entity.RequestServiceEntity;
import com.example.backend.entity.enums.RequestStatus;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RequestServiceIMPL implements RequestService {

    @Autowired
    private RequestServiceRepo repo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveRequest(RequestServiceDTO dto) {
        RequestServiceEntity entity = new RequestServiceEntity();

        // Simple field mapping
        entity.setRequesterName(dto.getRequesterName());
        entity.setEmail(dto.getEmail());

        // Handling null lists safely
        List<String> contactNumbers = dto.getContactNumbers();
        entity.setContactNumbers(contactNumbers != null ? contactNumbers : new ArrayList<>());

        entity.setEventType(dto.getEventType());
        entity.setLocation(dto.getLocation());

        // Set event date and time
        entity.setEventDate(dto.getEventDate() != null ? dto.getEventDate() : LocalDate.now());
        entity.setEventTime(dto.getEventTime() != null ? dto.getEventTime() : LocalTime.now());

        // Set request date to current time
        entity.setRequestDate(LocalDateTime.now());

        // Set status to PENDING if not provided
        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : RequestStatus.PENDING);

        // Handling null lists safely
        List<String> assignedCleaners = dto.getAssignedCleaners();
        entity.setAssignedCleaners(assignedCleaners != null ? assignedCleaners : new ArrayList<>());

        repo.save(entity);
        return "Request saved for " + dto.getRequesterName() + "!";
    }

    // Implementation in RequestServiceIMPL class
    @Override
    public String updateRequest(RequestServiceUpdateDTO requestServiceUpdateDTO) {
        if (repo.existsById(requestServiceUpdateDTO.getRequestId())) {
            RequestServiceEntity entity = repo.getReferenceById(requestServiceUpdateDTO.getRequestId());

            entity.setRequesterName(requestServiceUpdateDTO.getRequesterName());
            entity.setEmail(requestServiceUpdateDTO.getEmail());
            entity.setContactNumbers(requestServiceUpdateDTO.getContactNumbers());
            entity.setEventType(requestServiceUpdateDTO.getEventType());
            entity.setLocation(requestServiceUpdateDTO.getLocation());
            entity.setEventDate(requestServiceUpdateDTO.getEventDate());
            entity.setEventTime(requestServiceUpdateDTO.getEventTime());
            entity.setStatus(requestServiceUpdateDTO.getStatus());
            entity.setAssignedCleaners(requestServiceUpdateDTO.getAssignedCleaners());

            repo.save(entity);
            return requestServiceUpdateDTO.getRequesterName() + " Request Updated Successfully";
        } else {
            throw new RuntimeException("Request Not Found");
        }
    }

    @Override
    public List<RequestServiceDTO> getAllRequest() {
        List<RequestServiceEntity> requests = repo.findAll();

        List<RequestServiceDTO> requestDTOS = modelMapper.map(requests,new TypeToken<List<RequestServiceDTO>>(){}.getType());
        return requestDTOS;
    }
}