package com.example.backend.Controller;

import com.example.backend.DTO.BinLocationsDTO;
import com.example.backend.Service.BinLocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/BinLocations")
@CrossOrigin //Security Perpose walata use krnne

public class BinLocationsController {

    @Autowired
    private BinLocationsService binLocationsService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody BinLocationsDTO binsDTO) {

        String message = binLocationsService.saveBins(binsDTO);

        return message;

    }

}
