import { useState } from 'react';
import { api } from '../utils/api';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage({ onDemoLogin, onOpenDashboard, onOpenShop, onOpenAdminLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnectDiscord = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await api.getDiscordAuthUrl();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend OAuth server. Please ensure backend is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f3ea',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 20px',
      boxSizing: 'border-box'
    }}>
      
      {/* Navbar Header */}
      <header style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2dfd2',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#3a7d34',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            fontWeight: '800',
            boxShadow: '0 4px 10px rgba(58, 125, 52, 0.25)'
          }}>
            🌴
          </div>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: '900',
            color: '#1b261a',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            കള്ള് ഷാപ്പ്
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.9rem',
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
              }}
            >
              📊 Bot Dashboard
            </button>
          )}

          {onOpenAdminLogin && (
            <button
              onClick={onOpenAdminLogin}
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.9rem',
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
              }}
            >
              🛡️ Admin Portal
            </button>
          )}

          <button 
            onClick={handleConnectDiscord}
            disabled={loading}
            style={{
              backgroundColor: '#5865F2',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.9rem',
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(88, 101, 242, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4752c4';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#5865F2';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? 'Connecting...' : 'Connect Discord'}
          </button>
        </div>
      </header>

      {/* Main Connect Section */}
      <main style={{
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
        margin: '60px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Bot Icon */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          backgroundColor: '#eaf4e8',
          border: '3px solid #3a7d34',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3.5rem',
          marginBottom: '24px',
          boxShadow: '0 12px 30px rgba(58, 125, 52, 0.2)'
        }}>
          🌴
        </div>

        {/* Bot Name */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
          fontWeight: '900',
          color: '#1b261a',
          letterSpacing: '-0.03em',
          lineHeight: '1.1',
          marginBottom: '14px'
        }}>
          കള്ള് ഷാപ്പ്
        </h1>

        <p style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#3a7d34',
          marginBottom: '16px'
        }}>
          Discord Bot Web Dashboard
        </p>

        <p style={{
          fontSize: '1.05rem',
          color: '#4b5563',
          maxWidth: '580px',
          lineHeight: '1.6',
          marginBottom: '36px'
        }}>
          Connect your Discord account to unlock access to our exclusive Premium Shop, custom roles, soundboard access, XP boosts, auto reactions, and more!
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            marginBottom: '24px',
            maxWidth: '500px'
          }}>
            {error}
          </div>
        )}

        {/* Large Connect Discord CTA Button */}
        <button 
          onClick={handleConnectDiscord}
          disabled={loading}
          className="btn-discord"
          style={{
            fontSize: '1.2rem',
            padding: '18px 44px',
            borderRadius: '16px',
            marginBottom: '20px'
          }}
        >
          <svg width="26" height="26" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C-3.66,42.5-9.84,76.19,10,95.91a105.73,105.73,0,0,0,32,16.29,80.59,80.59,0,0,0,6.83-11.16A68.61,68.61,0,0,1,38.31,95a55.15,55.15,0,0,0,3.75-2.93,74.9,74.9,0,0,0,67.65,0c1.25.93,2.5,1.92,3.75,2.93a68.46,68.46,0,0,1-10.57,6A81,81,0,0,0,109.73,112.2a105.73,105.73,0,0,0,32-16.29C138,76.19,131.79,42.5,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
          </svg>
          {loading ? 'Connecting to Discord...' : 'Connect with Discord'}
        </button>

        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '8px' }}>
          🔒 Secure OAuth2 Authentication with Discord
        </p>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '16px',
        color: '#6b7280',
        fontSize: '0.85rem'
      }}>
        © {new Date().getFullYear()} <strong>കള്ള് ഷാപ്പ്</strong> Discord Bot. All rights reserved.
      </footer>

    </div>
  );
}
