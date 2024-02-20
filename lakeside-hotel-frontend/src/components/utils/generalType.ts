import { z } from "zod";

export const uuidRegex =
	/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

export const localDateSchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid LocalDate format");

export const bookedRoomResponseSchema = z.object({
	bookingsId: z.string().regex(uuidRegex, {
		message: "Invalid UUID format for bookedRoomResponse",
	}),
	checkInDate: localDateSchema,
	checkOutDate: localDateSchema,
	guestFullName: z.string(),
	guestEmail: z.string().email(),
	numOfAdult: z.number().int(),
	numOfKids: z.number().int(),
	totalGuests: z.number().int(),
	roomId: z.string().regex(uuidRegex, {
		message:
			"Invalid UUID format for roomResponse when parsing from bookedRoomResponse",
	}),
});

export const roomResponseSchema = z.object({
	id: z
		.string()
		.regex(uuidRegex, { message: "Invalid UUID format for roomResponse" }),
	roomType: z.string(),
	roomPrice: z.number(),
	isBooked: z.boolean(),
	photo: z.string(),
	bookings: z.array(bookedRoomResponseSchema),
});
