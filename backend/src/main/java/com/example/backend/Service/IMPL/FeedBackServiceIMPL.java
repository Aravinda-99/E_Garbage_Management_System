package com.example.backend.Service.IMPL;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.Repo.FeedBackRepo;
import com.example.backend.Service.FeedBackService;
import com.example.backend.entity.FeedBack;
import com.example.backend.entity.RequestServiceEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedBackServiceIMPL implements FeedBackService {

    @Autowired
    private FeedBackRepo feedBackRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveFeedBack(FeedBackDTO feedDTO) {
        FeedBack feedBack = new FeedBack(
                feedDTO.getFeedbackId(),
                feedDTO.getUsername(),
                feedDTO.getMessage(),
                feedDTO.getRating()
        );

        feedBackRepo.save(feedBack);
        return "Saved feedback from " + feedDTO.getUsername();
    }

    @Override
    public List<FeedBackDTO> getAllFeedBack() {
        List<FeedBack> feedBacks = feedBackRepo.findAll();

        List<FeedBackDTO> feedBackDTOS = modelMapper.map(feedBacks, new TypeToken<List<FeedBackDTO>>() {
        }.getType());
        return feedBackDTOS;

    }

    @Override
    public String deleteFeedBack(Integer feedBackId) {
        if (feedBackRepo.existsById(feedBackId)) {
            feedBackRepo.deleteById(feedBackId);
            return feedBackId + " Deleted Successfully";
        } else {
            throw new RuntimeException("Feedback not found");
        }
    }

//    @Override
//    public FeedBackDTO updateUserRequest(FeedBackDTO updateDTO) {
//        FeedBack existingRequest = feedBackRepo.findById(updateDTO.getFeedbackID())
//                .orElseThrow(() -> new RuntimeException("Feedback not found"));
//
//        // Copy non-null properties from DTO to existing request
//        BeanUtils.copyProperties(updateDTO, existingRequest, "status");
//
//        // Save updated request
//        FeedBack updatedFeedBack = feedBackRepo.save(existingRequest);
//
//        // Convert to DTO
//        FeedBackDTO responseDTO = new FeedBackDTO();
//        BeanUtils.copyProperties(updatedFeedBack, responseDTO);
//
//        return responseDTO;
//    }


    @Override
    public FeedBackDTO updateUserRequest(FeedBackDTO updateDTO) {
        // Fetch existing feedback by ID
        FeedBack existingRequest = feedBackRepo.findById(updateDTO.getFeedbackId())
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        // Copy properties from DTO to entity (excluding any you want to preserve like ID/status)
        BeanUtils.copyProperties(updateDTO, existingRequest, "status"); // "status" if exists

        // Save updated entity
        FeedBack updatedFeedBack = feedBackRepo.save(existingRequest);

        // Convert entity to DTO
        FeedBackDTO responseDTO = new FeedBackDTO();
        BeanUtils.copyProperties(updatedFeedBack, responseDTO);

        return responseDTO;
    }


}
