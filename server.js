const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Node.js server");
});

let students = [
    { id: 1, name: "Karina", group: "IM-34" },
    { id: 2, name: "Oikawa", group: "JP-26" }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        ...req.body
    };

    students.push(newStudent);
    res.json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;

    students = students.map(s => {
        if (s.id === id) {
            found = true;
            return { ...s, ...req.body };
        }
        return s;
    });

    if (!found) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Updated" });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const before = students.length;
    students = students.filter(s => s.id !== id);

    if (students.length === before) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});