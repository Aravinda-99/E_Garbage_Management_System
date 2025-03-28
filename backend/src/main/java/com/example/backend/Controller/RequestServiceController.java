// RequestServiceController.java
package com.example.backend.Controller;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestStatusUpdateDTO;
import com.example.backend.DTO.updateController.RequestUpdateUserDTO;
import com.example.backend.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/request")
@CrossOrigin
public class RequestServiceController {

    @Autowired
    private RequestService requestService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody RequestServiceDTO dto) {
        try {
            String response = requestService.saveRequest(dto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Controller method
//    @PutMapping("/update")
//    public String updateRequest(@RequestBody RequestServiceUpdateDTO requestServiceUpdateDTO) {
//        String message = requestService.updateRequest(requestServiceUpdateDTO);
//        return message;
//    }



    @GetMapping(path = "/get-all-request")
    public List<RequestServiceDTO> getAllRequest() {

        List<RequestServiceDTO> allRequest = requestService.getAllRequest();
        return allRequest;
    }

    @DeleteMapping(path = "delete-request/{id}")
    public String deleteRequest(@PathVariable(value = "id") Integer requestId) {
        String deleted = requestService.deleteRequest(requestId);
        return deleted;
    }


    @PutMapping("/update/{requestId}")
    public ResponseEntity<RequestServiceDTO> updateRequest(
            @PathVariable Integer requestId,
            @RequestBody RequestUpdateUserDTO updateDTO
    ) {
        updateDTO.setRequestId(requestId);
        RequestServiceDTO updatedRequest = requestService.updateUserRequest(updateDTO);
        return ResponseEntity.ok(updatedRequest);
    }

    @PutMapping("/{requestId}/update-status")
    public ResponseEntity<?> updateRequestStatus(
            @PathVariable Integer requestId,
            @RequestBody RequestStatusUpdateDTO updateDTO
    ) {
        try {
            // Log incoming data for debugging
            System.out.println("Received Request ID: " + requestId);
            System.out.println("Received Status: " + updateDTO.getStatus());

            // Validate input
            if (updateDTO.getStatus() == null) {
                return ResponseEntity.badRequest().body("Status cannot be null");
            }

            RequestServiceDTO updatedRequest = requestService.updateRequestStatus(requestId, updateDTO);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            // Log the full exception
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error updating request status: " + e.getMessage());
        }
    }

}