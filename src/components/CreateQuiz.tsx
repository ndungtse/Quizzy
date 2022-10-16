import React, { FormEvent, SyntheticEvent } from "react";
import { BiSave, BiTrash } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

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
										<BiTrash />
									</button>
									<button
										title="save question"
										className="bg-[#0f8a5f] ml-2 py-1 px-2 rounded-md w-fit"
									>
										<BiSave />
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
											onClick={() => handleAddOption(question.id)}
											title="delete option"
											className="bg-red-500 py-1 px-2 rounded-md w-fit"
										>
											<BiTrash />
										</button>
										<button
											title="save option"
											className="bg-[#0f8a5f] ml-2 py-1 px-2 rounded-md w-fit"
										>
											<BiSave />
										</button>
										<button
											onClick={() => handleAddOption(question.id)}
											title="add option"
											className="bg-[#0f8a5f] ml-2 py-[2px] px-2 rounded-md w-fit text-sm"
										>
											Add
										</button>
									</div>
								</div>
								{question.options.map((option: any, index: number) => (
									<>
										<input
											type="text"
											name="title"
											id=""
											value={option.option}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleOptionChange(e, question.id, option.id)
											}
											placeholder={`Enter Option ${index + 1}`}
											className="py-1 bg-[#20203c]/30  px-2 mt-2 border border-[#20203c] rounded-md focus:outline-none focus:border-[#4d6f63]"
										/>
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

export default CreateQuiz;
