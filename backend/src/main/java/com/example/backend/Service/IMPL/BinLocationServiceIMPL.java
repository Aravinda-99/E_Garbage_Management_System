package com.example.backend.Service.IMPL;

import com.example.backend.DTO.BinLocationDTO;
import com.example.backend.Repo.BinLocationRepo;
import com.example.backend.Service.BinLocationService;
import com.example.backend.entity.BinLocation;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BinLocationServiceIMPL implements BinLocationService {

    @Autowired
    private BinLocationRepo binLocationRepo;

    @Autowired
    private ModelMapper modelMapper;

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

    @Override
    public List<BinLocationDTO> getAllBinLocations() {
        List<BinLocation> binLocations = binLocationRepo.findAll();

        // Manual mapping instead of using TypeToken
        return binLocations.stream()
                .map(entity -> {
                    BinLocationDTO dto = new BinLocationDTO();
                    dto.setId(entity.getId());
                    dto.setAddress(entity.getAddress());
                    dto.setLatitude(entity.getLatitude());
                    dto.setLongitude(entity.getLongitude());
                    dto.setWasteType(entity.getWasteType());
                    dto.setStatus(entity.getStatus());
                    dto.setLastUpdated(entity.getLastUpdated());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public BinLocationDTO updateBinLocation(BinLocationDTO binLocationDTO) {
        // Check if bin location exists
        if (!binLocationRepo.existsById(binLocationDTO.getId())) {
            throw new RuntimeException("Bin location with ID " + binLocationDTO.getId() + " not found");
        }

        // Set the last updated timestamp
        binLocationDTO.setLastUpdated(LocalDateTime.now());

        // Map DTO to entity, save it, and map it back to DTO
        BinLocation binLocation = modelMapper.map(binLocationDTO, BinLocation.class);
        BinLocation savedBinLocation = binLocationRepo.save(binLocation);

        // Return the updated bin location as DTO
        return modelMapper.map(savedBinLocation, BinLocationDTO.class);
    }

    @Override
    public String deleteBinLocation(Long id) {
        if (binLocationRepo.existsById(id)) {
            binLocationRepo.deleteById(id);
            return id + " Deleted Successfully";
        } else {
            throw new RuntimeException("Bin location with ID " + id + " not found");
        }
    }

}
