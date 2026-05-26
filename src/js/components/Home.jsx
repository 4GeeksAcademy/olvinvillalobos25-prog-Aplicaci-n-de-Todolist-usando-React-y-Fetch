import React, { useState, useEffect } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("");

	const [todos, setTodos] = useState([]);

	const username = "olvinvillalobos";

	const getTodos = () => {

		fetch("https://playground.4geeks.com/todo/users/" + username)
			.then((response) => {

				if (response.status === 404) {

					createUser();

					return null;
				}

				return response.json();
			})

			.then((data) => {

				if (data) {

					setTodos(data.todos);
				}
			})

			.catch((error) => console.log(error));
	};

	const createUser = () => {

		fetch("https://playground.4geeks.com/todo/users/" + username, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(() => getTodos())
			.catch((error) => console.log(error));
	};

	useEffect(() => {

		getTodos();

	}, []);

	const addTodo = () => {

		if (inputValue.trim() === "") return;

		const task = {
			label: inputValue,
			is_done: false
		};

		fetch("https://playground.4geeks.com/todo/todos/" + username, {
			method: "POST",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then((response) => {

				if (response.ok) {

					getTodos();

					setInputValue("");
				}
			})

			.catch((error) => console.log(error));
	};

	const handleKeyDown = (event) => {

		if (event.key === "Enter") {

			addTodo();
		}
	};

	const deleteTodo = (id) => {

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})

			.then((response) => {

				console.log(response);

				if (response.ok) {

					const updatedTodos = todos.filter((todo) => {
						return todo.id !== id;
					});

					setTodos(updatedTodos);
				}
			})

			.catch((error) => console.log(error));
	};

	const deleteAllTodos = () => {

		const promises = todos.map((todo) => {

			return fetch(
				`https://playground.4geeks.com/todo/todos/${todo.id}`,
				{
					method: "DELETE"
				}
			);
		});

		Promise.all(promises)

			.then(() => {

				setTodos([]);
			})

			.catch((error) => console.log(error));
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