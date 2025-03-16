package com.example.backend.Service;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedBackService <FeedBack,Integer> {
    String saveFeedBack(FeedBackDTO feedDTO);
}
