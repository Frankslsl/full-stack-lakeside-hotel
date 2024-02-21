import api from "@/components/utils/axiosCus";
import { cusError } from "@/components/utils/cusError";

const deleteRoomFun = async (id: string) => {
	try {
		const result = await api.delete(`/rooms/delete/room/${id}`);
		return result.data;
	} catch (error) {
		throw cusError(error, "Something went wrong when deleting a room");
	}
};

export default deleteRoomFun;
