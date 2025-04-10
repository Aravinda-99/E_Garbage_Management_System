package com.example.backend.Service;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedBackService <FeedBack,Integer> {
    String saveFeedBack(FeedBackDTO feedDTO);

    List<FeedBackDTO> getAllFeedBack();

    String deleteFeedBack(java.lang.Integer feedBackId);

    FeedBackDTO updateUserRequest(FeedBackDTO updateDTO);
}
