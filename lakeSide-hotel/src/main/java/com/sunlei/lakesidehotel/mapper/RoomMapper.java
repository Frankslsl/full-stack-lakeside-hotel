package com.sunlei.lakesidehotel.mapper;

import cn.hutool.core.codec.Base64;
import com.sunlei.lakesidehotel.exception.PhotoRetrievalException;
import com.sunlei.lakesidehotel.model.Room;
import com.sunlei.lakesidehotel.response.BookedRoomResponse;
import com.sunlei.lakesidehotel.response.RoomResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.function.Function;

/**
 *
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class RoomMapper implements Function<Room, RoomResponse> {
    private final BookedRoomMapper bookedRoomMapper;


    @Override
    public RoomResponse apply(Room room) {
        List<BookedRoomResponse> bookings = room.getBookings().stream().map(bookedRoomMapper).toList();
        Blob photo = room.getPhoto();
        String photoBase64Str = null;
        if (photo != null) {
            try {

                photoBase64Str = Base64.encode(photo.getBytes(1, (int) photo.length()));


            } catch (Exception e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            } finally {
                try {
                    photo.free();
                } catch (SQLException e) {
                    log.warn("Failed to free Blob resources: " + e.getMessage());
                }
            }
        }
        return new RoomResponse(room.getRoomId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(), photoBase64Str, bookings);
    }

}
