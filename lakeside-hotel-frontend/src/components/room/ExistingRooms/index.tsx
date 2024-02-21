import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Col } from "react-bootstrap";
import { z } from "zod";
import { roomResponseSchema } from "@/components/utils/generalType";
import getAllRooms from "./getAllRooms";
import RoomFilter from "@/components/common/RoomFilter";
import RoomPaginator from "@/components/common/RoomPaginator";
import deleteRoomFun from "./deleteRoomFun";
import { toastConfig } from "@/components/utils/toastConfig";
import { useRefreshContext } from "@/components/context/RefreshRoomsListContext";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

type filterData = z.infer<typeof roomResponseSchema>[];

const ExistingRooms = () => {
	const { refresh, changeRefresh } = useRefreshContext();
	const [filterData, setFilterData] = useState<filterData>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [roomsPerPage] = useState<number>(8);

	//define the useQuery
	const {
		data: allRooms,
		isError,
		error,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery<filterData>({
		queryFn: getAllRooms,
		queryKey: "getAllRooms",
	});
	useEffect(() => {
		refetch();
	}, [refetch, refresh]);
	//define delete function with useMutation
	const { mutateAsync } = useMutation(deleteRoomFun);

	const handleDeleteClick = async (id: string) => {
		await toast.promise(
			mutateAsync(id),
			{
				pending: "Deleting room...",
				success: "Room deleted successfully!",
				error: "Failed to delete the room!",
			},
			{ ...toastConfig, position: "top-center" }
		);
		changeRefresh();
	};

	//totalPage function
	const calculateTotalPage = (
		filterData: filterData,
		roomsPerPage: number,
		allRooms: filterData
	) => {
		const totalRooms =
			filterData.length > 0 ? filterData.length : allRooms.length;
		return Math.ceil(totalRooms / roomsPerPage);
	};
	//pagination variables
	const indexOfLastRoom = currentPage * roomsPerPage;
	const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
	const currentRooms = filterData.slice(indexOfFirstRoom, indexOfLastRoom);

	useEffect(() => {
		if (isSuccess) {
			setFilterData(allRooms);
		}
	}, [isSuccess, allRooms]);

	if (isLoading) {
		return <div>is loading....</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Something went wrong when getting all rooms from database</div>;
	}

	return (
		<>
			{!allRooms ? (
				<div>There is no room</div>
			) : (
				<section className="mt-5 mb-5 container">
					<div className="d-flex justify-content-center mb-3 mt-5">
						<h2>Existing rooms</h2>
					</div>
					<Col md={6} className="mb-3 mb-md-0">
						<RoomFilter allRooms={allRooms} setFilteredData={setFilterData} />
					</Col>
					<table className="table table-bordered table-hover">
						<thead>
							<tr className="text-md-center">
								<th>ID</th>
								<th>Room Type</th>
								<th>Room Price</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentRooms.map((room, index) => (
								<tr key={room.id} className="text-center">
									<td>{index + 1}</td>
									<td>{room.roomType}</td>
									<td>{room.roomPrice}</td>
									<td className="d-flex justify-content-center gap-2">
										<Link to={`/edit-room/${room.id}`}>
											<button className="btn btn-info btn-sm">
												<FaEye />
											</button>
										</Link>

										<Link to={`/edit-room/${room.id}`}>
											<button className="btn btn-warning btn-sm">
												<FaEdit />
											</button>
										</Link>

										<button
											className="btn btn-danger btn-sm"
											onClick={() => handleDeleteClick(room.id)}
										>
											<FaTrashAlt />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<RoomPaginator
						totalPage={calculateTotalPage(filterData, roomsPerPage, allRooms)}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
					/>
				</section>
			)}
		</>
	);
};

export default ExistingRooms;
