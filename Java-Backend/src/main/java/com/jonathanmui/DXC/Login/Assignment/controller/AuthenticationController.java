package com.jonathanmui.DXC.Login.Assignment.controller;

import com.jonathanmui.DXC.Login.Assignment.model.AuthenticationResponse;
import com.jonathanmui.DXC.Login.Assignment.model.User;
import com.jonathanmui.DXC.Login.Assignment.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
