import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { uuidRegex } from "@/components/utils/generalType";

const idSchema = z.string().regex(uuidRegex);

const useGetRoomIdFromPath = () => {
	const navigate = useNavigate();
	const { roomId } = useParams();
	const validatedRoomId = idSchema.safeParse(roomId);
	if (!validatedRoomId.success) {
		console.error(
			"roomId is not correct, when trying editing room info please check "
		);
		navigate("/existing-rooms", { replace: true });
	}
	if (validatedRoomId.success) {
		return validatedRoomId.data;
	}
};

export default useGetRoomIdFromPath;
