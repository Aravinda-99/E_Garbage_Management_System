package com.example.backend.Service.IMPL;

import com.example.backend.DTO.ScheduleDTO;
import com.example.backend.Repo.ScheduleRepo;
import com.example.backend.Service.ScheduleService;
import com.example.backend.entity.Schedule;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceIMPL implements ScheduleService {

    @Autowired
    private ScheduleRepo scheduleRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveSchedule(ScheduleDTO scheduleDTO) {
        // Validate wasteType
        if (scheduleDTO.getWasteType() == null) {
            throw new IllegalArgumentException("wasteType is required");
        }

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

    @Override
    public List<ScheduleDTO> getAllSchedules() {
        List<Schedule> schedules = scheduleRepo.findAll();

        List<ScheduleDTO> scheduleDTOS = modelMapper.map(schedules, new TypeToken<List<ScheduleDTO>>() {
        }.getType());
        return scheduleDTOS;
    }

    @Override
    public String deleteSchedule(Long scheduleId) {
        if (scheduleRepo.existsById(scheduleId)) {
            scheduleRepo.deleteById(scheduleId);
            return scheduleId + " Deleted Successfully";
        } else {
            throw new RuntimeException("Schedule not found");
        }
    }

    @Override
    public ScheduleDTO updateSchedule(ScheduleDTO scheduleDTO) {
        // Check if schedule exists
        if (!scheduleRepo.existsById(scheduleDTO.getId())) {
            throw new RuntimeException("Schedule with ID " + scheduleDTO.getId() + " not found");
        }

        // Validate wasteType
        if (scheduleDTO.getWasteType() == null) {
            throw new IllegalArgumentException("wasteType is required");
        }

        // Save the updated schedule
        Schedule schedule = modelMapper.map(scheduleDTO, Schedule.class);
        Schedule savedSchedule = scheduleRepo.save(schedule);

        // Return the updated schedule as DTO
        return modelMapper.map(savedSchedule, ScheduleDTO.class);
    }
}