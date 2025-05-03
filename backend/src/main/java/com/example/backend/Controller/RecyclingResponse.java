package com.example.backend.Controller;

public class RecyclingResponse {
    private String itemName;
    private String material;
    private String recyclability;
    private String recyclingProcess;
    private String error;

    public RecyclingResponse() {}

    public RecyclingResponse(String error) {
        this.error = error;
    }

    public RecyclingResponse(String itemName, String material, String recyclability, String recyclingProcess) {
        this.itemName = itemName;
        this.material = material;
        this.recyclability = recyclability;
        this.recyclingProcess = recyclingProcess;
    }

    // Getters and setters
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getRecyclability() {
        return recyclability;
    }

    public void setRecyclability(String recyclability) {
        this.recyclability = recyclability;
    }

    public String getRecyclingProcess() {
        return recyclingProcess;
    }

    public void setRecyclingProcess(String recyclingProcess) {
        this.recyclingProcess = recyclingProcess;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
