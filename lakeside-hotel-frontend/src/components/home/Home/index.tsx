import HotelService from "@/components/common/HotelService";
import Parallax from "@/components/common/Parallax";
import RoomCarousel from "@/components/common/RoomCarousel";
import MainHeader from "@/components/layout/MainHeader";
import { Container } from "react-bootstrap";

const Home = () => {
	return (
		<section>
			<MainHeader />
			<Container>
				<RoomCarousel />
				<Parallax />
				<HotelService />
				<Parallax />
			</Container>
		</section>
	);
};

export default Home;
