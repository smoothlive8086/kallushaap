import { useState } from 'react';
import { ShoppingCart, Check, ArrowLeft, LogOut, ShieldCheck, Sparkles, Zap, Award } from 'lucide-react';

// Custom SVG Gem Icons matching the uploaded images 1 & 2
const PurpleGem = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L38 18L24 44L10 18L24 4Z" fill="#a855f7" />
    <path d="M24 4L38 18H10L24 4Z" fill="#c084fc" />
    <path d="M24 44L38 18H24V44Z" fill="#9333ea" />
    <path d="M24 44L10 18H24V44Z" fill="#7e22ce" />
    <path d="M24 4L31 18H24V4Z" fill="#e9d5ff" opacity="0.6" />
  </svg>
);

const RedRuby = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6H32L42 18L24 42L6 18L16 6Z" fill="#f43f5e" />
    <path d="M16 6H32L38 18H10L16 6Z" fill="#fb7185" />
    <path d="M24 42L42 18H24V42Z" fill="#e11d48" />
    <path d="M24 42L6 18H24V42Z" fill="#be123c" />
    <path d="M24 6L30 18H24V6Z" fill="#ffe4e6" opacity="0.7" />
  </svg>
);

const GreenEmerald = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8H34L42 18L34 40H14L6 18L14 8Z" fill="#10b981" />
    <path d="M14 8H34L38 18H10L14 8Z" fill="#34d399" />
    <path d="M34 40L42 18H24V40H34Z" fill="#059669" />
    <path d="M14 40L6 18H24V40H14Z" fill="#047857" />
    <path d="M24 8L30 18H24V8Z" fill="#d1fae5" opacity="0.7" />
  </svg>
);

export default function PremiumShop({ user, onLogout, onBackToHome, onOpenDashboard }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const packages = [
    {
      id: 'mythic',
      name: 'Mythic Package',
      subtitle: 'Essential features to get started',
      price: '₹29',
      period: '/30 Days',
      gem: <PurpleGem />,
      gemBg: '#f3e8ff',
      isPopular: false,
      buttonText: 'Get Mythic Package',
      features: [
        { text: 'Custom Role', icon: '🎨' },
        { text: 'Soundboard Access', icon: '🔊' },
        { text: 'Nickname Change', icon: '✏️' },
        { text: '40% Extra XP', icon: '📊' },
        { text: '30 Days Access', icon: '⏳' }
      ]
    },
    {
      id: 'godlike',
      name: 'Godlike Package',
      subtitle: 'Complete premium experience with extended access',
      price: '₹99',
      period: '/30 Days',
      gem: <RedRuby />,
      gemBg: '#ffe4e6',
      isPopular: true,
      badgeText: '🏆 Most Popular',
      buttonText: 'Get Godlike Package',
      features: [
        { text: 'Custom Role', icon: '🎨' },
        { text: 'Soundboard Access', icon: '🔊' },
        { text: 'Custom VC Access', icon: '🎧' },
        { text: 'Auto Reaction', icon: '🤖' },
        { text: 'Auto Message', icon: '💬' },
        { text: 'Unlimited Nickname Change', icon: '✏️' },
        { text: '60% Extra XP', icon: '📊' },
        { text: '30 Days Access', icon: '⏳' }
      ]
    },
    {
      id: 'legendary',
      name: 'Legendary Package',
      subtitle: 'Enhanced features with priority access',
      price: '₹59',
      period: '/30 Days',
      gem: <GreenEmerald />,
      gemBg: '#dcfce7',
      isPopular: false,
      buttonText: 'Get Legendary Package',
      features: [
        { text: 'Custom Role (priority color)', icon: '🎨' },
        { text: 'Soundboard Access', icon: '🔊' },
        { text: 'Custom VC Access', icon: '🎧' },
        { text: 'Auto Reaction', icon: '🤖' },
        { text: 'Nickname Change', icon: '✏️' },
        { text: '50% Extra XP', icon: '📊' },
        { text: '30 Days Access', icon: '⏳' }
      ]
    }
  ];

  const handleBuy = (pkg) => {
    setSelectedPackage(pkg);
    setPurchaseSuccess(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f3ea', paddingBottom: '60px' }}>

      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2dfd2',
        padding: '14px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              style={{
                background: 'none',
                border: 'none',
                color: '#4b8538',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#eaf4e8'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#3a7d34',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(58, 125, 52, 0.3)'
            }}>
              🌴
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1b261a', fontFamily: 'Outfit, sans-serif' }}>
              കള്ള് ഷാപ്പ്
            </span>
          </div>
        </div>

        {/* User Account Bar & Nav Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
              }}
            >
              📊 Bot Dashboard
            </button>
          )}

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user.avatar ? (
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt={user.username}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #3a7d34' }}
                />
              ) : (
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#3a7d34',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700'
                }}>
                  {user.username?.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1b261a' }}>{user.username}</div>
                <div style={{ fontSize: '0.75rem', color: '#5e6d5c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
                  Connected with Discord
                </div>
              </div>
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.borderColor = '#fca5a5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <LogOut size={15} />
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 20px 0 20px' }}>

        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <ShoppingCart size={40} style={{ color: '#3a7d34' }} />
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              fontWeight: '900',
              color: '#3a7d34',
              letterSpacing: '-0.03em',
              margin: 0
            }}>
              Premium Shop
            </h1>
          </div>
          <p style={{
            fontSize: '1.1rem',
            color: '#4b5563',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Unlock exclusive features and support the <strong>കള്ള് ഷാപ്പ്</strong> community with our premium packages
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'stretch'
        }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                backgroundColor: pkg.isPopular ? '#f6f9f4' : '#ffffff',
                borderRadius: '24px',
                border: pkg.isPopular ? '2px solid #579d42' : '1px solid #e2dfd2',
                padding: '36px 28px 32px 28px',
                boxShadow: pkg.isPopular
                  ? '0 12px 35px rgba(58, 125, 52, 0.12)'
                  : '0 8px 25px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = pkg.isPopular
                  ? '0 18px 45px rgba(58, 125, 52, 0.2)'
                  : '0 14px 35px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = pkg.isPopular
                  ? '0 12px 35px rgba(58, 125, 52, 0.12)'
                  : '0 8px 25px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#4b8538',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  padding: '6px 18px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(75, 133, 56, 0.3)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap'
                }}>
                  {pkg.badgeText}
                </div>
              )}

              <div>
                {/* Gem Icon Container */}
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: pkg.gemBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)'
                }}>
                  {pkg.gem}
                </div>

                {/* Package Name & Subtitle */}
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: '#1b261a',
                  textAlign: 'center',
                  marginBottom: '8px'
                }}>
                  {pkg.name}
                </h2>

                <p style={{
                  fontSize: '0.92rem',
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: '24px',
                  minHeight: '40px',
                  lineHeight: '1.4'
                }}>
                  {pkg.subtitle}
                </p>

                {/* Price Display */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <span style={{
                    fontSize: '2.8rem',
                    fontWeight: '900',
                    color: '#2e6b28',
                    letterSpacing: '-0.03em'
                  }}>
                    {pkg.price}
                  </span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    marginLeft: '4px'
                  }}>
                    {pkg.period}
                  </span>
                </div>

                {/* Feature List */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 32px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  {pkg.features.map((feat, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.95rem',
                      color: '#374151',
                      fontWeight: '500'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#66bb6a',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '0.75rem'
                      }}>
                        <Check size={15} strokeWidth={3} />
                      </div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{feat.icon}</span>
                        <span>{feat.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBuy(pkg)}
                className="btn-green"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '1.05rem',
                  borderRadius: '14px',
                  backgroundColor: '#3a7d34'
                }}
              >
                <ShoppingCart size={20} />
                {pkg.buttonText}
              </button>

            </div>
          ))}
        </div>

      </main>

      {/* Checkout / Purchase Modal */}
      {selectedPackage && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedPackage(null)}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              border: '1px solid #e2dfd2',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: selectedPackage.gemBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedPackage.gem}
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1b261a', margin: 0 }}>
                  {selectedPackage.name}
                </h3>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#3a7d34', margin: 0 }}>
                  {selectedPackage.price} {selectedPackage.period}
                </p>
              </div>
            </div>

            {!purchaseSuccess ? (
              <>
                <div style={{
                  backgroundColor: '#f8f9f6',
                  borderRadius: '14px',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1f2937', marginBottom: '8px' }}>
                    Included Features:
                  </div>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6' }}>
                    {selectedPackage.features.map((f, i) => (
                      <li key={i}>{f.icon} {f.text}</li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#eaf4e8',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '0.85rem',
                  color: '#166534',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}>
                  <ShieldCheck size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    Account <strong>{user?.username}</strong> will be upgraded automatically upon order confirmation.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setPurchaseSuccess(true)}
                    className="btn-green"
                    style={{ flex: 2, padding: '12px', fontSize: '1rem' }}
                  >
                    Confirm & Unlock
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Check size={36} strokeWidth={3} />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#15803d', marginBottom: '8px' }}>
                  Purchase Requested!
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#4b5563', marginBottom: '24px', lineHeight: '1.5' }}>
                  Thank you for supporting <strong>കള്ള് ഷാപ്പ്</strong>! Your <strong>{selectedPackage.name}</strong> subscription has been submitted for activation.
                </p>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="btn-green"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Close Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
