import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addNewRoomSchema, addNewRoomDataType, addNewRoom } from "./addNewRoom";
import { zodResolver } from "@hookform/resolvers/zod";
import RoomTypeSelector from "@/components/common/RoomTypeSelector";
import { toast } from "react-toastify";

//main function
function AddRoom() {
	const toastConfig = {
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
	};
	//define mutation to add new room
	const { mutate, isSuccess } = useMutation({
		mutationFn: addNewRoom,
	});
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm<addNewRoomDataType>({
		resolver: zodResolver(addNewRoomSchema),
	});

	const photoFile =
		watch("photo") && watch("photo")[0] ? watch("photo")[0] : null;
	const imagePreviewUrl = photoFile ? URL.createObjectURL(photoFile) : "";

	const onSubmit = (data: addNewRoomDataType) => {
		const param = {
			...data,
			photo: data.photo[0],
		};
		mutate(param);

		if (isSuccess) {
			toast.success("room has been added", {
				...toastConfig,
				position: "top-center",
			});
		}
	};

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
						<form onSubmit={handleSubmit(onSubmit)}>
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
								{imagePreviewUrl && (
									<img
										src={imagePreviewUrl}
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
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}

export default AddRoom;
