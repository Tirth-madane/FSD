const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== CONNECT TO MONGODB =====
mongoose.connect('mongodb://localhost:27017/online_exam')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedInitialData();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Make sure MongoDB is running: mongod');
  });

// ===== MONGOOSE SCHEMAS =====

// User (Student) Schema
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Exam Schema
const examSchema = new mongoose.Schema({
  examId:      { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  duration:    { type: Number, required: true }, // in seconds
  description: { type: String },
  questions: [{
    qid:           String,
    text:          String,
    options:       [String],
    correctOption: Number
  }]
});
const Exam = mongoose.model('Exam', examSchema);

// Result Schema
const resultSchema = new mongoose.Schema({
  resultId:   String,
  userId:     String,
  examTitle:  String,
  date:       String,
  score:      String,
  percentage: Number,
  passed:     Boolean
});
const Result = mongoose.model('Result', resultSchema);

// ===== SEED INITIAL DATA =====
async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({ name: 'Alice Smith', email: 'alice@student.com', password: 'password123' });
      console.log('User seeded');
    }

    const examCount = await Exam.countDocuments();
    if (examCount === 0) {
      await Exam.insertMany([
        {
          examId: 'web-dev-basics',
          title: 'Web Development Essentials',
          duration: 120,
          description: 'Test your understanding of HTML, CSS, and JavaScript.',
          questions: [
            { qid: 'q1', text: 'Which HTML5 tag is used to define key navigation links?', options: ['<navigate>', '<nav>', '<links>', '<menu>'], correctOption: 1 },
            { qid: 'q2', text: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], correctOption: 2 },
            { qid: 'q3', text: 'Which CSS property controls alignment in flexbox?', options: ['align-content', 'display: flex', 'flex-flow', 'justify-content'], correctOption: 1 },
            { qid: 'q4', text: 'Which operator checks both value and type in JavaScript?', options: ['=', '==', '===', '!=='], correctOption: 2 },
            { qid: 'q5', text: 'Which API is used to fetch resources asynchronously?', options: ['fetch()', 'AJAX()', 'XMLHttp()', 'axios()'], correctOption: 0 }
          ]
        },
        {
          examId: 'js-advanced',
          title: 'JavaScript ES6+ Deep Dive',
          duration: 180,
          description: 'Advanced topics: arrow functions, promises, array methods, destructuring, and closures.',
          questions: [
            { qid: 'q1', text: 'What is the output of: console.log(typeof NaN);', options: ["'number'", "'NaN'", "'undefined'", "'object'"], correctOption: 0 },
            { qid: 'q2', text: 'Which keyword is block-scoped and allows re-assignment?', options: ['var', 'let', 'const', 'define'], correctOption: 1 },
            { qid: 'q3', text: 'What is the purpose of a Promise in JavaScript?', options: ['Execute loops faster', 'Handle asynchronous operations', 'Secure page storage', 'Manage style variables'], correctOption: 1 },
            { qid: 'q4', text: 'Which array method returns elements that pass a test condition?', options: ['map()', 'forEach()', 'reduce()', 'filter()'], correctOption: 3 },
            { qid: 'q5', text: "What is 'this' inside an arrow function?", options: ['The global object', 'The element that triggered the event', 'Lexically inherited from outer scope', 'undefined'], correctOption: 2 }
          ]
        }
      ]);
      console.log('Exams seeded');
    }
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}

// ===== REST API ROUTES =====

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  try {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const user = await User.create({ name, email: email.toLowerCase(), password });
    res.status(201).json({ message: 'Registration successful', user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  try {
    const user = await User.findOne({ email: email.toLowerCase(), password });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    res.json({ message: 'Welcome back', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/exams — list exams without answers
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    const summary = exams.map(e => ({
      id: e.examId,
      title: e.title,
      duration: e.duration,
      description: e.description,
      totalQuestions: e.questions.length
    }));
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// GET /api/exams/:id/start — send questions WITHOUT correctOption
app.get('/api/exams/:id/start', async (req, res) => {
  try {
    const exam = await Exam.findOne({ examId: req.params.id });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });
    const safeQuestions = exam.questions.map(q => ({
      id: q.qid,
      text: q.text,
      options: q.options
    }));
    res.json({ id: exam.examId, title: exam.title, duration: exam.duration, questions: safeQuestions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to start exam' });
  }
});

// POST /api/exams/:id/submit — grade exam on backend
app.post('/api/exams/:id/submit', async (req, res) => {
  const { userId, answers } = req.body;
  if (!userId || !answers) return res.status(400).json({ error: 'User ID and answers are required' });
  try {
    const exam = await Exam.findOne({ examId: req.params.id });
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    let correctCount = 0;
    const totalQuestions = exam.questions.length;
    const breakdown = [];

    exam.questions.forEach(q => {
      const studentAnswer = answers[q.qid];
      const isCorrect = studentAnswer !== undefined && studentAnswer === q.correctOption;
      if (isCorrect) correctCount++;
      breakdown.push({
        questionText: q.text,
        studentAnswer: studentAnswer !== undefined ? q.options[studentAnswer] : 'No Answer',
        correctAnswer: q.options[q.correctOption],
        isCorrect
      });
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 50;

    const newResult = await Result.create({
      resultId: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      userId,
      examTitle: exam.title,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      score: `${correctCount}/${totalQuestions}`,
      percentage,
      passed
    });

    res.json({ message: 'Exam submitted and graded successfully', result: newResult, breakdown });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit exam' });
  }
});

// GET /api/results/:userId — student's past results
app.get('/api/results/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).sort({ _id: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Examination System running on http://localhost:${PORT}`);
});
