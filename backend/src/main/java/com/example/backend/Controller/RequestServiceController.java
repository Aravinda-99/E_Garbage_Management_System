// RequestServiceController.java
package com.example.backend.Controller;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}