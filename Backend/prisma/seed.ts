import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	const first = await prisma.todo.create({
		data: {
			text: "Buy eggs",
			isChecked: false,
		},
	});

	const second = await prisma.todo.create({
		data: {
			text: "Clean bathroom",
			isChecked: false,
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
