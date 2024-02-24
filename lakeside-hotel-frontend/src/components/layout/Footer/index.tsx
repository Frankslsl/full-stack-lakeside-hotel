import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
	const today = new Date();
	return (
		<footer className="by-dark py-3 footer mt-lg-5">
			<Container>
				<Row>
					<Col xs={12} md={12} className="text-center">
						<p>&copy; {today.getFullYear()} lakeSide Hotel</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
