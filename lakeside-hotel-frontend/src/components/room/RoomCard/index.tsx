import { z } from "zod";
import { roomResponseSchema } from "@/components/utils/generalType";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
	room: z.infer<typeof roomResponseSchema>;
};
const RoomCard = ({ room }: Props) => {
	const imageUrl = `data:image/jpeg;base64,${room.photo}`;
	return (
		<Col className="mb-4" xs={6} lg={12} key={room.id}>
			<Card style={{ minWidth: "18rem" }}>
				<Card.Body className="d-flex flex-wrap align-items-center ">
					<div className="w-100 g-3 me-3 mb-3 mb-md-0 justify-content-start d-flex flex-column align-items-center flex-lg-row justify-content-lg-between">
						<Card.Img
							variant="top"
							src={imageUrl}
							alt="Room-photo"
							style={{
								width: "100%",
								maxWidth: "300px",
								height: "200px",
								objectFit: "cover",
							}}
						/>
						<div className="flex-grow-1 m-3">
							<Card.Title className="hotel-color">{room.roomType}</Card.Title>
							<Card.Title className="hotel-color">
								{room.roomPrice} / night
							</Card.Title>
							<Card.Text className="text-wrap">
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</Card.Text>
						</div>
						<div className="flex-shrink-0 mt-3">
							<Link to={`/bookings/${room.id}`}>
								<Button variant="primary" className="btn-hotel btn-sm">
									Book Now
								</Button>
							</Link>
						</div>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default RoomCard;
