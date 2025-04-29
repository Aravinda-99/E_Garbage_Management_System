package com.example.backend.Controller;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/shedule")
@CrossOrigin
public class Sheduleontroller {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping(path = "/saved")
    public String save(@RequestBody ScheduleDTO scheduleDTO) {
        String message = scheduleService.saveSchedule(scheduleDTO);
        return message;
    }


}
