package com.vkf.employeerestapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vkf.employeerestapi.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
