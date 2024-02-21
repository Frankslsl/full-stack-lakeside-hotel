package com.sunlei.lakesidehotel.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;

/**
 *
 */
@ControllerAdvice
@Slf4j
public class CusException {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> handleException(Exception ex) {
        String message = ex.getMessage();
        HashMap<String, Object> body = new HashMap<>();
        body.put("message", message);
        body.put("cause", ex.getCause());
        return ResponseEntity.badRequest().body(body);
    }
}
