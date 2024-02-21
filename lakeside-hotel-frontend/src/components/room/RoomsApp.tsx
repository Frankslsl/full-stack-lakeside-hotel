import { RefreshRoomsListProvider } from "../context/RefreshRoomsListContext";
import AddRoom from "./AddRoom";
import ExistingRooms from "./ExistingRooms";

const RoomsApp = () => {
	return (
		<>
			<RefreshRoomsListProvider>
				<AddRoom />
				<ExistingRooms />
			</RefreshRoomsListProvider>
		</>
	);
};

export default RoomsApp;
