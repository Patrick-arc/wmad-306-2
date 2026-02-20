import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// Inline SVG Icons
const UserIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
    </svg>
);

const EnvelopeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
    </svg>
);

const LockClosedIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
    </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
);

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div style={{ 
                display: 'flex', 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '384px',
                    height: '384px',
                    background: '#3b82f6',
                    borderRadius: '9999px',
                    mixBlendMode: 'multiply',
                    filter: 'blur(3rem)',
                    opacity: 0.2,
                    animation: 'blob 7s infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-32px',
                    left: '80px',
                    width: '384px',
                    height: '384px',
                    background: '#a855f7',
                    borderRadius: '9999px',
                    mixBlendMode: 'multiply',
                    filter: 'blur(3rem)',
                    opacity: 0.2,
                    animation: 'blob 7s infinite',
                    animationDelay: '2s'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '384px',
                    height: '384px',
                    background: '#ec4899',
                    borderRadius: '9999px',
                    mixBlendMode: 'multiply',
                    filter: 'blur(3rem)',
                    opacity: 0.2,
                    animation: 'blob 7s infinite',
                    animationDelay: '4s'
                }}></div>

                <div style={{ 
                    display: 'flex', 
                    width: '100%',
                    position: 'relative',
                    zIndex: 10,
                    padding: '2rem'
                }}>
                    {/* Left Side - Branding & Info */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: 'white',
                        paddingRight: '3rem',
                        animation: 'fadeInLeft 0.8s ease-out'
                    }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: 'fit-content'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to right, #2563eb, #9333ea)',
                                        borderRadius: '0.75rem',
                                        filter: 'blur(0.5rem)',
                                        opacity: 0.75,
                                        animation: 'pulse 2s infinite'
                                    }}></div>
                                    <div style={{
                                        position: 'relative',
                                        background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                                        borderRadius: '0.75rem',
                                        padding: '0.75rem',
                                        color: 'white'
                                    }}>
                                        <UserIcon />
                                    </div>
                                </div>
                                <div>
                                    <h2 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>Welcome</h2>
                                    <p style={{
                                        color: '#bfdbfe',
                                        fontSize: '0.875rem',
                                        margin: 0
                                    }}>Join our community</p>
                                </div>
                            </div>
                        </div>

                        <h3 style={{
                            fontSize: '3.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            lineHeight: 1.2,
                            margin: 0
                        }}>
                            Start Your <span style={{
                                background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>Journey</span>
                        </h3>

                        <p style={{
                            color: '#dbeafe',
                            fontSize: '1.125rem',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                            maxWidth: '500px',
                            margin: '0 0 2rem 0'
                        }}>
                            Create your account and unlock exclusive features. Join thousands of satisfied users already enjoying our platform.
                        </p>

                        {/* Features List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                            {[
                                { title: 'Fast & Secure', desc: 'Your data is encrypted and protected' },
                                { title: 'Easy Setup', desc: 'Get started in just a few minutes' },
                                { title: '24/7 Support', desc: 'Our team is always here to help' }
                            ].map((feature, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem'
                                }}>
                                    <div style={{
                                        marginTop: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '24px',
                                        width: '24px',
                                        borderRadius: '50%',
                                        background: 'rgba(59, 130, 246, 0.2)',
                                        border: '1px solid #60a5fa'
                                    }}>
                                        <CheckIcon />
                                    </div>
                                    <div>
                                        <h4 style={{
                                            fontWeight: '600',
                                            color: 'white',
                                            margin: '0 0 0.25rem 0'
                                        }}>{feature.title}</h4>
                                        <p style={{
                                            color: '#bfdbfe',
                                            fontSize: '0.875rem',
                                            margin: 0
                                        }}>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid #475569'
                        }}>
                            {[
                                { value: '50K+', label: 'Active Users' },
                                { value: '99.9%', label: 'Uptime' },
                                { value: '4.9★', label: 'Rating' }
                            ].map((stat, idx) => (
                                <div key={idx}>
                                    <p style={{
                                        fontSize: '1.875rem',
                                        fontWeight: 'bold',
                                        color: '#60a5fa',
                                        margin: 0
                                    }}>{stat.value}</p>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#94a3b8',
                                        margin: 0
                                    }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Form Card */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'fadeInRight 0.8s ease-out'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '500px'
                        }}>
                            {/* Glowing Border */}
                            <div style={{
                                position: 'absolute',
                                inset: '-2px',
                                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                                borderRadius: '1rem',
                                blur: '0.5rem',
                                opacity: 0.75,
                                animation: 'pulse 2s infinite',
                                pointerEvents: 'none'
                            }}></div>

                            {/* Card */}
                            <div style={{
                                position: 'relative',
                                background: '#1e293b',
                                borderRadius: '1rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                overflow: 'hidden',
                                backdropFilter: 'blur(10px)'
                            }}>
                                {/* Header Gradient */}
                                <div style={{
                                    height: '4px',
                                    background: 'linear-gradient(to right, #3b82f6, #9333ea, #ec4899)'
                                }}></div>

                                <div style={{
                                    padding: '2.5rem 2rem'
                                }}>
                                    {/* Title */}
                                    <div style={{
                                        textAlign: 'center',
                                        marginBottom: '2rem'
                                    }}>
                                        <h1 style={{
                                            fontSize: '1.875rem',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            margin: '0 0 0.5rem 0',
                                            letterSpacing: '-0.025em'
                                        }}>Create Account</h1>
                                        <p style={{
                                            color: '#bfdbfe',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            margin: 0
                                        }}>Start your journey with us</p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={submit} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.25rem',
                                        animation: 'fadeIn 1s ease-out 0.2s backwards'
                                    }}>
                                        {/* Name Field */}
                                        <div>
                                            <label style={{
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                display: 'block',
                                                marginBottom: '0.5rem'
                                            }}>Full Name</label>
                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 'auto 0 0 1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    pointerEvents: 'none',
                                                    color: '#60a5fa'
                                                }}>
                                                    <UserIcon />
                                                </div>
                                                <TextInput
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    style={{
                                                        paddingLeft: '3rem',
                                                        width: '100%',
                                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                                        background: '#334155',
                                                        border: '1px solid #475569',
                                                        borderRadius: '0.5rem',
                                                        color: 'white',
                                                        fontSize: '0.875rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    className="pl-12 w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500 text-sm"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            {errors.name && <p style={{
                                                marginTop: '0.375rem',
                                                color: '#f87171',
                                                fontSize: '0.75rem',
                                                animation: 'shake 0.5s ease-in-out'
                                            }}>{errors.name}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label style={{
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                display: 'block',
                                                marginBottom: '0.5rem'
                                            }}>Email Address</label>
                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 'auto 0 0 1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    pointerEvents: 'none',
                                                    color: '#60a5fa'
                                                }}>
                                                    <EnvelopeIcon />
                                                </div>
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="pl-12 w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500 text-sm"
                                                    autoComplete="username"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                            </div>
                                            {errors.email && <p style={{
                                                marginTop: '0.375rem',
                                                color: '#f87171',
                                                fontSize: '0.75rem',
                                                animation: 'shake 0.5s ease-in-out'
                                            }}>{errors.email}</p>}
                                        </div>

                                        {/* Password Field */}
                                        <div>
                                            <label style={{
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                display: 'block',
                                                marginBottom: '0.5rem'
                                            }}>Password</label>
                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 'auto 0 0 1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    pointerEvents: 'none',
                                                    color: '#60a5fa'
                                                }}>
                                                    <LockClosedIcon />
                                                </div>
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="pl-12 w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500 text-sm"
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                            {errors.password && <p style={{
                                                marginTop: '0.375rem',
                                                color: '#f87171',
                                                fontSize: '0.75rem',
                                                animation: 'shake 0.5s ease-in-out'
                                            }}>{errors.password}</p>}
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div>
                                            <label style={{
                                                color: 'white',
                                                fontWeight: '600',
                                                fontSize: '0.875rem',
                                                display: 'block',
                                                marginBottom: '0.5rem'
                                            }}>Confirm Password</label>
                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    inset: 'auto 0 0 1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    pointerEvents: 'none',
                                                    color: '#60a5fa'
                                                }}>
                                                    <CheckIcon />
                                                </div>
                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className="pl-12 w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500 text-sm"
                                                    autoComplete="new-password"
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                            {errors.password_confirmation && <p style={{
                                                marginTop: '0.375rem',
                                                color: '#f87171',
                                                fontSize: '0.75rem',
                                                animation: 'shake 0.5s ease-in-out'
                                            }}>{errors.password_confirmation}</p>}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            style={{
                                                marginTop: '1.5rem',
                                                padding: '0.75rem 1rem',
                                                background: processing ? 'rgba(37, 99, 235, 0.5)' : 'linear-gradient(to right, #2563eb, #1d4ed8)',
                                                color: 'white',
                                                fontWeight: '600',
                                                borderRadius: '0.5rem',
                                                border: 'none',
                                                cursor: processing ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                fontSize: '0.875rem',
                                                transition: 'all 0.2s',
                                                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                                                transform: processing ? 'scale(1)' : 'scale(1)',
                                            }}
                                            onMouseEnter={(e) => !processing && (e.target.style.transform = 'scale(1.02)')}
                                            onMouseLeave={(e) => !processing && (e.target.style.transform = 'scale(1)')}
                                        >
                                            {processing ? (
                                                <>
                                                    <svg style={{
                                                        animation: 'spin 1s linear infinite',
                                                        width: '1.25rem',
                                                        height: '1.25rem'
                                                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Creating account...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Create Account</span>
                                                    <ArrowRightIcon />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    {/* Divider */}
                                    <div style={{
                                        marginTop: '1.5rem',
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <div style={{
                                            flex: 1,
                                            height: '1px',
                                            background: '#475569'
                                        }}></div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: '#94a3b8'
                                        }}>Or</span>
                                        <div style={{
                                            flex: 1,
                                            height: '1px',
                                            background: '#475569'
                                        }}></div>
                                    </div>

                                    {/* Social Buttons */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '0.75rem'
                                    }}>
                                        <button style={{
                                            padding: '0.625rem 1rem',
                                            background: '#334155',
                                            color: 'white',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            transition: 'all 0.2s',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }} 
                                        onMouseEnter={(e) => e.target.style.background = '#475569'}
                                        onMouseLeave={(e) => e.target.style.background = '#334155'}>
                                            <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            Google
                                        </button>
                                        <button style={{
                                            padding: '0.625rem 1rem',
                                            background: '#334155',
                                            color: 'white',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            transition: 'all 0.2s',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = '#475569'}
                                        onMouseLeave={(e) => e.target.style.background = '#334155'}>
                                            <svg style={{ width: '1rem', height: '1rem' }} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                            Facebook
                                        </button>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div style={{
                                    padding: '1rem 2rem',
                                    background: 'rgba(51, 65, 85, 0.5)',
                                    borderTop: '1px solid #475569',
                                    textAlign: 'center'
                                }}>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#cbd5e1',
                                        margin: 0
                                    }}>
                                        Already have an account?{' '}
                                        <Link
                                            href={route('login')}
                                            style={{
                                                fontWeight: '600',
                                                color: '#60a5fa',
                                                textDecoration: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    zIndex: 20,
                    animation: 'fadeIn 1.2s ease-out 0.8s backwards'
                }}>
                    <p style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        margin: 0
                    }}>
                    </p>
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
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.75;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-5px);
                    }
                    75% {
                        transform: translateX(5px);
                    }
                }
            `}</style>
        </GuestLayout>
    );
}