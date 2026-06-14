package com.hancy.user.dto;

public class UpdateUserRequest {

  private String name;
  private String bio;

  public String getName() {
    return name;
  }
// test pipeline
  public void setName(String name) {
    this.name = name;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }
}
