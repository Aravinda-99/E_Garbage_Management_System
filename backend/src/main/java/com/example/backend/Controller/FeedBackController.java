package com.example.backend.Controller;

import com.example.backend.DTO.FeedBackDTO;
import com.example.backend.Service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
