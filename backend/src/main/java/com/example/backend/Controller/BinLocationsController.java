package com.example.backend.Controller;

import com.example.backend.DTO.BinLocationsDTO;
import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestStatusUpdateDTO;
import com.example.backend.DTO.updateController.RequestUpdateUserDTO;
import com.example.backend.Service.BinLocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/BinLocations")
@CrossOrigin
public class BinLocationsController {

    @Autowired
    private BinLocationsService binLocationsService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody BinLocationsDTO binsDTO) {
        return binLocationsService.saveBins(binsDTO);
    }

    @GetMapping(path = "/get-all-BinLocations")
    public List<BinLocationsDTO> getAllBins() {

        List<BinLocationsDTO> allBins = binLocationsService.getAllBins();
        return allBins;
    }

    @DeleteMapping(path = "delete-BinLocations/{id}")
    public String deleteBins(@PathVariable(value = "id") Integer binId) {
        String deleted = binLocationsService.deleteBins(binId);
        return deleted;
    }


    @PutMapping("/update/{binId}")
    public ResponseEntity<BinLocationsDTO> updateBin(
            @PathVariable Integer binId,
            @RequestBody BinLocationsDTO updateDTO
    ) {
        updateDTO.setLocationId(binId); // ✅ Correct field: set the location ID
        BinLocationsDTO updatedBinLocations = binLocationsService.updateBinLocations(updateDTO);
        return ResponseEntity.ok(updatedBinLocations);
    }


}