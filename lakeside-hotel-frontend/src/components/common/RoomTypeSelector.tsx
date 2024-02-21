import { useQuery } from "react-query";
import getRoomTypes from "./getRoomTypes";
import {
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
	useForm,
} from "react-hook-form";
import { MouseEvent, useEffect, useState } from "react";
import { z } from "zod";
import { addNewRoomDataType } from "../room/AddRoom/addNewRoom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";
import { useRefreshContext } from "../context/RefreshRoomsListContext";

const customRoomTypeSchema = z.object({
	customRoomType: z.string().min(1, "room type can not be empty"),
});

type customRoomTypeType = z.infer<typeof customRoomTypeSchema>;

type props = {
	register: UseFormRegister<addNewRoomDataType>;
	watch: UseFormWatch<addNewRoomDataType>;
	errors: FieldErrors<addNewRoomDataType>;
	setValue: UseFormSetValue<addNewRoomDataType>;
};

const toastConfig = {
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	progress: undefined,
};

const RoomTypeSelector = ({ register, watch, errors, setValue }: props) => {
	const { refresh } = useRefreshContext();

	const [roomTypeState, setRoomTypeState] = useState<string[]>([]);
	//getting the room types from data base
	const { data, isLoading, error, refetch } = useQuery<string[]>({
		queryKey: "getRoomType",
		queryFn: getRoomTypes,
		onSuccess: (data) => setRoomTypeState(data),
		cacheTime: 0,
	});

	console.log(roomTypeState);
	//use a specific useForm to manage customRoomType
	const {
		register: customRoomTypeRegister,
		watch: customRoomTypeWatch,
		formState: { errors: newErrors },
		reset,
	} = useForm<customRoomTypeType>({
		resolver: zodResolver(customRoomTypeSchema),
	});
	const customRoomType = customRoomTypeWatch("customRoomType");
	const roomTypeValue = watch("roomType");

	useEffect(() => {
		refetch();
	}, [refresh, refetch]);

	if (isLoading) return <div>Loading</div>;
	if (error)
		return (
			<div>
				An error occurred:{" "}
				{error instanceof Error ? error.message : "unknown error"}
			</div>
		);

	const handleAddButton = (e: MouseEvent) => {
		e.preventDefault();
		if (customRoomType && !roomTypeState.includes(customRoomType)) {
			setRoomTypeState((prevState) => [...prevState, customRoomType]);
			setValue("roomType", customRoomType);
			toast.success(`Room type ${customRoomType} has been added`, {
				...toastConfig,
				position: "top-center",
			});
			reset();
		}
	};
	return (
		<>
			{data && (
				<div>
					<select
						{...register("roomType")}
						id="roomType"
						value={watch("roomType")}
					>
						<option value={""}>Select a room type</option>
						<option value={"Add New"}>Add new</option>
						{roomTypeState.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{errors.roomType && (
						<p className="mt-1 text-danger">
							{errors.roomType.message?.toString()}
						</p>
					)}
					{roomTypeValue === "Add New" && (
						<div className="input-group mt-2">
							<input
								className="form-control"
								type="text"
								placeholder="Enter a new room type"
								{...customRoomTypeRegister("customRoomType")}
							/>
							<button
								className="btn-hotel btn"
								onClick={(e) => handleAddButton(e)}
							>
								Add
							</button>
							{newErrors.customRoomType && (
								<p className="mt-1 text-danger">
									{newErrors.customRoomType.message}
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default RoomTypeSelector;
