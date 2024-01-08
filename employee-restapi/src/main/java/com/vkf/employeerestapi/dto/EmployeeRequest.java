package com.vkf.employeerestapi.dto;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {
    private long id;

    @NotEmpty(message = "first name cannot be empty")
    @NotNull
    private String firstName;

    @NotEmpty(message = "last name cannot be empty")
    @NotNull
    private String lastName;

    @Email
    @NotEmpty(message = "email cannot be empty")
    @NotNull
    private String emailId;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @UpdateTimestamp
    private LocalDateTime dateUpdated;
}
