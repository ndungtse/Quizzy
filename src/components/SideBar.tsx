import React from "react";
import { Link } from "react-router-dom";
import { BiEdit, BiMessageSquareEdit } from "react-icons/bi";

const SideBar = () => {
	const [mobile, setMobile] = React.useState(false);
	const [show, setShow] = React.useState(false);

	return (
		<>
			<div
				onClick={() => setShow(!show)}
				className="flex absolute sm:hidden top-8 left-1 flex-col w-[20px] cursor-pointer"
			>
				<hr className="w-full h-[0.1em] bg-white" />
				<hr className="w-full h-[0.1em] bg-white mt-1" />
				<hr className="w-full h-[0.1em] bg-white mt-1" />
			</div>
			<div
				className={`flex duration-500 transition-all flex-col h-full py-6 px-3 bg-[#20203c] absolute sm:static
        ${show ? "left-0 h-[90.6vh]" : "-left-[500px] h-[90.6vh]"}`}
			>
				<Link to="/">
					<p className="flex items-center py-2 px-3 rounded-md hover:bg-[#383854]">
						<BiMessageSquareEdit />
						<span className="ml-2 truncate">Quizes</span>
					</p>
				</Link>
				<Link to="/create">
					<p className="flex items-center py-2 px-3 rounded-md hover:bg-[#383854]">
						<BiEdit />
						<span className="ml-2 truncate">Create Quiz</span>
					</p>
				</Link>
			</div>
		</>
	);
};

export default SideBar;
