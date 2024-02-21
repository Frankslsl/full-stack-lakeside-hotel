package com.sunlei.lakesidehotel.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 *
 */
public record RoomResponse(UUID id,

                           String roomType, BigDecimal roomPrice, boolean isBooked, String photo,
                           List<BookedRoomResponse> bookings

) {
}
