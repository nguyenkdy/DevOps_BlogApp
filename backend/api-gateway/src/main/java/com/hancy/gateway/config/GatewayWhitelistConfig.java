package com.hancy.gateway.config;

import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class GatewayWhitelistConfig {

  private static final List<String> WHITELIST =
      List.of("/api/auth/login", "/api/auth/signup", "/eureka", "/actuator");

  public boolean isWhitelisted(String path) {
    return WHITELIST.stream().anyMatch(path::startsWith);
  }
}
