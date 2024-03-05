package com.jonathanmui.DXC.Login.Assignment.repository;

import com.jonathanmui.DXC.Login.Assignment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
