// RequestServiceIMPL.java
package com.example.backend.Service.IMPL;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestServiceUpdateDTO;
import com.example.backend.DTO.updateController.RequestStatusUpdateDTO;
import com.example.backend.Repo.RequestServiceRepo;
import com.example.backend.Service.RequestService;
import com.example.backend.entity.RequestServiceEntity;
import com.example.backend.entity.enums.RequestStatus;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public String saveRequest(RequestServiceDTO dto) {
        RequestServiceEntity entity = new RequestServiceEntity();

        // Simple field mapping
        entity.setRequesterName(dto.getRequesterName());
        entity.setEmail(dto.getEmail());

        // Transform single contact number into a List<String>
        entity.setContactNumbers(dto.getContactNumbers() != null ? List.of(dto.getContactNumbers()) : new ArrayList<>());

        entity.setEventType(dto.getEventType());
        entity.setLocation(dto.getLocation());

        // Set event date and time
        entity.setEventDate(dto.getEventDate() != null ? dto.getEventDate() : LocalDate.now());
        entity.setEventTime(dto.getEventTime() != null ? dto.getEventTime() : LocalTime.now());

        // Set request date to current time
        entity.setRequestDate(LocalDateTime.now());

        // Set status
        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : RequestStatus.NEW);

        // Ensure numberOfCleaners is set correctly
        entity.setNumberOfCleaners(dto.getNumberOfCleaners());

        // Save entity
        repo.save(entity);

        return "Request saved for " + dto.getRequesterName() + " with " + entity.getNumberOfCleaners() + " cleaners!";
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
//            entity.setAssignedCleaners(requestServiceUpdateDTO.getAssignedCleaners());

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


    @Transactional
    public RequestServiceDTO updateRequestStatus(Integer requestId, RequestStatusUpdateDTO updateDTO) {
        RequestServiceEntity existingRequest = repo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found with ID: " + requestId));

        existingRequest.setStatus(updateDTO.getStatus());
        RequestServiceEntity updatedRequest = repo.save(existingRequest);

        // Ensure the ID is included in the returned DTO
        RequestServiceDTO dto = modelMapper.map(updatedRequest, RequestServiceDTO.class);
        dto.setRequestId(updatedRequest.getRequestId()); // Explicitly set the ID
        return dto;
    }


    public String deleteRequest(Integer requestId) {
        if (repo.existsById(requestId)) {
            repo.deleteById(requestId);
            return requestId + " Deleted Successfully";
        } else {
            throw new RuntimeException("Request Not Found");
        }
    }
    
}