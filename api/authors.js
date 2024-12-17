const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {
    try {
        const authors = await prisma.author.findMany();
        res.json(authors)
    } catch (error) {
        next();
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { name } = req.body;
        const author = await prisma.author.create({ data: { name } });
        res.status(201).json(author);
    } catch (error) {
        next();
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const author = await prisma.author.findUnique({ where: { id } });
        res.json(author);
    } catch (error) {
        next();
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { name } = req.body;

        const author = await prisma.author.update({
            where: { id },
            data: { name },
        });
        res.json(author)
    } catch (error) {

    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id;
        await prisma.author.delete({ where: { id } });

        res.sendStatus(204);
    } catch (error) {
        next();
    }
})

router.get("/:id/books", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const books = await prisma.book.findMany({ where: { authorId: id } });

        res.json(books);
    } catch (error) {
        next()
    }
})



router.post("/:id/books", async (req, res, next) => {
    try {
        const id = +req.params.id;
        const { title } = req.body;
        const book = await prisma.book.create({
            data: { title, author: { connect: { id } } },
        });

        res.json(book);
    } catch {
        next();
    }
});