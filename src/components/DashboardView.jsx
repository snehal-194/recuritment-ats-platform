import React from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Upload, 
  PlusCircle, 
  Clock 
} from 'lucide-react';
import '../styles/dashboard.css';

export default function DashboardView({ candidates, jobs, interviews, setActiveTab }) {
  // Calculations
  const totalCandidates = candidates.length;
  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;
  const pendingInterviewsCount = interviews.filter(i => i.status === 'Scheduled').length;
  
  // Calculate average fit score
  const avgFitScore = Math.round(
    candidates.reduce((acc, curr) => {
      // Find highest score among active jobs
      const scores = Object.values(curr.matchScores);
      const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
      return acc + maxScore;
    }, 0) / (totalCandidates || 1)
  );

  // Pipeline counts
  const pipelineStages = [
    { label: 'Applied', count: candidates.filter(c => c.stage === 'Applied').length },
    { label: 'Screening', count: candidates.filter(c => c.stage === 'Screening').length },
    { label: 'Interviewing', count: candidates.filter(c => c.stage === 'Interviewing').length },
    { label: 'Offered', count: candidates.filter(c => c.stage === 'Offered').length },
    { label: 'Hired', count: candidates.filter(c => c.stage === 'Hired').length },
  ];

  const maxStageCount = Math.max(...pipelineStages.map(s => s.count)) || 1;

  // Mock Activity Feed
  const activities = [
    { id: 1, type: 'success', time: '10 mins ago', text: 'Resume parsed: <strong>John Doe</strong> ranked at <strong>97% match</strong> for Senior Frontend Engineer.' },
    { id: 2, type: 'cyan', time: '1 hour ago', text: 'Interview scheduled: <strong>Alex Rivera</strong> with David Lee.' },
    { id: 3, type: 'warning', time: '3 hours ago', text: 'Pipeline update: <strong>Dr. Elena Rostova</strong> moved to <strong>Screening</strong>.' },
    { id: 4, type: 'success', time: 'Yesterday', text: 'Job position created: <strong>AI Research Scientist</strong>.' },
  ];

  return (
    <div className="dashboard-view">
      <div className="view-header-title">
        <h1 className="font-heading">Recruitment Dashboard</h1>
        <p className="subtitle">Real-time candidate pipelines and AI screening telemetry.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4 metrics-grid">
        <div className="glass-card kpi-card" style={{ '--accent-color': 'var(--accent-primary)' }}>
          <div className="kpi-header">
            <span>TOTAL APPLICANTS</span>
            <div className="kpi-icon-container">
              <Users size={16} />
            </div>
          </div>
          <div className="kpi-value">{totalCandidates}</div>
          <div className="kpi-change up">
            <TrendingUp size={14} />
            <span>+12% <span className="kpi-change-label">vs last week</span></span>
          </div>
        </div>

        <div className="glass-card kpi-card" style={{ '--accent-color': 'var(--accent-secondary)' }}>
          <div className="kpi-header">
            <span>ACTIVE JOBS</span>
            <div className="kpi-icon-container">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="kpi-value">{activeJobsCount}</div>
          <div className="kpi-change up">
            <TrendingUp size={14} />
            <span>+3 <span className="kpi-change-label">new open roles</span></span>
          </div>
        </div>

        <div className="glass-card kpi-card" style={{ '--accent-color': 'var(--accent-warning)' }}>
          <div className="kpi-header">
            <span>PENDING INTERVIEWS</span>
            <div className="kpi-icon-container">
              <Calendar size={16} />
            </div>
          </div>
          <div className="kpi-value">{pendingInterviewsCount}</div>
          <div className="kpi-change-label" style={{ fontSize: '12px', marginTop: '6px' }}>
            Next interview in 4 hours
          </div>
        </div>

        <div className="glass-card kpi-card" style={{ '--accent-color': 'var(--accent-success)' }}>
          <div className="kpi-header">
            <span>AI MATCH RATE (AVG)</span>
            <div className="kpi-icon-container">
              <CpuIcon size={16} />
            </div>
          </div>
          <div className="kpi-value">{avgFitScore}%</div>
          <div className="kpi-change up">
            <TrendingUp size={14} />
            <span>Optimal <span className="kpi-change-label">screening criteria</span></span>
          </div>
        </div>
      </div>

      {/* Main dashboard columns */}
      <div className="dashboard-grid">
        <div className="glass-card chart-section">
          <div className="section-title-bar">
            <h3 className="section-title">Hiring Pipeline Funnel</h3>
            <span className="subtitle" style={{ fontSize: '12px' }}>Applicant distribution by stage</span>
          </div>

          <div className="funnel-container">
            {pipelineStages.map((stage) => {
              const pct = (stage.count / maxStageCount) * 100;
              return (
                <div key={stage.label} className="funnel-row">
                  <div className="funnel-label">{stage.label}</div>
                  <div className="funnel-bar-wrapper">
                    <div className="funnel-bar" style={{ width: `${Math.max(pct, 5)}%` }} />
                    <span className="funnel-count">{stage.count} candidates</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card activity-section">
          <div className="section-title-bar">
            <h3 className="section-title">Activity Stream</h3>
            <Clock size={16} className="text-muted" />
          </div>

          <div className="timeline">
            {activities.map((act) => (
              <div key={act.id} className="timeline-item">
                <div className={`timeline-dot ${act.type}`} />
                <span className="timeline-time">{act.time}</span>
                <span className="timeline-content" dangerouslySetInnerHTML={{ __html: act.text }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="quick-actions-bar">
        <h3 className="section-title" style={{ marginBottom: '16px' }}>Quick Start Shortcuts</h3>
        <div className="grid-3">
          <div className="glass-card action-shortcut-card" onClick={() => setActiveTab('candidates')}>
            <Upload className="shortcut-icon" style={{ color: 'var(--accent-primary)' }} />
            <div className="shortcut-meta">
              <span className="shortcut-title">Parse Resumes</span>
              <span className="shortcut-desc">Upload CVs to screen and analyze via AI extraction.</span>
            </div>
          </div>
          <div className="glass-card action-shortcut-card" onClick={() => setActiveTab('jobs')}>
            <PlusCircle className="shortcut-icon" style={{ color: 'var(--accent-secondary)' }} />
            <div className="shortcut-meta">
              <span className="shortcut-title">Create Job Position</span>
              <span className="shortcut-desc">Paste new Job Description to map candidate skills.</span>
            </div>
          </div>
          <div className="glass-card action-shortcut-card" onClick={() => setActiveTab('scheduler')}>
            <Calendar className="shortcut-icon" style={{ color: 'var(--accent-warning)' }} />
            <div className="shortcut-meta">
              <span className="shortcut-title">Schedule Interviews</span>
              <span className="shortcut-desc">Arrange calendar bookings and join mock interview room.</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-view {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .view-header-title {
          margin-bottom: 24px;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          margin-top: 4px;
        }

        .action-shortcut-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          border: 1px solid var(--glass-border);
        }

        .action-shortcut-card:hover {
          border-color: var(--accent-secondary);
          background: rgba(0, 245, 255, 0.01);
          transform: translateY(-2px);
        }

        .shortcut-icon {
          width: 28px;
          height: 28px;
        }

        .shortcut-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .shortcut-title {
          font-weight: 600;
          font-size: 14px;
          color: var(--text-primary);
        }

        .shortcut-desc {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}} />
    </div>
  );
}

// Small wrapper because lucide-react uses Cpu which we also imported, let's keep it safe
function CpuIcon(props) {
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}
