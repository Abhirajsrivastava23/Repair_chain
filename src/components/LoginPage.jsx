import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import {
  Lock,
  User,
  Wrench,
  LayoutDashboard,
  BarChart3,
  Box,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Info,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';

export default function LoginPage() {
  const { login, authUsers, toggleTheme, theme } = useRepair();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRoleTab, setSelectedRoleTab] = useState('all'); // 'all' | 'customer' | 'tech' | 'manager' | 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userId.trim()) {
      setErrorMessage('Please enter your User ID or Username.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const res = login(userId, password);
    if (!res.success) {
      setErrorMessage('Invalid User ID or Password. Check the demo accounts below.');
    }
  };

  const handleQuickLogin = (user) => {
    setUserId(user.id);
    setPassword(user.password);
    login(user.id, user.password);
  };

  // Grouped demo users for 1-click access
  const roleCards = [
    {
      role: 'customer',
      title: 'Customer Portal',
      badge: 'Client / User',
      badgeClass: 'badge-blue',
      icon: User,
      user: authUsers.find(u => u.id === 'cust_anthony') || authUsers.find(u => u.role === 'customer'),
      access: 'Submit repair jobs ("ye sahi karwana hai"), track live status, approve quotes.',
      inventoryAccess: false
    },
    {
      role: 'technician',
      title: 'Technician Hub',
      badge: 'Hardware Tech',
      badgeClass: 'badge-purple',
      icon: Wrench,
      user: authUsers.find(u => u.id === 'tech_alex') || authUsers.find(u => u.role === 'technician'),
      access: 'View customer repair requests, accept tickets ("req accept kr ke sahi kre ga"), consume inventory parts, 5-point QA.',
      inventoryAccess: true
    },
    {
      role: 'manager',
      title: 'Operations Manager',
      badge: 'Dispatch & Ops',
      badgeClass: 'badge-amber',
      icon: LayoutDashboard,
      user: authUsers.find(u => u.id === 'ops_manager') || authUsers.find(u => u.role === 'manager'),
      access: 'Triage queue, workload balancing, warranty claims approval, inventory management.',
      inventoryAccess: true
    },
    {
      role: 'admin',
      title: 'System Admin',
      badge: 'Executive Root',
      badgeClass: 'badge-emerald',
      icon: BarChart3,
      user: authUsers.find(u => u.id === 'admin') || authUsers.find(u => u.role === 'admin'),
      access: 'Complete platform analytics, immutable audit logs, full access to parts catalog.',
      inventoryAccess: true
    }
  ];

  return (
    <div className="login-page-root">
      <div className="login-page-container">
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="login-logo-glow">
            <img
              src="/repairchain_logo.jpg"
              alt="RepairChain Logo"
              className="login-logo-img"
            />
          </div>
          <h1 className="login-main-title">
            Repair<span className="text-cyan">Chain</span>
          </h1>
          <p className="login-subtitle">
            Enterprise Product Repair Lifecycle & Role-Based Access Control
          </p>

          <div className="login-security-notice glass-panel">
            <ShieldCheck size={16} className="text-cyan" />
            <span>
              <strong>RBAC Policy Active:</strong> Individual ID & Password required. 
              Parts & Inventory access is restricted to <strong>Technicians</strong>, <strong>Operations Managers</strong>, and <strong>Admins</strong> only.
            </span>
          </div>
        </div>

        {/* Two Column Layout: Left Login Form, Right Quick Demo Logins */}
        <div className="login-content-grid">
          {/* Left Card: Secure Login Form */}
          <div className="login-card glass-panel">
            <div className="login-card-head">
              <div className="login-icon-badge">
                <Lock size={20} className="text-cyan" />
              </div>
              <div>
                <h2 className="login-card-title">Sign In to Your Workspace</h2>
                <p className="login-card-desc">Enter your assigned ID & Password</p>
              </div>
            </div>

            {errorMessage && (
              <div className="login-error-alert">
                <ShieldAlert size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="user-id-input">
                  User ID / Username:
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="user-id-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g. cust_anthony, tech_alex, ops_manager, admin"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password-input">
                  Password:
                </label>
                <div className="input-with-icon">
                  <KeyRound size={16} className="input-icon" />
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Enter password (default: password123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <span className="form-hint">
                  Demo password for all accounts is: <code className="mono text-cyan">password123</code>
                </span>
              </div>

              <button type="submit" className="btn btn-primary login-submit-btn">
                <span>Sign In & Open Workspace</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="login-rules-box">
              <div className="rules-heading">
                <Shield size={14} className="text-cyan" />
                <span>Access Permissions Matrix:</span>
              </div>
              <ul className="rules-list">
                <li>
                  <span className="rule-role">Customer:</span>
                  <span className="rule-text">Submit repair tickets ("ye sahi karwana hai") & live tracking.</span>
                </li>
                <li>
                  <span className="rule-role">Technician:</span>
                  <span className="rule-text">View & accept requests, diagnose, fix hardware + <strong>Parts & Inventory</strong>.</span>
                </li>
                <li>
                  <span className="rule-role">Operations Manager:</span>
                  <span className="rule-text">Dispatch, triage, warranty claims + <strong>Parts & Inventory</strong>.</span>
                </li>
                <li>
                  <span className="rule-role">Administrator:</span>
                  <span className="rule-text">Full system telemetry & logs + <strong>Parts & Inventory</strong>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Card: Quick 1-Click Demo Accounts */}
          <div className="quick-access-card glass-panel">
            <div className="quick-access-header">
              <div className="quick-title-group">
                <Sparkles size={18} className="text-amber" />
                <h3 className="quick-title">Quick 1-Click Role Login</h3>
              </div>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                Select any profile to test role isolation
              </span>
            </div>

            <div className="quick-accounts-list">
              {roleCards.map(item => {
                const Icon = item.icon;
                const u = item.user;
                return (
                  <div key={item.role} className="quick-account-item glass-panel">
                    <div className="account-top">
                      <div className="account-role-badge-row">
                        <span className={`badge ${item.badgeClass}`}>
                          <Icon size={12} />
                          {item.badge}
                        </span>
                        {item.inventoryAccess ? (
                          <span className="inventory-access-tag allowed">
                            <Box size={11} />
                            Inventory Allowed
                          </span>
                        ) : (
                          <span className="inventory-access-tag restricted">
                            <Lock size={11} />
                            No Inventory Access
                          </span>
                        )}
                      </div>
                      <span className="mono account-id">ID: {u.id}</span>
                    </div>

                    <div className="account-user-info">
                      <div className="account-avatar-wrapper">
                        <img src={u.avatar} alt={u.name} className="account-avatar-img" />
                      </div>
                      <div className="account-names">
                        <h4 className="account-name font-bold">{u.name}</h4>
                        <span className="account-desc text-muted">{item.access}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin(u)}
                      className="btn btn-secondary btn-sm quick-login-btn"
                    >
                      <span>Log In as {u.name.split(' ')[0]} ({item.badge})</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="login-footer">
          <span>RepairChain Security Architecture &copy; 2026. Strict Role Separation Enabled.</span>
        </div>
      </div>
    </div>
  );
}

