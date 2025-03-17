package com.example.backend.Service.IMPL;

import com.example.backend.DTO.BinLocationsDTO;
import com.example.backend.Repo.BinLocationsRepo;
import com.example.backend.Service.BinLocationsService;
import com.example.backend.entity.BinLocations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BinLocationsServiceIMPL implements BinLocationsService {

    @Autowired
    private BinLocationsRepo binLocationsRepo;

    @Override
    public String saveBins(BinLocationsDTO binsDTO) {
        BinLocations binLocation = new BinLocations(
                binsDTO.getLocationId(),
                binsDTO.getLocationName(),
                binsDTO.getAddress(),
                binsDTO.getBinCapacity(),
                binsDTO.getCurrentLevel(),
                binsDTO.getStatus()
        );

        binLocationsRepo.save(binLocation);
        return "Saved " + binsDTO.getLocationName();
    }

}
