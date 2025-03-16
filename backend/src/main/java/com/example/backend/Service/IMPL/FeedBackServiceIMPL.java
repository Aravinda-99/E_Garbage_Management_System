package com.example.backend.Service.IMPL;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.Repo.FeedBackRepo;
import com.example.backend.Service.FeedBackService;
import com.example.backend.entity.FeedBack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedBackServiceIMPL implements FeedBackService {

    @Autowired
    private FeedBackRepo feedBackRepo;
    @Override
    public String saveFeedBack(FeedBackDTO feedDTO) {
        FeedBack feedBack = new FeedBack(
                feedDTO.getFeedbackID(),
                feedDTO.getUsername(),
                feedDTO.getMessage(),
                feedDTO.getRating()
        );

        feedBackRepo.save(feedBack);
        return "Saved feedback from " + feedDTO.getUsername();
    }

}
