package com.example.backend.Service;

import com.example.backend.DTO.BinLocationsDTO;

import java.util.List;

public interface BinLocationsService {

     List<BinLocationsDTO> getAllBins();  // ✅ removed static

     String saveBins(BinLocationsDTO binsDTO);

     String deleteBins(Integer binId);

     BinLocationsDTO updateBinLocations(BinLocationsDTO updateDTO);
}
