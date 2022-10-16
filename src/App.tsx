import { useEffect, useState } from "react";
import {
	BrowserRouter,
	Link,
	Route,
	Routes,
	useParams,
} from "react-router-dom";
import "./App.css";
import CreateQuiz from "./components/CreateQuiz";
import QuizPage, { quizes as quizData } from "./components/QuizPage";
import SideBar from "./components/SideBar";

const Home = ({ quizes }: any) => {
	return (
		<div className="w-full flex flex-col p-4">
			<h1 className="text-xl font-bold">Popular Quizes</h1>
			<div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-6 xl:grid-cols-4">
				{quizes.map((item: any) => (
					<QuizCard key={item.id} quiz={item} />
				))}
			</div>
		</div>
	);
};

const QuizCard = ({ quiz }: any) => {
	return (
		<div className="flex flex-col p-4 bg-[#2c2d4c] rounded-md cursor-pointer">
			<h1 className="text-xl font-bold">{quiz.title}</h1>
			<p className="text-sm text-gray-400">{quiz.description}</p>
			<Link className="" to={`/quiz/${quiz.id}`}>
				<button className="bg-[#1a1a2f] mt-6 py-2 px-4 w-full">Take it</button>
			</Link>
		</div>
	);
};

function App() {
	const [quizes, setQuizes] = useState<any>([]);

	useEffect(() => {
		const storedQuizes = localStorage.getItem("quizes");
		if (!storedQuizes) {
			setQuizes(quizData);
			console.log(quizData);
			localStorage.setItem("quizes", JSON.stringify(quizData));
		} else {
			setQuizes(JSON.parse(storedQuizes));
		}
	}, []);
	return (
		<BrowserRouter>
			<div className="App h-screen w-full flex flex-col bg-[#1a1a2f] text-white overflow-hidden">
				<div className="flex w-full items-center p-5 px-9 shadow-md shadow-[#1a1a2f] bg-[#20203c]">
					<h2 className="text-blue-600 text-2xl font-bold">Quizzy</h2>
				</div>
				<div className="flex w-full h-full">
					<SideBar />
					<Routes>
						<Route path="/" element={<Home quizes={quizes} />} />
						<Route
							path="/create"
							element={<CreateQuiz setQuizes={setQuizes} />}
						/>
						<Route path="/quiz/:id" element={<QuizPage />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
