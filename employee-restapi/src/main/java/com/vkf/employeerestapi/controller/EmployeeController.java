package com.vkf.employeerestapi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vkf.employeerestapi.dto.EmployeeRequest;
import com.vkf.employeerestapi.exception.EmployeeNotFoundException;
import com.vkf.employeerestapi.model.Employee;
import com.vkf.employeerestapi.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping("/getAllEmployee")
    private ResponseEntity<List<Employee>> getAllEmployee() throws EmployeeNotFoundException {
        return ResponseEntity.ok(employeeService.getAllEmployee());
    }

    @PostMapping("/create")
    private ResponseEntity<Employee> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        return new ResponseEntity<Employee>(employeeService.createEmployee(employeeRequest), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<Employee> updateEmployee(@RequestBody EmployeeRequest employeeRequest, @PathVariable Long id)
            throws EmployeeNotFoundException {
        return ResponseEntity.ok(employeeService.updateEmployee(employeeRequest, id));
    }

    @GetMapping("/getEmployeeById/{id}")
    private ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) throws EmployeeNotFoundException {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id)
            throws EmployeeNotFoundException {

        return ResponseEntity.ok(employeeService.deleteEmployee(id));
    }
}