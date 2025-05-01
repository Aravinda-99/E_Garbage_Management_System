package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.DTO.BinLocationDTO;
import com.example.backend.Service.BinLocationService;

import java.util.List;

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

    @GetMapping(path = "/get-all")
    public List<BinLocationDTO> getAllBinLocations() {
        List<BinLocationDTO> allBinLocations = binLocationService.getAllBinLocations();
        return allBinLocations;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BinLocationDTO> updateBinLocation(
            @PathVariable Long id,
            @RequestBody BinLocationDTO binLocationDTO
    ) {
        binLocationDTO.setId(id);
        BinLocationDTO updatedBinLocation = binLocationService.updateBinLocation(binLocationDTO);
        return ResponseEntity.ok(updatedBinLocation);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBinLocation(@PathVariable Long id) {
        String message = binLocationService.deleteBinLocation(id);
        return ResponseEntity.ok(message);
    }


}