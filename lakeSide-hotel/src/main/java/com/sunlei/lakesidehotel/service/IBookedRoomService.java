package com.sunlei.lakesidehotel.service;

import com.sunlei.lakesidehotel.model.BookedRoom;
import com.sunlei.lakesidehotel.response.BookedRoomResponse;

import java.util.List;

/**
 *
 */
public interface IBookedRoomService {
    List<BookedRoomResponse> getAllBookings();

    BookedRoomResponse findBookingByConfirmationCode(String confirmationCode);

    String saveBooking(String roomId, BookedRoom bookingRequest);

    void cancelBooking(String bookingId);

    List<BookedRoomResponse> findBookingsByRoomId(String roomId);
}
