package com.example.backend.Controller;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.DTO.RequestServiceDTO;
import com.example.backend.DTO.updateController.RequestUpdateUserDTO;
import com.example.backend.Service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/feedback")
@CrossOrigin //Security Perpose walata use krnne

public class FeedBackController {

    @Autowired
    private FeedBackService feedBackService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody FeedBackDTO feedDTO) {

        String massage = feedBackService.saveFeedBack(feedDTO);
        return massage;
    }

    @GetMapping(path = "/get-all-FeedBack")
    public List<FeedBackDTO> getAllRequest() {

        List<FeedBackDTO> allFeedBack = feedBackService.getAllFeedBack();
        return allFeedBack;
    }

    @DeleteMapping(path = "delete-feedBack/{id}")
    public String deleteFeedBack(@PathVariable(value = "id") Integer feedBackId) {
        String deleted = feedBackService.deleteFeedBack(feedBackId);
        return deleted;
    }
//
//    @PutMapping("/update/{feedbackId}")
//    public ResponseEntity<FeedBackDTO> updateFeedBack(
//            @PathVariable Integer feedbackId,
//            @RequestBody FeedBackDTO updateDTO
//    ) {
//        updateDTO.setfeedbackId(feedbackId);
//        FeedBackDTO updatedFeedBack = feedBackService.updateUserRequest(updateDTO);
//        return ResponseEntity.ok(updatedFeedBack);
//    }


    @PutMapping("/update/{feedbackId}")
    public ResponseEntity<FeedBackDTO> updateFeedBack(
            @PathVariable Integer feedbackId,
            @RequestBody FeedBackDTO updateDTO
    ) {
        updateDTO.setFeedbackId(feedbackId); // use proper setter
        FeedBackDTO updatedFeedBack = feedBackService.updateFeedback(updateDTO);
        return ResponseEntity.ok(updatedFeedBack);
    }

}
