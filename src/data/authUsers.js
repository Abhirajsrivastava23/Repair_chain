// User Accounts & Credentials for RepairChain Platform
// Multi-Role RBAC: Customer, Technician, Operations Manager, Administrator

export const AUTH_USERS = [
  // 1. Customer Accounts
  {
    id: 'cust_anthony',
    username: 'cust_anthony',
    password: 'password123',
    name: 'Anthony Rossi',
    email: 'anthony.r@example.com',
    phone: '+1 (555) 609-8812',
    role: 'customer',
    roleLabel: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    description: 'Device Owner (iPad Air Liquid Damage Ticket RC-80385)',
    allowedViews: ['customer']
  },
  {
    id: 'cust_marcus',
    username: 'cust_marcus',
    password: 'password123',
    name: 'Marcus Sterling',
    email: 'marcus.sterling@example.com',
    phone: '+1 (555) 234-8901',
    role: 'customer',
    roleLabel: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    description: 'Device Owner (iPhone 15 Pro Max Screen Ticket RC-80412)',
    allowedViews: ['customer']
  },
  {
    id: 'customer',
    username: 'customer',
    password: 'password123',
    name: 'Rahul Sharma (Customer)',
    email: 'rahul.sharma@example.com',
    phone: '+1 (555) 998-1234',
    role: 'customer',
    roleLabel: 'Customer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'General Customer Portal Account',
    allowedViews: ['customer']
  },

  // 2. Hardware Technicians
  {
    id: 'tech_alex',
    username: 'tech_alex',
    password: 'password123',
    name: 'Alex Rivera',
    email: 'alex.rivera@repairchain.internal',
    role: 'technician',
    roleLabel: 'Hardware Technician',
    techId: 'TECH-01',
    specialty: 'Micro-soldering & Logic Boards',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Level 3 Senior Hardware Tech (Accepts & repairs board/logic tickets)',
    allowedViews: ['technician', 'inventory']
  },
  {
    id: 'tech_david',
    username: 'tech_david',
    password: 'password123',
    name: 'David Kim',
    email: 'david.kim@repairchain.internal',
    role: 'technician',
    roleLabel: 'Hardware Technician',
    techId: 'TECH-02',
    specialty: 'Display & Glass Lamination',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Display & Screen Specialist (Accepts & repairs OLED/LCD tickets)',
    allowedViews: ['technician', 'inventory']
  },
  {
    id: 'tech_elena',
    username: 'tech_elena',
    password: 'password123',
    name: 'Elena Rostova',
    email: 'elena.rostova@repairchain.internal',
    role: 'technician',
    roleLabel: 'Hardware Technician',
    techId: 'TECH-03',
    specialty: 'Battery, Thermal & Power Systems',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    description: 'Power & Thermal Specialist (Accepts battery/cooling tickets)',
    allowedViews: ['technician', 'inventory']
  },
  {
    id: 'tech',
    username: 'tech',
    password: 'password123',
    name: 'Alex Rivera (Tech)',
    email: 'alex.r@repairchain.internal',
    role: 'technician',
    roleLabel: 'Hardware Technician',
    techId: 'TECH-01',
    specialty: 'Micro-soldering & Logic Boards',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Quick Demo Technician Login',
    allowedViews: ['technician', 'inventory']
  },

  // 3. Operations Manager
  {
    id: 'ops_manager',
    username: 'ops_manager',
    password: 'password123',
    name: 'Sarah Jenkins',
    email: 'sarah.ops@repairchain.internal',
    role: 'manager',
    roleLabel: 'Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    description: 'Service Center Operations Manager (Triage, Dispatch & Warranty Approval)',
    allowedViews: ['manager', 'inventory', 'technician']
  },
  {
    id: 'manager',
    username: 'manager',
    password: 'password123',
    name: 'Operations Manager',
    email: 'manager@repairchain.internal',
    role: 'manager',
    roleLabel: 'Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    description: 'Quick Demo Operations Manager Login',
    allowedViews: ['manager', 'inventory', 'technician']
  },

  // 4. Admin & Analytics
  {
    id: 'admin',
    username: 'admin',
    password: 'password123',
    name: 'Vikram Patel',
    email: 'admin.patel@repairchain.internal',
    role: 'admin',
    roleLabel: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    description: 'Executive Administrator (Full Access, Telemetry, Audits & Parts)',
    allowedViews: ['admin', 'manager', 'technician', 'inventory']
  }
];

// Helper to authenticate user
export function authenticateUser(usernameOrId, password) {
  const cleanId = (usernameOrId || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const user = AUTH_USERS.find(
    u => (u.id.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) &&
         u.password === cleanPass
  );

  return user || null;
}

// Check if user has permission to view a specific section
export function hasViewPermission(user, viewId) {
  if (!user) return false;
  if (user.role === 'admin') return true;

  // Parts & Inventory rule: Only tech, manager, and admin can view
  if (viewId === 'inventory') {
    return user.role === 'technician' || user.role === 'manager' || user.role === 'admin';
  }

  if (viewId === 'customer') {
    return true; // Any authenticated user can preview customer perspective
  }

  if (viewId === 'technician') {
    return user.role === 'technician' || user.role === 'manager' || user.role === 'admin';
  }

  if (viewId === 'manager') {
    return user.role === 'manager' || user.role === 'admin';
  }

  if (viewId === 'admin') {
    return user.role === 'admin';
  }

  return user.allowedViews?.includes(viewId) || false;
}

