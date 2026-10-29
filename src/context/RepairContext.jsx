import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_REPAIRS,
  INITIAL_INVENTORY,
  INITIAL_TECHNICIANS,
  INITIAL_WARRANTY_REGISTRY,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

const RepairContext = createContext();

export const STAGES = [
  'Submitted',
  'Under Diagnosis',
  'Awaiting Customer Approval',
  'In Repair',
  'Quality Testing',
  'Ready for Pickup',
  'Completed'
];

export const STAGE_CONFIG = {
  'Submitted': {
    color: '#3b82f6',
    step: 1,
    description: 'Repair ticket received & awaiting triage',
    progress: 15
  },
  'Under Diagnosis': {
    color: '#8b5cf6',
    step: 2,
    description: 'Technician examining fault & components',
    progress: 30
  },
  'Awaiting Customer Approval': {
    color: '#f59e0b',
    step: 3,
    description: 'Quote & repair plan ready for approval',
    progress: 50
  },
  'In Repair': {
    color: '#06b6d4',
    step: 4,
    description: 'Active workbench repair & part replacement',
    progress: 70
  },
  'Quality Testing': {
    color: '#ec4899',
    step: 5,
    description: 'Comprehensive 5-point hardware QA check',
    progress: 85
  },
  'Ready for Pickup': {
    color: '#10b981',
    step: 6,
    description: 'Sanitized, boxed & ready for customer delivery',
    progress: 95
  },
  'Completed': {
    color: '#059669',
    step: 7,
    description: 'Handed over with 90-day service warranty',
    progress: 100
  }
};

export function RepairProvider({ children }) {
  // Load state from localStorage or use initial seeds
  const [repairs, setRepairs] = useState(() => {
    const saved = localStorage.getItem('repairchain_repairs');
    return saved ? JSON.parse(saved) : INITIAL_REPAIRS;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('repairchain_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [technicians, setTechnicians] = useState(() => {
    const saved = localStorage.getItem('repairchain_technicians');
    return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
  });

  const [warranties, setWarranties] = useState(() => {
    const saved = localStorage.getItem('repairchain_warranties');
    return saved ? JSON.parse(saved) : INITIAL_WARRANTY_REGISTRY;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('repairchain_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [currentRole, setCurrentRole] = useState('customer'); // 'customer' | 'technician' | 'manager' | 'inventory' | 'admin'
  const [activeTechId, setActiveTechId] = useState('TECH-01');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('repairchain_theme') || 'dark';
  });

  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('repairchain_repairs', JSON.stringify(repairs));
  }, [repairs]);

  useEffect(() => {
    localStorage.setItem('repairchain_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('repairchain_technicians', JSON.stringify(technicians));
  }, [technicians]);

  useEffect(() => {
    localStorage.setItem('repairchain_warranties', JSON.stringify(warranties));
  }, [warranties]);

  useEffect(() => {
    localStorage.setItem('repairchain_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('repairchain_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const logAudit = (actor, role, action, ticketId, details) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor,
      role,
      action,
      ticketId,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Submit new repair request
  const submitRepairRequest = (formData) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `RC-${randomSuffix}`;
    const now = new Date().toISOString();

    // Check if device serial exists in warranty registry
    const registered = warranties.find(
      w => (w.serialNumber && w.serialNumber.toLowerCase() === formData.serialNumber?.trim().toLowerCase()) ||
           (w.imei && formData.imei && w.imei === formData.imei?.trim())
    );

    const isUnderWarranty = registered && registered.coverageStatus === 'ACTIVE';

    const newRepair = {
      id: trackingCode,
      trackingCode,
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
        address: formData.customerAddress || 'Not specified'
      },
      device: {
        category: formData.deviceCategory,
        brand: formData.deviceBrand,
        model: formData.deviceModel,
        serialNumber: formData.serialNumber,
        imei: formData.imei || 'N/A',
        color: formData.deviceColor || 'Standard',
        passcodeProvided: formData.passcodeProvided || false
      },
      warranty: {
        status: isUnderWarranty ? 'UNDER_WARRANTY' : (registered ? 'EXPIRED' : 'PENDING_VERIFICATION'),
        type: registered ? registered.warrantyType : 'Customer Self-Reported',
        expires: registered ? registered.expiryDate : 'Pending Triage',
        claimApproved: isUnderWarranty,
        deductible: registered ? registered.deductible : 0.0
      },
      reportedIssue: formData.reportedIssue,
      issueCategory: formData.issueCategory || 'General Hardware',
      urgency: formData.urgency || 'NORMAL',
      stage: 'Submitted',
      stageProgress: 15,
      assignedTechId: null,
      assignedTechName: 'Unassigned',
      createdAt: now,
      updatedAt: now,
      estimatedCompletion: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      diagnosis: null,
      partsUsed: [],
      billing: {
        partsTotal: 0.0,
        laborTotal: 0.0,
        warrantyDiscount: 0.0,
        totalDue: 0.0,
        approvalStatus: 'NOT_ESTIMATED'
      },
      timeline: [
        {
          stage: 'Submitted',
          timestamp: now,
          actor: formData.customerName + ' (Customer)',
          note: `Repair request filed for ${formData.deviceBrand} ${formData.deviceModel}. Tracking code: ${trackingCode}.`
        }
      ],
      qaChecklist: [
        { label: 'Core System Boot & Display Initialization', passed: false },
        { label: 'Primary Touch / Keyboard / Input Functional Test', passed: false },
        { label: 'Thermal Stability & Battery Handshake', passed: false },
        { label: 'I/O Ports & Wireless Connectivity Verification', passed: false },
        { label: 'Exterior Cosmetic Sanitization & Cleaning', passed: false }
      ]
    };

    setRepairs(prev => [newRepair, ...prev]);

    logAudit(
      formData.customerName,
      'Customer',
      'Submitted Request',
      trackingCode,
      `New repair created for ${formData.deviceBrand} ${formData.deviceModel}. Issue: ${formData.reportedIssue.substring(0, 40)}...`
    );

    addToast(
      'success',
      'Repair Request Submitted!',
      `Tracking Code: ${trackingCode}. Check your email or track in real-time.`
    );

    return newRepair;
  };

  // Assign technician to repair order
  const assignTechnician = (repairId, techId, note) => {
    const tech = technicians.find(t => t.id === techId);
    if (!tech) return;

    const now = new Date().toISOString();

    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const shouldAdvance = repair.stage === 'Submitted';
      const newStage = shouldAdvance ? 'Under Diagnosis' : repair.stage;
      const newProgress = shouldAdvance ? 30 : repair.stageProgress;

      const timelineEntry = {
        stage: newStage,
        timestamp: now,
        actor: 'Service Manager',
        note: `Assigned to ${tech.name} (${tech.specialty}). ${note ? `Notes: ${note}` : ''}`
      };

      return {
        ...repair,
        assignedTechId: tech.id,
        assignedTechName: tech.name,
        stage: newStage,
        stageProgress: newProgress,
        updatedAt: now,
        timeline: [...repair.timeline, timelineEntry]
      };
    }));

    // Update technician workload count
    setTechnicians(prev => prev.map(t => {
      if (t.id === techId) {
        return { ...t, activeRepairs: t.activeRepairs + 1 };
      }
      return t;
    }));

    logAudit(
      'Operations Manager',
      'Manager',
      'Assigned Technician',
      repairId,
      `Assigned ${tech.name} to ticket ${repairId}.`
    );

    addToast('info', 'Technician Assigned', `${tech.name} assigned to ${repairId}.`);
  };

  // Update diagnosis and create cost estimate
  const updateDiagnosis = (repairId, diagnosisData) => {
    const now = new Date().toISOString();

    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const laborRate = diagnosisData.laborRate || 45.0;
      const laborHours = diagnosisData.laborHours || 1.5;
      const laborTotal = laborRate * laborHours;

      const partsTotal = repair.partsUsed.reduce((acc, p) => acc + (p.unitPrice * p.qty), 0);
      const isWarranty = repair.warranty.status === 'UNDER_WARRANTY' && repair.warranty.claimApproved;
      
      const warrantyDiscount = isWarranty ? Math.max(0, (partsTotal + laborTotal) - (repair.warranty.deductible || 0)) : 0;
      const totalDue = Math.max(0, partsTotal + laborTotal - warrantyDiscount);

      const timelineEntry = {
        stage: 'Awaiting Customer Approval',
        timestamp: now,
        actor: repair.assignedTechName || 'Technician',
        note: `Diagnostic inspection completed. Cost estimate $${totalDue.toFixed(2)} prepared.`
      };

      return {
        ...repair,
        stage: 'Awaiting Customer Approval',
        stageProgress: 50,
        updatedAt: now,
        diagnosis: {
          inspector: repair.assignedTechName,
          findings: diagnosisData.findings,
          estimatedLaborHours: laborHours,
          laborRate: laborRate,
          notes: diagnosisData.notes
        },
        billing: {
          partsTotal,
          laborTotal,
          warrantyDiscount,
          totalDue,
          approvalStatus: totalDue === 0 ? 'APPROVED' : 'PENDING_APPROVAL'
        },
        timeline: [...repair.timeline, timelineEntry]
      };
    }));

    logAudit(
      'Technician',
      'Technician',
      'Completed Diagnosis',
      repairId,
      `Diagnostic report saved. Total estimate calculated for ${repairId}.`
    );

    addToast('success', 'Diagnosis Logged', `Estimate generated for ${repairId}.`);
  };

  // Customer approves or declines quote
  const handleQuoteDecision = (repairId, approved) => {
    const now = new Date().toISOString();

    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const newStage = approved ? 'In Repair' : 'Under Diagnosis';
      const newProgress = approved ? 70 : 30;

      const timelineEntry = {
        stage: newStage,
        timestamp: now,
        actor: `${repair.customer.name} (Customer)`,
        note: approved
          ? `Quote approved by customer. Total authorized: $${repair.billing.totalDue.toFixed(2)}.`
          : 'Customer declined repair estimate. Awaiting manager consultation.'
      };

      return {
        ...repair,
        stage: newStage,
        stageProgress: newProgress,
        updatedAt: now,
        billing: {
          ...repair.billing,
          approvalStatus: approved ? 'APPROVED' : 'DECLINED'
        },
        timeline: [...repair.timeline, timelineEntry]
      };
    }));

    logAudit(
      'Customer',
      'Customer',
      approved ? 'Approved Quote' : 'Declined Quote',
      repairId,
      `Customer ${approved ? 'approved' : 'declined'} repair quote for ${repairId}.`
    );

    addToast(
      approved ? 'success' : 'warning',
      approved ? 'Quote Approved!' : 'Quote Declined',
      approved ? `Ticket ${repairId} is now queued for workbench repair.` : `Manager notified of customer decline on ${repairId}.`
    );
  };

  // Consume spare part and auto-deduct inventory
  const consumePart = (repairId, partId, qty = 1) => {
    const part = inventory.find(p => p.id === partId);
    if (!part) {
      addToast('error', 'Error', 'Part not found in inventory.');
      return;
    }

    if (part.inStock < qty) {
      addToast('error', 'Out of Stock', `Only ${part.inStock} units of ${part.sku} remaining!`);
      return;
    }

    const now = new Date().toISOString();

    // Deduct stock in inventory
    setInventory(prev => prev.map(p => {
      if (p.id === partId) {
        return {
          ...p,
          inStock: p.inStock - qty,
          reserved: Math.max(0, p.reserved - qty)
        };
      }
      return p;
    }));

    // Add part to repair ticket and update billing
    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const isWarranty = repair.warranty.status === 'UNDER_WARRANTY' && repair.warranty.claimApproved;
      const existingPartIndex = repair.partsUsed.findIndex(p => p.partId === partId);

      let updatedParts = [...repair.partsUsed];
      if (existingPartIndex >= 0) {
        updatedParts[existingPartIndex] = {
          ...updatedParts[existingPartIndex],
          qty: updatedParts[existingPartIndex].qty + qty
        };
      } else {
        updatedParts.push({
          partId: part.id,
          sku: part.sku,
          name: part.name,
          qty,
          unitPrice: part.retailPrice,
          coveredByWarranty: isWarranty
        });
      }

      const partsTotal = updatedParts.reduce((acc, p) => acc + (p.unitPrice * p.qty), 0);
      const laborTotal = repair.billing.laborTotal || 50.0;
      const warrantyDiscount = isWarranty ? Math.max(0, (partsTotal + laborTotal) - (repair.warranty.deductible || 0)) : 0;
      const totalDue = Math.max(0, partsTotal + laborTotal - warrantyDiscount);

      return {
        ...repair,
        partsUsed: updatedParts,
        billing: {
          ...repair.billing,
          partsTotal,
          laborTotal,
          warrantyDiscount,
          totalDue
        },
        updatedAt: now
      };
    }));

    logAudit(
      'Technician',
      'Technician',
      'Consumed Spare Part',
      repairId,
      `Deducted ${qty}x ${part.sku} (${part.name}) from stock.`
    );

    addToast('success', 'Part Recorded', `Added ${part.name} to ticket ${repairId}. Stock updated.`);
  };

  // Toggle QA checklist items
  const toggleQACheck = (repairId, index) => {
    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const updatedChecklist = repair.qaChecklist.map((item, i) => {
        if (i === index) return { ...item, passed: !item.passed };
        return item;
      });

      return {
        ...repair,
        qaChecklist: updatedChecklist
      };
    }));
  };

  // Advance stage in repair lifecycle
  const advanceStage = (repairId, targetStage, customNote) => {
    const config = STAGE_CONFIG[targetStage];
    if (!config) return;

    const now = new Date().toISOString();

    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      let serviceCert = repair.serviceCertificate;

      // If completing, issue official RepairChain Service Certificate
      if (targetStage === 'Completed' && !serviceCert) {
        const certNumber = `CERT-RC-${new Date().getFullYear()}-${repair.id.replace('RC-', '')}`;
        const warrantyValidDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        serviceCert = {
          certificateNumber: certNumber,
          issuedOn: new Date().toISOString().split('T')[0],
          repairWarrantyValidUntil: warrantyValidDate,
          authorizedSigner: repair.assignedTechName || 'Senior Master Technician',
          qcInspector: 'Elena Rostova (QC Director)'
        };
      }

      const timelineEntry = {
        stage: targetStage,
        timestamp: now,
        actor: currentRole === 'manager' ? 'Service Manager' : (repair.assignedTechName || 'Technician'),
        note: customNote || config.description
      };

      return {
        ...repair,
        stage: targetStage,
        stageProgress: config.progress,
        updatedAt: now,
        serviceCertificate: serviceCert,
        timeline: [...repair.timeline, timelineEntry]
      };
    }));

    logAudit(
      currentRole === 'manager' ? 'Service Manager' : 'Technician',
      currentRole,
      'Advanced Stage',
      repairId,
      `Moved ticket ${repairId} to stage: ${targetStage}.`
    );

    addToast(
      'info',
      `Stage: ${targetStage}`,
      `Ticket ${repairId} is now ${targetStage.toLowerCase()}.`
    );
  };

  // Approve or Reject Warranty Claim (Manager action)
  const setWarrantyClaimStatus = (repairId, approved, reason) => {
    const now = new Date().toISOString();

    setRepairs(prev => prev.map(repair => {
      if (repair.id !== repairId) return repair;

      const isApproved = approved;
      const partsTotal = repair.billing.partsTotal || 0;
      const laborTotal = repair.billing.laborTotal || 0;
      const deductible = isApproved ? (repair.warranty.deductible || 0) : 0;
      const warrantyDiscount = isApproved ? Math.max(0, (partsTotal + laborTotal) - deductible) : 0;
      const totalDue = isApproved ? deductible : (partsTotal + laborTotal);

      const timelineEntry = {
        stage: repair.stage,
        timestamp: now,
        actor: 'Service Manager',
        note: `Warranty Claim ${isApproved ? 'APPROVED' : 'REJECTED'}. Rationale: ${reason || (isApproved ? 'Verified manufacturer warranty.' : 'Damage excluded by policy.')}`
      };

      return {
        ...repair,
        warranty: {
          ...repair.warranty,
          claimApproved: isApproved,
          status: isApproved ? 'UNDER_WARRANTY' : 'CLAIM_DENIED'
        },
        billing: {
          ...repair.billing,
          warrantyDiscount,
          totalDue
        },
        timeline: [...repair.timeline, timelineEntry]
      };
    }));

    logAudit(
      'Service Manager',
      'Manager',
      approved ? 'Approved Warranty' : 'Rejected Warranty',
      repairId,
      `Warranty claim for ${repairId} was ${approved ? 'approved' : 'rejected'}.`
    );

    addToast(
      approved ? 'success' : 'warning',
      `Warranty ${approved ? 'Approved' : 'Denied'}`,
      `Updated coverage status for ${repairId}.`
    );
  };

  // Restock inventory part
  const restockPart = (partId, qty) => {
    setInventory(prev => prev.map(part => {
      if (part.id === partId) {
        return { ...part, inStock: part.inStock + parseInt(qty, 10) };
      }
      return part;
    }));

    const part = inventory.find(p => p.id === partId);
    logAudit(
      'Inventory Lead',
      'Inventory',
      'Restocked Part',
      part?.sku || partId,
      `Received shipment of +${qty} units for SKU ${part?.sku}.`
    );

    addToast('success', 'Stock Replenished', `Added ${qty} units to ${part?.name}.`);
  };

  // Add new part to catalog
  const addNewPart = (partData) => {
    const newPart = {
      id: `PART-${Math.floor(100 + Math.random() * 900)}`,
      sku: partData.sku.toUpperCase(),
      name: partData.name,
      category: partData.category,
      compatible: partData.compatible,
      inStock: parseInt(partData.inStock, 10) || 0,
      reserved: 0,
      minThreshold: parseInt(partData.minThreshold, 10) || 5,
      unitCost: parseFloat(partData.unitCost) || 0,
      retailPrice: parseFloat(partData.retailPrice) || 0,
      binLocation: partData.binLocation || 'Warehouse-A'
    };

    setInventory(prev => [newPart, ...prev]);

    logAudit(
      'Inventory Lead',
      'Inventory',
      'Added New Part',
      newPart.sku,
      `Created SKU ${newPart.sku}: ${newPart.name}.`
    );

    addToast('success', 'Part Added to Catalog', `SKU: ${newPart.sku}`);
  };

  // Reset to initial mock data
  const resetDemoData = () => {
    setRepairs(INITIAL_REPAIRS);
    setInventory(INITIAL_INVENTORY);
    setTechnicians(INITIAL_TECHNICIANS);
    setWarranties(INITIAL_WARRANTY_REGISTRY);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.clear();
    addToast('info', 'Demo Data Reset', 'Platform reset to original showcase state.');
  };

  return (
    <RepairContext.Provider
      value={{
        repairs,
        inventory,
        technicians,
        warranties,
        auditLogs,
        currentRole,
        setCurrentRole,
        activeTechId,
        setActiveTechId,
        theme,
        toggleTheme,
        toasts,
        addToast,
        removeToast,
        submitRepairRequest,
        assignTechnician,
        updateDiagnosis,
        handleQuoteDecision,
        consumePart,
        toggleQACheck,
        advanceStage,
        setWarrantyClaimStatus,
        restockPart,
        addNewPart,
        resetDemoData
      }}
    >
      {children}
    </RepairContext.Provider>
  );
}

export const useRepair = () => {
  const context = useContext(RepairContext);
  if (!context) {
    throw new Error('useRepair must be used within a RepairProvider');
  }
  return context;
};
