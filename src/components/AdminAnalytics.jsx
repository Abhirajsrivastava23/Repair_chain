import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import {
  BarChart3,
  Shield,
  Activity,
  Award,
  Smartphone,
  Laptop,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  Database,
  FileText,
  UserCheck
} from 'lucide-react';

export default function AdminAnalytics() {
  const {
    repairs,
    technicians,
    warranties,
    auditLogs
  } = useRepair();

  const [auditQuery, setAuditQuery] = useState('');
  const [deviceQuery, setDeviceQuery] = useState('');

  // Calculations
  const totalRepairs = repairs.length;
  const completedRepairs = repairs.filter(r => r.stage === 'Completed').length;
  const inProgressRepairs = totalRepairs - completedRepairs;

  const totalRevenue = repairs.reduce((acc, r) => acc + (r.billing.totalDue || 0), 0);
  const totalWarrantySavings = repairs.reduce((acc, r) => acc + (r.billing.warrantyDiscount || 0), 0);

  // Category counts
  const categoryCounts = repairs.reduce((acc, r) => {
    const cat = r.device.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // Audit filter
  const filteredAudit = auditLogs.filter(log =>
    log.actor.toLowerCase().includes(auditQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(auditQuery.toLowerCase()) ||
    log.ticketId.toLowerCase().includes(auditQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(auditQuery.toLowerCase())
  );

  // Device registry filter
  const filteredDevices = warranties.filter(d =>
    d.serialNumber.toLowerCase().includes(deviceQuery.toLowerCase()) ||
    d.model.toLowerCase().includes(deviceQuery.toLowerCase()) ||
    d.customerName.toLowerCase().includes(deviceQuery.toLowerCase())
  );

  return (
    <div className="admin-analytics-root">
      {/* Top Header */}
      <div className="admin-header glass-panel">
        <div className="header-titles">
          <div className="badge badge-emerald">
            <Shield size={14} />
            EXECUTIVE CONTROL & AUDIT
          </div>
          <h2 className="dashboard-title">Platform-Wide Repair Lifecycle Analytics</h2>
          <p className="dashboard-subtitle">
            Comprehensive business telemetry, technician benchmarks, master device warranty registry, and immutable compliance audit logs.
          </p>
        </div>

        {/* 4 KPI Metrics */}
        <div className="metrics-row">
          <div className="metric-pill">
            <span className="metric-num text-cyan mono">{totalRepairs}</span>
            <span className="metric-label">Total Jobs Managed</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-emerald mono">94.8%</span>
            <span className="metric-label">First-Time Fix Rate</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-purple mono">1.8 Days</span>
            <span className="metric-label">Avg Turnaround SLA</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-emerald mono">${totalWarrantySavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="metric-label">Customer Warranty Savings</span>
          </div>
        </div>
      </div>

      {/* 2-Column Analytics Breakdown */}
      <div className="analytics-grid-2">
        {/* Category Breakdown Card */}
        <div className="analytics-card glass-panel">
          <div className="card-caption">
            <Smartphone size={18} />
            <h3 className="section-title">Volume by Product Category</h3>
          </div>

          <div className="category-bars-list">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalRepairs) * 100);

              return (
                <div key={cat} className="category-bar-row">
                  <div className="category-label-row">
                    <span className="cat-name">{cat}</span>
                    <span className="cat-stat mono">{count} repairs ({pct}%)</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #0284C7, #38BDF8)'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technician Productivity Leaderboard */}
        <div className="analytics-card glass-panel">
          <div className="card-caption">
            <Award size={18} />
            <h3 className="section-title">Technician Benchmark & Efficiency</h3>
          </div>

          <div className="leaderboard-list">
            {technicians.map((t, idx) => (
              <div key={t.id} className="leaderboard-item">
                <span className="rank-badge mono">#{idx + 1}</span>
                <div className="leaderboard-details">
                  <div className="leader-name font-bold">{t.name}</div>
                  <div className="leader-spec text-muted" style={{ fontSize: '0.75rem' }}>{t.specialty}</div>
                </div>
                <div className="leaderboard-metrics">
                  <span className="rating-tag mono">⭐ {t.rating}</span>
                  <span className="jobs-tag mono">{t.activeRepairs} active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master Device & Warranty Registry Table */}
      <div className="registry-card glass-panel">
        <div className="table-caption-row">
          <div className="caption-title-group">
            <Database size={18} />
            <h3 className="section-title">Master Product & Warranty Registry</h3>
          </div>
          <div className="registry-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search serial, model, or customer..."
              value={deviceQuery}
              onChange={e => setDeviceQuery(e.target.value)}
              className="form-input mono"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            />
          </div>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Serial Number (S/N)</th>
              <th>Product Model</th>
              <th>Registered Owner</th>
              <th>Coverage Plan</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map(item => (
              <tr key={item.serialNumber}>
                <td className="mono font-bold text-cyan">{item.serialNumber}</td>
                <td>
                  <div className="font-bold">{item.brand} {item.model}</div>
                  {item.imei && item.imei !== 'N/A' && (
                    <div className="mono text-muted" style={{ fontSize: '0.725rem' }}>IMEI: {item.imei}</div>
                  )}
                </td>
                <td>{item.customerName}</td>
                <td style={{ fontSize: '0.825rem' }}>{item.warrantyType}</td>
                <td className="mono">{item.expiryDate}</td>
                <td>
                  <span className={`badge ${item.coverageStatus === 'ACTIVE' ? 'badge-emerald' : 'badge-rose'}`}>
                    {item.coverageStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Security & Audit Log Stream */}
      <div className="audit-card glass-panel">
        <div className="table-caption-row">
          <div className="caption-title-group">
            <Activity size={18} />
            <h3 className="section-title">Security & Audit Event Stream</h3>
          </div>
          <div className="audit-search">
            <Search size={14} />
            <input
              type="text"
              placeholder="Filter audit events by actor, action, or ticket..."
              value={auditQuery}
              onChange={e => setAuditQuery(e.target.value)}
              className="form-input mono"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            />
          </div>
        </div>

        <div className="audit-stream-list">
          {filteredAudit.map(log => (
            <div key={log.id} className="audit-row">
              <div className="audit-time mono">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(log.timestamp).toLocaleDateString()}
              </div>
              <div className="audit-actor-group">
                <span className="font-bold">{log.actor}</span>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{log.role}</span>
              </div>
              <div className="audit-action-tag mono font-bold text-cyan">
                {log.action}
              </div>
              <div className="audit-ticket mono">
                [{log.ticketId}]
              </div>
              <div className="audit-details text-muted">
                {log.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
