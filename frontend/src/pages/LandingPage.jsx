import { useState } from 'react';
import { api } from '../utils/api';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await api.getDiscordAuthUrl();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError('Failed to contact the backend server. Make sure it is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        textAlign: 'center',
        maxWidth: '850px',
        width: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Background Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: -1
        }} />

        {/* Brand Hero Card */}
        <div className="glass-panel" style={{
          width: '100%',
          padding: '60px 36px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '30px',
            background: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            color: '#60a5fa',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            <ShieldCheck size={16} />
            <span>Discord Account Authorization</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.1',
            marginBottom: '20px',
            fontFamily: "'Outfit', 'Inter', sans-serif"
          }}>
            കള്ള് ഷാപ്പ്
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            marginBottom: '36px',
            lineHeight: '1.6'
          }}>
            Authorize your Discord account with <strong>കള്ള് ഷാപ്പ്</strong> bot to enable seamless server integration and account verification.
          </p>

          {error && (
            <div className="glass-panel" style={{
              padding: '12px 20px',
              borderColor: 'var(--danger)',
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              color: 'var(--danger)',
              width: '100%',
              maxWidth: '500px',
              marginBottom: '24px',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={handleLogin} 
              disabled={loading}
              className="btn-primary pulse-glow" 
              style={{
                fontSize: '1.1rem',
                height: '56px',
                padding: '0 36px',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Connecting to Discord...' : 'Connect Discord Account'}
              <ArrowRight size={20} />
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: '40px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} style={{ color: '#10b981' }} />
              <span>Instant OAuth2 Authorization</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#38bdf8' }} />
              <span>Secure Connection</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
