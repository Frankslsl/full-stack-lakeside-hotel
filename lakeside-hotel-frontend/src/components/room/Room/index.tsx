import RoomFilter from "@/components/common/RoomFilter";
import RoomPaginator from "@/components/common/RoomPaginator";
import { roomResponseSchema } from "@/components/utils/generalType";
import { getAllRoomsMutation } from "@/components/utils/getAllRoomsMutation";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { z } from "zod";
import RoomCard from "../RoomCard";

type filterData = z.infer<typeof roomResponseSchema>[];

const Room = () => {
	const [filterData, setFilterData] = useState<filterData>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [roomsPerPage] = useState<number>(8);
	const {
		data: allRooms,
		isError,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: "getAllRooms",
		queryFn: getAllRoomsMutation,
	});

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
		<section className="bg-light" style={{ marginTop: "80px" }}>
			<Container>
				{!allRooms ? (
					<>
						<Col>
							<h2>There is no room</h2>
						</Col>
						<Col>
							<Link to={"/add-room"}>
								<FaPlus />
								Add Room
							</Link>
						</Col>
					</>
				) : (
					<>
						<Row className="align-items-center">
							<Col md={6} className="mb-3 mb-md-0">
								<RoomFilter
									allRooms={allRooms}
									setFilteredData={setFilterData}
								/>
							</Col>
							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-room"}>
									<FaPlus />
									Add Room
								</Link>
							</Col>
						</Row>
						<Row>
							<Col
								md={6}
								className="d-flex align-items-center justify-content-start"
								id="list-top"
							>
								<RoomPaginator
									currentPage={currentPage}
									onPageChange={setCurrentPage}
									totalPage={calculateTotalPage(
										filterData,
										roomsPerPage,
										allRooms
									)}
								/>
							</Col>
						</Row>
						<Row>
							{currentRooms.map((room) => (
								<Fragment key={room.id}>
									<RoomCard room={room} />
								</Fragment>
							))}
						</Row>
						<Row>
							<Col
								md={6}
								className="d-flex align-items-center justify-content-end"
							>
								<RoomPaginator
									currentPage={currentPage}
									onPageChange={setCurrentPage}
									totalPage={calculateTotalPage(
										filterData,
										roomsPerPage,
										allRooms
									)}
								/>
							</Col>
						</Row>
					</>
				)}
			</Container>
		</section>
	);
};

export default Room;
