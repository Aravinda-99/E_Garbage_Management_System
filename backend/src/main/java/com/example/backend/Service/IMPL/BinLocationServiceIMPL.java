package com.example.backend.Service.IMPL;

import com.example.backend.DTO.BinLocationDTO;
import com.example.backend.Repo.BinLocationRepo;
import com.example.backend.Service.BinLocationService;
import com.example.backend.entity.BinLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BinLocationServiceIMPL implements BinLocationService {

    @Autowired
    private BinLocationRepo binLocationRepo;

    @Override
    public String saveBinLocation(BinLocationDTO binLocationDTO) {
        // Set current time for lastUpdated if not provided
        if (binLocationDTO.getLastUpdated() == null) {
            binLocationDTO.setLastUpdated(LocalDateTime.now());
        }

        // Create entity directly from DTO
        BinLocation binLocation = new BinLocation(
                binLocationDTO.getId(),
                binLocationDTO.getAddress(),
                binLocationDTO.getLatitude(),
                binLocationDTO.getLongitude(),
                binLocationDTO.getWasteType(),
                binLocationDTO.getStatus(),
                binLocationDTO.getLastUpdated()
        );

        // Save the entity
        binLocationRepo.save(binLocation);

        return "Saved bin location at " + binLocationDTO.getAddress();
    }
}
