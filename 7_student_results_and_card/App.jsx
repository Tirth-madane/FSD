const { useState, useMemo } = React;

const SEED_STUDENTS = [
  { id: 1, name: "Diana Prince", rollNo: "RES-901", math: 95, physics: 92 },
  { id: 2, name: "Arthur Curry", rollNo: "RES-902", math: 42, physics: 55 },
  { id: 3, name: "Barry Allen", rollNo: "RES-903", math: 99, physics: 98 },
  { id: 4, name: "Victor Stone", rollNo: "RES-904", math: 88, physics: 91 }
];

function App() {
  const [students, setStudents] = useState(SEED_STUDENTS);
  const [filter, setFilter] = useState('All'); // All, Pass, Fail
  
  // Form States
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [mathScore, setMathScore] = useState('');
  const [physScore, setPhysScore] = useState('');

  // Add student record handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !roll || mathScore === '' || physScore === '') return;

    const newRecord = {
      id: Date.now(),
      name,
      rollNo: roll,
      math: Number(mathScore),
      physics: Number(physScore)
    };

    setStudents([...students, newRecord]);
    
    // Reset fields
    setName('');
    setRoll('');
    setMathScore('');
    setPhysScore('');
  };

  // Filtered students list
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const avg = (s.math + s.physics) / 2;
      const passed = avg >= 50;
      if (filter === 'Pass') return passed;
      if (filter === 'Fail') return !passed;
      return true;
    });
  }, [students, filter]);

  return (
    <div className="container">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Student Result Portal</h1>
        <p style={{ color: 'var(--text-muted)' }}>Log grades and monitor passing rates dynamically using Flexbox grids.</p>
      </div>

      {/* Form Editor panel */}
      <div className="editor-panel">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.2rem' }}>Log Grade Entry</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. Clark Kent" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input 
                type="text" 
                className="form-control" 
                value={roll} 
                onChange={e => setRoll(e.target.value)} 
                placeholder="e.g. RES-905" 
                required 
              />
            </div>
            <div className="form-group" style={{ flex: '0 0 100px' }}>
              <label>Maths</label>
              <input 
                type="number" 
                className="form-control" 
                value={mathScore} 
                onChange={e => setMathScore(e.target.value)} 
                min="0" 
                max="100" 
                placeholder="0-100" 
                required 
              />
            </div>
            <div className="form-group" style={{ flex: '0 0 100px' }}>
              <label>Physics</label>
              <input 
                type="number" 
                className="form-control" 
                value={physScore} 
                onChange={e => setPhysScore(e.target.value)} 
                min="0" 
                max="100" 
                placeholder="0-100" 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn" style={{ marginTop: '0.5rem' }}>Add Grade Record</button>
        </form>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="filter-bar">
          <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>Show All</button>
          <button className={`filter-btn ${filter === 'Pass' ? 'active' : ''}`} onClick={() => setFilter('Pass')}>Passed Only</button>
          <button className={`filter-btn ${filter === 'Fail' ? 'active' : ''}`} onClick={() => setFilter('Fail')}>Failed Only</button>
        </div>
        
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      {/* Centered Flexbox Card Grid */}
      <div className="cards-flex-container">
        {filteredStudents.length === 0 ? (
          <div style={{ padding: '3rem', color: 'var(--text-muted)' }}>No student records to display.</div>
        ) : (
          filteredStudents.map(student => {
            const average = (student.math + student.physics) / 2;
            const isPassed = average >= 50;

            return (
              <div className="result-card" key={student.id}>
                <h3 className="student-name">{student.name}</h3>
                <span className="student-roll">Roll: {student.rollNo}</span>
                
                <div className="scores-summary">
                  <div className="score-row">
                    <span>Mathematics</span>
                    <strong>{student.math}/100</strong>
                  </div>
                  <div className="score-row">
                    <span>Physics</span>
                    <strong>{student.physics}/100</strong>
                  </div>
                  <div className="score-row" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                    <span>Average</span>
                    <strong style={{ color: isPassed ? 'var(--success)' : 'var(--danger)' }}>{average.toFixed(1)}%</strong>
                  </div>
                </div>

                <span className={`status-badge ${isPassed ? 'status-pass' : 'status-fail'}`}>
                  {isPassed ? 'Passed' : 'Failed'}
                </span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
