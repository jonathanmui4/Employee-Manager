package com.jonathanmui.DXC.Login.Assignment.service;

import com.jonathanmui.DXC.Login.Assignment.model.User;
import com.jonathanmui.DXC.Login.Assignment.repository.TokenRepository;
import com.jonathanmui.DXC.Login.Assignment.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    /*
     * Generates and validates token, we need secret key
     */
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;

    public JwtService(TokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    /*
     * Extract payload or claims from token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /*
     * Extract specific property from token payload
     */
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    /*
     * Extract username from claims
     * When Generating token, we added user in subject parameter
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public User extractUserFromToken(String token) {
        String username = extractUsername(token);
//        System.out.println(username);
        // Assuming you have a method in your UserRepository to find user by username
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found for the token"));
    }

    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);

        // Checks if token is logged out
        boolean isLoggedInToken = tokenRepository.findByToken(token)
                .map(t->!t.isLoggedOut()).orElse(false);

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && isLoggedInToken;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String generateToken(User user) {
        String token = Jwts
                .builder()
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ 24 * 60 * 60 * 1000)) // Token valid for 24 hrs
                .signWith(getSigninKey())
                .compact();
        return token;
    }

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
