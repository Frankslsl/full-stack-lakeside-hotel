import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admin = () => {
	return (
		<section className="bg-light" style={{ marginTop: "80px" }}>
			<Container>
				<div>
					<h2>Welcome to Admin Panel </h2>
					<hr />
					<Link to={"/add-room"}>Manage Rooms</Link>
				</div>
			</Container>
		</section>
	);
};

export default Admin;
