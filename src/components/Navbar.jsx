import React from 'react';
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
  Sparkles
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

  const activeRepairsCount = repairs.filter(r => r.stage !== 'Completed').length;
  const lowStockCount = inventory.filter(i => i.inStock <= i.minThreshold).length;

  const roles = [
    { id: 'customer', label: 'Customer Portal', icon: User, badge: null },
    { id: 'technician', label: 'Technician Hub', icon: Wrench, badge: activeRepairsCount },
    { id: 'manager', label: 'Operations Manager', icon: LayoutDashboard, badge: null },
    { id: 'inventory', label: 'Parts & Inventory', icon: Box, badge: lowStockCount > 0 ? `${lowStockCount} Low` : null },
    { id: 'admin', label: 'Admin & Analytics', icon: BarChart3, badge: null }
  ];

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

        {/* Role Switcher Pill Bar */}
        <nav className="role-nav" aria-label="Role Switcher">
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
            className="btn btn-secondary btn-sm"
            title="Reset platform data to default showcase state"
          >
            <RotateCcw size={14} />
            <span className="btn-label-desktop">Reset Demo</span>
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#6366F1" />}
          </button>
        </div>
      </div>
    </header>
  );
}
