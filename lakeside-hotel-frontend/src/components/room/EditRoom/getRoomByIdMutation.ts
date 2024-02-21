import api from "@/components/utils/axiosCus";
import { roomResponseSchema } from "@/components/utils/generalType";
import { cusError } from "@/components/utils/cusError";

const getRoomById = async (roomId: string) => {
	try {
		const result = await api.get(`/rooms/getRoomById/${roomId}`);
		const validatedResult = roomResponseSchema.safeParse(result.data);
		if (!validatedResult.success) {
			throw cusError(
				validatedResult.error,
				"Something went Wrong when getting room by id"
			);
		} else {
			return validatedResult.data;
		}
	} catch (error) {
		throw cusError(error, "Something went Wrong when getting room by id");
	}
};

export default getRoomById;
