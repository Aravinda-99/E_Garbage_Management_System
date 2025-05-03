package com.example.backend.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageAnalysisResponse {
    private String itemName;
    private String material;
    private String recyclability;
    private String recyclingProcess;
} 