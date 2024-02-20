package com.sunlei.lakesidehotel.service;

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
RoomResponse addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    List<RoomResponse> getAllRooms();
}
