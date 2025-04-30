package com.example.backend.Controller;

import com.example.backend.DTO.ComplainsDTO;
import com.example.backend.Service.ComplainsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin
public class ComplainsController {

    @Autowired
    private ComplainsService complainsService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody ComplainsDTO complainDTO) {
        String message = complainsService.saveComplain(complainDTO);
        return message;
    }

    @GetMapping(path = "/get-all-complains")
    public List<ComplainsDTO> getAllComplains() {
        List<ComplainsDTO> allComplains = complainsService.getAllComplains();
        return allComplains;
    }

    @DeleteMapping(path = "/delete-complain/{id}")
    public String deleteComplain(@PathVariable(value = "id") Integer complainId) {
        String deleted = complainsService.deleteComplain(complainId);
        return deleted;
    }

    @PutMapping("/update-complain/{complainId}")
    public ResponseEntity<ComplainsDTO> updateComplain(
            @PathVariable Integer complainId,
            @RequestBody ComplainsDTO updateDTO
    ) {
        updateDTO.setComplainID(complainId); // set ID from path to DTO
        ComplainsDTO updatedComplain = complainsService.updateComplain(updateDTO);
        return ResponseEntity.ok(updatedComplain);
    }
}
