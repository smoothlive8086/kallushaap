import { useState } from 'react';
import AdminSelector from './AdminSelector';
import AdminServerSettings from '../components/AdminServerSettings';
import { ArrowLeft, LogOut, Server, ShoppingBag } from 'lucide-react';

export default function Dashboard({ user, onLogout, onBack, onOpenShop }) {
  const [selectedGuild, setSelectedGuild] = useState(null);

  const handleSelectGuild = (id, name, icon, memberCount) => {
    setSelectedGuild({ id, name, icon, memberCount });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      {selectedGuild ? (
        <div>
          {/* Top navigation header when managing a specific server */}
          <header style={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setSelectedGuild(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                <ArrowLeft size={16} />
                Back to Servers
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '16px' }}>
                {selectedGuild.icon ? (
                  <img src={selectedGuild.icon} alt={selectedGuild.name} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                ) : (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#a5b4fc'
                  }}>
                    <Server size={18} />
                  </div>
                )}
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>{selectedGuild.name}</h2>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {selectedGuild.memberCount || 0} Members • Server Management
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  Premium Shop
                </button>
              )}

              {onLogout && (
                <button
                  onClick={onLogout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '600',
                    fontSize: '0.85rem'
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              )}
            </div>
          </header>

          <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            <AdminServerSettings guildId={selectedGuild.id} />
          </div>
        </div>
      ) : (
        <AdminSelector 
          user={user || { id: '999', username: 'AdminUser' }} 
          onSelectGuild={handleSelectGuild} 
          onLogout={onLogout}
          onOpenShop={onOpenShop}
          onBackToHome={onBack}
        />
      )}
    </div>
  );
}

