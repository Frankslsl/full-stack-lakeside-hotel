package com.sunlei.lakesidehotel.mapper;

import com.sunlei.lakesidehotel.model.BookedRoom;
import com.sunlei.lakesidehotel.response.BookedRoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

/**
 *
 */
@Component
@RequiredArgsConstructor
public class BookedRoomMapper implements Function<BookedRoom, BookedRoomResponse> {

    @Override
    public BookedRoomResponse apply(BookedRoom bookedRoom) {
        return new BookedRoomResponse(bookedRoom.getBookingsId(),
                bookedRoom.getCheckInDate(),
                bookedRoom.getCheckOutDate(),
                bookedRoom.getGuestFullName(),
                bookedRoom.getGuestEmail(),
                bookedRoom.getNumOfAdult(),
                bookedRoom.getNumOfKids(),
                bookedRoom.getTotalGuests(),
                bookedRoom.getRoom().getRoomId());
    }
}
