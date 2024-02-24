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
    ) throws  IOException {
        RoomResponse savedRoomResponse = roomService.addNewRoom(photo, roomType, roomPrice);
        return ResponseEntity.ok(savedRoomResponse);

    }

    @GetMapping("/room-types")
    public ResponseEntity<List<String>> getRoomType() {
        List<String> allRoomTypes = roomService.getAllRoomTypes();
        log.info("Operation: List size is:｛｝", allRoomTypes.size());
        return ResponseEntity.ok(allRoomTypes);
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> allRooms = roomService.getAllRooms();
        return ResponseEntity.ok(allRooms);
    }

    @DeleteMapping("/delete/room/{id}")
    public ResponseEntity<String> deleteRoomById(@PathVariable String id) {
        return roomService.deleteRoomById(id) ? ResponseEntity.ok().body("Room has been deleted") : ResponseEntity.badRequest().body("Room can not be found");
    }

    @GetMapping("/getRoomById/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable String id) {
        RoomResponse room = roomService.findRoomById(id);
        return ResponseEntity.ok().body(room);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RoomResponse> updateRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @PathVariable String id
    ) throws  IOException {
        RoomResponse savedRoomResponse = roomService.update(photo, roomType, roomPrice, id);
        return ResponseEntity.ok(savedRoomResponse);

    }
}
