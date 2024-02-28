import HotelService from "@/components/common/HotelService";
import Parallax from "@/components/common/Parallax";
import MainHeader from "@/components/layout/MainHeader";
import { Container } from "react-bootstrap";

const Home = () => {
	return (
		<section>
			<MainHeader />
			<Container>
				<Parallax />
				<HotelService />
				<Parallax />
			</Container>
		</section>
	);
};

export default Home;
