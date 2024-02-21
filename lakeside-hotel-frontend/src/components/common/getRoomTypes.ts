import api from "../utils/axiosCus";
import { cusError } from "../utils/cusError";
import { z } from "zod";

const roomTypeSchema = z.array(z.string());

//This function is getting all room types from database

async function getRoomTypes() {
	try {
		const result = await api.get("/rooms/room-types");
		const validatedResult = roomTypeSchema.safeParse(result.data);
		if (validatedResult.success) {
			return validatedResult.data;
		} else {
			throw cusError(
				validatedResult.error,
				"data type is wrong when getting all types of room"
			);
		}
		return result.data;
	} catch (error) {
		throw cusError(
			error,
			"something went wrong when getting all types of room"
		);
	}
}
export default getRoomTypes;
