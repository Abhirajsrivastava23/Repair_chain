import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import {
  Box,
  PlusCircle,
  AlertTriangle,
  Search,
  CheckCircle2,
  Package,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Warehouse,
  History,
  Tag
} from 'lucide-react';

export default function InventoryManager({ onOpenRestockModal, onOpenNewPartModal }) {
  const {
    inventory,
    repairs
  } = useRepair();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // KPI Calculations
  const totalSKUs = inventory.length;
  const totalUnits = inventory.reduce((acc, item) => acc + item.inStock, 0);
  const totalValuation = inventory.reduce((acc, item) => acc + (item.unitCost * item.inStock), 0);
  const lowStockItems = inventory.filter(item => item.inStock <= item.minThreshold);

  // Extract all parts used across all repairs for the ledger
  const partsLedger = repairs.flatMap(repair =>
    repair.partsUsed.map(part => ({
      ticketId: repair.trackingCode,
      device: `${repair.device.brand} ${repair.device.model}`,
      technician: repair.assignedTechName,
      partName: part.name,
      sku: part.sku,
      qty: part.qty,
      unitPrice: part.unitPrice,
      coveredByWarranty: part.coveredByWarranty,
      date: repair.updatedAt
    }))
  );

  // Categories list
  const categories = ['ALL', ...new Set(inventory.map(i => i.category))];

  // Filtered inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.compatible.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-manager-root">
      {/* Top Header & Inventory Metrics */}
      <div className="inventory-header glass-panel">
        <div className="header-titles">
          <div className="badge badge-cyan">
            <Box size={14} />
            OEM SPARE PARTS & LOGISTICS
          </div>
          <h2 className="dashboard-title">Spare Parts Inventory & Real-Time Stock Ledger</h2>
          <p className="dashboard-subtitle">
            Manage certified component stock levels, track technician auto-deductions, configure reorder thresholds, and register new SKUs.
          </p>
        </div>

        <div className="metrics-row">
          <div className="metric-pill">
            <span className="metric-num text-cyan mono">{totalSKUs}</span>
            <span className="metric-label">Active SKUs</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num mono">{totalUnits}</span>
            <span className="metric-label">Units in Stock</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num text-emerald mono">${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="metric-label">Stock Valuation</span>
          </div>
          <div className="metric-pill">
            <span className={`metric-num mono ${lowStockItems.length > 0 ? 'text-rose' : 'text-emerald'}`}>
              {lowStockItems.length}
            </span>
            <span className="metric-label">Low Stock Alerts</span>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="low-stock-banner glass-panel">
          <div className="banner-icon">
            <AlertTriangle size={22} color="#F43F5E" />
          </div>
          <div className="banner-text">
            <h4 className="banner-heading">Critical Reorder Threshold Reached:</h4>
            <div className="low-stock-tags">
              {lowStockItems.map(item => (
                <span key={item.id} className="low-stock-tag">
                  <span className="mono font-bold">{item.sku}</span>: Only {item.inStock} left (Min: {item.minThreshold})
                  <button
                    onClick={() => onOpenRestockModal(item)}
                    className="restock-quick-btn"
                  >
                    + Restock
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toolbar: Search, Category Filter & Add SKU */}
      <div className="inventory-toolbar glass-panel">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by part name, SKU, or compatible device..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input mono"
          />
        </div>

        <div className="category-scroll">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`cat-pill ${categoryFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="inventory-actions">
          <button onClick={onOpenNewPartModal} className="btn btn-primary btn-sm">
            <PlusCircle size={15} />
            Add New SKU
          </button>
        </div>
      </div>

      {/* Spare Parts Inventory Table */}
      <div className="inventory-table-container glass-panel">
        <div className="table-caption-row">
          <div className="caption-title-group">
            <Warehouse size={18} />
            <h3 className="section-title">Warehouse Master Catalog</h3>
          </div>
          <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>
            Showing {filteredInventory.length} of {inventory.length} components
          </span>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>SKU & Name</th>
              <th>Category</th>
              <th>Compatible Models</th>
              <th>Warehouse Bin</th>
              <th>Stock Status</th>
              <th>Unit Cost / Retail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => {
              const isLow = item.inStock <= item.minThreshold;
              const isOut = item.inStock === 0;

              return (
                <tr key={item.id}>
                  <td>
                    <div className="font-bold text-main">{item.name}</div>
                    <div className="mono text-cyan" style={{ fontSize: '0.775rem' }}>{item.sku}</div>
                  </td>
                  <td>
                    <span className="badge badge-purple">{item.category}</span>
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.825rem' }}>
                    {item.compatible}
                  </td>
                  <td>
                    <span className="mono bin-badge">{item.binLocation}</span>
                  </td>
                  <td>
                    <div className="stock-level-cell">
                      <div className="stock-qty-row">
                        <span className={`stock-number mono font-bold ${isOut ? 'text-rose' : isLow ? 'text-amber' : 'text-emerald'}`}>
                          {item.inStock} units
                        </span>
                        {isLow && <span className="reorder-badge">Reorder</span>}
                      </div>
                      <div className="stock-progress-track">
                        <div
                          className="stock-progress-fill"
                          style={{
                            width: `${Math.min(100, (item.inStock / (item.minThreshold * 3)) * 100)}%`,
                            background: isOut ? '#F43F5E' : isLow ? '#F59E0B' : '#10B981'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="mono">
                    <div>Cost: <span className="text-muted">${item.unitCost.toFixed(2)}</span></div>
                    <div className="font-bold">Retail: <span className="text-emerald">${item.retailPrice.toFixed(2)}</span></div>
                  </td>
                  <td>
                    <button
                      onClick={() => onOpenRestockModal(item)}
                      className="btn btn-secondary btn-sm"
                      title="Replenish stock"
                    >
                      + Restock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Parts Consumption Ledger Section */}
      <div className="parts-ledger-container glass-panel">
        <div className="table-caption-row">
          <div className="caption-title-group">
            <History size={18} />
            <h3 className="section-title">Live Parts Usage & Deductions Ledger</h3>
          </div>
          <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>
            Audited history of components installed in customer repairs
          </span>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Installed Part</th>
              <th>Device</th>
              <th>Technician</th>
              <th>Qty Billed</th>
              <th>Total Value</th>
              <th>Warranty Coverage</th>
            </tr>
          </thead>
          <tbody>
            {partsLedger.map((row, idx) => (
              <tr key={idx}>
                <td className="mono font-bold text-cyan">{row.ticketId}</td>
                <td>
                  <div className="font-bold">{row.partName}</div>
                  <div className="mono text-muted" style={{ fontSize: '0.75rem' }}>{row.sku}</div>
                </td>
                <td style={{ fontSize: '0.825rem' }}>{row.device}</td>
                <td>{row.technician}</td>
                <td className="mono font-bold">x{row.qty}</td>
                <td className="mono font-bold">${(row.unitPrice * row.qty).toFixed(2)}</td>
                <td>
                  <span className={`badge ${row.coveredByWarranty ? 'badge-emerald' : 'badge-amber'}`}>
                    {row.coveredByWarranty ? 'OEM Warranty' : 'Customer Billed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
