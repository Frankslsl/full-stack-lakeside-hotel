import { Link, useNavigate } from "react-router-dom";
import useGetRoomIdFromPath from "./useGetRoomIdFromPath";
import { useMutation, useQuery } from "react-query";
import getRoomById from "./getRoomByIdMutation";
import { useEffect, useState } from "react";
import RoomTypeSelector from "@/components/common/RoomTypeSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	editRoomDataType,
	editRoomMutation,
	editRoomSchema,
} from "./editRoomMutation";
import { toast } from "react-toastify";
import { toastConfig } from "@/components/utils/toastConfig";

const EditRoom = () => {
	const [imagePreview, setImagePreview] = useState("");
	//get id from url

	const { roomId, viewMethod } = useGetRoomIdFromPath()!;

	const navigate = useNavigate();
	//define the query to get room

	const { data, isError, isLoading } = useQuery({
		queryKey: "getRoom",
		queryFn: () => getRoomById(roomId),
		cacheTime: 0,
		staleTime: 0,
	});

	//define the edit mutation
	const { mutate } = useMutation(editRoomMutation, {
		onSuccess: () => {
			toast.success("room has been edit", {
				...toastConfig,
				position: "top-center",
			});
			navigate("/existing-rooms", { replace: true });
		},
	});

	//define the form
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm<editRoomDataType>({
		resolver: zodResolver(editRoomSchema),
	});

	//define the image url
	useEffect(() => {
		const photoFile =
			watch("photo") && watch("photo")[0] ? watch("photo")[0] : null;
		const imagePreviewUrl =
			photoFile instanceof File ? URL.createObjectURL(photoFile) : "";
		if (imagePreviewUrl != "") {
			setImagePreview(imagePreviewUrl);
		}
		return () => URL.revokeObjectURL(imagePreviewUrl);
	}, [watch("photo")]);

	//useEffect, add the value to the form
	useEffect(() => {
		if (isError) {
			navigate("/existing-rooms", { replace: true });
		}
		if (!isLoading && data) {
			setValue("roomType", data.roomType);
			setValue("roomPrice", data.roomPrice);
			setValue("roomId", roomId);
			setImagePreview(`data:image/jpeg;base64,${data.photo}`);
		}
	}, [data, isError, isLoading, navigate, setValue, roomId]);

	//handle click edit
	const handleEditClick = (data: editRoomDataType) => {
		const params = {
			...data,
			photo: data.photo[0],
			roomId,
		};
		mutate(params);
	};

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">
							{viewMethod ? "Viewing a room" : "Editing a room"}
						</h2>
						<form onSubmit={handleSubmit(handleEditClick)}>
							<input {...register("roomId")} className="invisible"></input>
							<div className="mb-3">
								<label className="form-label" htmlFor="roomType">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										register={register}
										watch={watch}
										errors={errors}
										setValue={setValue}
										viewMethod={viewMethod}
									/>
								</div>
							</div>
							<div className="mb-3">
								<label className="form-label" htmlFor="roomPrice">
									Room Price
								</label>
								<input
									{...register("roomPrice", { valueAsNumber: true })}
									className="form-control"
									required
									id="roomPrice"
									type="number"
									defaultValue={0}
									step={0.01}
									readOnly={viewMethod}
								/>
								{errors.roomPrice && (
									<p className="mt-1 text-danger">{errors.roomPrice.message}</p>
								)}
							</div>
							<div className="mb-3">
								{viewMethod ? (
									""
								) : (
									<>
										<label className="form-label" htmlFor="photo">
											Room Photo
										</label>
										<input
											{...register("photo")}
											className="form-control"
											id="photo"
											type="file"
										/>
									</>
								)}
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview Room Photo"
										style={{
											maxWidth: "400px",
											maxHeight: "400px",
											objectFit: "cover",
										}}
										className="mb-3 mt-3"
									/>
								)}
								{errors.photo && (
									<p className="mt-1 text-danger">
										{errors.photo.message?.toString()}
									</p>
								)}
							</div>
							<div className="d-block d-md-flex mt-2">
								{viewMethod ? (
									<Link to={`/edit-room/${roomId}/false`}>
										<button
											type="submit"
											className="btn btn-outline-warning ms-5"
										>
											Edit Room
										</button>
									</Link>
								) : (
									<button type="submit" className="btn btn-outline-danger ms-5">
										Edit Room
									</button>
								)}
								<Link to={"/existing-rooms"}>
									<button
										type="submit"
										className="btn btn-outline-primary ms-5"
									>
										Go Back
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default EditRoom;
