import React, { useState } from 'react';
import { initialCandidates } from '../mockData';
import '../styles/pipeline.css';

export default function PipelineView({ candidates, setCandidates }) {
  const [draggedOverStage, setDraggedOverStage] = useState(null);

  const stages = [
    { name: 'Applied', label: 'Applied' },
    { name: 'Screening', label: 'Screening' },
    { name: 'Interviewing', label: 'Interviewing' },
    { name: 'Offered', label: 'Offered' },
    { name: 'Hired', label: 'Hired' },
    { name: 'Rejected', label: 'Rejected' }
  ];

  // Drag and Drop Logic
  const handleDragStart = (e, candidateId) => {
    e.dataTransfer.setData('text/plain', candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, stageName) => {
    e.preventDefault();
    setDraggedOverStage(stageName);
  };

  const handleDragLeave = () => {
    setDraggedOverStage(null);
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    setDraggedOverStage(null);
    const candidateId = e.dataTransfer.getData('text/plain');
    
    // Update candidate stage in state
    setCandidates(prevCandidates => {
      return prevCandidates.map(cand => {
        if (cand.id === candidateId) {
          return { ...cand, stage: targetStage };
        }
        return cand;
      });
    });
  };

  // Helper for initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="pipeline-view">
      <div className="view-header-title">
        <h1 className="font-heading">Hiring Pipeline Board</h1>
        <p className="subtitle">Drag & drop candidate cards across columns to advance them through stages.</p>
      </div>

      <div className="pipeline-board">
        {stages.map(stage => {
          const stageCandidates = candidates.filter(c => c.stage === stage.name);
          const isOver = draggedOverStage === stage.name;
          
          return (
            <div 
              key={stage.name} 
              className={`pipeline-column ${isOver ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, stage.name)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.name)}
            >
              <div className="column-header">
                <div className="column-title">
                  <div className="status-dot status-dot-active" style={{ 
                    backgroundColor: 
                      stage.name === 'Hired' ? 'var(--accent-success)' :
                      stage.name === 'Rejected' ? 'var(--accent-danger)' :
                      stage.name === 'Offered' ? 'var(--accent-secondary)' :
                      stage.name === 'Interviewing' ? 'var(--accent-warning)' : 'var(--text-muted)'
                  }} />
                  {stage.label}
                </div>
                <span className="column-badge">{stageCandidates.length}</span>
              </div>

              <div className="column-cards-container">
                {stageCandidates.map(c => {
                  // Find top match score for card
                  const scores = Object.values(c.matchScores);
                  const topScore = scores.length > 0 ? Math.max(...scores) : 0;
                  
                  return (
                    <div 
                      key={c.id} 
                      className="pipeline-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, c.id)}
                    >
                      <div className="card-header">
                        <span className="card-name">{c.name}</span>
                        {topScore > 0 && (
                          <span className="card-score">{topScore}% fit</span>
                        )}
                      </div>
                      <p className="card-title">{c.title}</p>
                      <div className="card-footer">
                        <span className="card-experience">{c.experience} exp</span>
                        <div className="card-avatar" title={c.name}>
                          {getInitials(c.name)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {stageCandidates.length === 0 && (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '11px', border: '1px dashed rgba(255,255,255,0.02)', borderRadius: '6px', minHeight: '100px' }}>
                    Drag candidate here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
