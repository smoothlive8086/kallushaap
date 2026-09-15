import { useState, useEffect } from 'react';
import { LogOut, ShieldCheck, CheckCircle2, Bot, ExternalLink } from 'lucide-react';

export default function GuildSelector({ user, onLogout }) {
  const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '1336043136261554198';
  const botInviteUrl = `https://discord.com/oauth2/authorize?client_id=${discordClientId}&permissions=8&scope=bot%20applications.commands`;

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Centered Top Header Bar */}
      <div className="container" style={{ maxWidth: '850px', width: '100%' }}>
        <header className="glass-panel" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 28px',
          marginBottom: '36px',
          borderRadius: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {user.avatar ? (
              <img 
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
                alt={user.username}
                style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--primary)' }}
              />
            ) : (
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1rem'
              }}>
                {user.username.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ fontWeight: '700', fontSize: '1.05rem', color: '#fff' }}>{user.username}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Authorized User</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Outfit', sans-serif"
            }}>
              കള്ള് ഷാപ്പ്
            </span>

            <button onClick={onLogout} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Main Account Authorization Card */}
        <main className="glass-panel" style={{
          padding: '48px 36px',
          borderRadius: '24px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px', color: '#fff' }}>
            Account Authorized
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
            Your Discord account <strong style={{ color: '#fff' }}>@{user.username}</strong> has been authorized for <strong>കള്ള് ഷാപ്പ്</strong> bot.
          </p>

          <div className="glass-panel" style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '20px 28px',
            borderRadius: '16px',
            backgroundColor: 'rgba(7, 10, 19, 0.6)',
            marginBottom: '32px',
            textAlign: 'left',
            minWidth: '300px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
              <span style={{ color: 'var(--success)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Authorized
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>User ID:</span>
              <span style={{ color: '#fff', fontFamily: 'monospace' }}>{user.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Bot Application:</span>
              <span style={{ color: '#38bdf8', fontWeight: '700' }}>കള്ള് ഷാപ്പ്</span>
            </div>
          </div>

          <div>
            <a 
              href={botInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary pulse-glow"
              style={{
                fontSize: '1rem',
                height: '48px',
                padding: '0 28px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              <Bot size={18} />
              <span>Add കള്ള് ഷാപ്പ് to Server</span>
              <ExternalLink size={16} />
            </a>
          </div>

        </main>

      </div>
    </div>
  );
}
