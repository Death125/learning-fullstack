package com.vkf.employeerestapi.advice;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.vkf.employeerestapi.exception.EmployeeNotFoundException;

@RestControllerAdvice
public class ApplicationHandlerException {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private Map<String, String> methodArgumentExceptionHandler(MethodArgumentNotValidException ex) {
        Map<String, String> errorMap = new HashMap<>();

        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));

        return errorMap;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EmployeeNotFoundException.class)
    private Map<String, String> employeeNotFoundException(EmployeeNotFoundException ex) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("Error message : ", ex.getMessage());

        return errorMap;
    }
}
