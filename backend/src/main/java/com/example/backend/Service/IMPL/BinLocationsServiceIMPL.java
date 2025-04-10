package com.example.backend.Service.IMPL;

import com.example.backend.DTO.BinLocationsDTO;
import com.example.backend.Repo.BinLocationsRepo;
import com.example.backend.Service.BinLocationsService;
import com.example.backend.entity.BinLocations;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BinLocationsServiceIMPL implements BinLocationsService {

    @Autowired
    private BinLocationsRepo binLocationsRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BinLocationsDTO> getAllBins() {
        List<BinLocations> binLocations = binLocationsRepo.findAll();

        List<BinLocationsDTO> binLocationsDTOS = modelMapper.map(binLocations,new TypeToken<List<BinLocationsDTO>>(){}.getType());
        return binLocationsDTOS;
    }

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

    @Override
    public String deleteBins(Integer binId) {
        if (binLocationsRepo.existsById(binId)) {
            binLocationsRepo.deleteById(binId);
            return binId + " Deleted Successfully";
        } else {
            throw new RuntimeException("Bin Not Found");
        }
    }

    @Override
    public BinLocationsDTO updateBinLocations(BinLocationsDTO updateDTO) {
        // Fetch existing feedback by ID
        BinLocations existingRequest = binLocationsRepo.findById(updateDTO.getLocationId())
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        // Copy properties from DTO to entity (excluding any you want to preserve like ID/status)
        BeanUtils.copyProperties(updateDTO, existingRequest, "status"); // "status" if exists

        // Save updated entity
        BinLocations updatedBins = binLocationsRepo.save(existingRequest);

        // Convert entity to DTO
        BinLocationsDTO responseDTO = new BinLocationsDTO();
        BeanUtils.copyProperties(updatedBins, responseDTO);

        return responseDTO;
    }

    }


