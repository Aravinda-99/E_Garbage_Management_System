package com.example.backend.Service;

import com.example.backend.DTO.ScheduleDTO;

import java.util.List;

public interface ScheduleService {
    String saveSchedule(ScheduleDTO scheduleDTO);

    List<ScheduleDTO> getAllSchedules();

    String deleteSchedule(Long scheduleId);

    ScheduleDTO updateSchedule(ScheduleDTO updateDTO);
}
