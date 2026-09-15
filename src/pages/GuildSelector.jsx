import { useState } from 'react';
import { LogOut, ShieldCheck, CheckCircle2, Bot, ExternalLink, Sparkles, Award } from 'lucide-react';

export default function GuildSelector({ user, onLogout }) {
  const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '1536736392313573506';
  const botInviteUrl = `https://discord.com/oauth2/authorize?client_id=${discordClientId}&permissions=8&scope=bot%20applications.commands`;

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPackage = (planName, price) => {
    setSelectedPlan(planName);
    // Redirect to bot invite or handle purchase action
    window.open(botInviteUrl, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f4eb',
      color: '#1f2937',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 20px 60px 20px',
      fontFamily: "'Inter', sans-serif",
      boxSizing: 'border-box'
    }}>
      
      {/* Top Header Bar */}
      <header style={{
        maxWidth: '1100px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        marginBottom: '32px'
      }}>
        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user.avatar ? (
            <img 
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
              alt={user.username}
              style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #16a34a' }}
            />
          ) : (
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#15803d',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1rem'
            }}>
              {user.username ? user.username.substring(0, 2).toUpperCase() : 'DS'}
            </div>
          )}
          <div>
            <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>@{user.username}</span>
              <span style={{
                backgroundColor: '#dcfce7',
                color: '#15803d',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} /> Connected
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ID: {user.id}</div>
          </div>
        </div>

        {/* Brand Logo & Logout */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#15803d',
            fontFamily: "'Outfit', 'Noto Sans Malayalam', sans-serif"
          }}>
            കള്ള് ഷാപ്പ്
          </span>

          <button 
            onClick={onLogout} 
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#dc2626',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s ease'
            }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Success Banner */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '18px 24px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.06)',
          marginBottom: '36px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#15803d' }}>
                Discord Account Authorized!
              </div>
              <div style={{ fontSize: '0.88rem', color: '#4b5563' }}>
                Select a premium package below to activate exclusive features for <strong>@{user.username}</strong>
              </div>
            </div>
          </div>

          <a 
            href={botInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#15803d',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(21, 128, 61, 0.25)'
            }}
          >
            <Bot size={18} />
            <span>Add Bot to Server</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* 3-Tier Premium Feature Packages Section (Image 2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
          width: '100%',
          alignItems: 'stretch'
        }}>

          {/* CARD 1: Mythic Package */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            position: 'relative'
          }}>
            {/* Purple Gem Icon */}
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#f3e8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(168, 85, 247, 0.15)'
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="1.5" />
                <path d="M12 2L6 12L12 22L18 12L12 2Z" fill="#c084fc" opacity="0.7" />
              </svg>
            </div>

            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              color: '#1c4f26',
              marginBottom: '6px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Mythic Package
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '20px', minHeight: '40px' }}>
              Essential features to get started
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: '900', color: '#15803d' }}>₹29</span>
              <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>/30 Days</span>
            </div>

            {/* Features Checklist */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              textAlign: 'left',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              flex: 1
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🎨 Custom Role</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🔊 Soundboard Access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📝 Nickname Change</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📊 40% Extra XP</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>⏳ 30 Days Access</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPackage('Mythic Package', 29)}
              style={{
                width: '100%',
                backgroundColor: '#15803d',
                color: '#ffffff',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(21, 128, 61, 0.2)'
              }}
            >
              Get Mythic Package
            </button>
          </div>

          {/* CARD 2: Godlike Package (HIGHLIGHTED - MOST POPULAR) */}
          <div style={{
            backgroundColor: '#fbfbf6',
            borderRadius: '20px',
            padding: '40px 28px 36px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(74, 124, 62, 0.15)',
            border: '2px solid #5a8a47',
            position: 'relative',
            transform: 'scale(1.02)',
            zIndex: 2
          }}>
            {/* Top Pill Badge */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#4a7c3e',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: '700',
              padding: '6px 20px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(74, 124, 62, 0.3)'
            }}>
              <Award size={14} />
              <span>Most Popular</span>
            </div>

            {/* Red Ruby Gem Icon */}
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#ffe4e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.18)'
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M6 3H18L22 9L12 21L2 9L6 3Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
                <path d="M6 3L12 21L18 3M2 9H22" stroke="#fda4af" strokeWidth="1" />
              </svg>
            </div>

            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              color: '#1c4f26',
              marginBottom: '6px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Godlike Package
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '20px', minHeight: '40px' }}>
              Complete premium experience with extended access
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: '900', color: '#15803d' }}>₹99</span>
              <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>/30 Days</span>
            </div>

            {/* Features Checklist */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              textAlign: 'left',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: 1
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🎨 Custom Role</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🔊 Soundboard Access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🎧 Custom VC Access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🤖 Auto Reaction</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>💬 Auto Message</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📝 Unlimited Nickname Change</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📊 60% Extra XP</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>⏳ 30 Days Access</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPackage('Godlike Package', 99)}
              style={{
                width: '100%',
                backgroundColor: '#4a7c3e',
                color: '#ffffff',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 16px rgba(74, 124, 62, 0.35)'
              }}
            >
              Get Godlike Package
            </button>
          </div>

          {/* CARD 3: Legendary Package */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            position: 'relative'
          }}>
            {/* Green Emerald Gem Icon */}
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.18)'
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M6 2H18L22 8L12 22L2 8L6 2Z" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                <path d="M6 2L12 22L18 2" stroke="#6ee7b7" strokeWidth="1" />
              </svg>
            </div>

            <h3 style={{
              fontSize: '1.6rem',
              fontWeight: '800',
              color: '#1c4f26',
              marginBottom: '6px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Legendary Package
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '20px', minHeight: '40px' }}>
              Enhanced features with priority access
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: '900', color: '#15803d' }}>₹59</span>
              <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>/30 Days</span>
            </div>

            {/* Features Checklist */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 32px 0',
              textAlign: 'left',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: 1
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🎨 Custom Role (priority color)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🔊 Soundboard Access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🎧 Custom VC Access</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>🤖 Auto Reaction</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📝 Nickname Change</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>📊 50% Extra XP</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#374151' }}>
                <CheckCircle2 size={18} color="#4a7c3e" style={{ flexShrink: 0 }} />
                <span>⏳ 30 Days Access</span>
              </li>
            </ul>

            <button
              onClick={() => handleSelectPackage('Legendary Package', 59)}
              style={{
                width: '100%',
                backgroundColor: '#15803d',
                color: '#ffffff',
                border: 'none',
                padding: '14px 20px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(21, 128, 61, 0.2)'
              }}
            >
              Get Legendary Package
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '60px',
        color: '#6b7280',
        fontSize: '0.85rem',
        textAlign: 'center'
      }}>
        © 2026 <strong>കള്ള് ഷാപ്പ്</strong> Discord Bot. All rights reserved.
      </footer>
    </div>
  );
}

