package com.example.backend.Controller;


import com.example.backend.DTO.ImageAnalysisResponse;
import com.example.backend.Service.ImageAnalysisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/recycling")
@RequiredArgsConstructor
@Api(tags = "Image Analysis API")
@CrossOrigin(origins = "*")
public class ImageAnalysisController {

    private final ImageAnalysisService imageAnalysisService;

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ApiOperation("Analyze image for recycling information")
    public ResponseEntity<ImageAnalysisResponse> analyzeImage(@RequestParam("image") MultipartFile image) {
        return ResponseEntity.ok(imageAnalysisService.analyzeImage(image));
    }
} 