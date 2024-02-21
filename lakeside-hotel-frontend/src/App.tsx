import "bootstrap/dist/css/bootstrap.min.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import { RefreshRoomsListProvider } from "./components/context/RefreshRoomsListContext";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<RefreshRoomsListProvider>
				<AddRoom />
				<ExistingRooms />
			</RefreshRoomsListProvider>
		</>
	);
}

export default App;
