import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
	const todos = await prisma.todo.findMany();
	res.json(todos);
});

app.post("/addTodo", async (req, res) => {
	if (req.body === null) return false;
	const { text, isChecked } = req.body;
	const result = await prisma.todo.create({
		data: {
			text: text,
			isChecked: isChecked,
		},
	});
	res.json(result);
});

app.post("/updateTodo", async (req, res) => {
	const { id, isChecked } = req.body;
	const result = await prisma.todo.update({
		where: {
			id: id,
		},
		data: {
			isChecked: isChecked,
		},
	});
	res.json(result);
});

app.post("/updateTodoText", async (req, res) => {
	console.log(req.body);
	const { id, text } = req.body;
	const result = await prisma.todo.update({
		where: {
			id: id,
		},
		data: {
			text: text,
		},
	});
	res.json(result);
});

app.listen(3000, () => console.log("REST API server ready at: http://localhost:3000"));
