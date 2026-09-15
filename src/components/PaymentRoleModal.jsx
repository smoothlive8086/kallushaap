import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Palette, 
  Sparkles, 
  QrCode, 
  CreditCard, 
  Check, 
  Bot, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';

const PRESET_COLORS = [
  '#ff0055', '#a855f7', '#3b82f6', '#06b6d4', 
  '#10b981', '#84cc16', '#eab308', '#f97316', 
  '#ef4444', '#ec4899', '#6366f1', '#14b8a6'
];

export default function PaymentRoleModal({ plan, user, onClose, onSuccess }) {
  const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '1548727060653023413';

  const [step, setStep] = useState(1); // 1: Select Server, 2: Custom Role Details, 3: Payment, 4: Complete
  const [guilds, setGuilds] = useState([]);
  const [loadingGuilds, setLoadingGuilds] = useState(true);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [customGuildId, setCustomGuildId] = useState('');
  
  // Custom Role Details
  const [roleName, setRoleName] = useState(`${plan.name.replace(' Package', '')} VIP`);
  const [roleColor, setRoleColor] = useState('#a855f7');
  
  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [purchaseResult, setPurchaseResult] = useState(null);

  useEffect(() => {
    fetchGuilds();
  }, []);

  const fetchGuilds = async () => {
    setLoadingGuilds(true);
    try {
      const data = await api.getUserGuilds();
      if (Array.isArray(data)) {
        setGuilds(data);
        if (data.length > 0) {
          setSelectedGuild(data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch user guilds:', err);
    } finally {
      setLoadingGuilds(false);
    }
  };

  const activeGuildId = selectedGuild ? selectedGuild.id : customGuildId;
  const activeGuildName = selectedGuild ? selectedGuild.name : 'Selected Server';

  const handleNextToRole = () => {
    if (!activeGuildId) {
      setErrorMessage('Please select or enter a Discord server ID.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleNextToPayment = () => {
    if (!roleName.trim()) {
      setErrorMessage('Role name cannot be empty.');
      return;
    }
    setErrorMessage('');
    setStep(3);
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    try {
      const res = await api.processRolePurchase({
        guildId: activeGuildId,
        guildName: activeGuildName,
        planName: plan.name,
        amount: plan.price,
        roleName: roleName.trim(),
        roleColor: roleColor,
        paymentMethod
      });

      setPurchaseResult(res);
      setStep(4);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '560px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'modalFadeIn 0.25s ease-out'
      }}>

        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="#fef08a" />
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>
                {plan.name} Checkout
              </div>
              <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                Custom Role • ₹{plan.price} / 30 Days
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar / Step Indicators */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          fontSize: '0.82rem',
          fontWeight: '600'
        }}>
          {[
            { id: 1, label: '1. Server' },
            { id: 2, label: '2. Custom Role' },
            { id: 3, label: '3. Payment' },
            { id: 4, label: '4. Complete' }
          ].map(s => (
            <div 
              key={s.id} 
              style={{
                flex: 1,
                padding: '12px 6px',
                textAlign: 'center',
                color: step === s.id ? '#15803d' : step > s.id ? '#16a34a' : '#9ca3af',
                borderBottom: step === s.id ? '2px solid #15803d' : 'none',
                backgroundColor: step === s.id ? '#ffffff' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              {step > s.id ? <Check size={14} color="#16a34a" /> : null}
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          
          {errorMessage && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '12px',
              color: '#dc2626',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: SELECT SERVER */}
          {step === 1 && (
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                Select Discord Server
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.88rem', color: '#6b7280' }}>
                Choose the server where you want your custom role to be created.
              </p>

              {loadingGuilds ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>
                  <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 8px auto' }} />
                  <div>Loading your servers...</div>
                </div>
              ) : guilds.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px' }}>
                  {guilds.map(g => {
                    const isSelected = selectedGuild?.id === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => { setSelectedGuild(g); setCustomGuildId(''); }}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #15803d' : '1px solid #e5e7eb',
                          backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {g.icon ? (
                            <img src={g.icon} alt={g.name} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                          ) : (
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#e5e7eb',
                              color: '#374151',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.85rem'
                            }}>
                              {g.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#111827' }}>{g.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                              {g.botInGuild ? '🟢 Bot Active' : '⚪ Bot Not Added'}
                            </div>
                          </div>
                        </div>

                        {isSelected && <CheckCircle2 size={20} color="#15803d" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px' }}>
                    Enter Server (Guild) ID:
                  </label>
                  <input
                    type="text"
                    value={customGuildId}
                    onChange={(e) => setCustomGuildId(e.target.value)}
                    placeholder="e.g. 123456789012345678"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              {/* Bot status alert if bot not in server */}
              {selectedGuild && !selectedGuild.botInGuild && (
                <div style={{
                  padding: '12px 14px',
                  backgroundColor: '#fffbe6',
                  border: '1px solid #ffe58f',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  color: '#855900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Bot is not in this server yet. You can invite it now or after payment.</span>
                  <a
                    href={`https://discord.com/oauth2/authorize?client_id=${discordClientId}&permissions=8&scope=bot%20applications.commands&guild_id=${selectedGuild.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#15803d',
                      color: '#ffffff',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Bot size={14} /> Add Bot
                  </a>
                </div>
              )}

              <button
                onClick={handleNextToRole}
                style={{
                  width: '100%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Continue to Role Customization</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: CUSTOM ROLE DETAILS */}
          {step === 2 && (
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                Customize Your Custom Role
              </h3>
              <p style={{ margin: '0 0 18px 0', fontSize: '0.88rem', color: '#6b7280' }}>
                Provide the name and color for your automatic role.
              </p>

              {/* Live Preview Badge */}
              <div style={{
                padding: '16px',
                backgroundColor: '#2f3136',
                borderRadius: '14px',
                color: '#ffffff',
                marginBottom: '20px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#96989d', marginBottom: '8px' }}>
                  Live Discord Preview
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {user.avatar ? (
                    <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {user.username.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div style={{ fontWeight: '600', fontSize: '0.95rem', color: roleColor }}>
                    {user.username}
                  </div>
                  <span style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: roleColor,
                    border: `1px solid ${roleColor}`,
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    {roleName || 'Role Name'}
                  </span>
                </div>
              </div>

              {/* Role Name Input */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  Role Name
                </label>
                <input
                  type="text"
                  maxLength={32}
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. 🔥 VIP Legend"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Role Color Picker */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                  Role Colour
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="color"
                    value={roleColor}
                    onChange={(e) => setRoleColor(e.target.value)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                  <input
                    type="text"
                    value={roleColor}
                    onChange={(e) => setRoleColor(e.target.value)}
                    placeholder="#a855f7"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem',
                      fontFamily: 'monospace',
                      fontWeight: '700'
                    }}
                  />
                </div>

                {/* Preset Colors */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                  {PRESET_COLORS.map(c => (
                    <div
                      key={c}
                      onClick={() => setRoleColor(c)}
                      style={{
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: c,
                        cursor: 'pointer',
                        border: roleColor.toLowerCase() === c.toLowerCase() ? '3px solid #111827' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: roleColor.toLowerCase() === c.toLowerCase() ? '0 0 0 2px #ffffff' : 'none',
                        transition: 'transform 0.15s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleNextToPayment}
                  style={{
                    flex: 1,
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Proceed to Payment (₹{plan.price})</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & VERIFICATION */}
          {step === 3 && (
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111827' }}>
                Complete Payment Verification
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#6b7280' }}>
                Scan the QR code or use Instant UPI / Card Verification.
              </p>

              {/* Order Summary Box */}
              <div style={{
                padding: '14px 18px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Plan:</span>
                  <strong style={{ color: '#0f172a' }}>{plan.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Target Server:</span>
                  <strong style={{ color: '#0f172a' }}>{activeGuildName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Role Name & Color:</span>
                  <span style={{ color: roleColor, fontWeight: '700' }}>{roleName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #cbd5e1', paddingTop: '8px', marginTop: '8px', fontSize: '1rem' }}>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>Total Amount:</span>
                  <strong style={{ color: '#15803d', fontSize: '1.2rem' }}>₹{plan.price}</strong>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: paymentMethod === 'upi' ? '2px solid #15803d' : '1px solid #d1d5db',
                    backgroundColor: paymentMethod === 'upi' ? '#f0fdf4' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    color: paymentMethod === 'upi' ? '#15803d' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <QrCode size={16} /> UPI QR / GPay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: paymentMethod === 'card' ? '2px solid #15803d' : '1px solid #d1d5db',
                    backgroundColor: paymentMethod === 'card' ? '#f0fdf4' : '#ffffff',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    color: paymentMethod === 'card' ? '#15803d' : '#374151',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <CreditCard size={16} /> Card / NetBanking
                </button>
              </div>

              {/* UPI QR Display Container */}
              {paymentMethod === 'upi' && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    margin: '0 auto 10px auto',
                    backgroundColor: '#000000',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    padding: '10px'
                  }}>
                    <QrCode size={90} color="#ffffff" />
                    <span style={{ fontSize: '0.65rem', marginTop: '4px', letterSpacing: '0.05em' }}>SCAN TO PAY ₹{plan.price}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    UPI ID: <strong>smoothbot@upi</strong>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  fontSize: '0.85rem',
                  color: '#475569'
                }}>
                  Instant test verification enabled. Click the button below to simulate payment authorization and issue your role.
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  disabled={isProcessing}
                  onClick={() => setStep(2)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '10px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Back
                </button>

                <button
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  style={{
                    flex: 1,
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(21, 128, 61, 0.3)'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      <span>Verify & Complete Payment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS / COMPLETE */}
          {step === 4 && purchaseResult && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 6px 20px rgba(22, 163, 74, 0.2)'
              }}>
                <CheckCircle2 size={38} />
              </div>

              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', fontWeight: '800', color: '#15803d' }}>
                Payment Verified & Successful!
              </h3>

              <p style={{ margin: '0 0 20px 0', fontSize: '0.92rem', color: '#4b5563', lineHeight: '1.5' }}>
                {purchaseResult.message}
              </p>

              {/* Purchased Role Card Details */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                textAlign: 'left',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#6b7280' }}>Transaction ID:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{purchaseResult.purchase.paymentId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#6b7280' }}>Role Name:</span>
                  <span style={{ color: purchaseResult.purchase.roleColor, fontWeight: '800' }}>
                    {purchaseResult.purchase.roleName}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                  <span style={{ color: '#6b7280' }}>Status:</span>
                  <span style={{
                    color: purchaseResult.assignedImmediately ? '#15803d' : '#d97706',
                    fontWeight: '700',
                    backgroundColor: purchaseResult.assignedImmediately ? '#dcfce7' : '#fef3c7',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '0.78rem'
                  }}>
                    {purchaseResult.assignedImmediately ? 'ACTIVE & ROLE ASSIGNED' : 'PENDING USER JOIN'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: '#6b7280' }}>Valid Until:</span>
                  <span style={{ fontWeight: '600' }}>{new Date(purchaseResult.purchase.expiresAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  backgroundColor: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
