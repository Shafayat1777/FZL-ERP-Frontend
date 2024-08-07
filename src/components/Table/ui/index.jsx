import { ArrowUpDown, PDF, Up } from "@/assets/icons";
import DropdownMenu from "../DropdownMenu";
import FilterButton from "./FilterButton";
import NoDataFound from "./NoDataFound";
import Title, { AddButton, TitleOnly } from "./Title";

const SortingIndicator = ({ type, canSort }) => {
	if (!canSort) return null;

	const cls =
		"h-4 w-4 text-secondary group-hover:opacity-100 transition-transform transform duration-500";

	switch (type) {
		case "asc":
			return <Up className={`${cls} rotate-180 opacity-100`} />;
		case "desc":
			return <Up className={`${cls} opacity-100`} />;
		default:
			return <ArrowUpDown className={`${cls} opacity-0`} />;
	}
};

const PaginationButton = ({ onClick, disabled, icon }) => {
	return (
		<button
			type="button"
			className="btn btn-circle btn-primary btn-sm rounded-full"
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
};

const PdfButton = (props) => {
	return (
		<button
			type="button"
			className="btn btn-xs rounded-full bg-secondary text-secondary-content"
			{...props}
		>
			PDF
			<PDF className="h-4 w-4" />
		</button>
	);
};

export {
	AddButton,
	DropdownMenu,
	FilterButton,
	NoDataFound,
	PaginationButton,
	PdfButton,
	SortingIndicator,
	Title,
	TitleOnly,
};
