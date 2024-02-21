import { z } from "zod";

const pageSchema = z.object({
	currentPage: z.number().positive(),
	totalPage: z.number().positive(),
	onPageChange: z.function().args(z.number()).returns(z.void()),
});
type Props = z.infer<typeof pageSchema>;

const RoomPaginator = ({ currentPage, totalPage, onPageChange }: Props) => {
	const pageNumbers: Array<number> = Array.from(
		{ length: totalPage },
		(_, i) => {
			return i + 1;
		}
	);
	return (
		<nav>
			<ul className="pagination justify-content-center align-items-center">
				{pageNumbers.length === 0 ? (
					<li className="page-item">
						<span className="page-link">No pages</span>
					</li>
				) : (
					pageNumbers.map((page) => (
						<li
							key={page}
							className={`page-item ${currentPage === page ? "active" : ""}`}
						>
							<a
								className="page-link"
								onClick={(e) => {
									e.preventDefault();
									onPageChange(page);
								}}
							>
								{page}
							</a>
						</li>
					))
				)}
			</ul>
		</nav>
	);
};

export default RoomPaginator;
