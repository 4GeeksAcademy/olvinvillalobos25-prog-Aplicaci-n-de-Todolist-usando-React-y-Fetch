import React, { useState, useEffect } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("");

	const [todos, setTodos] = useState([]);

	const username = "olvinvillalobos";

	const getTodos = async () => {

		try {

			const response = await fetch(
				"https://playground.4geeks.com/todo/users/" + username
			);

			if (response.status === 404) {

				createUser();

				return;
			}

			const data = await response.json();

			setTodos(data.todos);

		} catch (error) {

			console.log(error);
		}
	};

	const createUser = async () => {

		try {

			await fetch(
				"https://playground.4geeks.com/todo/users/" + username,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				}
			);

			getTodos();

		} catch (error) {

			console.log(error);
		}
	};

	useEffect(() => {

		getTodos();

	}, []);

	const addTodo = async () => {

		if (inputValue.trim() === "") return;

		const task = {
			label: inputValue,
			is_done: false
		};

		try {

			const response = await fetch(
				"https://playground.4geeks.com/todo/todos/" + username,
				{
					method: "POST",
					body: JSON.stringify(task),
					headers: {
						"Content-Type": "application/json"
					}
				}
			);

			if (response.ok) {

				getTodos();

				setInputValue("");
			}

		} catch (error) {

			console.log(error);
		}
	};

	const handleKeyDown = (event) => {

		if (event.key === "Enter") {

			addTodo();
		}
	};

	const deleteTodo = async (id) => {

		try {

			const response = await fetch(
				"https://playground.4geeks.com/todo/todos/" + id,
				{
					method: "DELETE"
				}
			);

			if (response.ok) {

				getTodos();
			}

		} catch (error) {

			console.log(error);
		}
	};

	const deleteAllTodos = async () => {

		try {

			for (let todo of todos) {

				await fetch(
					"https://playground.4geeks.com/todo/todos/" + todo.id,
					{
						method: "DELETE"
					}
				);
			}

			getTodos();

		} catch (error) {

			console.log(error);
		}
	};

	return (
		<div className="container">

			<h1 className="main-title">todos</h1>

			<div className="todo-container">

				<input
					type="text"
					className="todo-input"
					placeholder="What needs to be done?"
					value={inputValue}
					onChange={(event) =>
						setInputValue(event.target.value)
					}
					onKeyDown={handleKeyDown}
				/>

				<ul className="list-group">

					{
						todos.length === 0 ?

							<li className="list-group-item empty-task">
								No hay tareas, añadir tareas
							</li>

							:

							todos.map((todo) => {

								return (
									<li
										key={todo.id}
										className="list-group-item todo-item">

										{todo.label}

										<span
											className="delete-icon"
											onClick={() => deleteTodo(todo.id)}>
											x
										</span>

									</li>
								);
							})
					}

				</ul>

				<div className="todo-footer">
					{todos.length} items left
				</div>

			</div>

			<div className="text-center mt-3">

				<button
					className="btn btn-danger"
					onClick={deleteAllTodos}>
					Delete All Tasks
				</button>

			</div>

		</div>
	);
};

export default Home;