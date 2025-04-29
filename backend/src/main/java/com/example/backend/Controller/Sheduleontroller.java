package com.example.backend.Controller;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(path = "/get-all-schedule")
    public List<ScheduleDTO> getAllSchedules() {
        List<ScheduleDTO> allSchedules = scheduleService.getAllSchedules();
        return allSchedules;
    }

    @DeleteMapping(path = "/delete-schedule/{id}")
    public String deleteSchedule(@PathVariable(value = "id") Long scheduleId) {
        String deleted = scheduleService.deleteSchedule(scheduleId);
        return deleted;
    }

    @PutMapping("/update/{scheduleId}")
    public ResponseEntity<ScheduleDTO> updateSchedule(
            @PathVariable Long scheduleId,
            @RequestBody ScheduleDTO updateDTO
    ) {
        updateDTO.setId(scheduleId); // Set the ID from path variable
        ScheduleDTO updatedSchedule = scheduleService.updateSchedule(updateDTO);
        return ResponseEntity.ok(updatedSchedule);
    }




}
