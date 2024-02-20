package com.sunlei.lakesidehotel.repository;

import com.sunlei.lakesidehotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 *
 */


public interface BookedRoomRepository extends JpaRepository<BookedRoom, UUID> {
}
