import { useState, useEffect } from 'react';
import { LogOut, ShieldCheck, CheckCircle2, Bot, ExternalLink, Sparkles, Award, Palette, Clock, Check, Edit3 } from 'lucide-react';
import { api } from '../utils/api';
import PaymentRoleModal from '../components/PaymentRoleModal';

export default function GuildSelector({ user, onLogout }) {
  const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '1548727060653023413';
  const botInviteUrl = `https://discord.com/oauth2/authorize?client_id=${discordClientId}&permissions=8&scope=bot%20applications.commands`;

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [myRoles, setMyRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('#a855f7');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMyRoles();
  }, []);

  const fetchMyRoles = async () => {
    setLoadingRoles(true);
    try {
      const data = await api.getMyPurchasedRoles();
      if (Array.isArray(data)) {
        setMyRoles(data);
      }
    } catch (err) {
      console.error('Failed to fetch user roles:', err);
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleSelectPackage = (name, price) => {
    setSelectedPlan({ name, price });
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setEditName(role.roleName);
    setEditColor(role.roleColor);
  };

  const handleSaveRoleEdit = async () => {
    if (!editingRole) return;
    setUpdating(true);
    try {
      await api.updatePurchasedRole(editingRole._id, {
        roleName: editName,
        roleColor: editColor
      });
      setEditingRole(null);
      fetchMyRoles();
    } catch (err) {
      alert('Failed to update role: ' + err.message);
    } finally {
      setUpdating(false);
    }
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
                Select a premium package below to create & get your automatic custom role for <strong>@{user.username}</strong>
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

        {/* ACTIVE CUSTOM ROLES SECTION (If user has purchases) */}
        {myRoles.length > 0 && (
          <div style={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={20} color="#15803d" />
              Your Active Custom Roles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {myRoles.map((role) => (
                <div
                  key={role._id}
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: role.roleColor,
                        boxShadow: `0 0 8px ${role.roleColor}88`
                      }} />
                      <strong style={{ fontSize: '1.05rem', color: role.roleColor }}>
                        {role.roleName}
                      </strong>
                    </div>

                    <button
                      onClick={() => handleEditRole(role)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    Server: <strong>{role.guildName}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      backgroundColor: role.status === 'ASSIGNED' ? '#dcfce7' : '#fef3c7',
                      color: role.status === 'ASSIGNED' ? '#15803d' : '#d97706'
                    }}>
                      {role.status === 'ASSIGNED' ? 'ASSIGNED IN SERVER' : 'WAITING FOR USER TO JOIN SERVER'}
                    </span>

                    <span style={{ color: '#6b7280' }}>
                      Exp: {new Date(role.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-Tier Premium Feature Packages Section */}
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
                <span>🎨 Custom Role (Auto-created)</span>
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
                <span>🎨 Custom Role (Auto-created)</span>
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
                <span>🎨 Custom Role (Auto-created)</span>
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

      {/* Payment & Role Modal */}
      {selectedPlan && (
        <PaymentRoleModal
          plan={selectedPlan}
          user={user}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => {
            fetchMyRoles();
          }}
        />
      )}

      {/* Edit Role Modal */}
      {editingRole && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: '800', color: '#111827' }}>
              Edit Custom Role
            </h3>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                Role Name:
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
                Role Colour:
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer', padding: 0 }}
                />
                <input
                  type="text"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setEditingRole(null)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={handleSaveRoleEdit}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  fontWeight: '700',
                  cursor: updating ? 'not-allowed' : 'pointer'
                }}
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

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
