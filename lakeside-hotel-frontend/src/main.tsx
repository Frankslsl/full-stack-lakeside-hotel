import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { RefreshRoomsListProvider } from "./components/context/RefreshRoomsListContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<RefreshRoomsListProvider>
					<App />
				</RefreshRoomsListProvider>
				<ToastContainer />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
