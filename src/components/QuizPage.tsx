import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
			alert("Please answer all the questions");
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

export default QuizPage;

export const quizes = [
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
