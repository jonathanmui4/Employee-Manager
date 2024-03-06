package com.jonathanmui.DXC.Login.Assignment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RouteController {

    @GetMapping("/home")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("You are logged in");
    }

    @GetMapping("/home/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("You are manager");
    }
}
