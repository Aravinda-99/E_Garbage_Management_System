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
        return modelMapper.map(binLocations, new TypeToken<List<BinLocationsDTO>>() {}.getType());
    }

    @Override
    public String saveBins(BinLocationsDTO binsDTO) {
        BinLocations binLocation = new BinLocations(
                binsDTO.getLocationId(),
                binsDTO.getAddress(),
                binsDTO.getCoordinates(),
                binsDTO.getType(),
                binsDTO.getStatus(),
                binsDTO.getLastUpdated()
        );

        binLocationsRepo.save(binLocation);
        return "Saved Bin at Address: " + binsDTO.getAddress();
    }

    @Override
    public String deleteBins(Integer binId) {
        if (binLocationsRepo.existsById(binId)) {
            binLocationsRepo.deleteById(binId);
            return "Bin with ID " + binId + " deleted successfully.";
        } else {
            throw new RuntimeException("Bin not found with ID: " + binId);
        }
    }

    @Override
    public BinLocationsDTO updateBinLocations(BinLocationsDTO updateDTO) {
        BinLocations existingLocation = binLocationsRepo.findById(updateDTO.getLocationId())
                .orElseThrow(() -> new RuntimeException("Bin not found with ID: " + updateDTO.getLocationId()));

        // Update the necessary fields
        existingLocation.setAddress(updateDTO.getAddress());
        existingLocation.setCoordinates(updateDTO.getCoordinates());
        existingLocation.setType(updateDTO.getType());
        existingLocation.setStatus(updateDTO.getStatus());
        existingLocation.setLastUpdated(updateDTO.getLastUpdated());

        BinLocations updatedLocation = binLocationsRepo.save(existingLocation);
        return modelMapper.map(updatedLocation, BinLocationsDTO.class);
    }
}
