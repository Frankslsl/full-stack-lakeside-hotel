package com.sunlei.lakesidehotel.controller;

import com.sunlei.lakesidehotel.response.RoomResponse;
import com.sunlei.lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

/**
 *
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@CrossOrigin
@Slf4j
public class RoomController {
    private final IRoomService roomService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice
    ) throws SQLException, IOException {
        RoomResponse savedRoomResponse = roomService.addNewRoom(photo, roomType, roomPrice);
        return ResponseEntity.ok(savedRoomResponse);

    }

    @GetMapping("/room-types")
    public ResponseEntity<List<String>> getRoomType() {
        List<String> allRoomTypes = roomService.getAllRoomTypes();
        log.info("Operation: List size is:｛｝", allRoomTypes.size());
        return ResponseEntity.ok(allRoomTypes);
    }

    @GetMapping("all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() {


        List<RoomResponse> allRooms = roomService.getAllRooms();

        return ResponseEntity.ok(allRooms);

    }
}