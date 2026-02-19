import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Background Blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: '#3b82f6',
        borderRadius: '9999px',
        mixBlendMode: 'multiply',
        filter: 'blur(3rem)',
        opacity: 0.15,
        animation: 'blob 7s infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: '#a855f7',
        borderRadius: '9999px',
        mixBlendMode: 'multiply',
        filter: 'blur(3rem)',
        opacity: 0.15,
        animation: 'blob 7s infinite',
        animationDelay: '2s',
        zIndex: 0
      }}></div>

      {/* Fixed Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        background: 'rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Project Tracker
            </div>
          </Link>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Link href="/" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '5rem',
        paddingBottom: '2rem'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '2rem',
          animation: 'fadeIn 0.8s ease-out',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              borderRadius: '1rem',
              filter: 'blur(0.5rem)',
              opacity: 0.75,
              animation: 'pulse 2s infinite'
            }}></div>
            <Link href="/" style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              borderRadius: '1rem',
              padding: '1rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              width: 'fit-content'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <ApplicationLogo style={{
                height: '1.5rem',
                width: '1.5rem',
                fill: 'currentColor'
              }} />
            </Link>
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          width: '100%',
          animation: 'fadeInDelayed 0.8s ease-out 0.2s backwards'
        }}>
          {/* Glowing Border */}
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(to right, #2563eb, #9333ea)',
            borderRadius: '1rem',
            opacity: 0.5,
            animation: 'pulse 2s infinite',
            pointerEvents: 'none',
            left: 'calc(50% - 210px)',
            width: '420px'
          }}></div>

          {/* Card Container */}
          <div style={{
            position: 'relative',
            background: '#1e293b',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Header Bar */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(to right, #3b82f6, #9333ea, #ec4899)'
            }}></div>

            {/* Content */}
            <div style={{
              padding: '2rem'
            }}>
              {children}
            </div>

            {/* Footer Divider */}
            <div style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
              margin: '1rem 0'
            }}></div>

            {/* Footer Links */}
            <div style={{
              padding: '1rem 2rem',
              background: 'rgba(51, 65, 85, 0.3)',
              borderTop: '1px solid rgba(71, 85, 105, 0.5)',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'rgba(148, 163, 184, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <a href="#" style={{
                color: 'rgba(203, 213, 225, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.8)'}
              >
                Support
              </a>
              <span>•</span>
              <a href="#" style={{
                color: 'rgba(203, 213, 225, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.8)'}
              >
                Privacy
              </a>
              <span>•</span>
              <a href="#" style={{
                color: 'rgba(203, 213, 225, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(203, 213, 225, 0.8)'}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelayed {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        * {
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}