import React, { useState, useEffect } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("");

	const [todos, setTodos] = useState([]);

	const username = "olvin25";

	const apiUrl = `https://playground.4geeks.com/todo/users/${username}`;

	const createUser = () => {

		fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {

				return response.json();
			})
			.then((data) => {

				console.log(data);

				getTodos();
			})
			.catch((error) => console.log(error));
	};

	const getTodos = () => {

		fetch(apiUrl)
			.then((response) => {

				if (response.status === 404) {

					createUser();
				}

				return response.json();
			})
			.then((data) => {

				console.log(data);

				if (data.todos) {

					setTodos(data.todos);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {

		getTodos();

	}, []);

	const addTodo = () => {

		const task = {
			label: inputValue,
			is_done: false
		};

		fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
			method: "POST",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => {

				console.log(data);

				getTodos();

				setInputValue("");
			})
			.catch((error) => console.log(error));
	};

	const handleKeyDown = (event) => {

		if (event.key === "Enter") {

			if (inputValue.trim() !== "") {

				addTodo();
			}
		}
	};

	const deleteTodo = (id) => {

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
			.then((response) => response.json())
			.then((data) => {

				console.log(data);

				getTodos();
			})
			.catch((error) => console.log(error));
	};

	const clearAllTodos = () => {

		todos.forEach((todo) => {

			fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
				method: "DELETE"
			})
				.then((response) => response.json())
				.then((data) => {

					console.log(data);

					getTodos();
				})
				.catch((error) => console.log(error));
		});
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

				<div className="text-center p-3">

					<button
						className="btn btn-danger"
						onClick={clearAllTodos}>
						Delete All
					</button>

				</div>

			</div>

		</div>
	);
};

export default Home;