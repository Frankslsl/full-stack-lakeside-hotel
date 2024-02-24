import api from "@/components/utils/axiosCus";
import { z } from "zod";
import { cusError } from "../../utils/cusError";
import { uuidRegex } from "@/components/utils/generalType";
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
// set the image schema
const imageSchema = z
	.any()
	.optional()
	.refine(
		(file) =>
			file.length == 1
				? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
					? true
					: false
				: true,
		{ message: "Invalid file. choose either JPEG or PNG image" }
	)
	.refine(
		(file) =>
			file.length == 1 ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true,
		{ message: "Max file size allowed is 8MB." }
	);

// editNewRoomSchema
export const editRoomSchema = z.object({
	roomPrice: z.number().positive("room price must be positive"),
	roomType: z
		.string()
		.refine((str) => str !== "", { message: "Please choose a room type" }),
	photo: imageSchema.optional(),
	roomId: z.string().regex(uuidRegex).optional(),
});

export type editRoomDataType = z.infer<typeof editRoomSchema>;

export const editRoomMutation = async (editRoomData: editRoomDataType) => {
	const paramsValidation = editRoomSchema.safeParse(editRoomData);
	if (!paramsValidation.success) {
		console.error(paramsValidation.error);
		console.log("here");
		throw cusError(paramsValidation.error, "input validation is failed");
	}
	const { photo, roomPrice, roomType, roomId } = paramsValidation.data;
	const formData = new FormData();
	if (photo) {
		formData.append("photo", photo);
	}
	formData.append("roomType", roomType);
	formData.append("roomPrice", roomPrice.toFixed(2));

	try {
		const result = await api({
			method: "put",
			url: `/rooms/update/${roomId}`,
			data: formData,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (result.status === 201) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw cusError(error, "something went wrong");
	}
};
