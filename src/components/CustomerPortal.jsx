import React, { useState } from 'react';
import { useRepair, STAGES, STAGE_CONFIG } from '../context/RepairContext';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  Wrench,
  FileText,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  ArrowRight,
  ExternalLink,
  Award,
  QrCode,
  Calendar,
  DollarSign,
  UserCheck,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export default function CustomerPortal({ onOpenCertificate }) {
  const {
    repairs,
    warranties,
    submitRepairRequest,
    handleQuoteDecision
  } = useRepair();

  const [activeTab, setActiveTab] = useState('track'); // 'track' | 'book' | 'warranty' | 'history'
  const [searchCode, setSearchCode] = useState('RC-80412');
  const [warrantyQuery, setWarrantyQuery] = useState('');
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [historyQuery, setHistoryQuery] = useState('');

  // New Repair Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    deviceCategory: 'Smartphone',
    deviceBrand: '',
    deviceModel: '',
    serialNumber: '',
    imei: '',
    deviceColor: '',
    reportedIssue: '',
    issueCategory: 'Display & Glass',
    urgency: 'NORMAL',
    passcodeProvided: false
  });

  // Find currently viewed repair
  const currentRepair = repairs.find(
    r => r.trackingCode.toLowerCase() === searchCode.trim().toLowerCase() ||
         r.id.toLowerCase() === searchCode.trim().toLowerCase() ||
         r.device.serialNumber.toLowerCase() === searchCode.trim().toLowerCase()
  ) || repairs[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.deviceModel || !formData.reportedIssue) {
      alert('Please fill in the required fields.');
      return;
    }

    const created = submitRepairRequest(formData);
    setSearchCode(created.trackingCode);
    setActiveTab('track');
    // Reset form
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      deviceCategory: 'Smartphone',
      deviceBrand: '',
      deviceModel: '',
      serialNumber: '',
      imei: '',
      deviceColor: '',
      reportedIssue: '',
      issueCategory: 'Display & Glass',
      urgency: 'NORMAL',
      passcodeProvided: false
    });
  };

  const handleWarrantySearch = (serial) => {
    const q = serial || warrantyQuery;
    if (!q) return;

    const match = warranties.find(
      w => w.serialNumber.toLowerCase() === q.trim().toLowerCase() ||
           (w.imei && w.imei === q.trim())
    );

    setWarrantyResult(match || 'NOT_FOUND');
  };

  // Filter history by phone or serial
  const historyResults = historyQuery.trim()
    ? repairs.filter(
        r => r.customer.phone.includes(historyQuery.trim()) ||
             r.customer.email.toLowerCase().includes(historyQuery.trim().toLowerCase()) ||
             r.device.serialNumber.toLowerCase().includes(historyQuery.trim().toLowerCase())
      )
    : repairs;

  return (
    <div className="customer-portal-root">
      {/* Hero Visual Section */}
      <section className="portal-hero">
        <div className="hero-banner-overlay">
          <img
            src="/repair_hero_banner.jpg"
            alt="RepairChain Diagnostic Lab"
            className="hero-bg-img"
          />
          <div className="hero-gradient-mask"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <ShieldCheck size={14} />
            <span>End-to-End Certified Repair Chain</span>
          </div>
          <h1 className="hero-title">
            Track, Manage & Verify <br />
            <span className="hero-highlight">Product Repairs in Real Time</span>
          </h1>
          <p className="hero-subtitle">
            Centralized platform connecting diagnostic testing, certified technicians, genuine OEM spare parts,
            and warranty verification.
          </p>

          {/* Quick Tracking Search Bar */}
          <div className="hero-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="hero-search-form">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. RC-80412) or Serial Number..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="hero-search-input mono"
              />
              <button type="submit" className="btn btn-primary hero-search-btn">
                Track Status
              </button>
            </form>

            {/* Quick Preset Buttons */}
            <div className="preset-chips">
              <span className="preset-label">Sample tickets:</span>
              {[
                { code: 'RC-80412', label: 'iPhone 15 (Quote Pending)' },
                { code: 'RC-80415', label: 'MacBook Pro (In Repair)' },
                { code: 'RC-80371', label: 'PS5 Pro (Ready for Pickup)' },
                { code: 'RC-80350', label: 'Galaxy S24 (Completed)' }
              ].map(p => (
                <button
                  key={p.code}
                  onClick={() => { setSearchCode(p.code); setActiveTab('track'); }}
                  className={`preset-chip ${searchCode === p.code ? 'active' : ''}`}
                >
                  <span className="mono">{p.code}</span> — {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="portal-tabs-bar">
        <button
          onClick={() => setActiveTab('track')}
          className={`portal-tab ${activeTab === 'track' ? 'active' : ''}`}
        >
          <Clock size={16} />
          <span>Live Repair Tracker</span>
          {currentRepair && <span className="tab-pill mono">{currentRepair.trackingCode}</span>}
        </button>

        <button
          onClick={() => setActiveTab('book')}
          className={`portal-tab ${activeTab === 'book' ? 'active' : ''}`}
        >
          <PlusCircle size={16} />
          <span>Submit Repair Request</span>
        </button>

        <button
          onClick={() => setActiveTab('warranty')}
          className={`portal-tab ${activeTab === 'warranty' ? 'active' : ''}`}
        >
          <ShieldCheck size={16} />
          <span>Warranty Eligibility Checker</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`portal-tab ${activeTab === 'history' ? 'active' : ''}`}
        >
          <FileText size={16} />
          <span>Repair History & Passports</span>
        </button>
      </div>

      {/* TAB CONTENT: 1. LIVE TRACKER */}
      {activeTab === 'track' && currentRepair && (
        <div className="tracker-view">
          {/* Top Status Card */}
          <div className="tracker-top-card glass-panel">
            <div className="tracker-header">
              <div className="tracker-id-group">
                <span className="tracking-label">TRACKING CODE</span>
                <h2 className="tracking-number mono">{currentRepair.trackingCode}</h2>
                <span className="device-tag">
                  {currentRepair.device.brand} {currentRepair.device.model}
                </span>
              </div>

              <div className="tracker-status-group">
                <div className="status-meta">
                  <span className="meta-label">Current Stage</span>
                  <div
                    className="stage-badge-lg"
                    style={{
                      background: `${STAGE_CONFIG[currentRepair.stage]?.color}20`,
                      color: STAGE_CONFIG[currentRepair.stage]?.color,
                      borderColor: `${STAGE_CONFIG[currentRepair.stage]?.color}50`
                    }}
                  >
                    <span
                      className="stage-dot"
                      style={{ background: STAGE_CONFIG[currentRepair.stage]?.color }}
                    ></span>
                    {currentRepair.stage}
                  </div>
                </div>

                <div className="status-meta">
                  <span className="meta-label">Estimated Ready Date</span>
                  <div className="meta-value mono">
                    {new Date(currentRepair.estimatedCompletion).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="status-meta">
                  <span className="meta-label">Urgency</span>
                  <span className={`badge ${currentRepair.urgency === 'CRITICAL' ? 'badge-rose' : currentRepair.urgency === 'HIGH' ? 'badge-amber' : 'badge-blue'}`}>
                    {currentRepair.urgency}
                  </span>
                </div>
              </div>
            </div>

            {/* 7-Stage Visual Lifecycle Progress Tracker */}
            <div className="lifecycle-timeline">
              <div className="timeline-track">
                <div
                  className="timeline-bar-fill"
                  style={{ width: `${STAGE_CONFIG[currentRepair.stage]?.progress || 15}%` }}
                ></div>
              </div>

              <div className="timeline-steps">
                {STAGES.map((stageName, index) => {
                  const stageIndex = index + 1;
                  const currentStageIndex = STAGES.indexOf(currentRepair.stage) + 1;
                  const isDone = stageIndex < currentStageIndex;
                  const isCurrent = stageIndex === currentStageIndex;

                  return (
                    <div
                      key={stageName}
                      className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    >
                      <div className={`step-node ${isCurrent ? 'pulse-active' : ''}`}>
                        {isDone ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <span className="node-number">{stageIndex}</span>
                        )}
                      </div>
                      <div className="step-label">{stageName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Action Banners based on Current Stage */}
          {currentRepair.stage === 'Awaiting Customer Approval' && (
            <div className="approval-action-card glass-panel">
              <div className="approval-header">
                <div className="approval-icon-box">
                  <AlertCircle size={28} color="#F59E0B" />
                </div>
                <div>
                  <h3 className="approval-title">Customer Cost Authorization Required</h3>
                  <p className="approval-sub">
                    Our diagnostic team has identified the root cause and prepared the repair quote.
                    Please review and approve to initiate workbench disassembly.
                  </p>
                </div>
              </div>

              <div className="quote-breakdown-grid">
                <div className="quote-item">
                  <span className="quote-item-label">OEM Parts Required</span>
                  <span className="quote-item-value mono">
                    ${currentRepair.billing.partsTotal.toFixed(2)}
                  </span>
                </div>
                <div className="quote-item">
                  <span className="quote-item-label">Certified Labor & Testing</span>
                  <span className="quote-item-value mono">
                    ${currentRepair.billing.laborTotal.toFixed(2)}
                  </span>
                </div>
                <div className="quote-item highlight-discount">
                  <span className="quote-item-label">
                    Warranty / Care+ Subsidy ({currentRepair.warranty.type})
                  </span>
                  <span className="quote-item-value mono text-emerald">
                    -${currentRepair.billing.warrantyDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="quote-item total-item">
                  <span className="quote-item-label">Customer Total Payable (Deductible)</span>
                  <span className="quote-item-value mono total-amount">
                    ${currentRepair.billing.totalDue.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="approval-actions">
                <button
                  onClick={() => handleQuoteDecision(currentRepair.id, true)}
                  className="btn btn-emerald btn-lg"
                >
                  <CheckCircle2 size={18} />
                  Authorize & Approve Repair (${currentRepair.billing.totalDue.toFixed(2)})
                </button>
                <button
                  onClick={() => handleQuoteDecision(currentRepair.id, false)}
                  className="btn btn-secondary btn-lg"
                >
                  Request Clarification / Decline
                </button>
              </div>
            </div>
          )}

          {currentRepair.stage === 'Ready for Pickup' && (
            <div className="ready-action-card glass-panel">
              <div className="ready-info">
                <div className="ready-icon-box">
                  <QrCode size={36} color="#10B981" />
                </div>
                <div>
                  <h3 className="ready-title">Device Repaired & Ready for Handover!</h3>
                  <p className="ready-sub">
                    Your {currentRepair.device.brand} {currentRepair.device.model} passed all QA tests
                    and has been UV sanitized. Present this ticket barcode at the Service Counter.
                  </p>
                  <div className="pickup-location mono">
                    Pickup Location: Downtown Service Depot #4, Bay 2 (Open 9:00 AM - 7:00 PM)
                  </div>
                </div>
              </div>
              <div className="qr-preview-box">
                <div className="qr-code-placeholder mono">
                  [QR: {currentRepair.trackingCode}]
                </div>
                <span className="qr-hint">Scan at Front Desk</span>
              </div>
            </div>
          )}

          {currentRepair.stage === 'Completed' && currentRepair.serviceCertificate && (
            <div className="completed-cert-card glass-panel">
              <div className="cert-left">
                <Award size={36} color="#059669" />
                <div>
                  <div className="badge badge-emerald">OFFICIAL REPAIR PASSPORT ISSUED</div>
                  <h3 className="cert-heading">90-Day Post-Repair Warranty Active</h3>
                  <p className="cert-meta">
                    Certificate Number: <span className="mono">{currentRepair.serviceCertificate.certificateNumber}</span> |
                    Valid until: <span className="mono">{currentRepair.serviceCertificate.repairWarrantyValidUntil}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenCertificate(currentRepair)}
                className="btn btn-primary"
              >
                <Award size={16} />
                View & Print Service Passport
              </button>
            </div>
          )}

          {/* Details 2-Column Grid */}
          <div className="tracker-grid">
            {/* Left Column: Device & Diagnostic Details */}
            <div className="tracker-col">
              {/* Device Specs Card */}
              <div className="info-card glass-panel">
                <h3 className="card-section-title">
                  <Smartphone size={18} />
                  Device Specifications & Reported Fault
                </h3>

                <div className="specs-list">
                  <div className="spec-row">
                    <span className="spec-label">Device:</span>
                    <span className="spec-val font-bold">
                      {currentRepair.device.brand} {currentRepair.device.model} ({currentRepair.device.color})
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Serial Number:</span>
                    <span className="spec-val mono">{currentRepair.device.serialNumber}</span>
                  </div>
                  {currentRepair.device.imei && currentRepair.device.imei !== 'N/A' && (
                    <div className="spec-row">
                      <span className="spec-label">IMEI:</span>
                      <span className="spec-val mono">{currentRepair.device.imei}</span>
                    </div>
                  )}
                  <div className="spec-row">
                    <span className="spec-label">Warranty Coverage:</span>
                    <span className={`badge ${currentRepair.warranty.status === 'UNDER_WARRANTY' ? 'badge-emerald' : 'badge-amber'}`}>
                      {currentRepair.warranty.type}
                    </span>
                  </div>
                </div>

                <div className="issue-box">
                  <div className="issue-label">Customer Reported Issue:</div>
                  <div className="issue-text">{currentRepair.reportedIssue}</div>
                </div>
              </div>

              {/* Diagnostic Findings Card */}
              <div className="info-card glass-panel">
                <h3 className="card-section-title">
                  <Wrench size={18} />
                  Technician Diagnostic Findings
                </h3>

                {currentRepair.diagnosis ? (
                  <div className="diagnosis-content">
                    <div className="diagnosis-inspector">
                      <span className="meta-label">Inspected By:</span>
                      <span className="spec-val">{currentRepair.diagnosis.inspector}</span>
                    </div>
                    <div className="findings-box">
                      <div className="findings-label">Inspection Findings:</div>
                      <div className="findings-text">{currentRepair.diagnosis.findings}</div>
                    </div>
                    {currentRepair.diagnosis.notes && (
                      <div className="tech-notes-box">
                        <span className="meta-label">Technical Action Plan:</span>
                        <p>{currentRepair.diagnosis.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="empty-diagnosis">
                    <Clock size={20} className="pulse-active" color="#8B5CF6" />
                    <span>Device is queued for triage and physical diagnostic bench testing.</span>
                  </div>
                )}

                {/* Parts Used / Reserved */}
                <div className="parts-used-section">
                  <h4 className="parts-title">Replacement Parts Required:</h4>
                  {currentRepair.partsUsed.length > 0 ? (
                    <div className="parts-list">
                      {currentRepair.partsUsed.map((part, idx) => (
                        <div key={idx} className="part-item-row">
                          <div className="part-meta">
                            <span className="part-name">{part.name}</span>
                            <span className="part-sku mono">{part.sku}</span>
                          </div>
                          <div className="part-price-badge">
                            <span className="part-qty">x{part.qty}</span>
                            <span className="part-price mono">${(part.unitPrice * part.qty).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-parts-text">No replacement parts required or logged yet.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Assigned Tech & Chronological Timeline */}
            <div className="tracker-col">
              {/* Assigned Technician Profile */}
              <div className="info-card glass-panel">
                <h3 className="card-section-title">
                  <UserCheck size={18} />
                  Assigned Hardware Specialist
                </h3>

                <div className="technician-badge-profile">
                  <div className="tech-avatar-circle">
                    <Wrench size={22} color="#38BDF8" />
                  </div>
                  <div className="tech-details">
                    <h4 className="tech-name">{currentRepair.assignedTechName || 'Unassigned'}</h4>
                    <p className="tech-specialty">
                      {currentRepair.assignedTechName !== 'Unassigned'
                        ? 'Lead Repair Engineer · Micro-Architecture Certified'
                        : 'Awaiting triage by Service Center Dispatcher'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Timeline */}
              <div className="info-card glass-panel">
                <h3 className="card-section-title">
                  <Clock size={18} />
                  Immutable Event History
                </h3>

                <div className="event-list">
                  {currentRepair.timeline.map((event, idx) => (
                    <div key={idx} className="event-item">
                      <div className="event-marker"></div>
                      <div className="event-body">
                        <div className="event-top">
                          <span className="event-stage badge badge-blue">{event.stage}</span>
                          <span className="event-time mono">
                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(event.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="event-actor">{event.actor}</div>
                        <div className="event-note">{event.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. BOOK REPAIR REQUEST */}
      {activeTab === 'book' && (
        <div className="booking-view glass-panel">
          <div className="booking-header">
            <h2 className="section-heading">Submit New Product Repair Request</h2>
            <p className="section-sub">
              Register your faulty device to receive a secure tracking ID, live milestone updates, and transparent repair estimates.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-section-header">
              <span className="step-circle">1</span>
              <h3>Customer Contact Information</h3>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Sterling"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marcus@example.com"
                  value={formData.customerEmail}
                  onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.customerPhone}
                  onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Return Shipping / Physical Address</label>
                <input
                  type="text"
                  placeholder="Street Address, City, State"
                  value={formData.customerAddress}
                  onChange={e => setFormData({ ...formData, customerAddress: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section-header" style={{ marginTop: '24px' }}>
              <span className="step-circle">2</span>
              <h3>Device Specifications & Identity</h3>
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Device Category</label>
                <select
                  value={formData.deviceCategory}
                  onChange={e => setFormData({ ...formData, deviceCategory: e.target.value })}
                  className="form-select"
                >
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop / Notebook</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Audio">Headphones / Audio</option>
                  <option value="Gaming Console">Gaming Console</option>
                  <option value="Drone & Robotics">Drone / Camera</option>
                  <option value="Smartwatch">Smartwatch</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Brand *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apple, Sony, Dell, Samsung"
                  value={formData.deviceBrand}
                  onChange={e => setFormData({ ...formData, deviceBrand: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model Name & Specs *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 15 Pro Max 256GB"
                  value={formData.deviceModel}
                  onChange={e => setFormData({ ...formData, deviceModel: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Serial Number (S/N) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SN-APL-882193"
                  value={formData.serialNumber}
                  onChange={e => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">IMEI (if cellular)</label>
                <input
                  type="text"
                  placeholder="15-digit IMEI number"
                  value={formData.imei}
                  onChange={e => setFormData({ ...formData, imei: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Device Color</label>
                <input
                  type="text"
                  placeholder="e.g. Space Gray, Silver, Titanium"
                  value={formData.deviceColor}
                  onChange={e => setFormData({ ...formData, deviceColor: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section-header" style={{ marginTop: '24px' }}>
              <span className="step-circle">3</span>
              <h3>Fault Description & Urgency</h3>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Issue Category</label>
                <select
                  value={formData.issueCategory}
                  onChange={e => setFormData({ ...formData, issueCategory: e.target.value })}
                  className="form-select"
                >
                  <option value="Display & Glass">Display / Broken Glass / Touch</option>
                  <option value="Batteries & Power">Battery Drain / Charging Port / Swelling</option>
                  <option value="Thermal & Cooling">Overheating / Loud Fans / Throttling</option>
                  <option value="Logic Board & Power Rail">Won't Power On / Boot Loop / Board Fault</option>
                  <option value="Liquid Damage">Liquid Spill / Corrosion</option>
                  <option value="Camera & Optics">Camera Blur / Broken Lens / Sensor</option>
                  <option value="Audio & Speakers">No Sound / Distorted Audio / Mic</option>
                  <option value="Hinges & Housing">Physical Broken Hinge / Casing Dent</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Urgency Priority</label>
                <select
                  value={formData.urgency}
                  onChange={e => setFormData({ ...formData, urgency: e.target.value })}
                  className="form-select"
                >
                  <option value="NORMAL">Normal Turnaround (3 - 5 Days)</option>
                  <option value="HIGH">Expedited Service (1 - 2 Days)</option>
                  <option value="CRITICAL">Critical Priority (Same Day / 24h)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Description of Problem *</label>
              <textarea
                required
                rows={4}
                placeholder="Explain what happened, symptoms observed, any error codes, or physical damage..."
                value={formData.reportedIssue}
                onChange={e => setFormData({ ...formData, reportedIssue: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn btn-primary btn-lg">
                <PlusCircle size={18} />
                Generate Tracking Code & Submit Repair
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: 3. WARRANTY CHECKER */}
      {activeTab === 'warranty' && (
        <div className="warranty-checker-view glass-panel">
          <div className="warranty-header">
            <h2 className="section-heading">Official Warranty & Extended Care Eligibility</h2>
            <p className="section-sub">
              Query original manufacturer warranties, AppleCare+, Samsung Care+, or previous repair warranties.
            </p>
          </div>

          <div className="warranty-search-card">
            <div className="warranty-input-wrapper">
              <input
                type="text"
                placeholder="Enter Serial Number (e.g. SN-APL-882193) or IMEI..."
                value={warrantyQuery}
                onChange={e => setWarrantyQuery(e.target.value)}
                className="form-input mono"
              />
              <button
                onClick={() => handleWarrantySearch()}
                className="btn btn-primary"
              >
                <ShieldCheck size={16} />
                Verify Coverage
              </button>
            </div>

            {/* Quick Demo Buttons */}
            <div className="warranty-demo-chips">
              <span className="preset-label">Quick check samples:</span>
              {[
                { sn: 'SN-APL-882193', label: 'iPhone 15 (Active AppleCare+)' },
                { sn: 'SN-APL-774921', label: 'MacBook Pro (Active Mfg Warranty)' },
                { sn: 'SN-SNY-993104', label: 'Sony XM5 (Expired Warranty)' },
                { sn: 'SN-SAM-554219', label: 'Galaxy S24 (Active Care+)' }
              ].map(item => (
                <button
                  key={item.sn}
                  onClick={() => {
                    setWarrantyQuery(item.sn);
                    handleWarrantySearch(item.sn);
                  }}
                  className="preset-chip"
                >
                  <span className="mono">{item.sn}</span> ({item.label})
                </button>
              ))}
            </div>
          </div>

          {/* Warranty Result Card */}
          {warrantyResult && warrantyResult !== 'NOT_FOUND' && (
            <div className="warranty-result-card glass-panel">
              <div className="result-top">
                <div className="result-status-badge">
                  {warrantyResult.coverageStatus === 'ACTIVE' ? (
                    <div className="badge badge-emerald">
                      <ShieldCheck size={16} />
                      COVERAGE ACTIVE & VALID
                    </div>
                  ) : (
                    <div className="badge badge-rose">
                      <ShieldAlert size={16} />
                      COVERAGE EXPIRED
                    </div>
                  )}
                </div>

                <div className="result-plan-name">{warrantyResult.warrantyType}</div>
              </div>

              <div className="result-grid">
                <div className="result-item">
                  <span className="meta-label">Covered Product:</span>
                  <span className="font-bold">{warrantyResult.brand} {warrantyResult.model}</span>
                </div>
                <div className="result-item">
                  <span className="meta-label">Serial Number:</span>
                  <span className="mono">{warrantyResult.serialNumber}</span>
                </div>
                <div className="result-item">
                  <span className="meta-label">Purchase Date:</span>
                  <span className="mono">{warrantyResult.purchaseDate}</span>
                </div>
                <div className="result-item">
                  <span className="meta-label">Expiration Date:</span>
                  <span className="mono">{warrantyResult.expiryDate}</span>
                </div>
                <div className="result-item">
                  <span className="meta-label">Repair Deductible:</span>
                  <span className="mono font-bold">${warrantyResult.deductible.toFixed(2)}</span>
                </div>
                <div className="result-item">
                  <span className="meta-label">Registered Owner:</span>
                  <span>{warrantyResult.customerName}</span>
                </div>
              </div>

              {warrantyResult.coveredParts && warrantyResult.coveredParts.length > 0 && (
                <div className="covered-perks-box">
                  <span className="meta-label">Included Protection Benefits:</span>
                  <div className="perks-tags">
                    {warrantyResult.coveredParts.map((perk, i) => (
                      <span key={i} className="perk-tag">
                        <CheckCircle2 size={13} color="#10B981" />
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="result-cta-row">
                <button
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      deviceBrand: warrantyResult.brand,
                      deviceModel: warrantyResult.model,
                      serialNumber: warrantyResult.serialNumber,
                      customerName: warrantyResult.customerName,
                      customerEmail: warrantyResult.customerEmail,
                      customerPhone: warrantyResult.customerPhone
                    }));
                    setActiveTab('book');
                  }}
                  className="btn btn-primary"
                >
                  <PlusCircle size={16} />
                  Book Repair with this Warranty
                </button>
              </div>
            </div>
          )}

          {warrantyResult === 'NOT_FOUND' && (
            <div className="warranty-not-found glass-panel">
              <AlertCircle size={28} color="#F59E0B" />
              <h3>Serial Number Not Found in Master Registry</h3>
              <p>
                No active factory warranty was discovered for this identifier. You may still submit a repair request,
                and our triage team will inspect purchase receipts.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 4. SERVICE HISTORY */}
      {activeTab === 'history' && (
        <div className="history-view glass-panel">
          <div className="history-header">
            <h2 className="section-heading">Previous Repair History & Service Passports</h2>
            <p className="section-sub">
              Query past lifecycle tickets, parts replaced, and download official certificates.
            </p>

            <div className="history-search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Filter by phone, email, or serial number..."
                value={historyQuery}
                onChange={e => setHistoryQuery(e.target.value)}
                className="form-input mono"
              />
            </div>
          </div>

          <div className="history-table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Customer</th>
                  <th>Device & Model</th>
                  <th>Status</th>
                  <th>Cost Total</th>
                  <th>Completion Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {historyResults.map(repair => (
                  <tr key={repair.id}>
                    <td className="mono font-bold text-cyan">{repair.trackingCode}</td>
                    <td>
                      <div>{repair.customer.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{repair.customer.phone}</div>
                    </td>
                    <td>
                      <div>{repair.device.brand} {repair.device.model}</div>
                      <div className="mono text-muted" style={{ fontSize: '0.75rem' }}>{repair.device.serialNumber}</div>
                    </td>
                    <td>
                      <span className={`badge ${repair.stage === 'Completed' ? 'badge-emerald' : 'badge-blue'}`}>
                        {repair.stage}
                      </span>
                    </td>
                    <td className="mono font-bold">
                      ${repair.billing.totalDue.toFixed(2)}
                    </td>
                    <td className="mono text-muted">
                      {new Date(repair.updatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setSearchCode(repair.trackingCode);
                            setActiveTab('track');
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          View
                        </button>
                        {repair.serviceCertificate && (
                          <button
                            onClick={() => onOpenCertificate(repair)}
                            className="btn btn-primary btn-sm"
                            title="View Official Certificate"
                          >
                            <Award size={13} />
                            Passport
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
