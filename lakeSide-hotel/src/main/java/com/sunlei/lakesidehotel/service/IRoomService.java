package com.sunlei.lakesidehotel.service;

import com.sunlei.lakesidehotel.model.Room;
import com.sunlei.lakesidehotel.response.RoomResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

/**
 *
 */
public interface IRoomService{
RoomResponse addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException;

    List<String> getAllRoomTypes();

    List<RoomResponse> getAllRooms();

    Boolean deleteRoomById(String id);

    RoomResponse findRoomById(String id);
    Room findRoomByIdReturnRoom(String id);

    RoomResponse update(MultipartFile photo, String roomType, BigDecimal roomPrice, String id) throws IOException;
}
