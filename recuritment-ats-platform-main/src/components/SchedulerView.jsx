import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User, 
  Sparkles, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  Plus, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  MessageSquareCode
} from 'lucide-react';
import '../styles/scheduler.css';

export default function SchedulerView({ interviews, setInterviews, candidates, setCandidates, jobs }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 8)); // July 8, 2026 (Wednesday)
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeRoomInterview, setActiveRoomInterview] = useState(null); // The interview currently open in room
  
  // Room Evaluation states
  const [roomMute, setRoomMute] = useState(false);
  const [roomVideoOff, setRoomVideoOff] = useState(false);
  const [roomScore, setRoomScore] = useState(75);
  const [roomSkillsChecked, setRoomSkillsChecked] = useState({});
  const [roomNotes, setRoomNotes] = useState('');
  const [aiAnalysisText, setAiAnalysisText] = useState('Listening for interview responses...');
  const [isTypingAi, setIsTypingAi] = useState(false);

  // New Interview Form states
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    interviewer: 'Sarah Connor (HR Manager)',
    date: '2026-07-10',
    time: '14:00',
    type: 'Technical Interview'
  });

  // Init form defaults
  useEffect(() => {
    if (candidates.length > 0 && !formData.candidateId) {
      setFormData(prev => ({ ...prev, candidateId: candidates[0].id }));
    }
    if (jobs.length > 0 && !formData.jobId) {
      setFormData(prev => ({ ...prev, jobId: jobs[0].id }));
    }
  }, [candidates, jobs]);

  // Handle live AI insights text simulation
  useEffect(() => {
    if (!activeRoomInterview) return;
    
    // Choose active candidate profile
    const candObj = candidates.find(c => c.id === activeRoomInterview.candidateId);
    if (!candObj) return;

    // Simulate AI listening and logging bullet transcripts every 6 seconds
    const aiScripts = [
      `Analyzing Candidate's opening pitch. Core theme match: ${candObj.title}.`,
      `Extracted: Candidate explained experience working at ${candObj.workHistory[0]?.company || 'prior company'}. Match score high.`,
      `AI Skill Check: Candidate verbalized expertise in ${candObj.skills[0]} and ${candObj.skills[1]}.`,
      `Recruiter Tip: Ask the candidate about their weaknesses in database optimization (SQL/NoSQL) as identified by the resume gaps.`,
      `Synthesizing final recommendations: Candidate displays strong alignment. Verified communication skills are excellent.`
    ];

    let count = 0;
    setAiAnalysisText(aiScripts[0]);

    const scriptInterval = setInterval(() => {
      count = (count + 1) % aiScripts.length;
      setIsTypingAi(true);
      
      setTimeout(() => {
        setAiAnalysisText(aiScripts[count]);
        setIsTypingAi(false);
      }, 800);

    }, 8000);

    return () => clearInterval(scriptInterval);
  }, [activeRoomInterview, candidates]);

  // Setup static grid details for July 2026
  // July 1, 2026 was a Wednesday.
  // Week start: Sunday = 0, Mon = 1, Tue = 2, Wed = 3.
  // We need 3 empty days at the start of July 2026 grid.
  const daysInMonth = 31;
  const paddingDays = 3; 

  const generateDays = () => {
    const dayCells = [];
    
    // Padding days (previous month)
    for (let i = 28; i <= 30; i++) {
      dayCells.push({ dayNumber: i, otherMonth: true, fullDateStr: `2026-06-${i}` });
    }
    
    // July days
    for (let i = 1; i <= daysInMonth; i++) {
      const paddedDay = String(i).padStart(2, '0');
      dayCells.push({ 
        dayNumber: i, 
        otherMonth: false, 
        today: i === 8, // Highlight July 8 as today
        fullDateStr: `2026-07-${paddedDay}` 
      });
    }

    // Remaining padding cells for 35 total grid length
    const currentLength = dayCells.length;
    for (let i = 1; i <= 35 - currentLength; i++) {
      const paddedDay = String(i).padStart(2, '0');
      dayCells.push({ dayNumber: i, otherMonth: true, fullDateStr: `2026-08-${paddedDay}` });
    }

    return dayCells;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.candidateId || !formData.jobId) return;

    const newInterview = {
      id: `int-${Date.now()}`,
      candidateId: formData.candidateId,
      jobId: formData.jobId,
      interviewer: formData.interviewer,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'Scheduled'
    };

    setInterviews(prev => [...prev, newInterview]);
    setShowScheduleModal(false);
  };

  const startInterviewRoom = (interview) => {
    const candidate = candidates.find(c => c.id === interview.candidateId);
    
    // Seed checklist based on candidate skills
    const skillChecklist = {};
    if (candidate) {
      candidate.skills.slice(0, 5).forEach(sk => {
        skillChecklist[sk] = false;
      });
    }

    setRoomSkillsChecked(skillChecklist);
    setRoomScore(75);
    setRoomNotes('');
    setRoomMute(false);
    setRoomVideoOff(false);
    setActiveRoomInterview(interview);
  };

  const completeRoomInterview = (stageDecision) => {
    if (!activeRoomInterview) return;

    // Update interview status
    setInterviews(prev => 
      prev.map(i => i.id === activeRoomInterview.id ? { ...i, status: 'Completed' } : i)
    );

    // Update candidate notes and stage
    setCandidates(prev => 
      prev.map(c => {
        if (c.id === activeRoomInterview.candidateId) {
          const notesText = `[Interview Score: ${roomScore}/100]\nVerified Skills: ${Object.keys(roomSkillsChecked).filter(k => roomSkillsChecked[k]).join(', ')}\nRecruiter Notes: ${roomNotes}`;
          return {
            ...c,
            stage: stageDecision, // e.g. "Offered" or "Interviewing"
            recruiterNotes: notesText
          };
        }
        return c;
      })
    );

    setActiveRoomInterview(null);
  };

  const calendarDays = generateDays();

  return (
    <div className="scheduler-view">
      <div className="view-header-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading">Interviews & Visual Calendar</h1>
          <p className="subtitle">Arrange slots, see upcoming candidate briefings, and host AI screenings.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowScheduleModal(true)}>
          <Plus size={16} />
          Book Interview
        </button>
      </div>

      <div className="scheduler-layout">
        {/* Calendar Grid card */}
        <div className="glass-card calendar-card">
          <div className="calendar-header">
            <div className="calendar-title-nav">
              <h2 style={{ fontSize: '18px' }}>July 2026</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="calendar-nav-btn"><ChevronLeft size={16} /></button>
                <button className="calendar-nav-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>*Double-click a cell to book</span>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}

            {calendarDays.map((cell, idx) => {
              // Find interviews matching this cell date
              const dayInterviews = interviews.filter(i => i.date === cell.fullDateStr);
              
              return (
                <div 
                  key={idx} 
                  className={`calendar-day ${cell.today ? 'today' : ''} ${cell.otherMonth ? 'other-month' : ''}`}
                  onDoubleClick={() => {
                    setFormData(prev => ({ ...prev, date: cell.fullDateStr }));
                    setShowScheduleModal(true);
                  }}
                >
                  <span className="day-number">{cell.dayNumber}</span>
                  <div className="day-events">
                    {dayInterviews.map(item => {
                      const candidate = candidates.find(c => c.id === item.candidateId);
                      return (
                        <div 
                          key={item.id} 
                          className={`calendar-event-tag ${item.status === 'Completed' ? 'completed' : ''}`}
                          onClick={() => startInterviewRoom(item)}
                          title={`Click to open room with ${candidate?.name}`}
                        >
                          {item.time} {candidate?.name || 'Candidate'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar logs */}
        <div className="scheduler-sidebar">
          <div className="glass-card upcoming-interviews-card">
            <h3 style={{ fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} className="text-secondary" />
              Interview Actions List
            </h3>

            <div className="interview-list">
              {interviews.map(item => {
                const candidate = candidates.find(c => c.id === item.candidateId);
                const job = jobs.find(j => j.id === item.jobId);
                
                return (
                  <div key={item.id} className="interview-item">
                    <div className="interview-info">
                      <span className="interview-cand-name">{candidate?.name || 'Unparsed Candidate'}</span>
                      <span className="interview-time-desc">{job?.title}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {item.date} at {item.time} ({item.type})
                      </span>
                    </div>

                    {item.status === 'Scheduled' ? (
                      <button 
                        className="btn btn-primary btn-start-room"
                        onClick={() => startInterviewRoom(item)}
                      >
                        <Video size={12} style={{ marginRight: '4px' }} />
                        Join Room
                      </button>
                    ) : (
                      <span className="badge badge-success" style={{ fontSize: '10px' }}>Done</span>
                    )}
                  </div>
                );
              })}

              {interviews.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No interviews scheduled yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Booking Modal */}
      {showScheduleModal && (
        <div className="modal-backdrop">
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" style={{ position: 'absolute', top: '16px', right: '16px' }} onClick={() => setShowScheduleModal(false)}>
              <XCircleIcon size={18} />
            </button>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={18} className="text-secondary" />
              Schedule Candidate Interview
            </h2>

            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label className="form-label">Select Candidate</label>
                <select 
                  className="form-select"
                  value={formData.candidateId}
                  onChange={(e) => setFormData(prev => ({ ...prev, candidateId: e.target.value }))}
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.title})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Open Role</label>
                <select 
                  className="form-select"
                  value={formData.jobId}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobId: e.target.value }))}
                >
                  {jobs.map(j => (
                    <option key={j.id} value={j.id}>{j.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input 
                    type="time" 
                    className="form-input"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Interview Stage Type</label>
                <select 
                  className="form-select"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="System Design">System Design Session</option>
                  <option value="Product Sense">Product Sense</option>
                  <option value="HR Screening">HR screening</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Interviewer Assignee</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={formData.interviewer}
                  onChange={(e) => setFormData(prev => ({ ...prev, interviewer: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowScheduleModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Book Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Live Interview Room */}
      {activeRoomInterview && (
        <div className="interview-room-container">
          {/* Left panel: Simulated Call Stream */}
          <div className="video-panel">
            <div className="video-header">
              <div className="live-indicator">
                <div className="pulse-dot" />
                Live AI Screen
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} />
                Interviewer Panel (Sarah Connor)
              </div>
            </div>

            <div className="video-screen">
              <div className="simulated-video-feed">
                <div className="video-placeholder-avatar">
                  {candidates.find(c => c.id === activeRoomInterview.candidateId)?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'CV'}
                </div>
                <div className="watermark">Simulated Candidate Stream</div>
                
                {/* Audio visualizer */}
                {!roomMute && (
                  <div className="audio-spectrum">
                    <div className="spectrum-bar" />
                    <div className="spectrum-bar" />
                    <div className="spectrum-bar" />
                    <div className="spectrum-bar" />
                    <div className="spectrum-bar" />
                  </div>
                )}
              </div>
            </div>

            <div className="video-controls">
              <button 
                className={`control-btn ${roomMute ? 'hangup' : ''}`} 
                onClick={() => setRoomMute(!roomMute)}
                title={roomMute ? "Unmute Mic" : "Mute Mic"}
              >
                {roomMute ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button 
                className={`control-btn ${roomVideoOff ? 'hangup' : ''}`} 
                onClick={() => setRoomVideoOff(!roomVideoOff)}
                title={roomVideoOff ? "Turn Video On" : "Turn Video Off"}
              >
                {roomVideoOff ? <Video size={18} style={{ opacity: 0.5 }} /> : <Video size={18} />}
              </button>
              <button 
                className="control-btn hangup" 
                onClick={() => setActiveRoomInterview(null)}
                title="Hang up call"
              >
                <PhoneOff size={18} />
              </button>
            </div>
          </div>

          {/* Right panel: Evaluator scorecards & checklist */}
          <div className="evaluation-panel">
            <div className="room-candidate-header">
              <h2 style={{ fontSize: '22px', marginBottom: '4px' }}>
                {candidates.find(c => c.id === activeRoomInterview.candidateId)?.name}
              </h2>
              <p className="subtitle" style={{ fontSize: '13px' }}>
                {jobs.find(j => j.id === activeRoomInterview.jobId)?.title}
              </p>
            </div>

            {/* Simulated Live AI feed logs */}
            <div className="rating-container">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} style={{ color: 'var(--accent-secondary)' }} />
                Real-Time AI Evaluator Stream
              </label>
              
              <div className="ai-feedback-box">
                <div className="ai-feedback-header">
                  <MessageSquareCode size={14} />
                  Live Transcript Signals
                  {isTypingAi && (
                    <div className="typing-animation">
                      <div className="dot-bounce" />
                      <div className="dot-bounce" />
                      <div className="dot-bounce" />
                    </div>
                  )}
                </div>
                {aiAnalysisText}
              </div>
            </div>

            {/* Checklist of skills */}
            <div className="rating-container">
              <label className="form-label">Verify Candidate Skills Requirements</label>
              <div className="checklist-group">
                {Object.keys(roomSkillsChecked).map(sk => (
                  <label key={sk} className="checklist-item">
                    <input 
                      type="checkbox" 
                      className="checklist-checkbox"
                      checked={roomSkillsChecked[sk]}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRoomSkillsChecked(prev => ({ ...prev, [sk]: checked }));
                        
                        // Dynamically adjust score on skill checks
                        setRoomScore(prev => {
                          const count = Object.values({ ...roomSkillsChecked, [sk]: checked }).filter(Boolean).length;
                          const total = Object.keys(roomSkillsChecked).length;
                          return Math.round(50 + (count / total) * 45); // Map to 50 - 95
                        });
                      }}
                    />
                    <span>Verified proficiency in {sk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Slider rating score */}
            <div className="rating-container">
              <label className="form-label">Live Evaluation Fit Rating</label>
              <div className="slider-wrapper">
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  className="score-slider"
                  value={roomScore}
                  onChange={(e) => setRoomScore(parseInt(e.target.value))}
                />
                <span className="score-display">{roomScore}%</span>
              </div>
            </div>

            {/* Textarea recruiter notes */}
            <div className="form-group">
              <label className="form-label">Interview Scorecard Notes</label>
              <textarea 
                className="form-textarea"
                placeholder="Enter key answers, performance highlights, soft skills assessment..."
                value={roomNotes}
                onChange={(e) => setRoomNotes(e.target.value)}
                style={{ minHeight: '120px' }}
              />
            </div>

            {/* Scorecard submissions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => completeRoomInterview('Interviewing')}
                style={{ flex: 1 }}
              >
                Log Score & Hold
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => completeRoomInterview('Offered')}
                style={{ flex: 1, background: 'var(--accent-success)', boxShadow: 'var(--accent-success-glow)' }}
              >
                <Check size={14} style={{ marginRight: '4px' }} />
                Accept & Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline fallback for close modal button icon
function XCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
