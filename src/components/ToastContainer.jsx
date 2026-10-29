import React from 'react';
import { useRepair } from '../context/RepairContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useRepair();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        let Icon = Info;
        let colorClass = 'toast-info';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          colorClass = 'toast-success';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'toast-error';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClass = 'toast-warning';
        }

        return (
          <div key={toast.id} className={`toast ${colorClass}`}>
            <Icon size={18} className="toast-icon" />
            <div className="toast-content" style={{ flex: 1 }}>
              <div className="toast-title" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {toast.title}
              </div>
              {toast.message && (
                <div className="toast-message" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {toast.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-subtle)',
                cursor: 'pointer',
                padding: '2px'
              }}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
