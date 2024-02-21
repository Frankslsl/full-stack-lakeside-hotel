import { useContext, createContext, ReactNode, useState } from "react";

type props = {
	children: ReactNode;
};

type RefreshContext = {
	refresh: boolean;
	changeRefresh: () => void;
};

const refreshRoomsListContext = createContext({} as RefreshContext);

export function useRefreshContext() {
	return useContext(refreshRoomsListContext);
}

export function RefreshRoomsListProvider({ children }: props) {
	const [refresh, setRefresh] = useState<boolean>(true);
	const changeRefresh = () => {
		setRefresh((prev) => !prev);
	};

	return (
		<refreshRoomsListContext.Provider
			value={{
				refresh,
				changeRefresh,
			}}
		>
			{children}
		</refreshRoomsListContext.Provider>
	);
}
