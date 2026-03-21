import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, Package, Warehouse, ShoppingBag, FileText, LogOut } from 'lucide-react';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/collections', icon: FolderKanban, label: 'Collections' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/inventory', icon: Warehouse, label: 'Inventory' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/content', icon: FileText, label: 'Content' },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r border-[#8B1B4A]/10 flex flex-col shadow-sm">
        <div className="p-6 border-b border-[#8B1B4A]/10">
          <div className="flex items-center gap-3">
            <img 
              src="/vs-fashion-logo.png" 
              alt="VS Fashion" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#8B1B4A' }}>
              VS Admin
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`admin-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive(item.path, item.exact)
                  ? 'bg-[#8B1B4A] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#8B1B4A]/5 hover:text-[#8B1B4A]'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#8B1B4A]/10">
          <Button
            data-testid="admin-logout-btn"
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2 border-[#8B1B4A] text-[#8B1B4A] hover:bg-[#8B1B4A] hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
