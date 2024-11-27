package com.example.ERP.Service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
    public boolean validateCredentials(String username, String password) {
        // Hardcoded for simplicity. Replace with DB lookup.
        return "admin".equals(username) && "password".equals(password);
    }
}
