package com.example.backend.Service;


import com.example.backend.DTO.ImageAnalysisResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class ImageAnalysisService {

    @Value("${imagga.api.key}")
    private String imaggaApiKey;

    @Value("${imagga.api.secret}")
    private String imaggaApiSecret;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ImageAnalysisResponse analyzeImage(MultipartFile image) {
        try {
            // Upload image to Imagga
            String auth = Base64.getEncoder().encodeToString((imaggaApiKey + ":" + imaggaApiSecret).getBytes());
            
            RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("image", image.getOriginalFilename(),
                    RequestBody.create(MediaType.parse("image/*"), image.getBytes()))
                .build();

            Request request = new Request.Builder()
                .url("https://api.imagga.com/v2/tags")
                .addHeader("Authorization", "Basic " + auth)
                .post(requestBody)
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new RuntimeException("Failed to analyze image: " + response.code());
                }

                JsonNode jsonResponse = objectMapper.readTree(response.body().string());
                List<String> tags = StreamSupport.stream(jsonResponse.path("result").path("tags").spliterator(), false)
                    .filter(tag -> tag.path("confidence").asDouble() > 30)
                    .limit(5)
                    .map(tag -> tag.path("tag").path("en").asText())
                    .collect(Collectors.toList());

                // For now, return a simple response based on the first tag
                String mainItem = tags.isEmpty() ? "unknown item" : tags.get(0);
                
                return ImageAnalysisResponse.builder()
                    .itemName(mainItem)
                    .material(determineMaterial(tags))
                    .recyclability(determineRecyclability(tags))
                    .recyclingProcess(generateRecyclingProcess(tags))
                    .build();
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to analyze image", e);
        }
    }

    private String determineMaterial(List<String> tags) {
        // Simple logic to determine material - this can be enhanced
        if (tags.stream().anyMatch(tag -> tag.contains("plastic"))) return "Plastic";
        if (tags.stream().anyMatch(tag -> tag.contains("metal"))) return "Metal";
        if (tags.stream().anyMatch(tag -> tag.contains("paper"))) return "Paper";
        if (tags.stream().anyMatch(tag -> tag.contains("glass"))) return "Glass";
        return "Unknown material";
    }

    private String determineRecyclability(List<String> tags) {
        // Simple logic to determine recyclability - this can be enhanced
        String material = determineMaterial(tags);
        switch (material) {
            case "Plastic":
            case "Metal":
            case "Paper":
            case "Glass":
                return "Recyclable";
            default:
                return "Please check with local recycling guidelines";
        }
    }

    private String generateRecyclingProcess(List<String> tags) {
        String material = determineMaterial(tags);
        switch (material) {
            case "Plastic":
                return "1. Clean the item\n2. Check for recycling symbol\n3. Place in plastic recycling bin";
            case "Metal":
                return "1. Clean the item\n2. Remove any non-metal parts\n3. Place in metal recycling bin";
            case "Paper":
                return "1. Remove any non-paper materials\n2. Flatten if possible\n3. Place in paper recycling bin";
            case "Glass":
                return "1. Clean the item\n2. Remove any non-glass parts\n3. Place in glass recycling bin";
            default:
                return "Please consult your local recycling guidelines for proper disposal methods";
        }
    }
} 