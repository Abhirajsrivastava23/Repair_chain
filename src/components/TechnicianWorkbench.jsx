import React, { useState } from 'react';
import { useRepair, STAGES, STAGE_CONFIG } from '../context/RepairContext';
import {
  Wrench,
  Cpu,
  CheckCircle2,
  Clock,
  Box,
  Plus,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  ClipboardList,
  Save,
  Trash2,
  UserCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Inbox,
  User,
  Zap,
  Layers
} from 'lucide-react';

export default function TechnicianWorkbench() {
  const {
    currentUser,
    repairs,
    technicians,
    inventory,
    activeTechId,
    setActiveTechId,
    acceptRepairRequest,
    consumePart,
    updateDiagnosis,
    toggleQACheck,
    advanceStage
  } = useRepair();

  // Active technician object
  const currentTech = technicians.find(t => t.id === activeTechId) || technicians[0];

  // Open customer requests waiting for technician acceptance ("User ko ye sahi karwana hai")
  const openRequests = repairs.filter(r => !r.assignedTechId || r.stage === 'Submitted');

  // Repairs claimed / assigned to this technician
  const myRepairs = repairs.filter(r => r.assignedTechId === activeTechId);

  // Sidebar tab: 'my_jobs' | 'incoming_requests'
  const [sidebarTab, setSidebarTab] = useState(() => {
    return openRequests.length > 0 && myRepairs.length === 0 ? 'incoming_requests' : 'incoming_requests';
  });

  // Selected repair to work on or review
  const [selectedRepairId, setSelectedRepairId] = useState(() => {
    return openRequests[0]?.id || myRepairs[0]?.id || repairs[0]?.id;
  });

  const selectedRepair = repairs.find(r => r.id === selectedRepairId) || openRequests[0] || myRepairs[0] || repairs[0];

  // Diagnosis local form
  const [findings, setFindings] = useState('');
  const [laborHours, setLaborHours] = useState('1.5');
  const [laborRate, setLaborRate] = useState('45.0');
  const [techNotes, setTechNotes] = useState('');

  // Parts consumption form
  const [selectedPartId, setSelectedPartId] = useState(inventory[0]?.id || '');
  const [partQty, setPartQty] = useState(1);

  // Sync findings when selected repair changes
  React.useEffect(() => {
    if (selectedRepair?.diagnosis) {
      setFindings(selectedRepair.diagnosis.findings || '');
      setLaborHours(selectedRepair.diagnosis.estimatedLaborHours?.toString() || '1.5');
      setLaborRate(selectedRepair.diagnosis.laborRate?.toString() || '45.0');
      setTechNotes(selectedRepair.diagnosis.notes || '');
    } else {
      setFindings('');
      setLaborHours('1.5');
      setLaborRate('45.0');
      setTechNotes('');
    }
  }, [selectedRepairId]);

  const handleSaveDiagnosis = (e) => {
    e.preventDefault();
    if (!selectedRepair) return;

    updateDiagnosis(selectedRepair.id, {
      findings,
      laborHours: parseFloat(laborHours) || 1.5,
      laborRate: parseFloat(laborRate) || 45.0,
      notes: techNotes
    });
  };

  const handleAddPart = (e) => {
    e.preventDefault();
    if (!selectedRepair || !selectedPartId) return;
    consumePart(selectedRepair.id, selectedPartId, parseInt(partQty, 10) || 1);
  };

  const handleAcceptRequest = (repairId) => {
    acceptRepairRequest(repairId, currentTech.id, currentTech.name);
    setSelectedRepairId(repairId);
    setSidebarTab('my_jobs');
  };

  const isRequestUnassigned = selectedRepair && (!selectedRepair.assignedTechId || selectedRepair.stage === 'Submitted');

  return (
    <div className="tech-workbench-root">
      {/* Top Technician Profile Bar */}
      <div className="tech-selector-bar glass-panel">
        <div className="selector-title-group">
          <Wrench size={18} color="var(--accent-cyan)" />
          <span className="selector-label">Technician Station:</span>
          {currentUser?.role === 'technician' && (
            <span className="badge badge-purple" style={{ marginLeft: '4px' }}>
              Logged In: {currentUser.name} (ID: {currentUser.id})
            </span>
          )}
        </div>

        {/* Profiles switcher for testing different technicians */}
        <div className="tech-profile-tabs">
          {technicians.map(t => {
            const isSelected = t.id === activeTechId;
            const techTicketCount = repairs.filter(r => r.assignedTechId === t.id && r.stage !== 'Completed').length;

            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTechId(t.id);
                  const firstOfTech = repairs.find(r => r.assignedTechId === t.id);
                  if (firstOfTech) setSelectedRepairId(firstOfTech.id);
                }}
                className={`tech-tab-btn ${isSelected ? 'active' : ''}`}
                title={`Switch active technician profile to ${t.name}`}
              >
                <div className="tech-dot" style={{ background: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)' }}></div>
                <div className="tech-tab-info">
                  <span className="tech-tab-name">{t.name}</span>
                  <span className="tech-tab-spec">{t.specialty.split('&')[0]}</span>
                </div>
                <span className="tech-tab-count mono">{techTicketCount} active</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workbench Grid: Left Sidebar Queue, Right Workbench Work Area */}
      <div className="workbench-layout">
        {/* Left Column: Ticket Queues */}
        <div className="workbench-sidebar glass-panel">
          {/* Queue Filter Tabs: Open Customer Requests vs My Active Jobs */}
          <div className="tech-sidebar-tabs">
            <button
              onClick={() => setSidebarTab('incoming_requests')}
              className={`tech-subtab-btn ${sidebarTab === 'incoming_requests' ? 'active' : ''}`}
            >
              <Inbox size={14} />
              <span>Customer Requests</span>
              {openRequests.length > 0 && (
                <span className="badge-pulse-alert">{openRequests.length} New</span>
              )}
            </button>

            <button
              onClick={() => setSidebarTab('my_jobs')}
              className={`tech-subtab-btn ${sidebarTab === 'my_jobs' ? 'active' : ''}`}
            >
              <Wrench size={14} />
              <span>My Workbench</span>
              <span className="subtab-count mono">{myRepairs.length}</span>
            </button>
          </div>

          <div className="sidebar-header" style={{ paddingTop: '10px' }}>
            <h3 className="sidebar-title">
              {sidebarTab === 'incoming_requests' ? (
                <>Waiting for Acceptance ({openRequests.length})</>
              ) : (
                <>Assigned to {currentTech.name} ({myRepairs.length})</>
              )}
            </h3>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              {sidebarTab === 'incoming_requests'
                ? 'User requests ready for triage & acceptance'
                : 'Active hardware jobs in repair pipeline'}
            </span>
          </div>

          <div className="ticket-queue-list">
            {/* View 1: Incoming Customer Requests awaiting acceptance */}
            {sidebarTab === 'incoming_requests' && (
              <>
                {openRequests.map(repair => {
                  const isSelected = repair.id === selectedRepair?.id;
                  return (
                    <div
                      key={repair.id}
                      onClick={() => setSelectedRepairId(repair.id)}
                      className={`ticket-queue-card incoming-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="ticket-top">
                        <span className="mono font-bold text-cyan">{repair.trackingCode}</span>
                        <span className={`badge ${repair.urgency === 'CRITICAL' ? 'badge-rose' : repair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                          {repair.urgency}
                        </span>
                      </div>

                      <h4 className="ticket-model font-bold">
                        {repair.device.brand} {repair.device.model}
                      </h4>

                      <div className="incoming-request-snippet">
                        <span className="snippet-label">Issue:</span>
                        <p className="snippet-text">"{repair.reportedIssue}"</p>
                      </div>

                      <div className="ticket-bottom-meta">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          Customer: {repair.customer.name}
                        </span>
                        <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                          Accept &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}

                {openRequests.length === 0 && (
                  <div className="empty-tech-tickets">
                    <CheckCircle2 size={32} color="#10B981" />
                    <p>All customer requests have been accepted!</p>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                      Check "My Workbench" to continue repairs or wait for new customer tickets.
                    </span>
                  </div>
                )}
              </>
            )}

            {/* View 2: Technician's Active Jobs */}
            {sidebarTab === 'my_jobs' && (
              <>
                {myRepairs.map(repair => {
                  const isSelected = repair.id === selectedRepair?.id;
                  const stageColor = STAGE_CONFIG[repair.stage]?.color || '#3b82f6';

                  return (
                    <div
                      key={repair.id}
                      onClick={() => setSelectedRepairId(repair.id)}
                      className={`ticket-queue-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="ticket-top">
                        <span className="mono font-bold text-cyan">{repair.trackingCode}</span>
                        <span className={`badge ${repair.urgency === 'CRITICAL' ? 'badge-rose' : repair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                          {repair.urgency}
                        </span>
                      </div>

                      <h4 className="ticket-model font-bold">
                        {repair.device.brand} {repair.device.model}
                      </h4>

                      <div className="ticket-stage-pill" style={{ color: stageColor }}>
                        <span className="stage-dot" style={{ background: stageColor }}></span>
                        {repair.stage}
                      </div>

                      <div className="ticket-bottom-meta">
                        <span className="mono text-muted" style={{ fontSize: '0.75rem' }}>
                          SN: {repair.device.serialNumber ? repair.device.serialNumber.substring(0, 14) : 'N/A'}...
                        </span>
                        <ChevronRight size={14} className="text-muted" />
                      </div>
                    </div>
                  );
                })}

                {myRepairs.length === 0 && (
                  <div className="empty-tech-tickets">
                    <CheckCircle2 size={32} color="#10B981" />
                    <p>No active repairs assigned to {currentTech.name}.</p>
                    <button
                      onClick={() => setSidebarTab('incoming_requests')}
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '8px' }}
                    >
                      View Customer Requests
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Column: Workbench Work Area */}
        {selectedRepair ? (
          <div className="workbench-main glass-panel">
            {/* If the selected ticket is unassigned, show the "Customer Request Acceptance" Screen */}
            {isRequestUnassigned ? (
              <div className="request-acceptance-view">
                <div className="acceptance-banner glass-panel">
                  <div className="acceptance-banner-icon">
                    <Inbox size={28} className="text-cyan" />
                  </div>
                  <div>
                    <span className="badge badge-amber" style={{ marginBottom: '4px' }}>
                      NEW CUSTOMER REPAIR REQUEST
                    </span>
                    <h2 className="acceptance-title">User Repair Request Awaiting Acceptance</h2>
                    <p className="acceptance-desc">
                      The customer has submitted this device for repair. Review the problem description below and accept the job to begin diagnostics.
                    </p>
                  </div>
                </div>

                {/* Prominent Customer Problem Box ("User ko ye sahi karwana hai") */}
                <div className="customer-request-highlight-box">
                  <div className="highlight-header">
                    <div className="highlight-tag">
                      <AlertCircle size={16} className="text-amber" />
                      <span className="font-bold">Customer's Reported Issue ("User Ko Ye Sahi Karwana Hai"):</span>
                    </div>
                    <span className={`badge ${selectedRepair.urgency === 'CRITICAL' ? 'badge-rose' : selectedRepair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                      Urgency: {selectedRepair.urgency}
                    </span>
                  </div>

                  <blockquote className="customer-issue-quote">
                    "{selectedRepair.reportedIssue}"
                  </blockquote>

                  <div className="issue-meta-tags">
                    <span className="meta-pill">Category: <strong>{selectedRepair.issueCategory || 'General Hardware'}</strong></span>
                    <span className="meta-pill">Tracking Code: <strong className="mono text-cyan">{selectedRepair.trackingCode}</strong></span>
                    <span className="meta-pill">Submitted: {new Date(selectedRepair.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Device & Customer Details Grid */}
                <div className="device-customer-grid">
                  <div className="info-card glass-panel">
                    <h4 className="info-card-title">
                      <Smartphone size={16} className="text-cyan" />
                      Device Specifications
                    </h4>
                    <div className="info-rows">
                      <div className="info-row">
                        <span className="text-muted">Device:</span>
                        <span className="font-bold">{selectedRepair.device.brand} {selectedRepair.device.model}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Category:</span>
                        <span>{selectedRepair.device.category}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Serial Number:</span>
                        <span className="mono">{selectedRepair.device.serialNumber || 'N/A'}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Warranty Status:</span>
                        <span className={`badge ${selectedRepair.warranty?.status === 'UNDER_WARRANTY' ? 'badge-emerald' : 'badge-amber'}`}>
                          {selectedRepair.warranty?.type || 'Standard'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card glass-panel">
                    <h4 className="info-card-title">
                      <User size={16} className="text-purple" />
                      Customer Information
                    </h4>
                    <div className="info-rows">
                      <div className="info-row">
                        <span className="text-muted">Name:</span>
                        <span className="font-bold">{selectedRepair.customer.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Email:</span>
                        <span>{selectedRepair.customer.email}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Phone:</span>
                        <span>{selectedRepair.customer.phone}</span>
                      </div>
                      <div className="info-row">
                        <span className="text-muted">Address:</span>
                        <span>{selectedRepair.customer.address || 'Drop-off / Central Hub'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Big Acceptance Action CTA */}
                <div className="acceptance-cta-card glass-panel">
                  <div className="cta-left">
                    <CheckCircle2 size={24} className="text-emerald" />
                    <div>
                      <h3 className="cta-heading">Ready to take on this repair?</h3>
                      <p className="cta-sub">
                        Assign this ticket to <strong>{currentTech.name} ({currentTech.specialty})</strong> and start workbench diagnosis.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAcceptRequest(selectedRepair.id)}
                    className="btn btn-emerald btn-lg accept-ticket-btn"
                  >
                    <Wrench size={18} />
                    <span>Accept Request & Start Repair</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              /* Active Workbench View for accepted/assigned tickets ("Sahi karega") */
              <>
                {/* Workbench Top Header & Stage Transition Controls */}
                <div className="workbench-head">
                  <div className="head-left">
                    <div className="ticket-code-pill mono">
                      {selectedRepair.trackingCode}
                    </div>
                    <h2 className="workbench-device-name">
                      {selectedRepair.device.brand} {selectedRepair.device.model}
                    </h2>
                    <div className="head-tags">
                      <span className="badge badge-purple">{selectedRepair.device.category}</span>
                      <span className={`badge ${selectedRepair.warranty.status === 'UNDER_WARRANTY' ? 'badge-emerald' : 'badge-amber'}`}>
                        {selectedRepair.warranty.type}
                      </span>
                      <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>
                        S/N: {selectedRepair.device.serialNumber}
                      </span>
                      <span className="badge badge-blue">
                        Assigned Tech: {selectedRepair.assignedTechName}
                      </span>
                    </div>
                  </div>

                  {/* Stage Transition Control Bar */}
                  <div className="head-right">
                    <span className="stage-prompt-label">Current Stage:</span>
                    <div className="current-stage-display" style={{ color: STAGE_CONFIG[selectedRepair.stage]?.color }}>
                      {selectedRepair.stage}
                    </div>

                    <div className="stage-actions-menu">
                      {selectedRepair.stage === 'Under Diagnosis' && (
                        <button
                          onClick={() => advanceStage(selectedRepair.id, 'Awaiting Customer Approval')}
                          className="btn btn-primary btn-sm"
                        >
                          Complete Diagnosis & Send Quote
                        </button>
                      )}

                      {selectedRepair.stage === 'Awaiting Customer Approval' && (
                        <button
                          onClick={() => advanceStage(selectedRepair.id, 'In Repair')}
                          className="btn btn-emerald btn-sm"
                        >
                          Bypass / Begin Active Repair
                        </button>
                      )}

                      {selectedRepair.stage === 'In Repair' && (
                        <button
                          onClick={() => advanceStage(selectedRepair.id, 'Quality Testing')}
                          className="btn btn-primary btn-sm"
                        >
                          <CheckCircle2 size={14} />
                          Send to Quality Testing
                        </button>
                      )}

                      {selectedRepair.stage === 'Quality Testing' && (
                        <button
                          onClick={() => advanceStage(selectedRepair.id, 'Ready for Pickup')}
                          className="btn btn-emerald btn-sm"
                        >
                          <CheckCircle2 size={14} />
                          Pass QA & Mark Ready for Pickup
                        </button>
                      )}

                      {selectedRepair.stage === 'Ready for Pickup' && (
                        <button
                          onClick={() => advanceStage(selectedRepair.id, 'Completed')}
                          className="btn btn-emerald btn-sm"
                        >
                          Complete & Issue Service Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Fault Overview */}
                <div className="customer-fault-alert">
                  <span className="alert-badge">REPORTED SYMPTOMS ("User Ko Ye Sahi Karwana Hai"):</span>
                  <p className="fault-desc font-bold text-cyan">{selectedRepair.reportedIssue}</p>
                </div>

                {/* Workbench 2-Column Workspace */}
                <div className="workbench-grid-2">
                  {/* Left Subsection: Diagnostic Logger & Findings */}
                  <div className="workbench-subcard">
                    <div className="subcard-title">
                      <ClipboardList size={18} />
                      <span>Diagnostic Findings & Labor Hours</span>
                    </div>

                    <form onSubmit={handleSaveDiagnosis} className="diagnosis-form">
                      <div className="form-group">
                        <label className="form-label">Inspection Findings & Component Health *</label>
                        <textarea
                          required
                          rows={4}
                          value={findings}
                          onChange={e => setFindings(e.target.value)}
                          placeholder="Specify failure coordinate, oscilloscope measurements, burned traces, thermal imaging readings..."
                          className="form-textarea"
                        />
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Estimated Labor Hours</label>
                          <input
                            type="number"
                            step="0.5"
                            min="0.5"
                            value={laborHours}
                            onChange={e => setLaborHours(e.target.value)}
                            className="form-input mono"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Labor Rate ($/hr)</label>
                          <input
                            type="number"
                            step="5"
                            value={laborRate}
                            onChange={e => setLaborRate(e.target.value)}
                            className="form-input mono"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Internal Technical Procedure Notes</label>
                        <input
                          type="text"
                          value={techNotes}
                          onChange={e => setTechNotes(e.target.value)}
                          placeholder="e.g. Solder BGA ball grid, calibrate TrueTone EEPROM..."
                          className="form-input"
                        />
                      </div>

                      <button type="submit" className="btn btn-primary btn-sm">
                        <Save size={14} />
                        Save Diagnostic Report & Recalculate Estimate
                      </button>
                    </form>
                  </div>

                  {/* Right Subsection: Spare Parts Consumption & Stock Deduct */}
                  <div className="workbench-subcard">
                    <div className="subcard-title">
                      <Box size={18} />
                      <span>Spare Parts Consumption (Auto-Deduct Stock)</span>
                    </div>

                    {/* Add Part Form */}
                    <form onSubmit={handleAddPart} className="parts-consume-form">
                      <div className="parts-select-row">
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                          <label className="form-label">Select OEM Inventory Part</label>
                          <select
                            value={selectedPartId}
                            onChange={e => setSelectedPartId(e.target.value)}
                            className="form-select"
                          >
                            {inventory.map(part => (
                              <option key={part.id} value={part.id}>
                                {part.name} ({part.sku}) — Stock: {part.inStock} units · ${part.retailPrice.toFixed(2)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group" style={{ width: '80px', marginBottom: 0 }}>
                          <label className="form-label">Qty</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={partQty}
                            onChange={e => setPartQty(e.target.value)}
                            className="form-input mono"
                          />
                        </div>

                        <button type="submit" className="btn btn-emerald btn-sm add-part-btn">
                          <Plus size={14} />
                          Log Part
                        </button>
                      </div>
                    </form>

                    {/* Parts Currently Allocated to this Ticket */}
                    <div className="allocated-parts-list">
                      <span className="parts-allocated-label">Parts Billed to this Job:</span>
                      {selectedRepair.partsUsed && selectedRepair.partsUsed.length > 0 ? (
                        selectedRepair.partsUsed.map((p, idx) => (
                          <div key={idx} className="allocated-part-item">
                            <div className="part-info">
                              <span className="part-name font-bold">{p.name}</span>
                              <span className="part-sku mono text-muted">{p.sku}</span>
                            </div>
                            <div className="part-cost mono">
                              <span>x{p.qty}</span>
                              <span className="font-bold text-cyan">${(p.unitPrice * p.qty).toFixed(2)}</span>
                              {p.coveredByWarranty && (
                                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                                  Covered
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-parts-alert text-muted">
                          No spare parts deducted yet. Select an inventory item above to log part usage.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Subsection: 5-Point Quality Assurance Checklist */}
                <div className="workbench-subcard qa-subcard">
                  <div className="subcard-title">
                    <FileCheck size={18} />
                    <span>5-Point Hardware QA Inspection Checklist</span>
                    <span className="qa-counter mono">
                      {selectedRepair.qaChecklist.filter(q => q.passed).length} / {selectedRepair.qaChecklist.length} PASSED
                    </span>
                  </div>

                  <div className="qa-checklist-grid">
                    {selectedRepair.qaChecklist.map((item, index) => (
                      <label key={index} className={`qa-check-item ${item.passed ? 'passed' : ''}`}>
                        <input
                          type="checkbox"
                          checked={item.passed}
                          onChange={() => toggleQACheck(selectedRepair.id, index)}
                          className="qa-checkbox"
                        />
                        <span className="qa-check-label">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="workbench-main empty-state glass-panel">
            <Wrench size={40} color="var(--accent-cyan)" />
            <h3>Select a Repair Order from the queue to open Workbench</h3>
          </div>
        )}
      </div>
    </div>
  );
}
