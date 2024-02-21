package com.sunlei.lakesidehotel.repository;

import com.sunlei.lakesidehotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

/**
 *
 */


public interface RoomRepository extends JpaRepository<Room, UUID> {
    long deleteByRoomIdAllIgnoreCase(UUID roomId);
    @Query("select distinct r.roomType from Room r ")
    List<String> getAllRoomTypes();


}

