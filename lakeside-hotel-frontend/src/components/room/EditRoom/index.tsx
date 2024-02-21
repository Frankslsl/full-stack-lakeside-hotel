import { z } from "zod";
import { uuidRegex } from "@/components/utils/generalType";
import { useParams } from "react-router-dom";

const idSchema = z.string().regex(uuidRegex);

const EditRoom = () => {
	const id = useParams();
	return <div>index</div>;
};

export default EditRoom;
