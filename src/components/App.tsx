import React, { useEffect, useState } from "react";
import {
	BrowserRouter,
	Link,
	Route,
	Routes,
	useParams,
} from "react-router-dom";
// import "./App.css";
import { BiSave, BiTrash } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { BiEdit, BiMessageSquareEdit } from "react-icons/bi";

const CreateQuiz = ({ setQuizes }: any) => {
	const [quiz, setQuiz] = React.useState<any>({
		id: uuidv4(),
		title: "",
		description: "",
		questions: [],
	});
	const [error, setError] = React.useState<any>("");

	const handleAddQuestion = () => {
		const newQuiz = { ...quiz };
		newQuiz.questions.push({
			id: newQuiz.questions.length + 1,
			question: "",
			options: [
				{
					id: 1,
					option: "",
					isCorrect: false,
				},
			],
			answer: "",
		});
		setQuiz(newQuiz);
	};

	const handleAddOption = (questionId: number) => {
		const newQuiz = { ...quiz };
		const question = newQuiz.questions.find((q: any) => q.id === questionId);
		if (question.options.length < 4) {
			question.options.push({
				id: question.options.length + 1,
				option: "",
				isCorrect: false,
			});
		}
		setQuiz(newQuiz);
	};

    const handleRemoveOption = (questionId: number, optionId: number) => {
        const newQuiz = { ...quiz };
        const question = newQuiz.questions.find((q: any) => q.id === questionId);
        const optionIndex = question.options.findIndex((o: any) => o.id === optionId);
        question.options.splice(optionIndex, 1);
        setQuiz(newQuiz);
    };

	const handleQuestionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		qId: number
	) => {
		const newQuiz = { ...quiz };
		const question = newQuiz.questions.find((q: any) => q.id === qId);
		question.question = e.target.value;
		setQuiz(newQuiz);
	};

	const handleOptionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		qId: number,
		oId: number
	) => {
		const newQuiz = { ...quiz };
		const question = newQuiz.questions.find((q: any) => q.id === qId);
		const option = question.options.find((o: any) => o.id === oId);
		option.option = e.target.value;
		setQuiz(newQuiz);
	};

	const handleCorrectOption = (questionId: number, optionId: number) => {
		const newQuiz = { ...quiz };
		const question = newQuiz.questions.find((q: any) => q.id === questionId);
		question.options.forEach((option: any) => {
			if (option.id === optionId) {
				option.isCorrect = true;
			} else {
				option.isCorrect = false;
			}
		});
		setQuiz(newQuiz);
	};

	const handleRemoveQuestion = (id: number) => {
		const newQuiz = { ...quiz };
		newQuiz.questions = newQuiz.questions.filter(
			(question: any) => question.id !== id
		);
		setQuiz(newQuiz);
	};

	const addQuizToLocalStorage = () => {
		console.log(quiz);
		const filled = checkRequiredFields();
		if (filled) {
			const quizList = JSON.parse(localStorage.getItem("quizes") || "[]");
			quizList.push(quiz);
			localStorage.setItem("quizes", JSON.stringify(quizList));
			setQuizes((quizes: any) => [...quizes, quiz]);
		} else {
			return;
		}
		resetAllStates();
	};

	const checkRequiredFields = () => {
		if (
			quiz.title === "" ||
			quiz.description === "" ||
			quiz.questions.length === 0 ||
			quiz.questions.some((question: any) => question.question === "") ||
			quiz.questions.some((question: any) =>
				question.options.some((option: any) => option.option === "")
			)
		) {
			setError("Please fill all the required fields");
			console.log(error);
			return false;
		}
		setError("");
		return true;
	};

	const resetAllStates = () => {
		setQuiz({
			title: "",
			description: "",
			questions: [],
		});
		setError("");
	};

	return (
		<div className="w-full flex flex-col p-4 overflow-auto h-[90.6vh]">
			<h1 className="text-xl font-bold text-center">Create A Quiz</h1>
			<div className="flex w-full flex-col mt-4 max-w-[900px] mx-auto">
				<div className="flex flex-col w-full">
					<label htmlFor="title" className="font-bold">
						Quiz Title:
					</label>
					<input
						type="text"
						name="title"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setQuiz({ ...quiz, title: e.target.value })
						}
						value={quiz.title}
						id="title"
						placeholder="Enter Quiz Title"
						className="py-1 bg-[#20203c]/30  px-2 mt-2 border border-[#20203c] rounded-md focus:outline-none focus:border-[#0f8a5f]"
					/>
				</div>
				<div className="flex w-full mt-4 flex-col">
					<label htmlFor="description" className="font-bold">
						Quiz Description:
					</label>
					<textarea
						name="description"
						id="description"
						value={quiz.description}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setQuiz({ ...quiz, description: e.target.value })
						}
						placeholder="Enter Quiz Description"
						className="py-1 bg-[#20203c]/30 h-[20vh] min-h-[10vh] max-h-[60vh] px-2 mt-2 border border-[#20203c] rounded-md focus:outline-none focus:border-[#0f8a5f]"
					/>
				</div>
				<div className="flex w-full mt-4 flex-col">
					<div className="flex w-full items-center justify-between">
						<h2 className="font-bold">Quiz Questions:</h2>
						<button
							onClick={handleAddQuestion}
							className="bg-[#0f8a5f] py-1 px-2 rounded-md"
						>
							Add Question
						</button>
					</div>
					{quiz.questions.map((question: any, index: number) => (
						<div
							key={question.id}
							className="px-2 flex flex-col mt-4 border-t-2 border-[#20203c] py-2"
						>
							<div className="flex w-full items-center justify-between">
								<label htmlFor="title" className="font-bold">
									Quiestion {index + 1}:
								</label>
								<div className="flex items-center">
									<button
										onClick={() => handleRemoveQuestion(question.id)}
										title="delete fields"
										className="bg-red-500 py-1 px-2 rounded-md w-fit"
									>
										<i className="bx bx-trash"></i>
									</button>
									<button
										title="save question"
										className="bg-[#0f8a5f] ml-2 py-1 px-2 rounded-md w-fit"
									>
										<i className="bx bx-save"></i>
									</button>
								</div>
							</div>
							<input
								type="text"
								name="title"
								id="title"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleQuestionChange(e, question.id)
								}
								value={question.question}
								placeholder="Enter Question"
								className="py-1 bg-[#20203c]/30  px-2 mt-2 border border-[#20203c] rounded-md focus:outline-none focus:border-[#4d6f63]"
							/>
							<div className="px-4 flex flex-col mt-4">
								<div className="flex w-full items-center justify-between">
									<h2 className="font-bold">Questin options:</h2>
									<div className="flex items-center">
										<button
											title="save option"
											className="bg-[#0f8a5f] ml-2 py-1 px-2 rounded-md w-fit"
										>
											<i className="bx bx-save"></i>
										</button>
										<button
											onClick={() => handleAddOption(question.id)}
											title="add option"
											className="bg-[#0f8a5f] ml-2 py-[6px] px-2 rounded-md w-fit text-sm"
										>
											Add
										</button>
									</div>
								</div>
								{question.options.map((option: any, index: number) => (
									<>
										{" "}
										<div className="flex w-full items-center">
											<input
												type="text"
												name="title"
												id=""
												value={option.option}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													handleOptionChange(e, question.id, option.id)
												}
												placeholder={`Enter Option ${index + 1}`}
												className="py-1 bg-[#20203c]/30  px-2 mt-2 border border-[#20203c] rounded-md focus:outline-none focus:border-[#425c53] w-full"
											/>
											<button
												onClick={() =>
													handleRemoveOption(
														question.id,
                                                        option.id,
													)
												}
												title="delete option"
												className="bg-red-500 py-1 px-2 rounded-md w-fit ml-1 mt-1"
											>
												<i className="bx bx-trash"></i>
											</button>
										</div>
										<div className="w-full items-center flex mt-2">
											<input
												className="ml-2 scale-125 cursor-pointer w-fit"
												type="radio"
												checked={option.isCorrect}
												onChange={() =>
													handleCorrectOption(question.id, option.id)
												}
												name={`iscorrect${question.id}`}
												id={`option-${index}${question.id}`}
											/>
											<label
												htmlFor={`option-${index}${question.id}`}
												className="ml-2 text-sm"
											>
												Is Correct
											</label>
										</div>
									</>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex items-center justify-center w-full mt-8">
				<button
					onClick={addQuizToLocalStorage}
					className="bg-[#0f8a5f] py-2 px-4 rounded-md text-white font-bold"
				>
					Save Quiz
				</button>
			</div>
			<p className="text-red-600 mt-5 text-center">{error}</p>
		</div>
	);
};

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
						<i className="bx bx-message-square-edit"></i>
						<span className="ml-2 truncate">Quizes</span>
					</p>
				</Link>
				<Link to="/create">
					<p className="flex items-center py-2 px-3 rounded-md hover:bg-[#383854]">
						<i className="bx bx-edit"></i>
						<span className="ml-2 truncate">Create Quiz</span>
					</p>
				</Link>
			</div>
		</>
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

const QuizPage = () => {
	const params = useParams();
	const [quiz, setQuiz] = useState<any>(null);
	const [start, setStart] = useState(false);
	const [userAnswers, setUserAnswers] = useState<any>([]);
	const [score, setScore] = useState(0);
	const [resultReady, setResultReady] = useState(false);
	const [isAlert, setAlert] = useState(false);
	const [active, setActive] = useState(0);
	const [resultText, setResultText] = useState("");

	const checkAnswers = () => {
		let score = 0;
		if (userAnswers.length === quiz.questions.length) {
			userAnswers.forEach((answer: any, index: number) => {
				if (answer.isCorrect) {
					score++;
				}
			});
			setScore(score);
			handleResultText(score);
			setResultReady(true);
		} else {
			setAlert(true);
			// setInfo("Please answer all the questions");
		}
	};

	const handleChoose = (answer: string, index: number) => {
		const newAnswers = [...userAnswers];
		newAnswers[index] = answer;
		setUserAnswers(newAnswers);
	};

	const handleNext = () => {
		if (active < quiz.questions.length - 1) {
			if (userAnswers[active]) {
				setActive(active + 1);
				setAlert(false);
			} else {
				setAlert(true);
			}
		}
	};

	const handlePrev = () => {
		if (active > 0) {
			setActive(active - 1);
		}
	};

	const handleResultText = (score: number) => {
		console.log(score, quiz?.questions.length);
		if (score / quiz?.questions.length >= 0.8) {
			setResultText("You are a genius");
		} else if (score / quiz?.questions.length >= 0.6) {
			setResultText("You are a good student");
		} else if (score / quiz?.questions.length >= 0.4) {
			setResultText("Try better next time");
		} else {
			setResultText("You need to do more practice");
		}
	};

	useEffect(() => {
		const id: any = params.id;
		const savedQuizes = JSON.parse(localStorage.getItem("quizes") || "[]");
		const quiz = savedQuizes.find((item: any) => item.id === id);
		setQuiz(quiz);
	}, []);

	const resetStates = () => {
		setStart(false);
		setUserAnswers([]);
		setScore(0);
		setResultReady(false);
		setAlert(false);
		setActive(0);
		setResultText("");
	};

	return (
		<div className="flex w-full flex-col p-5 overflow-y-auto h-[90.6vh]">
			<div className="flex flex-col mt-6 w-full items-center">
				<h1 className="text-xl font-bold">{quiz?.title}</h1>
				<p className="text-sm text-gray-400">{quiz?.description}</p>
				<button
					className={`${
						start ? "bg-red-600" : "bg-[#0f8a5f]"
					} max-w-[300px] py-2 px-4 mt-6`}
					onClick={start ? resetStates : () => setStart(true)}
				>
					{start ? "Leave Quiz" : "Start Quiz"}
				</button>
			</div>
			<div className="flex w-full flex-col">
				{start && (
					<>
						<div
							key={quiz?.questions[active].id}
							className="flex flex-col w-full mt-6"
						>
							<h2>{`${active + 1}. ${quiz?.questions[active].question}`}</h2>
							<div className="flex flex-col px-3">
								{quiz?.questions[active].options.map((option: any) => (
									<div key={option.id} className="flex items-center mt-2">
										<input
											className=" scale-125 cursor-pointer"
											type="radio"
											value={option}
											checked={userAnswers[active] === option}
											onChange={() => handleChoose(option, active)}
											name={`optionq${quiz?.questions[active].id}`}
											id={`optionq${quiz?.questions[active].id}${option.id}`}
										/>
										<label
											htmlFor={`optionq${quiz?.questions[active].id}${option.id}`}
											className="ml-2"
										>
											{option.option}
										</label>
									</div>
								))}
							</div>
						</div>
					</>
				)}
				{start && (
					<div className="flex flex-col w-full">
						<div className="flex w-full items-center justify-between">
							<div className="">
								{active > 0 && (
									<button
										onClick={handlePrev}
										className="py-2 px-4 bg-[#20203c] mt-4 max-w-[300px]"
									>
										Previous
									</button>
								)}
							</div>
							<button
								onClick={
									active + 1 === quiz?.questions.length
										? checkAnswers
										: handleNext
								}
								className={`py-2 px-4 ${
									active + 1 === quiz?.questions.length
										? "bg-[#0f8a5f]"
										: "bg-[#20203c]"
								} mt-4 max-w-[300px] ml-4`}
							>
								{active + 1 === quiz?.questions.length
									? "Submit Answers"
									: "Next"}
							</button>
						</div>
						<p className={`${isAlert && "text-red-600"} text-xl mt-3 ml-3`}>
							{isAlert ? "Please Answer This Questions" : ""}
						</p>
						{resultReady && (
							<div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/40">
								<div className="flex flex-col px-5 mt-5">
									<h2 className="text-xl font-semibold text-center">
										{resultText}
									</h2>
									<h2 className="text-xl font-semibold text-center">
										Your Score is {score} / {quiz?.questions.length}
									</h2>
									<button
										className="py-2 px-4 bg-yellow-700 mt-4 max-w-[300px] ml-4"
										onClick={resetStates}
									>
										Close
									</button>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const quizData = [
	{
		id: "1",
		title: "JavaScript Basics",
		description:
			"Javascript basic interview questions to help you improve your coding skills",
		questions: [
			{
				id: 1,
				question:
					"What is the output of the following code? var a = 10; var b = 20; var c = a + b; console.log(c);",
				options: [
					{
						id: 1,
						option: "30",
						isCorrect: true,
					},
					{
						id: 2,
						option: "20",
						isCorrect: false,
					},
					{
						id: 3,
						option: "10",
						isCorrect: false,
					},
					{
						id: 4,
						option: "40",
						isCorrect: false,
					},
				],
				answer: "30",
			},
			{
				id: 2,
				question:
					"Which of the features of JavaScript are not supported in Internet Explorer?",
				options: [
					{
						id: 1,
						option: "Closures",
						isCorrect: false,
					},
					{
						id: 2,
						option: "Prototypal Inheritance",
						isCorrect: false,
					},
					{
						id: 3,
						option: "Regular Expressions",
						isCorrect: false,
					},
					{
						id: 4,
						option: "Block Scoping",
						isCorrect: true,
					},
				],
				answer: "Block Scoping",
			},
			{
				id: 3,
				question:
					"Which of the following is not a valid JavaScript variable name?",
				options: [
					{
						id: 1,
						option: "2names",
						isCorrect: true,
					},
					{
						id: 2,
						option: "_first_and_last_names",
						isCorrect: false,
					},
					{
						id: 3,
						option: "FirstAndLast",
						isCorrect: false,
					},
					{
						id: 4,
						option: "None of the above",
						isCorrect: false,
					},
				],
				answer: "2names",
			},
			{
				id: 4,
				question:
					"Which of the following is not a reserved word in JavaScript?",
				options: [
					{
						id: 1,
						option: "interface",
						isCorrect: false,
					},
					{
						id: 2,
						option: "throws",
						isCorrect: false,
					},
					{
						id: 3,
						option: "program",
						isCorrect: true,
					},
					{
						id: 4,
						option: "short",
						isCorrect: false,
					},
				],
				answer: "program",
			},
			{
				id: 5,
				question: "Which of the following statement is true?",
				options: [
					{
						id: 1,
						option: "JavaScript is a case-sensitive language",
						isCorrect: true,
					},
					{
						id: 2,
						option: "JavaScript is a loosely typed language",
						isCorrect: false,
					},
					{
						id: 3,
						option: "JavaScript is a compiled language",
						isCorrect: false,
					},
					{
						id: 4,
						option: "None of the above",
						isCorrect: false,
					},
				],
				answer: "JavaScript is a case-sensitive language",
			},
			{
				id: 6,
				question:
					"Which of the following statement shows the primary difference between JavaScript and Java?",
				options: [
					{
						id: 1,
						option: "There is no difference between JavaScript and Java.",
						isCorrect: false,
					},
					{
						id: 2,
						option: "Functions are considered as fields.",
						isCorrect: false,
					},
					{
						id: 3,
						option: "Variables are specific.",
						isCorrect: false,
					},
					{
						id: 4,
						option:
							"Functions are values, and there is no such distinction between methods and fields.",
						isCorrect: true,
					},
				],
				answer:
					"Functions are values, and there is no such distinction between methods and fields.",
			},
		],
	},
];

export default App;