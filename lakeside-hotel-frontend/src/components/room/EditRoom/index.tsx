import { Link, useNavigate } from "react-router-dom";
import useGetRoomIdFromPath from "./useGetRoomIdFromPath";
import { useQuery } from "react-query";
import getRoomById from "./getRoomByIdMutation";
import { useEffect, useState } from "react";
import RoomTypeSelector from "@/components/common/RoomTypeSelector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNewRoomDataType, addNewRoomSchema } from "../AddRoom/addNewRoom";

const EditRoom = () => {
	const [imagePreview, setImagePreview] = useState("");
	//get id from url
	const roomId = useGetRoomIdFromPath() as string;
	const navigate = useNavigate();
	//define the mutation

	const { data, isError, isLoading } = useQuery({
		queryKey: "getRoom",
		queryFn: () => getRoomById(roomId),
		cacheTime: 0,
		staleTime: 0,
	});

	//define the form
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm<addNewRoomDataType>({
		resolver: zodResolver(addNewRoomSchema),
	});

	//define the image url
	useEffect(() => {
		const photoFile =
			watch("photo") && watch("photo")[0] ? watch("photo")[0] : null;
		const imagePreviewUrl =
			photoFile instanceof File ? URL.createObjectURL(photoFile) : "";
		setImagePreview(imagePreviewUrl);
	}, [watch("photo")]);

	//useEffect, add the value to the form
	useEffect(() => {
		if (isError) {
			navigate("/existing-rooms", { replace: true });
		}
		if (!isLoading && data) {
			setValue("roomType", data.roomType);
			setValue("roomPrice", data.roomPrice);
			setImagePreview(`data:image/jpeg;base64,${data.photo}`);
		}
	}, [data, isError, isLoading, navigate, setValue, imagePreview]);
	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Editing a room</h2>
						<form onSubmit={handleSubmit(() => console.log("click"))}>
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
								/>
								{errors.roomPrice && (
									<p className="mt-1 text-danger">{errors.roomPrice.message}</p>
								)}
							</div>
							<div className="mb-3">
								<label className="form-label" htmlFor="photo">
									Room Photo
								</label>
								<input
									{...register("photo")}
									className="form-control"
									required
									id="photo"
									type="file"
								/>
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
								<button type="submit" className="btn btn-outline-danger ms-5">
									Edit Room
								</button>
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
