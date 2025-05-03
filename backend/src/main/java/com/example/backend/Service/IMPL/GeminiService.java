package com.example.backend.Service.IMPL;


import com.example.backend.Controller.RecyclingResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class GeminiService {

    @Value("${google.gemini.api.key}")
    private String apiKey;

    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public RecyclingResponse analyzeImage(MultipartFile image) throws IOException {
        // Convert image to base64
        String base64Image = Base64.getEncoder().encodeToString(image.getBytes());

        // Prepare request body for Gemini API
        String requestBody = """
            {
                "contents": [
                    {
                        "parts": [
                            {
                                "inlineData": {
                                    "mimeType": "%s",
                                    "data": "%s"
                                }
                            },
                            {
                                "text": "Identify this item and provide a detailed recycling process for it. Return the response in JSON format with fields: itemName, material, recyclability, and recyclingProcess."
                            }
                        ]
                    }
                ]
            }
            """.formatted(image.getContentType(), base64Image);

        // Make request to Gemini API
        Request request = new Request.Builder()
                .url("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey)
                .post(RequestBody.create(requestBody, MediaType.parse("application/json")))
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }

            String responseBody = response.body().string();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            String content = jsonNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

            // Parse the JSON response from Gemini
            JsonNode contentNode = objectMapper.readTree(content);
            return new RecyclingResponse(
                    contentNode.path("itemName").asText("Unknown Item"),
                    contentNode.path("material").asText("Unknown Material"),
                    contentNode.path("recyclability").asText("Unknown"),
                    contentNode.path("recyclingProcess").asText("No recycling process available.")
            );
        } catch (Exception e) {
            return new RecyclingResponse("Error analyzing image: " + e.getMessage());
        }
    }
}