package com.sunlei.lakesidehotel.service.imp;

import com.sunlei.lakesidehotel.mapper.RoomMapper;
import com.sunlei.lakesidehotel.model.Room;
import com.sunlei.lakesidehotel.repository.RoomRepository;
import com.sunlei.lakesidehotel.response.RoomResponse;
import com.sunlei.lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 *
 */
@Service
@Slf4j
@RequiredArgsConstructor

public class RoomServiceImp implements IRoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @Override
    public RoomResponse addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException {
        Room room = Room.builder()
                .roomType(roomType)
                .roomPrice(roomPrice)
                .build();
        if (!photo.isEmpty()) {
            byte[] photoBytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        Room save = roomRepository.save(room);
        log.info("room has been added, room id is {}", save.getRoomId());
        return roomMapper.apply(save);
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.getAllRoomTypes().stream().map(Objects::toString).toList();
    }

    @Override
    public List<RoomResponse> getAllRooms() {
        List<Room> allRooms = roomRepository.findAll();
        return allRooms.stream().map(roomMapper::apply).toList();
    }

    @Override
    @Transactional
    public Boolean deleteRoomById(String id) {
        UUID uuid = UUID.fromString(id);
        return roomRepository.deleteByRoomIdAllIgnoreCase(uuid)>0;
    }


}
