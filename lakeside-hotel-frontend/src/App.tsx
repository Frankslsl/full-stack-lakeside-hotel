import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import { Suspense, lazy } from "react";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

const ExistingRoom = lazy(() => import("./components/room/ExistingRooms"));
const EditRoom = lazy(() => import("./components/room/EditRoom"));
const AddRoom = lazy(() => import("./components/room/AddRoom"));
const Room = lazy(() => import("./components/room/Room"));
const Admin = lazy(() => import("./components/admin/Admin"));

function App() {
	return (
		<>
			<Nav />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/admin" element={<Admin />}></Route>
					<Route path="/edit-room/:roomId/:view" element={<EditRoom />} />
					<Route path="/existing-rooms" element={<ExistingRoom />} />
					<Route path="/add-room" element={<AddRoom />} />
					<Route path="/browse-all-rooms" element={<Room />} />
					<Route path="/*" element={<Navigate to={"/home"} />} />
				</Routes>
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
