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
  Menu,
  X,
  CheckCircle2,
  LogOut,
  Users,
  Lock,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    logout,
    switchUser,
    authUsers,
    currentRole,
    setCurrentRole,
    theme,
    toggleTheme,
    resetDemoData,
    repairs,
    inventory
  } = useRepair();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switchAccountModalOpen, setSwitchAccountModalOpen] = useState(false);

  const activeRepairsCount = repairs.filter(r => r.stage !== 'Completed').length;
  const lowStockCount = inventory.filter(i => i.inStock <= i.minThreshold).length;

  // Master navigation list with strict role permissions
  // Parts & Inventory is STRICTLY accessible ONLY by: technician, manager, admin
  const allNavItems = [
    {
      id: 'customer',
      label: 'Customer Portal',
      icon: User,
      badge: null,
      desc: 'Track repairs, check warranties, submit jobs ("ye sahi karwana hai")',
      allowedRoles: ['customer', 'manager', 'admin']
    },
    {
      id: 'technician',
      label: 'Technician Hub',
      icon: Wrench,
      badge: activeRepairsCount,
      desc: 'Accept customer requests, diagnose, fix hardware, 5-point QA',
      allowedRoles: ['technician', 'manager', 'admin']
    },
    {
      id: 'manager',
      label: 'Operations Manager',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Kanban dispatch, workload balancer, warranty authorization',
      allowedRoles: ['manager', 'admin']
    },
    {
      id: 'inventory',
      label: 'Parts & Inventory',
      icon: Box,
      badge: lowStockCount > 0 ? `${lowStockCount} Low` : null,
      desc: 'Warehouse catalog, stock reorders, ledger (Restricted to Staff)',
      allowedRoles: ['technician', 'manager', 'admin']
    },
    {
      id: 'admin',
      label: 'Admin & Analytics',
      icon: BarChart3,
      badge: null,
      desc: 'Executive telemetry, registry & immutable audit logs',
      allowedRoles: ['admin']
    }
  ];

  // Filter based on currently logged in user's role
  const userRole = currentUser?.role || 'customer';
  const visibleNavItems = allNavItems.filter(item => item.allowedRoles.includes(userRole));

  const handleSelectRole = (roleId) => {
    setCurrentRole(roleId);
    setMobileMenuOpen(false);
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'customer': return 'badge-blue';
      case 'technician': return 'badge-purple';
      case 'manager': return 'badge-amber';
      case 'admin': return 'badge-emerald';
      default: return 'badge-blue';
    }
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

        {/* Desktop Role Switcher Pill Bar (Strictly Filtered by User Permissions) */}
        <nav className="role-nav desktop-role-nav" aria-label="Role Switcher">
          {visibleNavItems.map(r => {
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

        {/* Global Controls & User Profile Badge */}
        <div className="navbar-actions">
          {/* Logged in User Pill / Switch Account Trigger */}
          {currentUser ? (
            <div className="navbar-user-profile">
              <button
                onClick={() => setSwitchAccountModalOpen(true)}
                className="user-profile-btn"
                title="Switch account or view session credentials"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="user-nav-avatar"
                />
                <div className="user-nav-meta">
                  <span className="user-nav-name">{currentUser.name}</span>
                  <div className="user-nav-sub">
                    <span className={`user-nav-role-badge badge ${getRoleBadgeClass(currentUser.role)}`}>
                      {currentUser.roleLabel || currentUser.role}
                    </span>
                    <span className="user-nav-id mono">ID: {currentUser.id}</span>
                  </div>
                </div>
                <ChevronDown size={14} className="text-muted" />
              </button>

              <button
                onClick={logout}
                className="btn btn-secondary btn-sm action-icon-btn logout-nav-btn"
                title="Sign out of RepairChain"
                aria-label="Sign Out"
              >
                <LogOut size={14} className="text-rose" />
                <span className="btn-label-desktop">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentRole('customer')}
              className="btn btn-primary btn-sm"
            >
              Sign In
            </button>
          )}

          <button
            onClick={resetDemoData}
            className="btn btn-secondary btn-sm action-icon-btn"
            title="Reset platform data to default showcase state"
            aria-label="Reset Demo Data"
          >
            <RotateCcw size={14} />
            <span className="btn-label-desktop">Reset</span>
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

      {/* Mobile Horizontal Quick-Scroll Role Bar (Only showing permitted tabs) */}
      <div className="mobile-role-strip" aria-label="Mobile Role Switcher">
        <div className="mobile-role-strip-inner">
          {visibleNavItems.map(r => {
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

            {/* User Info Card in Drawer */}
            {currentUser && (
              <div className="drawer-user-info-card glass-panel">
                <img src={currentUser.avatar} alt={currentUser.name} className="drawer-user-avatar" />
                <div className="drawer-user-text">
                  <span className="drawer-user-name font-bold">{currentUser.name}</span>
                  <div className="drawer-user-sub">
                    <span className={`badge ${getRoleBadgeClass(currentUser.role)}`}>{currentUser.roleLabel}</span>
                    <span className="mono text-muted" style={{ fontSize: '0.75rem' }}>ID: {currentUser.id}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setMobileMenuOpen(false); setSwitchAccountModalOpen(true); }}
                  className="btn btn-secondary btn-sm"
                >
                  Switch
                </button>
              </div>
            )}

            <div className="drawer-roles-list">
              {visibleNavItems.map(r => {
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
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="btn btn-secondary btn-sm text-rose"
                style={{ width: '100%', marginBottom: '8px' }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
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

      {/* Switch Account / Switch ID Modal */}
      {switchAccountModalOpen && (
        <div className="modal-backdrop" onClick={() => setSwitchAccountModalOpen(false)}>
          <div className="custom-modal-card glass-panel" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <Users size={18} className="text-cyan" />
                <h3>Switch User Account & Credentials</h3>
              </div>
              <button
                onClick={() => setSwitchAccountModalOpen(false)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
                Each role has a distinct User ID & Password. Selecting any account below switches permissions instantly.
              </p>

              <div className="switch-accounts-grid">
                {authUsers.map(user => {
                  const isCurrent = currentUser?.id === user.id;
                  const isInventoryRestricted = user.role === 'customer';

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        switchUser(user.id);
                        setSwitchAccountModalOpen(false);
                      }}
                      className={`switch-user-card ${isCurrent ? 'current-active' : ''}`}
                    >
                      <img src={user.avatar} alt={user.name} className="switch-avatar" />
                      <div className="switch-info">
                        <div className="switch-name-row">
                          <span className="font-bold">{user.name}</span>
                          <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                            {user.roleLabel}
                          </span>
                        </div>
                        <div className="switch-sub-meta">
                          <span className="mono text-cyan" style={{ fontSize: '0.75rem' }}>ID: {user.id}</span>
                          {isInventoryRestricted ? (
                            <span className="mono text-muted" style={{ fontSize: '0.72rem' }}>• No Parts Access</span>
                          ) : (
                            <span className="mono text-emerald" style={{ fontSize: '0.72rem' }}>• Parts & Inventory Allowed</span>
                          )}
                        </div>
                      </div>
                      {isCurrent ? (
                        <CheckCircle2 size={18} className="text-emerald" />
                      ) : (
                        <ArrowRight size={16} className="text-muted switch-arrow" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setSwitchAccountModalOpen(false);
                }}
                className="btn btn-secondary btn-sm text-rose"
              >
                <LogOut size={14} />
                Sign Out to Login Screen
              </button>
              <button
                type="button"
                onClick={() => setSwitchAccountModalOpen(false)}
                className="btn btn-primary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
