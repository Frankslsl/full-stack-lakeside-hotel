package com.sunlei.lakesidehotel;

import com.sunlei.lakesidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest

class LakeSideHotelApplicationTests {
    @Autowired
    private IRoomService service;

    @Test
    void contextLoads() {
        List<String> allRoomTypes = service.getAllRoomTypes();
        allRoomTypes.forEach(System.out::println);
    }

}
