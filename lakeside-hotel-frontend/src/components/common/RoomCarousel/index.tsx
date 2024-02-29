import getAllRooms from "@/components/room/ExistingRooms/getAllRooms";
import { roomResponseSchema } from "@/components/utils/generalType";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { z } from "zod";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type filterData = z.infer<typeof roomResponseSchema>[];

const RoomCarousel = () => {
	const {
		data: allRooms,
		isError,
		error,
		isLoading,
	} = useQuery<filterData>({
		queryFn: getAllRooms,
		queryKey: "getAllRooms",
	});
	if (isLoading) {
		return <div className="mt-5">It's loading....</div>;
	}
	if (isError || !allRooms || allRooms.length === 0) {
		console.error(error);
		return (
			<div className="text-danger mb-5 mt-5">
				Something went wrong when getting all rooms from database
			</div>
		);
	}

	return (
		<section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/browse-all-rooms"} className="hotel-color text-center">
				Browse all rooms
			</Link>
			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(allRooms.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{allRooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/book-room/${room.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${room.photo}`}
													alt="room photo"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="hotel-color">
													{room.roomType}
												</Card.Title>
												<Card.Title className="hotel-color">
													{room.roomPrice} / night
												</Card.Title>
												<div className="flex-shrink-0">
													<Link
														className="btn btn-sm btn-hotel"
														to={`/book-room/${room.id}`}
													>
														Book Now
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	);
};

export default RoomCarousel;
