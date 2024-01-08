package com.vkf.employeerestapi.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.vkf.employeerestapi.dto.EmployeeRequest;
import com.vkf.employeerestapi.exception.EmployeeNotFoundException;
import com.vkf.employeerestapi.model.Employee;
import com.vkf.employeerestapi.repository.EmployeeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployee() throws EmployeeNotFoundException {
        List<Employee> employee = employeeRepository.findAll();

        if (employee.size() <= 0) {
            throw new EmployeeNotFoundException("No one employee in here");
        } else {
            return employee;
        }
    }

    public Employee createEmployee(EmployeeRequest employeeRequest) {
        Employee employee = Employee.builder().firstName(employeeRequest.getFirstName())
                .lastName(employeeRequest.getLastName()).emailId(employeeRequest.getEmailId())
                .dateCreated(employeeRequest.getDateCreated()).dateUpdated(employeeRequest.getDateUpdated()).build();

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(EmployeeRequest employeeRequest, Long id) throws EmployeeNotFoundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(
                        "Employee with id " + id + " not found"));

        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setEmailId(employeeRequest.getEmailId());
        employee.setDateUpdated(employeeRequest.getDateUpdated());
        return employeeRepository.save(employee);

    }

    public Employee getEmployeeById(Long id) throws EmployeeNotFoundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with id " + id + " not found"));

        return employee;
    }

    public Map<String, Boolean> deleteEmployee(Long id) throws EmployeeNotFoundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with id " + id + " not found"));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Employee with id " + id + " deleted", Boolean.TRUE);
        return response;
    }
}
