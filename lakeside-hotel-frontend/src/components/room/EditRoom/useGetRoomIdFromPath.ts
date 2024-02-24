import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { uuidRegex } from "@/components/utils/generalType";
import { useEffect, useState } from "react";

const idSchema = z.string().regex(uuidRegex);

const useGetRoomIdFromPath = () => {
	const navigate = useNavigate();
	const [viewMethod, setViewMethod] = useState<boolean>(true);
	const { roomId, view } = useParams();
	useEffect(() => {
		if (view == "false") {
			setViewMethod(false);
		}
	}, [view]);
	const validatedRoomId = idSchema.safeParse(roomId);
	if (!validatedRoomId.success) {
		console.error(
			"roomId is not correct, when trying editing room info please check "
		);
		navigate("/existing-rooms", { replace: true });
		return { roomId: "", viewMethod: false };
	}
	if (validatedRoomId.success) {
		return { roomId: validatedRoomId.data, viewMethod };
	}
};

export default useGetRoomIdFromPath;
