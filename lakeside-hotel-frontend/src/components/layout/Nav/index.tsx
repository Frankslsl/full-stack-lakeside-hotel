import { Navbar, Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const NavbarCus = () => {
	return (
		<Navbar className="bg-body-tertiary navbar-expand-lg">
			<Container>
				<Navbar.Brand href="/home">lakeSide Hotel</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0 gap-3"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link
							href="/browse-all-rooms"
							aria-current="page"
							className="nav-item"
						>
							Browse all rooms
						</Nav.Link>
						<Nav.Link href="/admin" aria-current="page" className="nav-item">
							Admin
						</Nav.Link>
					</Nav>
					<Nav
						className="me-auto my-2 my-lg-0 gap-3 ms-auto"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link
							href="/find-booking"
							aria-current="page"
							className="nav-item"
						>
							Find My Booking
						</Nav.Link>
						<NavDropdown title="UserName" id="basic-nav-dropdown">
							<NavDropdown.Item href="/login">Login</NavDropdown.Item>
							<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarCus;
