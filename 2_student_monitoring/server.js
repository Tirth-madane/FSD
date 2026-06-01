const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== CONNECT TO MONGODB =====
mongoose.connect('mongodb://localhost:27017/student_monitoring')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedInitialData(); // Seed sample data on first run
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Make sure MongoDB is running: mongod');
  });

// ===== MONGOOSE SCHEMAS =====

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Teacher = mongoose.model('Teacher', teacherSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  rollNo:  { type: String, required: true, unique: true },
  class:   { type: String, required: true },
  marks: [{
    subject:  String,
    score:    Number,
    maxScore: Number,
    date:     String
  }],
  assignments: [{
    title:   String,
    subject: String,
    status:  String,
    date:    String
  }],
  feedback: [{
    text:   String,
    author: String,
    date:   String
  }]
});
const Student = mongoose.model('Student', studentSchema);

// ===== SEED INITIAL DATA =====
async function seedInitialData() {
  try {
    // Only seed if no data exists
    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      await Teacher.create({
        name: 'Prof. Sarah Jenkins',
        email: 'teacher@school.com',
        password: 'password123'
      });
      console.log('Teacher seeded');
    }

    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      await Student.insertMany([
        {
          name: 'Ethan Hunt', rollNo: 'CS-201', class: 'Sophomore A',
          marks: [
            { subject: 'Math', score: 92, maxScore: 100, date: '2026-05-10' },
            { subject: 'Science', score: 88, maxScore: 100, date: '2026-05-12' }
          ],
          assignments: [
            { title: 'Calculus Homework', subject: 'Math', status: 'Submitted', date: '2026-05-15' },
            { title: 'Physics Lab Report', subject: 'Science', status: 'Submitted', date: '2026-05-18' }
          ],
          feedback: [
            { text: 'Excellent logical skills. Consistent performer.', author: 'Prof. Sarah Jenkins', date: '2026-05-20' }
          ]
        },
        {
          name: 'Clara Oswald', rollNo: 'CS-202', class: 'Sophomore A',
          marks: [
            { subject: 'Math', score: 76, maxScore: 100, date: '2026-05-10' },
            { subject: 'Science', score: 94, maxScore: 100, date: '2026-05-12' }
          ],
          assignments: [
            { title: 'Calculus Homework', subject: 'Math', status: 'Pending', date: '2026-05-15' },
            { title: 'Physics Lab Report', subject: 'Science', status: 'Submitted', date: '2026-05-18' }
          ],
          feedback: [
            { text: 'High analytical potential, needs to submit Math work on time.', author: 'Prof. Sarah Jenkins', date: '2026-05-21' }
          ]
        },
        {
          name: 'Bruce Banner', rollNo: 'CS-203', class: 'Sophomore B',
          marks: [
            { subject: 'Math', score: 99, maxScore: 100, date: '2026-05-10' },
            { subject: 'Science', score: 100, maxScore: 100, date: '2026-05-12' }
          ],
          assignments: [
            { title: 'Calculus Homework', subject: 'Math', status: 'Submitted', date: '2026-05-15' },
            { title: 'Physics Lab Report', subject: 'Science', status: 'Submitted', date: '2026-05-18' }
          ],
          feedback: [
            { text: 'Incredible aptitude in biochemistry and advanced mathematical theories.', author: 'Prof. Sarah Jenkins', date: '2026-05-22' }
          ]
        }
      ]);
      console.log('Students seeded');
    }
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}

// ===== REST API ROUTES =====

// POST /api/auth/login - Teacher Authentication
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const teacher = await Teacher.findOne({ email: email.toLowerCase(), password });
    if (!teacher) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', teacher: { name: teacher.name, email: teacher.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/students - Get all students (with search & filter)
app.get('/api/students', async (req, res) => {
  const { search, subject } = req.query;
  try {
    let query = {};
    if (search) {
      query.$or = [
        { name:   { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } }
      ];
    }
    let students = await Student.find(query);

    // Filter by subject (in-memory after fetch)
    if (subject && subject !== 'All') {
      students = students.filter(s =>
        s.marks.some(m => m.subject === subject) ||
        s.assignments.some(a => a.subject === subject)
      );
    }
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST /api/students - Add new student
app.post('/api/students', async (req, res) => {
  const { name, rollNo, className } = req.body;
  if (!name || !rollNo || !className) {
    return res.status(400).json({ error: 'Name, roll number, and class are required' });
  }
  try {
    const exists = await Student.findOne({ rollNo });
    if (exists) {
      return res.status(400).json({ error: 'Roll number already exists' });
    }
    const student = await Student.create({
      name, rollNo, class: className,
      marks: [], assignments: [], feedback: []
    });
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// POST /api/students/:id/records - Add marks, assignment, or feedback
app.post('/api/students/:id/records', async (req, res) => {
  const { type, subject, score, maxScore, title, status, text, author } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const date = new Date().toISOString().split('T')[0];

    if (type === 'mark') {
      if (!subject || score === undefined || !maxScore) {
        return res.status(400).json({ error: 'Subject, score, and max score are required' });
      }
      student.marks.push({ subject, score: Number(score), maxScore: Number(maxScore), date });
    } else if (type === 'assignment') {
      if (!title || !subject || !status) {
        return res.status(400).json({ error: 'Title, subject, and status are required' });
      }
      student.assignments.push({ title, subject, status, date });
    } else if (type === 'feedback') {
      if (!text || !author) {
        return res.status(400).json({ error: 'Feedback text and teacher name are required' });
      }
      student.feedback.push({ text, author, date });
    } else {
      return res.status(400).json({ error: 'Invalid record type. Use: mark, assignment, or feedback' });
    }

    await student.save();
    res.json({ message: 'Record added successfully', student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add record' });
  }
});

// DELETE /api/students/:id - Delete a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Student Monitoring System running on http://localhost:${PORT}`);
});
