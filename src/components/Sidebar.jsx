import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Kanban, 
  Calendar, 
  Settings, 
  Cpu 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'jobs', label: 'Job Positions', icon: Briefcase },
    { id: 'pipeline', label: 'Hiring Pipeline', icon: Kanban },
    { id: 'scheduler', label: 'Interviews', icon: Calendar },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Cpu className="brand-icon" />
        <span className="brand-name">TalentAI</span>
        <span className="brand-badge">ATS</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
              {activeTab === item.id && <div className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">HR</div>
          <div className="user-info">
            <div className="user-name">Sarah Connor</div>
            <div className="user-role">Lead Recruiter</div>
          </div>
        </div>
        <button className="nav-item settings-btn">
          <Settings className="nav-icon" />
          <span>Settings</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-secondary);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 24px 16px;
          z-index: 10;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 8px 30px;
        }

        .brand-icon {
          width: 28px;
          height: 28px;
          color: var(--accent-secondary);
          filter: drop-shadow(0 0 8px var(--accent-secondary-glow));
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 20px;
          background: linear-gradient(135deg, #fff 30%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.03em;
        }

        .brand-badge {
          font-size: 9px;
          font-weight: 800;
          background: var(--accent-primary-glow);
          color: #c084fc;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(138, 43, 226, 0.3);
          text-transform: uppercase;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          width: 100%;
          position: relative;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(138, 43, 226, 0.05);
          color: var(--text-primary);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          color: inherit;
          transition: color var(--transition-fast);
        }

        .nav-item.active .nav-icon {
          color: var(--accent-secondary);
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 25%;
          height: 50%;
          width: 3px;
          background: var(--accent-secondary);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          box-shadow: 0 0 10px var(--accent-secondary);
        }

        .sidebar-footer {
          border-top: 1px solid var(--glass-border);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .user-role {
          font-size: 11px;
          color: var(--text-muted);
        }

        .settings-btn {
          margin-top: 4px;
        }
      `}} />
    </aside>
  );
}
