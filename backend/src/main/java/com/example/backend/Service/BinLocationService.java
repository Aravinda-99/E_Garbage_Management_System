package com.example.backend.Service;

import com.example.backend.DTO.BinLocationDTO;

import java.util.List;

public interface BinLocationService {
    String saveBinLocation(BinLocationDTO binLocationDTO);

    List<BinLocationDTO> getAllBinLocations();
}
