package com.sunlei.lakesidehotel.response;

import java.time.LocalDate;
import java.util.UUID;

/**
 *
 */
public record BookedRoomResponse(UUID id, LocalDate checkInDate,


                                 LocalDate checkOutDate, String guestFullName, String guestEmail, int numOfAdult,
                                 int numOfKids, int totalGuests, UUID roomId

) {
}
