import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import {
  Wrench,
  Shield,
  User,
  LayoutDashboard,
  Box,
  BarChart3,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

export default function Navbar() {
  const {
    currentRole,
    setCurrentRole,
    theme,
    toggleTheme,
    resetDemoData,
    repairs,
    inventory
  } = useRepair();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeRepairsCount = repairs.filter(r => r.stage !== 'Completed').length;
  const lowStockCount = inventory.filter(i => i.inStock <= i.minThreshold).length;

  const roles = [
    { id: 'customer', label: 'Customer Portal', icon: User, badge: null, desc: 'Track repairs, check warranties, submit jobs' },
    { id: 'technician', label: 'Technician Hub', icon: Wrench, badge: activeRepairsCount, desc: 'Diagnosis, parts logger, 5-point QA' },
    { id: 'manager', label: 'Operations Manager', icon: LayoutDashboard, badge: null, desc: 'Kanban dispatch, workload balancer, claims' },
    { id: 'inventory', label: 'Parts & Inventory', icon: Box, badge: lowStockCount > 0 ? `${lowStockCount} Low` : null, desc: 'Warehouse catalog, stock reorders, ledger' },
    { id: 'admin', label: 'Admin & Analytics', icon: BarChart3, badge: null, desc: 'Executive telemetry, registry & audit logs' }
  ];

  const handleSelectRole = (roleId) => {
    setCurrentRole(roleId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <div className="navbar-brand">
          <div className="logo-glow-wrapper">
            <img
              src="/repairchain_logo.jpg"
              alt="RepairChain Logo"
              className="navbar-logo-img"
            />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Repair<span className="brand-accent">Chain</span>
              <span className="platform-tag">PLATFORM</span>
            </div>
            <div className="brand-subtitle">Product Repair Lifecycle Management</div>
          </div>
        </div>

        {/* Desktop Role Switcher Pill Bar */}
        <nav className="role-nav desktop-role-nav" aria-label="Role Switcher">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`role-btn ${isActive ? 'active' : ''}`}
                title={`Switch view to ${r.label}`}
              >
                <Icon size={16} />
                <span>{r.label}</span>
                {r.badge !== null && r.badge !== undefined && (
                  <span className={`role-badge ${String(r.badge).includes('Low') ? 'badge-alert' : ''}`}>
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Controls */}
        <div className="navbar-actions">
          <button
            onClick={resetDemoData}
            className="btn btn-secondary btn-sm action-icon-btn"
            title="Reset platform data to default showcase state"
            aria-label="Reset Demo Data"
          >
            <RotateCcw size={14} />
            <span className="btn-label-desktop">Reset Demo</span>
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm theme-toggle-btn action-icon-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#6366F1" />}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm mobile-menu-toggle-btn"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick-Scroll Role Bar (Always accessible on Mobile & Tablet) */}
      <div className="mobile-role-strip" aria-label="Mobile Role Switcher">
        <div className="mobile-role-strip-inner">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRole(r.id)}
                className={`mobile-strip-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{r.label.split(' ')[0]}</span>
                {r.badge !== null && r.badge !== undefined && (
                  <span className={`strip-badge ${String(r.badge).includes('Low') ? 'badge-alert' : ''}`}>
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Expandable Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-card glass-panel" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title">Switch Platform Workspace</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary btn-sm"
                aria-label="Close Drawer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="drawer-roles-list">
              {roles.map(r => {
                const Icon = r.icon;
                const isActive = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRole(r.id)}
                    className={`drawer-role-card ${isActive ? 'active' : ''}`}
                  >
                    <div className="drawer-role-icon">
                      <Icon size={18} />
                    </div>
                    <div className="drawer-role-text">
                      <div className="drawer-role-label-row">
                        <span className="drawer-role-name">{r.label}</span>
                        {r.badge !== null && r.badge !== undefined && (
                          <span className={`role-badge ${String(r.badge).includes('Low') ? 'badge-alert' : ''}`}>
                            {r.badge}
                          </span>
                        )}
                      </div>
                      <span className="drawer-role-desc">{r.desc}</span>
                    </div>
                    {isActive && <CheckCircle2 size={16} className="drawer-active-check" />}
                  </button>
                );
              })}
            </div>

            <div className="drawer-footer-actions">
              <button
                onClick={() => { resetDemoData(); setMobileMenuOpen(false); }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <RotateCcw size={14} />
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
