package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.BinLocationDTO;
import com.example.backend.Service.BinLocationService;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/BinLocation")
@CrossOrigin //Security Perpose walata use krnne
public class BinLocationController {

    @Autowired
    private BinLocationService binLocationService;

    @PostMapping(path = "/save")
    public String save(@RequestBody BinLocationDTO binLocationDTO) {
        String message = binLocationService.saveBinLocation(binLocationDTO);
        return message;
    }
}