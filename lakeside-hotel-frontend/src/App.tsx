import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { Suspense, lazy } from "react";

const ExistingRoom = lazy(() => import("./components/room/RoomsApp"));
const EditRoom = lazy(() => import("./components/room/EditRoom"));

function App() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/edit-room/:roomId" element={<EditRoom />} />
					<Route path="/existing-rooms" element={<ExistingRoom />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
