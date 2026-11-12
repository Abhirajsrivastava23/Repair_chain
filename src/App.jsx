import React, { useState } from 'react';
import { RepairProvider, useRepair } from './context/RepairContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ToastContainer from './components/ToastContainer';
import CustomerPortal from './components/CustomerPortal';
import ManagerDashboard from './components/ManagerDashboard';
import TechnicianWorkbench from './components/TechnicianWorkbench';
import InventoryManager from './components/InventoryManager';
import AdminAnalytics from './components/AdminAnalytics';
import {
  AssignTechModal,
  ServiceCertificateModal,
  RestockModal,
  NewPartModal
} from './components/Modals';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import './App.css';

function AccessDeniedNotice({ onGoHome }) {
  const { currentUser } = useRepair();

  return (
    <div className="access-denied-container glass-panel">
      <div className="access-denied-icon">
        <ShieldAlert size={48} className="text-rose" />
      </div>
      <h2 className="access-denied-title">Access Restricted to Authorized Personnel</h2>
      <p className="access-denied-desc">
        The <strong>Parts & Inventory Warehouse Catalog</strong> is strictly confidential and restricted. 
        Only <strong>Technicians</strong>, <strong>Operations Managers</strong>, and <strong>Administrators</strong> have authorization to view or modify stock.
      </p>
      <div className="access-denied-meta">
        <span className="badge badge-rose">
          <Lock size={12} />
          Current Role: {currentUser?.roleLabel || currentUser?.role || 'Customer'} (Restricted)
        </span>
      </div>
      <button onClick={onGoHome} className="btn btn-primary" style={{ marginTop: '16px' }}>
        <ArrowLeft size={16} />
        <span>Return to Customer Portal</span>
      </button>
    </div>
  );
}

function MainAppContent() {
  const { currentUser, currentRole, setCurrentRole, hasViewPermission } = useRepair();

  // Modal states
  const [assignModalRepair, setAssignModalRepair] = useState(null);
  const [certModalRepair, setCertModalRepair] = useState(null);
  const [restockModalPart, setRestockModalPart] = useState(null);
  const [isNewPartModalOpen, setIsNewPartModalOpen] = useState(false);

  // If not authenticated, display the Login Gateway
  if (!currentUser) {
    return (
      <div className="repairchain-app">
        <LoginPage />
        <ToastContainer />
      </div>
    );
  }

  // Check inventory access policy: "parts inventry sirf tech operation manage or admin dekh skta hai or koi nhi"
  const canAccessInventory = hasViewPermission('inventory');

  return (
    <div className="repairchain-app">
      <Navbar />

      <main className="app-container">
        {currentRole === 'customer' && (
          <CustomerPortal onOpenCertificate={(repair) => setCertModalRepair(repair)} />
        )}

        {currentRole === 'manager' && (
          <ManagerDashboard onOpenAssignModal={(repair) => setAssignModalRepair(repair)} />
        )}

        {currentRole === 'technician' && (
          <TechnicianWorkbench />
        )}

        {currentRole === 'inventory' && (
          canAccessInventory ? (
            <InventoryManager
              onOpenRestockModal={(part) => setRestockModalPart(part)}
              onOpenNewPartModal={() => setIsNewPartModalOpen(true)}
            />
          ) : (
            <AccessDeniedNotice onGoHome={() => setCurrentRole('customer')} />
          )
        )}

        {currentRole === 'admin' && (
          <AdminAnalytics />
        )}
      </main>

      {/* Modals */}
      {assignModalRepair && (
        <AssignTechModal
          repair={assignModalRepair}
          onClose={() => setAssignModalRepair(null)}
        />
      )}

      {certModalRepair && (
        <ServiceCertificateModal
          repair={certModalRepair}
          onClose={() => setCertModalRepair(null)}
        />
      )}

      {restockModalPart && (
        <RestockModal
          part={restockModalPart}
          onClose={() => setRestockModalPart(null)}
        />
      )}

      {isNewPartModalOpen && (
        <NewPartModal
          onClose={() => setIsNewPartModalOpen(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <RepairProvider>
      <MainAppContent />
    </RepairProvider>
  );
}
