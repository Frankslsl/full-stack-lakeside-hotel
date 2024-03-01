package com.sunlei.lakesidehotel.controller;

import com.sunlei.lakesidehotel.exception.InvalidBookingRequestException;
import com.sunlei.lakesidehotel.exception.ResourceNotFoundException;
import com.sunlei.lakesidehotel.model.BookedRoom;
import com.sunlei.lakesidehotel.response.BookedRoomResponse;
import com.sunlei.lakesidehotel.service.IBookedRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookedRoomController {
    private final IBookedRoomService bookedRoomService;

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookedRoomResponse>> getAllBookings() {
        List<BookedRoomResponse> bookings = bookedRoomService.getAllBookings();
        return ResponseEntity.ok().body(bookings);
    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<BookedRoomResponse> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoomResponse booking = bookedRoomService.findBookingByConfirmationCode(confirmationCode);
            return ResponseEntity.ok().body(booking);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/book/{roomId}")
    public ResponseEntity<String> saveBooking(@PathVariable String roomId, @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookedRoomService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok().body(confirmationCode);
        } catch (InvalidBookingRequestException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/booking/{roomId}")
    public ResponseEntity<List<BookedRoomResponse>> getBookingsByRoomId(@PathVariable String roomId) {
        bookedRoomService.findBookingsByRoomId(roomId);
        return null;
    }

    @DeleteMapping("/cancel/{bookingId}")
    public void cancelBooking(@PathVariable String bookingId) {
        bookedRoomService.cancelBooking(bookingId);
    }
}
