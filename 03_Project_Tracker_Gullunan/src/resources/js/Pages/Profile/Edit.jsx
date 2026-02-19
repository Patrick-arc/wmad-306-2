import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile" />

            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
                position: 'relative',
                overflow: 'hidden'
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

                {/* Profile Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '3rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {/* Header Card */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '1.5rem',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        <div style={{
                            background: 'linear-gradient(to right, #2563eb, #9333ea)',
                            padding: '2rem',
                            color: 'white'
                        }}>
                            <h3 style={{
                                fontSize: '1.875rem',
                                fontWeight: 'bold',
                                margin: 0,
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>Profile Settings 👤</h3>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginTop: '0.5rem',
                                margin: '0.5rem 0 0 0',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                            }}>
                                Manage your account settings and preferences.
                            </p>
                        </div>
                    </div>

                    {/* Profile Forms Container */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '1.5rem',
                        animation: 'fadeIn 0.8s ease-out'
                    }}>
                        {/* Profile Information Form */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            animation: 'fadeIn 0.8s ease-out'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                                    padding: '0.75rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    👤
                                </div>
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    margin: 0
                                }}>Profile Information</h4>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className=""
                            />
                        </div>

                        {/* Update Password Form */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            animation: 'fadeIn 0.8s ease-out 0.2s both'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(to right, #059669, #047857)',
                                    padding: '0.75rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🔐
                                </div>
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    margin: 0
                                }}>Update Password</h4>
                            </div>
                            <UpdatePasswordForm className="" />
                        </div>

                        {/* Delete Account Form */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            boxShadow: '0 10px 25px -5px rgba(127, 29, 29, 0.2)',
                            animation: 'fadeIn 0.8s ease-out 0.4s both',
                            gridColumn: '1 / -1' // Full width
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(to right, #dc2626, #b91c1c)',
                                    padding: '0.75rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    ⚠️
                                </div>
                                <h4 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#ef4444',
                                    margin: 0
                                }}>Delete Account</h4>
                            </div>
                            <DeleteUserForm className="" />
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
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
