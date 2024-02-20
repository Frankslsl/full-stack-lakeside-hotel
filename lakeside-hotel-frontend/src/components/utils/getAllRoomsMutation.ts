import api from "./axiosCus";
import { cusError } from "./cusError";
import { z } from "zod";
import { roomResponseSchema } from "./generalType";

const allRoomsMutationSchema = z.array(roomResponseSchema);

export async function getAllRoomsMutation() {
	try {
		const result = await api.get("/rooms/all-rooms");
		const validatedResult = allRoomsMutationSchema.safeParse(result.data);
		if (validatedResult.success) {
			return validatedResult.data;
		} else {
			throw cusError(
				validatedResult.error,
				"data type is wrong when getting all rooms from backend"
			);
		}
	} catch (error) {
		throw cusError(
			error,
			"something went wrong when getting all rooms from backend"
		);
	}
}
