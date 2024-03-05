package com.jonathanmui.DXC.Login.Assignment.service;

import com.jonathanmui.DXC.Login.Assignment.model.AuthenticationResponse;
import com.jonathanmui.DXC.Login.Assignment.model.Token;
import com.jonathanmui.DXC.Login.Assignment.model.User;
import com.jonathanmui.DXC.Login.Assignment.repository.TokenRepository;
import com.jonathanmui.DXC.Login.Assignment.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, TokenRepository tokenRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }


    public AuthenticationResponse register(User request) {
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        user = repository.save(user);

        String token = jwtService.generateToken(user);

        // Save the generated token
        saveUserToken(token, user);


        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        // Ensure only the latest generated token can be used for authentication, log out the rest
        revokeAllTokensByUser(user);

        // Save the generated token
        saveUserToken(token, user);

        return new AuthenticationResponse(token);
    }

    private void revokeAllTokensByUser(User user) {
        List<Token> validTokenListByUser = tokenRepository.findAllTokenByUser(user.getId());
        if(!validTokenListByUser.isEmpty()) {
            validTokenListByUser.forEach(token1 -> {
                token1.setLoggedOut(true);
            });
        }
        tokenRepository.saveAll(validTokenListByUser);
    }

    private void saveUserToken(String token, User user) {
        Token genToken = new Token();
        genToken.setToken(token);
        genToken.setLoggedOut(false);
        genToken.setUser(user);
        tokenRepository.save(genToken);
    }
}
