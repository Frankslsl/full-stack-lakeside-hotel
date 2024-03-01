package com.sunlei.lakesidehotel.service.imp;

import com.sunlei.lakesidehotel.exception.InvalidBookingRequestException;
import com.sunlei.lakesidehotel.exception.ResourceNotFoundException;
import com.sunlei.lakesidehotel.mapper.BookedRoomMapper;
import com.sunlei.lakesidehotel.model.BookedRoom;
import com.sunlei.lakesidehotel.model.Room;
import com.sunlei.lakesidehotel.repository.BookedRoomRepository;
import com.sunlei.lakesidehotel.response.BookedRoomResponse;
import com.sunlei.lakesidehotel.service.IBookedRoomService;
import com.sunlei.lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/**
 *
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class BookedRoomServiceImp implements IBookedRoomService {
    private final BookedRoomRepository bookedRoomRepository;
    private final BookedRoomMapper bookedRoomMapper;
    private final IRoomService roomService;

    @Override
    public List<BookedRoomResponse> getAllBookings() {
        List<BookedRoom> bookings = bookedRoomRepository.findAll();
        return bookings.stream().map(bookedRoomMapper).toList();
    }

    @Override
    public BookedRoomResponse findBookingByConfirmationCode(String confirmationCode) {
        BookedRoom booking = bookedRoomRepository.findByBookingConfirmationCodeIgnoreCaseAllIgnoreCase(confirmationCode).orElseThrow(() -> new ResourceNotFoundException("booking can not be found by the confirmation code provided"));
        return bookedRoomMapper.apply(booking);
    }

    @Override
    public String saveBooking(String roomId, BookedRoom bookingRequest) {
        Room room = roomService.findRoomByIdReturnRoom(roomId);
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate()) || bookingRequest.getCheckInDate().isBefore(LocalDate.now())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date or before today");
        }
        List<BookedRoom> existingBookings = room.getBookings();
        boolean isAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if (isAvailable) {
            room.addBooking(bookingRequest);
            bookedRoomRepository.save(bookingRequest);
            return bookingRequest.getBookingConfirmationCode();
        } else {
            throw new InvalidBookingRequestException("Sorry, This room is unavailable for the selected dates");
        }

    }

    @Override
    public void cancelBooking(String bookingId) {
        bookedRoomRepository.deleteById(UUID.fromString(bookingId));

    }

    @Override
    public List<BookedRoomResponse> findBookingsByRoomId(String roomId) {
        Room room = roomService.findRoomByIdReturnRoom(roomId);
        List<BookedRoom> bookings = room.getBookings();
        return bookings.stream().map(bookedRoomMapper).toList();

    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {

        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
                                bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
                );


    }
}
