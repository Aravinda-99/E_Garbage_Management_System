package com.example.backend.Controller;

import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.Service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/user")
@CrossOrigin //Security Perpose walata use krnne
public class RequestServiceController {

    @Autowired
    private RequestService requestService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody RequestServiceDTO requestServiceDTO) {
        String message = requestService.saveRequest(requestServiceDTO);
        return message;
    }
}
