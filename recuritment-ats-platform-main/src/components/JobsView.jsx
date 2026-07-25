import React, { useState } from 'react';
import { 
  PlusCircle, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Info,
  Sparkles,
  Users
} from 'lucide-react';
import '../styles/jobs.css';

export default function JobsView({ jobs, setJobs, candidates }) {
  const [selectedJobId, setSelectedJobId] = useState('job-1');
  const [compareCandId, setCompareCandId] = useState('cand-1'); // Default comparison candidate
  
  // Job Form States
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    location: '',
    salary: '',
    requirements: '',
    preferred: '',
    description: ''
  });

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Candidates matching scores sorted
  const matchedCandidatesForJob = candidates
    .map(c => ({
      candidate: c,
      score: c.matchScores[activeJob?.id] || 0
    }))
    .sort((a, b) => b.score - a.score);

  // Active comparison candidate details
  const compCandidate = candidates.find(c => c.id === compareCandId) || candidates[0];
  const compScore = compCandidate?.matchScores[activeJob?.id] || 0;

  // Radar chart details helper
  // We can render 6 points on a radar chart
  const getRadarPoints = () => {
    if (!activeJob) return "";
    
    // Total requirements, cap at 6
    const reqs = activeJob.requirements.slice(0, 6);
    const center = 120;
    const radius = 80;
    
    const points = reqs.map((req, index) => {
      const angle = (index * (2 * Math.PI)) / reqs.length - Math.PI / 2;
      // Calculate how close the candidate matches the requirement
      // If the candidate has the skill, value is high, else low
      const hasSkill = compCandidate?.skills.some(s => s.toLowerCase() === req.toLowerCase());
      const valuePct = hasSkill ? 0.95 : 0.25; // mock skill depth
      
      const x = center + radius * valuePct * Math.cos(angle);
      const y = center + radius * valuePct * Math.sin(angle);
      return `${x},${y}`;
    });
    
    return points.join(" ");
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.location) return;

    const parsedReqs = newJob.requirements.split(',').map(s => s.trim()).filter(Boolean);
    const parsedPref = newJob.preferred.split(',').map(s => s.trim()).filter(Boolean);

    const createdJob = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      salary: newJob.salary || 'N/A',
      requirements: parsedReqs.length > 0 ? parsedReqs : ["React", "JavaScript"],
      preferred: parsedPref.length > 0 ? parsedPref : ["TypeScript"],
      description: newJob.description || "No description provided.",
      status: "Active"
    };

    setJobs(prev => [...prev, createdJob]);
    setSelectedJobId(createdJob.id);
    setShowAddJobModal(false);
    
    // Reset form
    setNewJob({
      title: '',
      department: 'Engineering',
      location: '',
      salary: '',
      requirements: '',
      preferred: '',
      description: ''
    });
  };

  return (
    <div className="jobs-view">
      <div className="view-header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading">Job Openings & Requirements</h1>
          <p className="subtitle">Manage job requirements, analyze skill gaps, and match profiles.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddJobModal(true)}>
          <PlusCircle size={16} />
          Create Job Position
        </button>
      </div>

      <div className="jobs-layout">
        {/* Left Column: Jobs List */}
        <div className="jobs-sidebar">
          <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Open Positions ({jobs.length})</h3>
          
          {jobs.map(job => (
            <div 
              key={job.id} 
              className={`glass-card job-select-card ${selectedJobId === job.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedJobId(job.id);
                // Update default candidate comparison when switching jobs
                const topCand = candidates.sort((a,b) => (b.matchScores[job.id] || 0) - (a.matchScores[job.id] || 0))[0];
                if (topCand) setCompareCandId(topCand.id);
              }}
            >
              <div className="job-select-title">{job.title}</div>
              <div className="job-select-meta">
                <span>{job.department}</span>
                <span>{job.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Job Detail & Match Panel */}
        {activeJob && (
          <div className="glass-card job-details-panel">
            <div className="job-detail-header">
              <div className="job-title-row">
                <h2 style={{ fontSize: '24px' }}>{activeJob.title}</h2>
                <span className="job-salary">{activeJob.salary}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase size={14} />
                  {activeJob.department}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} />
                  {activeJob.location}
                </span>
              </div>
              <p className="job-desc">{activeJob.description}</p>
            </div>

            {/* AI Skill Comparison matrices */}
            <div>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-secondary)' }} />
                AI Skill Gap Analysis
              </h3>

              <div className="candidate-compare-header">
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Select candidate for comparison:</span>
                <select 
                  className="candidate-compare-selector"
                  value={compareCandId}
                  onChange={(e) => setCompareCandId(e.target.value)}
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Fit: {c.matchScores[activeJob.id] || 0}%)
                    </option>
                  ))}
                </select>
              </div>

              {compCandidate && (
                <div className="fit-meter-container">
                  <div className="fit-meter-header">
                    <span style={{ fontWeight: 600 }}>{compCandidate.name} Match Score</span>
                    <span style={{ color: 'var(--accent-secondary)', fontWeight: 700 }}>{compScore}% Match</span>
                  </div>
                  <div className="fit-meter-bar">
                    <div className="fit-meter-fill" style={{ width: `${compScore}%` }} />
                  </div>
                </div>
              )}

              <div className="skills-comparison-grid">
                {/* Skill List matches */}
                <div className="skills-list-group">
                  <span className="skills-list-header">Required Skill Matrix</span>
                  
                  {activeJob.requirements.map(req => {
                    const matched = compCandidate?.skills.some(s => s.toLowerCase() === req.toLowerCase());
                    return (
                      <div key={req} className="skill-match-row">
                        <span className="skill-match-name">{req}</span>
                        {matched ? (
                          <span className="skill-match-status matched">
                            <CheckCircle2 size={14} /> Matches
                          </span>
                        ) : (
                          <span className="skill-match-status missing">
                            <XCircle size={14} /> Missing
                          </span>
                        )}
                      </div>
                    );
                  })}
                  
                  {activeJob.preferred.length > 0 && (
                    <>
                      <span className="skills-list-header" style={{ marginTop: '12px' }}>Preferred Skill Matrix</span>
                      {activeJob.preferred.map(pref => {
                        const matched = compCandidate?.skills.some(s => s.toLowerCase() === pref.toLowerCase());
                        return (
                          <div key={pref} className="skill-match-row">
                            <span className="skill-match-name" style={{ fontStyle: 'italic' }}>{pref}</span>
                            {matched ? (
                              <span className="skill-match-status matched">
                                <CheckCircle2 size={14} /> Matches
                              </span>
                            ) : (
                              <span className="skill-match-status missing" style={{ color: 'var(--text-muted)' }}>
                                <XCircle size={14} /> Missing
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Circular Radar Chart Rendering */}
                <div className="radar-chart-container">
                  <svg className="radar-chart-svg" viewBox="0 0 240 240">
                    {/* Background rings */}
                    <circle cx="120" cy="120" r="80" className="radar-grid-line" />
                    <circle cx="120" cy="120" r="60" className="radar-grid-line" />
                    <circle cx="120" cy="120" r="40" className="radar-grid-line" />
                    <circle cx="120" cy="120" r="20" className="radar-grid-line" />
                    
                    {/* Axis lines & labels */}
                    {activeJob.requirements.slice(0, 6).map((req, idx) => {
                      const reqsCount = Math.min(activeJob.requirements.length, 6);
                      const angle = (idx * (2 * Math.PI)) / reqsCount - Math.PI / 2;
                      const x2 = 120 + 80 * Math.cos(angle);
                      const y2 = 120 + 80 * Math.sin(angle);
                      
                      // Label position slightly outside
                      const lx = 120 + 95 * Math.cos(angle);
                      const ly = 120 + 95 * Math.sin(angle) + 3; // vertical adjust
                      
                      return (
                        <g key={req}>
                          <line x1="120" y1="120" x2={x2} y2={y2} className="radar-axis-line" />
                          <text x={lx} y={ly} className="radar-axis-label">{req}</text>
                        </g>
                      );
                    })}

                    {/* Candidate Plot Area */}
                    <polygon points={getRadarPoints()} className="radar-candidate-area" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="modal-backdrop">
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" style={{ position: 'absolute', top: '16px', right: '16px' }} onClick={() => setShowAddJobModal(false)}>
              <XCircle size={18} />
            </button>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} className="text-secondary" />
              Post New Position
            </h2>

            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Senior Backend Engineer" 
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select 
                    className="form-select"
                    value={newJob.department}
                    onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Insights">AI & Insights</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Sales & Operations">Sales & Operations</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Salary Range</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. $120k - $140k"
                    value={newJob.salary}
                    onChange={(e) => setNewJob(prev => ({ ...prev, salary: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Remote (US) or San Francisco, CA" 
                  required
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="React, JavaScript, HTML5, CSS3"
                  value={newJob.requirements}
                  onChange={(e) => setNewJob(prev => ({ ...prev, requirements: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Skills (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="TypeScript, Vite, Next.js"
                  value={newJob.preferred}
                  onChange={(e) => setNewJob(prev => ({ ...prev, preferred: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Write a brief overview of the job duties and ideal candidate traits..."
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddJobModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Job position</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
