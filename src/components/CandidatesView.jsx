import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Search, 
  X, 
  Check, 
  Copy, 
  AlertTriangle, 
  FileText,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';
import { initialResumeTemplates } from '../mockData';
import '../styles/candidates.css';

export default function CandidatesView({ candidates, setCandidates, jobs }) {
  const [search, setSearch] = useState('');
  const [selectedJobFilter, setSelectedJobFilter] = useState('job-1'); // Default to job-1
  const [minScoreFilter, setMinScoreFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Drag and drop / file simulation states
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState('');
  const fileInputRef = useRef(null);

  // Copy state
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Trigger file simulation
  const handleSimulateResume = (template) => {
    if (uploading) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const steps = [
      { progress: 15, text: 'Reading file binaries...' },
      { progress: 40, text: 'Extracting resume text layout...' },
      { progress: 65, text: 'Structuring education and work experience...' },
      { progress: 85, text: 'Analyzing skill semantic matching via AI Model...' },
      { progress: 100, text: 'Finalizing applicant ranking profile...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setUploadProgress(steps[currentStep].progress);
        setUploadStep(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Add the parsed candidate to candidates list (avoid duplicates)
        const parsedCandidate = {
          ...template.candidate,
          id: `parsed-${Date.now()}`
        };
        
        setCandidates(prev => [parsedCandidate, ...prev]);
        setUploading(false);
        setUploadProgress(0);
        setUploadStep('');
        
        // Open drawer for the newly parsed candidate
        setSelectedCandidate(parsedCandidate);
      }
    }, 450);
  };

  // Custom File Dropped
  const handleCustomFile = (fileName) => {
    // Generate randomized candidate for demonstration
    const randomNames = ["Emma Watson", "Liam Neeson", "Sophia Loren", "Ryan Reynolds", "Jessica Chastain"];
    const randomTitles = ["Frontend Developer", "Python Engineer", "Technical Consultant", "Machine Learning Specialist"];
    
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const title = randomTitles[Math.floor(Math.random() * randomTitles.length)];
    const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
    
    // Choose random match scores for our jobs
    const matchScores = {};
    jobs.forEach(j => {
      matchScores[j.id] = Math.floor(Math.random() * 45) + 50; // 50 to 95
    });

    const mockCandidate = {
      id: `custom-${Date.now()}`,
      name,
      email,
      phone: "+1 (555) 999-8888",
      title,
      experience: `${Math.floor(Math.random() * 5) + 3} years`,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Git", "Python", "SQL"].slice(0, Math.floor(Math.random() * 4) + 3),
      education: "B.S. Information Technology - State University",
      summary: "Dynamic professional with strong problem-solving capabilities and experience working in agile environments.",
      workHistory: [
        {
          role: title,
          company: "CloudTech Systems",
          duration: "2023 - Present",
          details: "Worked closely with design teams to translate UI mockups into interactive components. Maintained scalable software architectures."
        }
      ],
      stage: "Applied",
      matchScores,
      recruiterNotes: "Uploaded custom CV. Needs manual screening review.",
      aiFitAnalysis: {
        strengths: ["Strong problem solving fundamentals", "Solid general software engineering knowledge"],
        weaknesses: ["Skill mapping shows gaps for highly specific requirements"],
        screeningQuestions: [
          "Explain your workflow when debugging performance anomalies.",
          "Describe how you coordinate task handoffs in remote engineering setups."
        ]
      }
    };

    handleSimulateResume({ candidate: mockCandidate });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleCustomFile(file.name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleCustomFile(e.target.files[0].name);
    }
  };

  // Copy Question to clipboard
  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Colors for scores
  const getScoreColors = (score) => {
    if (score >= 85) return { border: 'rgba(0, 255, 135, 0.25)', bg: 'rgba(0, 255, 135, 0.05)', color: 'var(--accent-success)' };
    if (score >= 65) return { border: 'rgba(255, 170, 0, 0.25)', bg: 'rgba(255, 170, 0, 0.05)', color: 'var(--accent-warning)' };
    return { border: 'rgba(255, 0, 85, 0.25)', bg: 'rgba(255, 0, 85, 0.05)', color: 'var(--accent-danger)' };
  };

  // Filter candidates
  const filteredCandidates = candidates.filter(c => {
    const searchLower = search.toLowerCase();
    const nameMatch = c.name.toLowerCase().includes(searchLower) || c.skills.some(s => s.toLowerCase().includes(searchLower));
    
    const score = c.matchScores[selectedJobFilter] || 0;
    let scoreMatch = true;
    if (minScoreFilter === 'high') scoreMatch = score >= 85;
    else if (minScoreFilter === 'mid') scoreMatch = score >= 65 && score < 85;
    else if (minScoreFilter === 'low') scoreMatch = score < 65;

    return nameMatch && scoreMatch;
  });

  return (
    <div className="candidates-view">
      <div className="view-header-title">
        <h1 className="font-heading">Candidate Profiles & Screening</h1>
        <p className="subtitle">Drag & drop resumes to analyze profiles, extract skills, and run AI matching.</p>
      </div>

      {/* Drop Zone Area */}
      <div className="upload-container">
        <div 
          className={`glass-card upload-zone ${isDragging ? 'dragover' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
          />
          <div className="upload-icon">
            <Upload size={32} />
          </div>
          <h3 className="upload-title">Drag and drop resume here</h3>
          <p className="upload-subtitle">Supports PDF, DOCX, or TXT (Simulated parse will run automatically)</p>
          
          <div className="upload-templates" onClick={(e) => e.stopPropagation()}>
            <span style={{ fontSize: '12px', alignSelf: 'center', color: 'var(--text-muted)' }}>Or use templates:</span>
            {initialResumeTemplates.map(tpl => (
              <button 
                key={tpl.fileName}
                className="btn btn-secondary template-btn"
                onClick={() => handleSimulateResume(tpl)}
                disabled={uploading}
              >
                <FileText size={12} style={{ marginRight: '4px' }} />
                {tpl.fileName}
              </button>
            ))}
          </div>

          {uploading && (
            <div style={{ marginTop: '24px', width: '100%', maxWidth: '400px', margin: '24px auto 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{uploadStep}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div className="filters-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search candidates by name or skills (e.g. React, Python)..." 
              className="form-input search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div>
              <select 
                className="form-select" 
                value={selectedJobFilter}
                onChange={(e) => setSelectedJobFilter(e.target.value)}
                style={{ minWidth: '180px' }}
              >
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>

            <div>
              <select 
                className="form-select"
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(e.target.value)}
              >
                <option value="all">All Match Scores</option>
                <option value="high">High Match (≥ 85%)</option>
                <option value="mid">Good Match (65% - 84%)</option>
                <option value="low">Low Match (&lt; 65%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Cards Grid */}
      <div className="candidates-grid">
        {filteredCandidates.map(c => {
          const score = c.matchScores[selectedJobFilter] || 0;
          const styleTokens = getScoreColors(score);
          return (
            <div 
              key={c.id} 
              className="glass-card candidate-card"
              onClick={() => setSelectedCandidate(c)}
              style={{ cursor: 'pointer' }}
            >
              <div className="candidate-card-header">
                <div className="candidate-info">
                  <h3 className="candidate-name">{c.name}</h3>
                  <p className="candidate-title">{c.title}</p>
                </div>
                <div 
                  className="score-badge"
                  style={{
                    '--score-border': styleTokens.border,
                    '--score-bg': styleTokens.bg,
                    '--score-color': styleTokens.color
                  }}
                >
                  {score}%
                  <span className="score-label">Fit</span>
                </div>
              </div>

              <p className="candidate-card-body">
                {c.summary}
              </p>

              <div className="candidate-card-footer">
                <div className="candidate-skills-preview">
                  {c.skills.slice(0, 3).map(sk => (
                    <span key={sk} className="mini-skill-tag">{sk}</span>
                  ))}
                  {c.skills.length > 3 && (
                    <span className="mini-skill-tag">+{c.skills.length - 3} more</span>
                  )}
                </div>
                <span className="badge badge-indigo">{c.stage}</span>
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <AlertTriangle style={{ margin: '0 auto 12px', display: 'block', color: 'var(--accent-warning)' }} />
            No candidates matched the current search criteria or filters.
          </div>
        )}
      </div>

      {/* Sliding Candidate Detail Drawer */}
      {selectedCandidate && (
        <div className="drawer-backdrop" onClick={() => setSelectedCandidate(null)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>{selectedCandidate.name}</h2>
                <p className="subtitle" style={{ fontSize: '13px' }}>{selectedCandidate.title} • {selectedCandidate.experience} Experience</p>
              </div>
              <button className="drawer-close" onClick={() => setSelectedCandidate(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-section">
                <div className="profile-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Email</span>
                    <span className="meta-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={14} className="text-muted" />
                      {selectedCandidate.email}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Phone</span>
                    <span className="meta-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} className="text-muted" />
                      {selectedCandidate.phone}
                    </span>
                  </div>
                  <div className="meta-item" style={{ gridColumn: '1 / -1' }}>
                    <span className="meta-label">Education</span>
                    <span className="meta-val">{selectedCandidate.education}</span>
                  </div>
                </div>
              </div>

              <div className="drawer-section">
                <h4 className="drawer-section-title">Professional Summary</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {selectedCandidate.summary}
                </p>
              </div>

              <div className="drawer-section">
                <h4 className="drawer-section-title">Skills Profile</h4>
                <div className="skills-container">
                  {selectedCandidate.skills.map(sk => (
                    <span key={sk} className="skill-tag">{sk}</span>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <h4 className="drawer-section-title">Work Experience</h4>
                <div className="experience-timeline">
                  {selectedCandidate.workHistory.map((work, idx) => (
                    <div key={idx} className="exp-item">
                      <div className="exp-dot" />
                      <div className="exp-header">
                        <span className="exp-role">{work.role} <span className="exp-company">@ {work.company}</span></span>
                        <span className="exp-duration">{work.duration}</span>
                      </div>
                      <p className="exp-details">{work.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI fit Analysis section */}
              <div className="drawer-section">
                <h4 className="drawer-section-title">AI Screening Telemetry</h4>
                <div className="ai-fit-card">
                  <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Candidate Fit Summary
                  </h4>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <h5 style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px' }}>STRENGTHS MATCHED</h5>
                    <ul className="ai-bullets-list">
                      {selectedCandidate.aiFitAnalysis.strengths.map((str, idx) => (
                        <li key={idx} className="ai-bullet strength">{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <h5 style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px' }}>CONCERNS / GAPS</h5>
                    <ul className="ai-bullets-list">
                      {selectedCandidate.aiFitAnalysis.weaknesses.map((weak, idx) => (
                        <li key={idx} className="ai-bullet weakness">{weak}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 style={{ fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px' }}>RECOMMENDED SCREENING QUESTIONS</h5>
                    {selectedCandidate.aiFitAnalysis.screeningQuestions.map((q, idx) => (
                      <div key={idx} className="question-item">
                        <span className="question-text">"{q}"</span>
                        <button 
                          className="btn-copy" 
                          onClick={() => copyToClipboard(q, idx)}
                          title="Copy to clipboard"
                        >
                          {copiedIndex === idx ? <Check size={14} style={{ color: 'var(--accent-success)' }} /> : <Copy size={14} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
