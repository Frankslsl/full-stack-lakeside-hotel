import { ChangeEvent, useState, MouseEvent } from "react";
import { z } from "zod";
import { roomResponseSchema } from "@/components/utils/generalType";

type dataType = z.infer<typeof roomResponseSchema>;

type Props = {
	allRooms: dataType[];
	setFilteredData: (value: dataType[]) => void;
};

function RoomFilter({ allRooms, setFilteredData }: Props) {
	const [filter, setFilter] = useState<string>("");
	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedRoomType = e.target.value;
		setFilter(selectedRoomType);
		const filteredRooms = allRooms.filter((room) =>
			room.roomType.toLowerCase().includes(selectedRoomType)
		);
		setFilteredData(filteredRooms);
	};
	const clearFilter = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setFilter("");
		setFilteredData(allRooms);
	};

	const roomTypes: string[] = [
		...new Set(allRooms.map((room) => room.roomType.toLowerCase())),
	];
	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="room-type">
				Filter rooms by type
			</span>
			<select
				className="form-select"
				value={filter}
				onChange={(e) => handleSelect(e)}
			>
				<option value={""}>Please select a type to filter...</option>
				{roomTypes.map((type) => (
					<option value={type} key={type}>
						{type}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" onClick={(e) => clearFilter(e)}>
				Clear Filter
			</button>
		</div>
	);
}

export default RoomFilter;
