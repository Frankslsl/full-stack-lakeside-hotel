package com.sunlei.lakesidehotel.model;

import cn.hutool.core.util.RandomUtil;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 *
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID roomId;
    @Column
    private String roomType;
    @Column(precision = 10, scale = 2)
    private BigDecimal roomPrice;
    @Lob
    private Blob photo;
    @Column
    private boolean isBooked = false;
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<BookedRoom> bookings = new ArrayList<>();

    public void addBooking(BookedRoom bookedRoom){
        bookings.add(bookedRoom);
        bookedRoom.setRoom(this);
        isBooked = true;
        String bookingCode = RandomUtil.randomString(10);
        bookedRoom.setBookingConfirmationCode(bookingCode);
    }
}
