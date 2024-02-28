import { z } from "zod";

const titleSchema = z.string();

type Props = {
	title: z.infer<typeof titleSchema>;
};

const Header = ({ title }: Props) => {
	return (
		<header className="header">
			<div className="overlay"></div>
			<div className="container">
				<h1 className="header-title text-center">{title}</h1>
			</div>
		</header>
	);
};

export default Header;
