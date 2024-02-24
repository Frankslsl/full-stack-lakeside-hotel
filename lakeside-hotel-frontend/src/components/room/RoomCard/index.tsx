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
		<Col className="mb-4" xs={12} md={4} lg={3} key={room.id}>
			<Card style={{ width: "18rem" }}>
				<Card.Body className="d-flex flex-wrap align-items-start">
					<div className="me-3 mb-3 mb-md-0 justify-content-start d-flex flex-column align-items-center">
						<Card.Img
							variant="top"
							src={imageUrl}
							alt="Room-photo"
							style={{
								width: "100%",
								maxWidth: "200px",
								height: "300px",
								objectFit: "cover",
							}}
						/>
						<div className="flex-grow-1 ms-3 mt-3">
							<Card.Title className="hotel-color">{room.roomType}</Card.Title>
							<Card.Title className="hotel-color">{room.roomPrice}</Card.Title>
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
