import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import {
  X,
  Wrench,
  CheckCircle2,
  Award,
  Box,
  PlusCircle,
  QrCode,
  Printer,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

// 1. Assign Technician Modal
export function AssignTechModal({ repair, onClose }) {
  const { technicians, assignTechnician } = useRepair();
  const [selectedTechId, setSelectedTechId] = useState(repair.assignedTechId || technicians[0]?.id);
  const [notes, setNotes] = useState('');

  if (!repair) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    assignTechnician(repair.id, selectedTechId, notes);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal-card glass-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <Wrench size={18} color="var(--accent-cyan)" />
            <h3>Assign Hardware Technician</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleConfirm}>
          <div className="modal-body">
            <div className="modal-ticket-summary">
              <span className="mono font-bold text-cyan">{repair.trackingCode}</span>
              <span className="font-bold">{repair.device.brand} {repair.device.model}</span>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>Issue: {repair.reportedIssue.substring(0, 70)}...</span>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Select Specialist based on Workload & Skills:</label>
              <div className="tech-selection-list">
                {technicians.map(tech => {
                  const isSelected = selectedTechId === tech.id;
                  const isNearCapacity = tech.activeRepairs >= tech.maxCapacity;

                  return (
                    <label
                      key={tech.id}
                      className={`tech-select-option ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="technician"
                        value={tech.id}
                        checked={isSelected}
                        onChange={() => setSelectedTechId(tech.id)}
                        className="radio-hidden"
                      />
                      <div className="option-info">
                        <div className="option-name font-bold">{tech.name}</div>
                        <div className="option-spec text-muted" style={{ fontSize: '0.75rem' }}>{tech.specialty}</div>
                      </div>
                      <div className="option-workload">
                        <span className={`workload-pill mono ${isNearCapacity ? 'text-rose' : 'text-cyan'}`}>
                          {tech.activeRepairs} / {tech.maxCapacity} Active
                        </span>
                        <span className="rating-pill mono" style={{ fontSize: '0.75rem' }}>⭐ {tech.rating}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Triage & Priority Instructions (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Expedited service requested. Prioritize board microscope inspection."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 2. Official Service Passport & Certificate Modal
export function ServiceCertificateModal({ repair, onClose }) {
  if (!repair) return null;

  const cert = repair.serviceCertificate || {
    certificateNumber: `CERT-RC-${new Date().getFullYear()}-${repair.id.replace('RC-', '')}`,
    issuedOn: new Date().toISOString().split('T')[0],
    repairWarrantyValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    authorizedSigner: repair.assignedTechName || 'Senior Master Technician',
    qcInspector: 'Elena Rostova (QC Director)'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal-card certificate-modal-card glass-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <Award size={20} color="#10B981" />
            <h3>Official RepairChain Service Passport</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body printable-cert-area">
          {/* Certificate Design Border & Watermark */}
          <div className="certificate-frame">
            <div className="cert-top-branding">
              <img src="/repairchain_logo.jpg" alt="Logo" className="cert-logo-img" />
              <div className="cert-brand-text">
                <h2 className="cert-brand-title">REPAIRCHAIN CERTIFICATION AUTHORITY</h2>
                <span className="cert-brand-sub">ENTERPRISE HARDWARE REPAIR PASSPORT & WARRANTY</span>
              </div>
            </div>

            <div className="cert-seal-ribbon">
              <ShieldCheck size={16} />
              <span>OFFICIALLY VERIFIED OEM HARDWARE OVERHAUL</span>
            </div>

            <div className="cert-number-banner mono">
              Certificate ID: {cert.certificateNumber}
            </div>

            <div className="cert-content-grid">
              <div className="cert-field">
                <span className="cert-label">DEVICE & MODEL:</span>
                <span className="cert-value font-bold">{repair.device.brand} {repair.device.model}</span>
              </div>
              <div className="cert-field">
                <span className="cert-label">SERIAL NUMBER:</span>
                <span className="cert-value mono">{repair.device.serialNumber}</span>
              </div>
              <div className="cert-field">
                <span className="cert-label">SERVICE COMPLETION DATE:</span>
                <span className="cert-value mono">{cert.issuedOn}</span>
              </div>
              <div className="cert-field">
                <span className="cert-label">POST-REPAIR WARRANTY UNTIL:</span>
                <span className="cert-value mono text-emerald font-bold">{cert.repairWarrantyValidUntil} (90 Days)</span>
              </div>
            </div>

            {/* Installed Components Section */}
            <div className="cert-parts-box">
              <span className="cert-subheading">VERIFIED COMPONENTS & SPARE PARTS INSTALLED:</span>
              {repair.partsUsed && repair.partsUsed.length > 0 ? (
                <div className="cert-parts-list">
                  {repair.partsUsed.map((p, i) => (
                    <div key={i} className="cert-part-row">
                      <span className="font-bold">{p.name}</span>
                      <span className="mono text-muted">SKU: {p.sku}</span>
                      <span className="badge badge-emerald">OEM Genuine</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                  Micro-soldering, board ultrasonic cleaning & mechanical readjustment (No parts replaced).
                </div>
              )}
            </div>

            {/* QA Checklist verification */}
            <div className="cert-qa-badge-row">
              <CheckCircle2 size={16} color="#10B981" />
              <span>Full 5-point hardware functional integrity and electrical safety tests passed.</span>
            </div>

            {/* Signatures & QR Code */}
            <div className="cert-footer-row">
              <div className="cert-signature-box">
                <div className="signature-line mono">{cert.authorizedSigner}</div>
                <span className="signature-title">Authorized Lead Hardware Engineer</span>
              </div>

              <div className="cert-qr-box">
                <div className="qr-fake-visual mono">[RC-{repair.trackingCode}]</div>
                <span className="qr-label">Digital Passport Token</span>
              </div>

              <div className="cert-signature-box">
                <div className="signature-line mono">{cert.qcInspector}</div>
                <span className="signature-title">Quality Assurance Director</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={16} />
            Print / Save PDF Passport
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Restock Inventory Modal
export function RestockModal({ part, onClose }) {
  const { restockPart } = useRepair();
  const [qty, setQty] = useState(10);

  if (!part) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    restockPart(part.id, qty);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal-card glass-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <Box size={18} color="var(--accent-cyan)" />
            <h3>Replenish Inventory Stock</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-ticket-summary">
              <span className="mono font-bold text-cyan">{part.sku}</span>
              <h4 className="font-bold">{part.name}</h4>
              <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                Current in stock: <span className="mono font-bold text-main">{part.inStock}</span> units · Min Threshold: <span className="mono">{part.minThreshold}</span>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Units Received from Supplier Shipment:</label>
              <input
                type="number"
                min="1"
                max="500"
                required
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="form-input mono"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-emerald">
              <PlusCircle size={16} />
              Confirm Stock In (+{qty} units)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 4. New SKU Modal
export function NewPartModal({ onClose }) {
  const { addNewPart } = useRepair();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Displays',
    compatible: '',
    inStock: 10,
    minThreshold: 4,
    unitCost: 50.0,
    retailPrice: 95.0,
    binLocation: 'A-01-1'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sku || !formData.name) return;
    addNewPart(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="custom-modal-card glass-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <PlusCircle size={18} color="var(--accent-cyan)" />
            <h3>Add New Spare Part SKU to Catalog</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Part SKU *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OLED-PIXEL9P"
                  value={formData.sku}
                  onChange={e => setFormData({ ...formData, sku: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Displays">Displays & Panels</option>
                  <option value="Batteries">Batteries & Power</option>
                  <option value="Thermal">Thermal & Fans</option>
                  <option value="Hinges & Housing">Hinges & Housing</option>
                  <option value="Cameras">Cameras & Lenses</option>
                  <option value="Connectors">Connectors & Ports</option>
                  <option value="Optical & Drives">Optical & Drives</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Part Name & Specifications *</label>
              <input
                type="text"
                required
                placeholder="e.g. Super Actua OLED Display Panel (120Hz LTPO)"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Compatible Device Models</label>
              <input
                type="text"
                placeholder="e.g. Google Pixel 9 Pro / 9 Pro XL"
                value={formData.compatible}
                onChange={e => setFormData({ ...formData, compatible: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Initial Stock</label>
                <input
                  type="number"
                  min="0"
                  value={formData.inStock}
                  onChange={e => setFormData({ ...formData, inStock: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Min Threshold</label>
                <input
                  type="number"
                  min="1"
                  value={formData.minThreshold}
                  onChange={e => setFormData({ ...formData, minThreshold: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bin Location</label>
                <input
                  type="text"
                  placeholder="e.g. B-05-2"
                  value={formData.binLocation}
                  onChange={e => setFormData({ ...formData, binLocation: e.target.value })}
                  className="form-input mono"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Unit Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={e => setFormData({ ...formData, unitCost: e.target.value })}
                  className="form-input mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Retail / Billed Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.retailPrice}
                  onChange={e => setFormData({ ...formData, retailPrice: e.target.value })}
                  className="form-input mono"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} />
              Add SKU to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
