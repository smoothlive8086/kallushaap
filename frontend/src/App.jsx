import { useState, useEffect, useRef } from 'react';
import LandingPage from './pages/LandingPage';
import PremiumShop from './pages/PremiumShop';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import { setToken, setUser, getUser, api } from './utils/api';

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const isDemo = urlParams.get('demo') === 'true';
  const initialUser = getUser() || (isDemo ? { id: '999', username: 'DemoUser', avatar: '' } : null);

  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const viewParam = search.get('view')?.toLowerCase();

    if (path.includes('/admin/login') || viewParam === 'admin-login' || viewParam === 'login') {
      return 'admin-login';
    }
    if (path.includes('/dashboard') || path.includes('/admin') || viewParam === 'dashboard' || viewParam === 'admin' || isDemo) {
      return 'dashboard';
    }
    if (viewParam === 'shop') {
      return 'shop';
    }
    return initialUser ? 'dashboard' : 'landing';
  };

  const [user, setCurrentUser] = useState(initialUser);
  const [view, setView] = useState(getInitialView);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const isExchanging = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      if (isExchanging.current) return;
      isExchanging.current = true;

      const exchangeOAuthCode = async () => {
        setAuthLoading(true);
        setAuthError(null);
        try {
          const { token, user: discordUser } = await api.exchangeCode(code);
          
          setToken(token);
          setUser(discordUser);
          
          setCurrentUser(discordUser);
          setView('dashboard');

          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          console.error(err);
          setAuthError(err.message || 'Authentication with Discord failed. Please try again.');
          setView('landing');
        } finally {
          setAuthLoading(false);
          isExchanging.current = false;
        }
      };
      exchangeOAuthCode();
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setCurrentUser(null);
    setView('landing');
  };

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f4f3ea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        color: '#1b261a',
        fontFamily: 'Outfit, sans-serif'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          border: '5px solid rgba(58, 125, 52, 0.15)',
          borderTopColor: '#3a7d34',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <h3 style={{ fontWeight: '800', fontSize: '1.3rem' }}>Authenticating with Discord...</h3>
        <p style={{ color: '#5e6d5c' }}>Connecting account to <strong>കള്ള് ഷാപ്പ്</strong></p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: view === 'dashboard' ? '#0f172a' : '#f4f3ea' }}>
      {authError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ef4444',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600'
        }}>
          <span>{authError}</span>
          <button 
            onClick={() => setAuthError(null)} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Landing Page */}
      {view === 'landing' && (
        <LandingPage 
          onOpenDashboard={() => setView('dashboard')}
          onOpenShop={() => setView('shop')}
          onOpenAdminLogin={() => setView('admin-login')}
        />
      )}

      {/* Premium Shop */}
      {view === 'shop' && (
        <PremiumShop 
          user={user} 
          onLogout={handleLogout}
          onBackToHome={() => setView('landing')}
          onOpenDashboard={() => setView('dashboard')}
        />
      )}

      {/* Bot Dashboard */}
      {view === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onBack={() => setView('landing')}
          onOpenShop={() => setView('shop')}
        />
      )}

      {/* Admin Login */}
      {view === 'admin-login' && (
        <AdminLogin 
          onBack={() => setView('landing')}
          onLoginSuccess={(adminUser) => {
            setCurrentUser(adminUser);
            setView('dashboard');
          }}
        />
      )}
    </div>
  );
}

