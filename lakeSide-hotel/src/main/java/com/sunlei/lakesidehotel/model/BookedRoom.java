package com.sunlei.lakesidehotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
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
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID bookingsId;
    @Column(name = "check_In")
    @NotNull
    private LocalDate checkInDate;
    @Column(name = "check_out")
    @NotNull
    private LocalDate checkOutDate;
    @Column
    @NotNull
    private String guestFullName;
    @Column
    @NotNull
    private String guestEmail;
    @Column(name = "adults")
    @NotNull
    private int numOfAdult = 0;
    @Column(name = "kids")
    @NotNull
    private int numOfKids = 0;

    @Column
    @NotNull
    private String bookingConfirmationCode;
    @ManyToOne()
    @JoinColumn(name = "room_id")
    @NotNull
    private Room room;

    @Transient
    private Integer totalGuests;

    public void setNumOfAdult(int num){
        numOfAdult = num;
        setTotalGuests();
    }
    public void setNumOfKids(int num){
        numOfKids = num;
        setTotalGuests();
    }

    @PostLoad
    public void setTotalGuests() {
        totalGuests = numOfAdult + numOfKids;
    }
}
