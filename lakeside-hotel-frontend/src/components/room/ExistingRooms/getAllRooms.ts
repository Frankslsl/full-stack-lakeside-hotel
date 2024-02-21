import { z } from "zod";
import api from "@/components/utils/axiosCus";
import { roomResponseSchema } from "@/components/utils/generalType";
import { cusError } from "@/components/utils/cusError";
const resultSchema = z.array(roomResponseSchema);

const getAllRooms = async () => {
	const result = await api.get("/rooms/all-rooms");
	const validatedResult = resultSchema.safeParse(result.data);
	if (validatedResult.success) {
		return validatedResult.data;
	} else {
		throw cusError(
			validatedResult.error,
			"something wrong when getting all rooms from backend"
		);
	}
};

export default getAllRooms;
