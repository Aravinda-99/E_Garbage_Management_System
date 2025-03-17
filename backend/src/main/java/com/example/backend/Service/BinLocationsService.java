package com.example.backend.Service;

import com.example.backend.DTO.BinLocationsDTO;
import com.example.backend.entity.BinLocations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BinLocationsService {


     public String saveBins(BinLocationsDTO binsDTO);

}
