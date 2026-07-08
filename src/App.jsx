import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CandidatesView from './components/CandidatesView';
import JobsView from './components/JobsView';
import PipelineView from './components/PipelineView';
import SchedulerView from './components/SchedulerView';
import { initialJobs, initialCandidates, initialInterviews } from './mockData';

// Styles Import
import './styles/global.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load from local storage or fallback to seeds
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('talentai_candidates');
    return saved ? JSON.parse(saved) : initialCandidates;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('talentai_jobs');
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [interviews, setInterviews] = useState(() => {
    const saved = localStorage.getItem('talentai_interviews');
    return saved ? JSON.parse(saved) : initialInterviews;
  });

  // Save to local storage on state changes
  useEffect(() => {
    localStorage.setItem('talentai_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('talentai_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('talentai_interviews', JSON.stringify(interviews));
  }, [interviews]);

  // Tab Renderer Helper
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            candidates={candidates} 
            jobs={jobs} 
            interviews={interviews} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'candidates':
        return (
          <CandidatesView 
            candidates={candidates} 
            setCandidates={setCandidates} 
            jobs={jobs} 
          />
        );
      case 'jobs':
        return (
          <JobsView 
            jobs={jobs} 
            setJobs={setJobs} 
            candidates={candidates} 
          />
        );
      case 'pipeline':
        return (
          <PipelineView 
            candidates={candidates} 
            setCandidates={setCandidates} 
          />
        );
      case 'scheduler':
        return (
          <SchedulerView 
            interviews={interviews} 
            setInterviews={setInterviews} 
            candidates={candidates} 
            setCandidates={setCandidates} 
            jobs={jobs} 
          />
        );
      default:
        return <DashboardView candidates={candidates} jobs={jobs} interviews={interviews} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Side Navigation panel */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main View contents */}
      <main className="main-content">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Workspace:</span>
            <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Global Hiring Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Status: Cloud Synchronized</span>
            <div className="status-dot status-dot-active" />
          </div>
        </header>
        
        <div className="view-container">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
