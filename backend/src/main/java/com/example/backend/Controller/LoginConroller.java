package com.example.backend.Controller;

//import com.example.JWT.dto.LoginRequest;
//import com.example.JWT.dto.LoginResponse;
//import com.example.JWT.service.IMPL.JwtService;
import com.example.backend.DTO.LoginRequest;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.Service.IMPL.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginConroller {

    @Autowired
    private JwtService jwtService;

    @PostMapping({"/authentication"})
    public LoginResponse createJwtTokenAndLogin(@RequestBody LoginRequest loginRequest) throws Exception{

        System.out.println(loginRequest);
        return jwtService.createJwtToken(loginRequest);

    }

}
