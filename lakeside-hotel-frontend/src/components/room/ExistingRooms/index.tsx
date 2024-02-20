import { useQuery } from "react-query";
import getAllRooms from "./getAllRooms";
type Props = {};

const ExistingRooms = (props: Props) => {
	const { data, isError, error, isLoading } = useQuery({
		queryFn: getAllRooms,
		queryKey: "getAllRooms",
	});
	if (isLoading) {
		return <div>is loading....</div>;
	}
	if (isError) {
		console.error(error);
		return <div>Something went wrong when getting all rooms from database</div>;
	}
	return <div></div>;
};

export default ExistingRooms;
