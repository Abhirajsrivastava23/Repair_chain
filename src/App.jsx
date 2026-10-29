import React, { useState } from 'react';
import { RepairProvider, useRepair } from './context/RepairContext';
import Navbar from './components/Navbar';
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
import './App.css';

function MainAppContent() {
  const { currentRole } = useRepair();

  // Modal states
  const [assignModalRepair, setAssignModalRepair] = useState(null);
  const [certModalRepair, setCertModalRepair] = useState(null);
  const [restockModalPart, setRestockModalPart] = useState(null);
  const [isNewPartModalOpen, setIsNewPartModalOpen] = useState(false);

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
          <InventoryManager
            onOpenRestockModal={(part) => setRestockModalPart(part)}
            onOpenNewPartModal={() => setIsNewPartModalOpen(true)}
          />
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
