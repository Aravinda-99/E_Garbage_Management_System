package com.example.backend.Service.IMPL;

import com.example.backend.DTO.ComplainsDTO;
import com.example.backend.Repo.ComplainsRepo;
import com.example.backend.Service.ComplainsService;
import com.example.backend.entity.Complains;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplainsServiceIMPL implements ComplainsService {

    @Autowired
    private ComplainsRepo complainsRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public String saveComplain(ComplainsDTO complainDTO) {
        Complains complain = new Complains(
                complainDTO.getComplainID(),
                complainDTO.getName(),
                complainDTO.getComplain(),
                complainDTO.getImage()
        );

        complainsRepo.save(complain);
        return "Saved complain from " + complainDTO.getName();
    }

    @Override
    public List<ComplainsDTO> getAllComplains() {
        List<Complains> complains = complainsRepo.findAll();

        List<ComplainsDTO> complainsDTOS = modelMapper.map(complains, new TypeToken<List<ComplainsDTO>>() {}.getType());

        return complainsDTOS;
    }

    @Override
    public String deleteComplain(Integer complainId) {
        if (complainsRepo.existsById(complainId)) {
            complainsRepo.deleteById(complainId);
            return complainId + " Deleted Successfully";
        } else {
            throw new RuntimeException("Complain not found");
        }
    }

    @Override
    public ComplainsDTO updateComplain(ComplainsDTO updateDTO) {
        // Fetch existing complain by ID
        Complains existingComplain = complainsRepo.findById(updateDTO.getComplainID())
                .orElseThrow(() -> new RuntimeException("Complain not found"));

        // Copy properties from DTO to entity (excluding any you want to preserve)
        BeanUtils.copyProperties(updateDTO, existingComplain);

        // Save updated entity
        Complains updatedComplain = complainsRepo.save(existingComplain);

        // Convert entity to DTO
        ComplainsDTO responseDTO = new ComplainsDTO();
        BeanUtils.copyProperties(updatedComplain, responseDTO);

        return responseDTO;
    }
}
