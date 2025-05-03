package com.example.backend.Controller;


import com.example.backend.Service.IMPL.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/recycling")
public class RecyclingController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/analyze")
    public ResponseEntity<RecyclingResponse> analyzeImage(@RequestParam("image") MultipartFile image) {
        try {
            RecyclingResponse response = geminiService.analyzeImage(image);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(new RecyclingResponse("Error processing image: " + e.getMessage()));
        }
    }
}

