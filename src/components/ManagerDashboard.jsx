import React, { useState } from 'react';
import { useRepair, STAGES, STAGE_CONFIG } from '../context/RepairContext';
import {
  LayoutDashboard,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Filter,
  Kanban,
  List,
  Wrench,
  Search,
  UserPlus,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

export default function ManagerDashboard({ onOpenAssignModal }) {
  const {
    repairs,
    technicians,
    advanceStage,
    setWarrantyClaimStatus
  } = useRepair();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [filterUrgency, setFilterUrgency] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Key metrics
  const unassignedCount = repairs.filter(r => !r.assignedTechId || r.stage === 'Submitted').length;
  const inDiagnosisCount = repairs.filter(r => r.stage === 'Under Diagnosis').length;
  const inRepairCount = repairs.filter(r => r.stage === 'In Repair').length;
  const pendingApprovalCount = repairs.filter(r => r.stage === 'Awaiting Customer Approval').length;
  const completedCount = repairs.filter(r => r.stage === 'Completed').length;

  // Filtered repairs
  const filteredRepairs = repairs.filter(r => {
    const matchesSearch =
      r.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.device.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUrgency = filterUrgency === 'ALL' || r.urgency === filterUrgency;

    return matchesSearch && matchesUrgency;
  });

  // Repairs with pending warranty claims
  const warrantyClaims = repairs.filter(r => r.warranty.status === 'PENDING_VERIFICATION');

  return (
    <div className="manager-dashboard-root">
      {/* Top Header & Operational Metrics */}
      <div className="dashboard-header glass-panel">
        <div className="header-titles">
          <div className="badge badge-purple">
            <LayoutDashboard size={14} />
            SERVICE CENTER OPERATIONS CONTROL
          </div>
          <h2 className="dashboard-title">Triage, Technician Dispatch & SLA Monitor</h2>
          <p className="dashboard-subtitle">
            Centralized coordination of incoming product tickets, workload balancing, warranty authorization, and pipeline throughput.
          </p>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="metrics-row">
          <div className="metric-pill">
            <span className="metric-num text-rose mono">{unassignedCount}</span>
            <span className="metric-label">Needs Triage</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-purple mono">{inDiagnosisCount}</span>
            <span className="metric-label">Under Diagnosis</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-amber mono">{pendingApprovalCount}</span>
            <span className="metric-label">Quote Approval</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-cyan mono">{inRepairCount}</span>
            <span className="metric-label">Active Workbench</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-emerald mono">{completedCount}</span>
            <span className="metric-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Warranty Claims Review Banner (if any) */}
      {warrantyClaims.length > 0 && (
        <div className="claims-alert-card glass-panel">
          <div className="claims-header">
            <div className="claims-icon">
              <ShieldAlert size={24} color="#F59E0B" />
            </div>
            <div>
              <h3 className="claims-title">
                {warrantyClaims.length} Warranty Claim{warrantyClaims.length > 1 ? 's' : ''} Awaiting Management Review
              </h3>
              <p className="claims-sub">
                Customers submitted warranty claims requiring manufacturer defect verification and policy check.
              </p>
            </div>
          </div>

          <div className="claims-list">
            {warrantyClaims.map(claim => (
              <div key={claim.id} className="claim-item-row">
                <div className="claim-meta">
                  <span className="mono font-bold text-cyan">{claim.trackingCode}</span>
                  <span className="claim-product">{claim.device.brand} {claim.device.model}</span>
                  <span className="claim-issue text-muted">{claim.reportedIssue.substring(0, 60)}...</span>
                </div>
                <div className="claim-actions">
                  <button
                    onClick={() => setWarrantyClaimStatus(claim.id, true, 'Manager verified valid factory warranty.')}
                    className="btn btn-emerald btn-sm"
                  >
                    <CheckCircle2 size={14} />
                    Approve 100% Warranty
                  </button>
                  <button
                    onClick={() => setWarrantyClaimStatus(claim.id, false, 'Damage does not meet OEM defect criteria.')}
                    className="btn btn-danger btn-sm"
                  >
                    Reject Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technician Capacity & Workload Balance */}
      <div className="technician-overview-card glass-panel">
        <div className="card-top-row">
          <div className="card-title-group">
            <Users size={18} />
            <h3 className="section-title">Technician Specialization & Workload Balancer</h3>
          </div>
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            Real-time technician capacity & skill tags
          </span>
        </div>

        <div className="technicians-grid">
          {technicians.map(tech => {
            const utilizationPercent = Math.min(100, Math.round((tech.activeRepairs / tech.maxCapacity) * 100));
            const isNearCapacity = tech.activeRepairs >= tech.maxCapacity;

            return (
              <div key={tech.id} className="tech-workload-card">
                <div className="tech-card-header">
                  <div className="tech-avatar-circle">
                    <Wrench size={18} color="#38BDF8" />
                  </div>
                  <div className="tech-info">
                    <h4 className="tech-name">{tech.name}</h4>
                    <span className="tech-specialty-badge">{tech.specialty}</span>
                  </div>
                </div>

                <div className="workload-bar-wrapper">
                  <div className="workload-labels">
                    <span>Active Workload</span>
                    <span className="mono">{tech.activeRepairs} / {tech.maxCapacity} jobs</span>
                  </div>
                  <div className="workload-track">
                    <div
                      className="workload-fill"
                      style={{
                        width: `${utilizationPercent}%`,
                        background: isNearCapacity ? '#F43F5E' : '#38BDF8'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="tech-footer-meta">
                  <span className="rating-pill mono">⭐ {tech.rating}</span>
                  <span className="exp-pill">{tech.experience}</span>
                  <span className={`status-pill ${tech.status === 'Active' ? 'online' : 'offline'}`}>
                    {tech.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Board Controls & Filters */}
      <div className="board-toolbar glass-panel">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by ticket, device model, or customer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input mono"
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Priority:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'NORMAL'].map(urg => (
            <button
              key={urg}
              onClick={() => setFilterUrgency(urg)}
              className={`filter-btn ${filterUrgency === urg ? 'active' : ''}`}
            >
              {urg}
            </button>
          ))}
        </div>

        <div className="view-switch-group">
          <button
            onClick={() => setViewMode('kanban')}
            className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
            title="Kanban Board View"
          >
            <Kanban size={16} />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            title="Table List View"
          >
            <List size={16} />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* VIEW: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="kanban-board-container">
          {STAGES.map(stageName => {
            const stageRepairs = filteredRepairs.filter(r => r.stage === stageName);
            const stageColor = STAGE_CONFIG[stageName]?.color || '#3b82f6';

            return (
              <div key={stageName} className="kanban-column glass-panel">
                <div className="kanban-col-header" style={{ borderTop: `3px solid ${stageColor}` }}>
                  <div className="col-title-group">
                    <span className="col-title">{stageName}</span>
                    <span className="col-count mono" style={{ background: `${stageColor}25`, color: stageColor }}>
                      {stageRepairs.length}
                    </span>
                  </div>
                </div>

                <div className="kanban-cards-wrapper">
                  {stageRepairs.map(repair => (
                    <div key={repair.id} className="kanban-card">
                      <div className="card-top">
                        <span className="mono font-bold text-cyan">{repair.trackingCode}</span>
                        <span className={`badge ${repair.urgency === 'CRITICAL' ? 'badge-rose' : repair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                          {repair.urgency}
                        </span>
                      </div>

                      <h4 className="card-product-name">
                        {repair.device.brand} {repair.device.model}
                      </h4>
                      <p className="card-issue-preview text-muted">
                        {repair.reportedIssue.substring(0, 70)}...
                      </p>

                      <div className="card-tech-assignment">
                        <div className="tech-assigned-info">
                          <Wrench size={13} color="var(--accent-cyan)" />
                          <span className="tech-name-sm">
                            {repair.assignedTechName || 'Unassigned'}
                          </span>
                        </div>
                        <button
                          onClick={() => onOpenAssignModal(repair)}
                          className="btn btn-secondary btn-sm"
                          title="Assign or change technician"
                        >
                          <UserPlus size={12} />
                          Assign
                        </button>
                      </div>

                      <div className="card-footer-actions">
                        <span className="card-date mono">
                          {new Date(repair.createdAt).toLocaleDateString()}
                        </span>

                        {/* Quick Advance Button if not Completed */}
                        {stageName !== 'Completed' && (
                          <button
                            onClick={() => {
                              const currentIndex = STAGES.indexOf(stageName);
                              if (currentIndex < STAGES.length - 1) {
                                advanceStage(repair.id, STAGES[currentIndex + 1]);
                              }
                            }}
                            className="btn btn-outline btn-sm quick-advance-btn"
                            title={`Advance to ${STAGES[STAGES.indexOf(stageName) + 1]}`}
                          >
                            <span>Move Next</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageRepairs.length === 0 && (
                    <div className="empty-column-box">No tickets in this stage</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW: TABLE LIST */}
      {viewMode === 'table' && (
        <div className="table-view glass-panel">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Device</th>
                <th>Current Stage</th>
                <th>Assigned Technician</th>
                <th>Urgency</th>
                <th>Warranty Status</th>
                <th>Cost Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.map(repair => (
                <tr key={repair.id}>
                  <td className="mono font-bold text-cyan">{repair.trackingCode}</td>
                  <td>
                    <div className="font-bold">{repair.device.brand} {repair.device.model}</div>
                    <div className="mono text-muted" style={{ fontSize: '0.75rem' }}>{repair.device.serialNumber}</div>
                  </td>
                  <td>
                    <span
                      className="stage-badge-sm"
                      style={{
                        background: `${STAGE_CONFIG[repair.stage]?.color}20`,
                        color: STAGE_CONFIG[repair.stage]?.color
                      }}
                    >
                      {repair.stage}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={14} color="var(--accent-cyan)" />
                      <span>{repair.assignedTechName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${repair.urgency === 'CRITICAL' ? 'badge-rose' : repair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                      {repair.urgency}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${repair.warranty.status === 'UNDER_WARRANTY' ? 'badge-emerald' : 'badge-amber'}`}>
                      {repair.warranty.status === 'UNDER_WARRANTY' ? 'Warranty Covered' : 'Out of Warranty'}
                    </span>
                  </td>
                  <td className="mono font-bold">
                    ${repair.billing.totalDue.toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => onOpenAssignModal(repair)}
                      className="btn btn-secondary btn-sm"
                    >
                      <UserPlus size={13} />
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
