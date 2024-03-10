package com.jonathanmui.DXC.Login.Assignment.controller;

import com.jonathanmui.DXC.Login.Assignment.model.AuthenticationResponse;
import com.jonathanmui.DXC.Login.Assignment.model.User;
import com.jonathanmui.DXC.Login.Assignment.service.AuthenticationService;
import com.jonathanmui.DXC.Login.Assignment.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class RouteController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public RouteController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/home")
    public ResponseEntity<AuthenticationResponse> home(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
//        System.out.println(token);
        // Extract user details from the token
        User user = jwtService.extractUserFromToken(token);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(authenticationService.retrieve(user));
    }

    @GetMapping("/home/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("You are manager");
    }
}
