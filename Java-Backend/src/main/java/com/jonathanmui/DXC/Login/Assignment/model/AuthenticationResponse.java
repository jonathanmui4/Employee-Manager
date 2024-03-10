package com.jonathanmui.DXC.Login.Assignment.model;

public class AuthenticationResponse {
    private String token;
    private String userFirstName;
    private String userLastName;
    private String username;
    private Role userRole;

    public AuthenticationResponse(String token, String userFirstName, String userLastName, String username, Role userRole) {
        this.token = token;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.username = username;
        this.userRole = userRole;
    }

    public AuthenticationResponse(String token) {
        this.token = token;
    }

    public AuthenticationResponse(String userFirstName, String userLastName, String username, Role userRole) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.username = username;
        this.userRole = userRole;
    }

    public String getToken() {
        return token;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public String getUsername() {
        return username;
    }

    public Role getUserRole() {
        return userRole;
    }
}
