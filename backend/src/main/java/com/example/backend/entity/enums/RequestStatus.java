package com.example.backend.entity.enums;

public enum RequestStatus {

    PENDING, // For requests awaiting approval
    APPROVED, // For approved requests
    IN_PROGRESS, // For requests being worked on
    COMPLETED, // For successfully completed requests
    NEW,
    CANCELLED // For cancelled requests
}