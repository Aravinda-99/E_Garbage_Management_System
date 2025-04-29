package com.example.backend.Service.IMPL;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.Repo.ScheduleRepo;
import com.example.backend.Service.ScheduleService;
import com.example.backend.entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceIMPL implements ScheduleService {

    @Autowired
    private ScheduleRepo scheduleRepo;

    @Override
    public String saveSchedule(ScheduleDTO scheduleDTO) {
        Schedule schedule = new Schedule(
                scheduleDTO.getId(),
                scheduleDTO.getDate(),
                scheduleDTO.getTime(),
                scheduleDTO.getLocation(),
                scheduleDTO.getWasteType()
        );

        scheduleRepo.save(schedule);
        return "Schedule saved successfully";
    }
}
