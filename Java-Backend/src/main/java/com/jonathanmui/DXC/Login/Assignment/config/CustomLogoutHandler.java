package com.jonathanmui.DXC.Login.Assignment.config;

import com.jonathanmui.DXC.Login.Assignment.model.Token;
import com.jonathanmui.DXC.Login.Assignment.repository.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final TokenRepository tokenRepository;

    public CustomLogoutHandler(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        // Skipping "Bearer " which is index 0-6
        String token = authHeader.substring(7);

        // 1. Get stored token from database
        Token storedToken = tokenRepository.findByToken(token).orElse(null);

        // 2. Mark token as logged out
        // 3. Save token to database
        if (storedToken != null) {
            storedToken.setLoggedOut(true);
            tokenRepository.save(storedToken);
        }

    }
}
