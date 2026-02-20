import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

const EMOJI_OPTIONS = [
    '📝', '📁', '✅', '🎯', '📋', '🚀', '⭐', '💡',
    '📊', '📈', '💼', '🎨', '🔧', '⚙️', '🛠️', '📱',
    '💻', '📚', '🎓', '📞', '✉️', '📧', '🔔', '⏰',
    '📅', '⏳', '🎪', '🎭', '🎬', '🎤', '🎵', '🎮',
    '🏆', '🥇', '🎁', '💎', '👑', '🔐', '🔓', '🔑',
    '🌟', '✨', '💫', '⚡', '🔥', '❄️', '💧', '🌈',
    '☀️', '🌙', '⭐', '🌺', '🌸', '🌼', '🌻', '🌷'
];

export default function Dashboard({ tasks, projects }) {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showEmojiPickerEdit, setShowEmojiPickerEdit] = useState(false);
    const [taskFilter, setTaskFilter] = useState('all'); // 'all', 'completed', 'pending'

    const addForm = useForm({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        due_time: '',
        emoji: '📝',
        type: 'task',
    });

    const editForm = useForm({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        due_time: '',
        emoji: '📝',
    });

    const handleAdd = (e) => {
        e.preventDefault();
        addForm.post(route('tasks.store'), {
            onSuccess: () => {
                addForm.reset();
                setShowAddForm(false);
                setShowEmojiPicker(false);
            },
        });
    };

    const handleDelete = (id, type = 'task') => {
        if (confirm('Are you sure?')) {
            router.delete(type === 'task' ? route('tasks.destroy', id) : route('projects.destroy', id));
        }
    };

    const handleMarkDone = (taskId) => {
        router.patch(route('tasks.toggle-complete', taskId));
    };

    const handleEdit = (task) => {
        setEditingTask(task.id);
        editForm.setData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            due_date: task.due_date,
            due_time: task.due_time,
            emoji: task.emoji,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('tasks.update', editingTask), {
            onSuccess: () => {
                setEditingTask(null);
                setShowEmojiPickerEdit(false);
            },
        });
    };

    const handleEmojiSelect = (emoji) => {
        addForm.setData('emoji', emoji);
        setShowEmojiPicker(false);
    };

    const handleEmojiSelectEdit = (emoji) => {
        editForm.setData('emoji', emoji);
        setShowEmojiPickerEdit(false);
    };

    const handleTaskFilter = (filter) => {
        setTaskFilter(filter);
        setActiveTab('tasks'); // Switch to tasks tab to show filtered results
    };

    // Filter tasks based on selected filter
    const filteredTasks = tasks ? tasks.filter(task => {
        if (taskFilter === 'completed') return task.is_completed;
        if (taskFilter === 'pending') return !task.is_completed;
        return true; // 'all' filter
    }) : [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

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

                {/* ================= NAVBAR ================= */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white'
                }}>
                    <div style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        gap: '2rem',
                        fontWeight: '600'
                    }}>
                        {['dashboard', 'projects', 'tasks'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    paddingBottom: '0.5rem',
                                    borderBottom: activeTab === tab ? '2px solid #60a5fa' : '2px solid transparent',
                                    background: 'none',
                                    border: 'none',
                                    color: activeTab === tab ? '#60a5fa' : 'rgba(255, 255, 255, 0.7)',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== tab) e.target.style.color = '#60a5fa';
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== tab) e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                }}
                            >
                                {tab === 'tasks' ? '📋 Task Holder' : (tab === 'projects' ? '📁 Projects' : '📊 Dashboard')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    padding: '3rem 1.5rem',
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>

                    {/* ================= DASHBOARD ================= */}
                    {activeTab === 'dashboard' && (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            animation: 'fadeIn 0.8s ease-out'
                        }}>
                            {/* Header */}
                            <div style={{
                                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                                padding: '2rem',
                                color: 'white'
                            }}>
                                <h3 style={{
                                    fontSize: '1.875rem',
                                    fontWeight: 'bold',
                                    margin: 0
                                }}>Welcome to your Dashboard! 👋</h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginTop: '0.5rem',
                                    margin: '0.5rem 0 0 0'
                                }}>
                                    You're logged in! Manage your projects and track your tasks efficiently.
                                </p>
                            </div>

                            {/* Stats Cards */}
                            <div style={{
                                padding: '2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {/* Total Tasks */}
                                <div 
                                    onClick={() => handleTaskFilter('all')}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(59, 130, 246, 0.3)',
                                        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(59, 130, 246, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.1)';
                                    }}
                                    title="Click to view all tasks"
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <h4 style={{
                                                color: '#60a5fa',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                margin: 0
                                            }}>Total Tasks</h4>
                                            <p style={{
                                                fontSize: '2.25rem',
                                                fontWeight: '900',
                                                color: '#2563eb',
                                                marginTop: '0.5rem',
                                                margin: '0.5rem 0 0 0'
                                            }}>{tasks?.length || 0}</p>
                                        </div>
                                        <div style={{
                                            background: '#2563eb',
                                            padding: '0.75rem',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>
                                            📊
                                        </div>
                                    </div>
                                </div>

                                {/* Completed Tasks */}
                                <div 
                                    onClick={() => handleTaskFilter('completed')}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(34, 197, 94, 0.3)',
                                        boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.1)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(34, 197, 94, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(34, 197, 94, 0.1)';
                                    }}
                                    title="Click to view completed tasks"
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <h4 style={{
                                                color: '#86efac',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                margin: 0
                                            }}>Completed Tasks</h4>
                                            <p style={{
                                                fontSize: '2.25rem',
                                                fontWeight: '900',
                                                color: '#22c55e',
                                                marginTop: '0.5rem',
                                                margin: '0.5rem 0 0 0'
                                            }}>{tasks?.filter(task => task.is_completed).length || 0}</p>
                                        </div>
                                        <div style={{
                                            background: '#22c55e',
                                            padding: '0.75rem',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>
                                            ✅
                                        </div>
                                    </div>
                                </div>

                                {/* Pending Tasks */}
                                <div 
                                    onClick={() => handleTaskFilter('pending')}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(251, 146, 60, 0.1) 100%)',
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(251, 146, 60, 0.3)',
                                        boxShadow: '0 10px 25px -5px rgba(251, 146, 60, 0.1)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(251, 146, 60, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(251, 146, 60, 0.1)';
                                    }}
                                    title="Click to view pending tasks"
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div>
                                            <h4 style={{
                                                color: '#fed7aa',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                margin: 0
                                            }}>Pending Tasks</h4>
                                            <p style={{
                                                fontSize: '2.25rem',
                                                fontWeight: '900',
                                                color: '#fb9132',
                                                marginTop: '0.5rem',
                                                margin: '0.5rem 0 0 0'
                                            }}>{tasks?.filter(task => !task.is_completed).length || 0}</p>
                                        </div>
                                        <div style={{
                                            background: '#fb9132',
                                            padding: '0.75rem',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>
                                            ⏳
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pro Tips Section - Only show on dashboard tab */}
                    {activeTab === 'dashboard' && (
                        <div style={{
                            padding: '1.5rem 0',
                            animation: 'fadeIn 0.8s ease-out'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        margin: 0
                                    }}>Pro Tips</h3>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1rem',
                                    textAlign: 'left'
                                }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                                            <span style={{ color: '#60a5fa', fontWeight: '600' }}>🎯 Priority:</span> Start with high-priority tasks first to maximize productivity
                                        </p>
                                    </div>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                                            <span style={{ color: '#86efac', fontWeight: '600' }}>📅 Planning:</span> Break large projects into smaller, manageable tasks
                                        </p>
                                    </div>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
                                            <span style={{ color: '#fbbf24', fontWeight: '600' }}>📊 Progress:</span> Update task status regularly to track your achievements
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= PROJECTS ================= */}
                    {activeTab === 'projects' && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            animation: 'fadeIn 0.8s ease-out'
                        }}>
                            {/* Header Card */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '1.5rem',
                                padding: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                            }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    margin: 0
                                }}>📁 Project Creator</h3>
                                {!showAddForm && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        style={{
                                            background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            fontSize: '0.875rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.transform = 'scale(1.05)';
                                            e.target.style.boxShadow = '0 6px 15px rgba(37, 99, 235, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                            e.target.style.boxShadow = '0 4px 10px rgba(37, 99, 235, 0.3)';
                                        }}
                                    >
                                        + Add Project
                                    </button>
                                )}
                            </div>

                            {/* Form */}
                            {showAddForm && (
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '1.5rem',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                                    animation: 'slideDown 0.3s ease-out'
                                }}>
                                    <form onSubmit={handleAdd} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}>
                                        {/* Type */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                marginBottom: '0.5rem'
                                            }}>Type</label>
                                            <select
                                                value={addForm.data.type}
                                                onChange={e => addForm.setData('type', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    background: 'rgba(51, 65, 85, 0.5)',
                                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                                    borderRadius: '0.5rem',
                                                    color: 'white',
                                                    fontSize: '0.875rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                }}
                                            >
                                                <option value="task">📝 Task</option>
                                                <option value="project">📁 Project</option>
                                            </select>
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                marginBottom: '0.5rem'
                                            }}>Title</label>
                                            <input
                                                type="text"
                                                value={addForm.data.title}
                                                onChange={e => addForm.setData('title', e.target.value)}
                                                placeholder="Enter title..."
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    background: 'rgba(51, 65, 85, 0.5)',
                                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                                    borderRadius: '0.5rem',
                                                    color: 'white',
                                                    fontSize: '0.875rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                }}
                                            />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                marginBottom: '0.5rem'
                                            }}>Description</label>
                                            <textarea
                                                value={addForm.data.description}
                                                onChange={e => addForm.setData('description', e.target.value)}
                                                placeholder="Describe your item..."
                                                rows="3"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    background: 'rgba(51, 65, 85, 0.5)',
                                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                                    borderRadius: '0.5rem',
                                                    color: 'white',
                                                    fontSize: '0.875rem',
                                                    transition: 'all 0.2s',
                                                    fontFamily: 'inherit',
                                                    resize: 'vertical'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                }}
                                            />
                                        </div>

                                        {/* Priority */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                marginBottom: '0.5rem'
                                            }}>Priority</label>
                                            <select
                                                value={addForm.data.priority}
                                                onChange={e => addForm.setData('priority', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    background: 'rgba(51, 65, 85, 0.5)',
                                                    border: '1px solid rgba(148, 163, 184, 0.2)',
                                                    borderRadius: '0.5rem',
                                                    color: 'white',
                                                    fontSize: '0.875rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                }}
                                            >
                                                <option value="low">🟢 Low</option>
                                                <option value="medium">🟡 Medium</option>
                                                <option value="high">🔴 High</option>
                                            </select>
                                        </div>

                                        {/* Date & Time */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '1rem'
                                        }}>
                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                    marginBottom: '0.5rem'
                                                }}>Due Date</label>
                                                <input
                                                    type="date"
                                                    value={addForm.data.due_date}
                                                    onChange={e => addForm.setData('due_date', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        background: 'rgba(51, 65, 85, 0.5)',
                                                        border: '1px solid rgba(148, 163, 184, 0.2)',
                                                        borderRadius: '0.5rem',
                                                        color: 'white',
                                                        fontSize: '0.875rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                        e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{
                                                    display: 'block',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600',
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                    marginBottom: '0.5rem'
                                                }}>Due Time</label>
                                                <input
                                                    type="time"
                                                    value={addForm.data.due_time}
                                                    onChange={e => addForm.setData('due_time', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        background: 'rgba(51, 65, 85, 0.5)',
                                                        border: '1px solid rgba(148, 163, 184, 0.2)',
                                                        borderRadius: '0.5rem',
                                                        color: 'white',
                                                        fontSize: '0.875rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                        e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Emoji Picker */}
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                marginBottom: '0.5rem'
                                            }}>Emoji/Icon</label>
                                            <div style={{ position: 'relative' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.75rem',
                                                        background: 'rgba(51, 65, 85, 0.5)',
                                                        border: '1px solid rgba(148, 163, 184, 0.2)',
                                                        borderRadius: '0.5rem',
                                                        color: 'white',
                                                        fontSize: '1.5rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        textAlign: 'center'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.8)';
                                                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.background = 'rgba(51, 65, 85, 0.5)';
                                                        e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                                                    }}
                                                >
                                                    {addForm.data.emoji}
                                                </button>
                                                {showEmojiPicker && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '100%',
                                                        marginTop: '0.5rem',
                                                        left: 0,
                                                        zIndex: 50,
                                                        background: 'rgba(30, 41, 59, 0.95)',
                                                        border: '2px solid rgba(59, 130, 246, 0.3)',
                                                        borderRadius: '0.75rem',
                                                        padding: '0.75rem',
                                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                                                        backdropFilter: 'blur(10px)',
                                                        maxWidth: '300px'
                                                    }}>
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(8, 1fr)',
                                                            gap: '0.5rem'
                                                        }}>
                                                            {EMOJI_OPTIONS.map((emoji) => (
                                                                <button
                                                                    key={emoji}
                                                                    type="button"
                                                                    onClick={() => handleEmojiSelect(emoji)}
                                                                    style={{
                                                                        fontSize: '1.5rem',
                                                                        padding: '0.5rem',
                                                                        borderRadius: '0.5rem',
                                                                        background: 'transparent',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.transform = 'scale(1.3)';
                                                                        e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.transform = 'scale(1)';
                                                                        e.target.style.background = 'transparent';
                                                                    }}
                                                                >
                                                                    {emoji}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.5rem',
                                            paddingTop: '0.5rem'
                                        }}>
                                            <button
                                                type="submit"
                                                style={{
                                                    flex: 1,
                                                    background: 'linear-gradient(to right, #22c55e, #16a34a)',
                                                    color: 'white',
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    fontWeight: '600',
                                                    fontSize: '0.875rem',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.05)';
                                                    e.target.style.boxShadow = '0 6px 15px rgba(34, 197, 94, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                    e.target.style.boxShadow = '0 4px 10px rgba(34, 197, 94, 0.3)';
                                                }}
                                            >
                                                Create
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowAddForm(false);
                                                    setShowEmojiPicker(false);
                                                }}
                                                style={{
                                                    flex: 1,
                                                    background: 'rgba(107, 114, 128, 0.5)',
                                                    color: 'white',
                                                    padding: '0.75rem',
                                                    borderRadius: '0.5rem',
                                                    fontWeight: '600',
                                                    fontSize: '0.875rem',
                                                    border: '1px solid rgba(107, 114, 128, 0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'rgba(107, 114, 128, 0.7)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'rgba(107, 114, 128, 0.5)';
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                            </div>
                            )}
                        </div>
                    )}

                    {/* Motivation Tips - Show only on projects tab when not adding new item */}
                    {activeTab === 'projects' && !showAddForm && (
                        <div style={{
                            padding: '1rem 1.5rem',
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                            borderRadius: '1rem',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            textAlign: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                <span style={{ fontSize: '1.25rem' }}>🚀</span>
                                <h4 style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    margin: 0
                                }}>Motivation Tips</h4>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '0.75rem',
                                textAlign: 'left'
                            }}>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#86efac', fontWeight: '600' }}>💪</span> Start small, build momentum
                                    </p>
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#60a5fa', fontWeight: '600' }}>⏰</span> Set realistic deadlines
                                    </p>
                                </div>
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#fbbf24', fontWeight: '600' }}>🎯</span> Focus on progress, not perfection
                                    </p>
                                </div>
                            </div>
                            <p style={{
                                margin: '0.75rem 0 0 0',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.8rem',
                                fontStyle: 'italic'
                            }}>
                                "Every great project starts with a single step. You've got this! 💫"
                            </p>
                        </div>
                    )}

                    {/* ================= TASK HOLDER ================= */}
                    {activeTab === 'tasks' && (
                        <div style={{
                            width: '100%',
                            animation: 'fadeIn 0.8s ease-out'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                                overflow: 'hidden'
                            }}>
                                {/* Header */}
                                <div style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'linear-gradient(to right, #16a34a, #0d9488)',
                                    borderTopLeftRadius: '1.5rem',
                                    borderTopRightRadius: '1.5rem'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.125rem',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📋 Task Holder
                                        {taskFilter !== 'all' && (
                                            <span style={{
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                textTransform: 'uppercase'
                                            }}>
                                                {taskFilter === 'completed' ? '✅ Completed' : '⏳ Pending'}
                                            </span>
                                        )}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        marginTop: '0.25rem',
                                        margin: '0.25rem 0 0 0'
                                    }}>Manage your tasks</p>
                                </div>

                                {/* Tasks Grid */}
                                <div style={{
                                    padding: '1.5rem',
                                    maxHeight: '800px',
                                    overflowY: 'auto'
                                }}>
                                    {filteredTasks && filteredTasks.length > 0 ? (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                            gap: '1rem'
                                        }}>
                                            {filteredTasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    style={{
                                                        padding: '1rem',
                                                        borderRadius: '0.75rem',
                                                        border: '2px solid',
                                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                                        transition: 'all 0.3s',
                                                        background: task.is_completed
                                                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
                                                            : 'rgba(51, 65, 85, 0.5)',
                                                        borderColor: task.is_completed ? '#22c55e' : 'rgba(148, 163, 184, 0.3)',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100%'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                                                    }}
                                                >
                                                    {editingTask === task.id ? (
                                                        <form onSubmit={handleUpdate} style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '0.5rem',
                                                            height: '100%'
                                                        }}>
                                                            <input
                                                                type="text"
                                                                value={editForm.data.title}
                                                                onChange={e => editForm.setData('title', e.target.value)}
                                                                required
                                                                style={{
                                                                    padding: '0.5rem',
                                                                    background: 'rgba(51, 65, 85, 0.6)',
                                                                    border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                    borderRadius: '0.375rem',
                                                                    color: 'white',
                                                                    fontSize: '0.875rem'
                                                                }}
                                                            />
                                                            <textarea
                                                                value={editForm.data.description}
                                                                onChange={e => editForm.setData('description', e.target.value)}
                                                                rows="2"
                                                                style={{
                                                                    padding: '0.5rem',
                                                                    background: 'rgba(51, 65, 85, 0.6)',
                                                                    border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                    borderRadius: '0.375rem',
                                                                    color: 'white',
                                                                    fontSize: '0.875rem',
                                                                    fontFamily: 'inherit'
                                                                }}
                                                            />
                                                            <select
                                                                value={editForm.data.priority}
                                                                onChange={e => editForm.setData('priority', e.target.value)}
                                                                style={{
                                                                    padding: '0.5rem',
                                                                    background: 'rgba(51, 65, 85, 0.6)',
                                                                    border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                    borderRadius: '0.375rem',
                                                                    color: 'white',
                                                                    fontSize: '0.875rem'
                                                                }}
                                                            >
                                                                <option value="low">Low</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="high">High</option>
                                                            </select>
                                                            <div style={{
                                                                display: 'grid',
                                                                gridTemplateColumns: '1fr 1fr',
                                                                gap: '0.5rem'
                                                            }}>
                                                                <input
                                                                    type="date"
                                                                    value={editForm.data.due_date}
                                                                    onChange={e => editForm.setData('due_date', e.target.value)}
                                                                    style={{
                                                                        padding: '0.5rem',
                                                                        background: 'rgba(51, 65, 85, 0.6)',
                                                                        border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                        borderRadius: '0.375rem',
                                                                        color: 'white',
                                                                        fontSize: '0.75rem'
                                                                    }}
                                                                />
                                                                <input
                                                                    type="time"
                                                                    value={editForm.data.due_time}
                                                                    onChange={e => editForm.setData('due_time', e.target.value)}
                                                                    style={{
                                                                        padding: '0.5rem',
                                                                        background: 'rgba(51, 65, 85, 0.6)',
                                                                        border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                        borderRadius: '0.375rem',
                                                                        color: 'white',
                                                                        fontSize: '0.75rem'
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{
                                                                position: 'relative'
                                                            }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowEmojiPickerEdit(!showEmojiPickerEdit)}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '0.5rem',
                                                                        background: 'rgba(51, 65, 85, 0.6)',
                                                                        border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                        borderRadius: '0.375rem',
                                                                        color: 'white',
                                                                        fontSize: '1rem',
                                                                        textAlign: 'center',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    {editForm.data.emoji}
                                                                </button>
                                                                {showEmojiPickerEdit && (
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        top: '100%',
                                                                        marginTop: '0.25rem',
                                                                        left: 0,
                                                                        zIndex: 50,
                                                                        background: 'rgba(30, 41, 59, 0.95)',
                                                                        border: '2px solid rgba(59, 130, 246, 0.3)',
                                                                        borderRadius: '0.5rem',
                                                                        padding: '0.5rem',
                                                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                                                                    }}>
                                                                        <div style={{
                                                                            display: 'grid',
                                                                            gridTemplateColumns: 'repeat(8, 1fr)',
                                                                            gap: '0.25rem'
                                                                        }}>
                                                                            {EMOJI_OPTIONS.map((emoji) => (
                                                                                <button
                                                                                    key={emoji}
                                                                                    type="button"
                                                                                    onClick={() => handleEmojiSelectEdit(emoji)}
                                                                                    style={{
                                                                                        fontSize: '1rem',
                                                                                        padding: '0.25rem',
                                                                                        borderRadius: '0.375rem',
                                                                                        background: 'transparent',
                                                                                        border: 'none',
                                                                                        cursor: 'pointer',
                                                                                        transition: 'all 0.2s'
                                                                                    }}
                                                                                    onMouseEnter={(e) => {
                                                                                        e.target.style.transform = 'scale(1.3)';
                                                                                        e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                                                                                    }}
                                                                                    onMouseLeave={(e) => {
                                                                                        e.target.style.transform = 'scale(1)';
                                                                                        e.target.style.background = 'transparent';
                                                                                    }}
                                                                                >
                                                                                    {emoji}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div style={{
                                                                display: 'flex',
                                                                gap: '0.5rem',
                                                                marginTop: 'auto',
                                                                paddingTop: '0.5rem'
                                                            }}>
                                                                <button type="submit" style={{
                                                                    flex: 1,
                                                                    background: '#2563eb',
                                                                    color: 'white',
                                                                    padding: '0.5rem',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600',
                                                                    border: 'none',
                                                                    cursor: 'pointer'
                                                                }}>Save</button>
                                                                <button type="button" onClick={() => setEditingTask(null)} style={{
                                                                    flex: 1,
                                                                    background: 'rgba(107, 114, 128, 0.5)',
                                                                    color: 'white',
                                                                    padding: '0.5rem',
                                                                    borderRadius: '0.375rem',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600',
                                                                    border: 'none',
                                                                    cursor: 'pointer'
                                                                }}>Cancel</button>
                                                            </div>
                                                        </form>
                                                    ) : (
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            height: '100%'
                                                        }}>
                                                            <div style={{
                                                                flex: 1
                                                            }}>
                                                                <h4 style={{
                                                                    fontWeight: 'bold',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.5rem',
                                                                    fontSize: '1rem',
                                                                    color: task.is_completed ? '#22c55e' : 'white',
                                                                    margin: 0,
                                                                    textDecoration: task.is_completed ? 'line-through' : 'none'
                                                                }}>
                                                                    <span style={{
                                                                        fontSize: '1.25rem'
                                                                    }}>{task.emoji || '📝'}</span>
                                                                    <span style={{
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical'
                                                                    }}>{task.title}</span>
                                                                </h4>
                                                                <p style={{
                                                                    fontSize: '0.875rem',
                                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                                    marginTop: '0.5rem',
                                                                    lineHeight: 1.5,
                                                                    margin: '0.5rem 0 0 0',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical'
                                                                }}>
                                                                    {task.description}
                                                                </p>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    gap: '0.25rem',
                                                                    marginTop: '0.75rem'
                                                                }}>
                                                                    <span style={{
                                                                        padding: '0.25rem 0.5rem',
                                                                        fontSize: '0.75rem',
                                                                        borderRadius: '9999px',
                                                                        fontWeight: '600',
                                                                        background: task.priority === 'high'
                                                                            ? 'rgba(239, 68, 68, 0.2)'
                                                                            : task.priority === 'medium'
                                                                            ? 'rgba(250, 204, 21, 0.2)'
                                                                            : 'rgba(34, 197, 94, 0.2)',
                                                                        color: task.priority === 'high'
                                                                            ? '#fca5a5'
                                                                            : task.priority === 'medium'
                                                                            ? '#facc15'
                                                                            : '#86efac',
                                                                        border: '1px solid',
                                                                        borderColor: task.priority === 'high'
                                                                            ? 'rgba(239, 68, 68, 0.4)'
                                                                            : task.priority === 'medium'
                                                                            ? 'rgba(250, 204, 21, 0.4)'
                                                                            : 'rgba(34, 197, 94, 0.4)'
                                                                    }}>
                                                                        {task.priority}
                                                                    </span>
                                                                    {task.due_date && (
                                                                        <span style={{
                                                                            fontSize: '0.75rem',
                                                                            color: 'rgba(255, 255, 255, 0.6)',
                                                                            background: 'rgba(107, 114, 128, 0.3)',
                                                                            padding: '0.25rem 0.5rem',
                                                                            borderRadius: '9999px',
                                                                            border: '1px solid rgba(148, 163, 184, 0.3)',
                                                                            whiteSpace: 'nowrap'
                                                                        }}>
                                                                            📅 {new Date(task.due_date).toLocaleDateString()}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                display: 'flex',
                                                                gap: '0.5rem',
                                                                marginTop: '1rem',
                                                                paddingTop: '0.75rem',
                                                                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                                                            }}>
                                                                <button 
                                                                    onClick={() => handleEdit(task)}
                                                                    style={{
                                                                        flex: 1,
                                                                        background: '#2563eb',
                                                                        hover: '#1d4ed8',
                                                                        color: 'white',
                                                                        padding: '0.5rem',
                                                                        borderRadius: '0.5rem',
                                                                        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                                                                        fontSize: '1.125rem',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.background = '#1d4ed8';
                                                                        e.target.style.transform = 'scale(1.05)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.background = '#2563eb';
                                                                        e.target.style.transform = 'scale(1)';
                                                                    }}
                                                                    title="Edit task">✏️</button>
                                                                <button 
                                                                    onClick={() => handleMarkDone(task.id)}
                                                                    style={{
                                                                        flex: 1,
                                                                        background: task.is_completed ? '#22c55e' : '#eab308',
                                                                        color: 'white',
                                                                        padding: '0.5rem',
                                                                        borderRadius: '0.5rem',
                                                                        boxShadow: task.is_completed ? '0 2px 8px rgba(34, 197, 94, 0.3)' : '0 2px 8px rgba(234, 179, 8, 0.3)',
                                                                        fontSize: '1.125rem',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.transform = 'scale(1.05)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.transform = 'scale(1)';
                                                                    }}
                                                                    title={task.is_completed ? 'Mark as pending' : 'Mark as done'}>✓</button>
                                                                <button 
                                                                    onClick={() => handleDelete(task.id)}
                                                                    style={{
                                                                        flex: 1,
                                                                        background: '#ef4444',
                                                                        color: 'white',
                                                                        padding: '0.5rem',
                                                                        borderRadius: '0.5rem',
                                                                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                                                                        fontSize: '1.125rem',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.background = '#dc2626';
                                                                        e.target.style.transform = 'scale(1.05)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.background = '#ef4444';
                                                                        e.target.style.transform = 'scale(1)';
                                                                    }}
                                                                    title="Delete task">🗑</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={{
                                            textAlign: 'center',
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            padding: '2rem',
                                            fontSize: '0.875rem'
                                        }}>
                                            {taskFilter === 'completed' 
                                                ? 'No completed tasks yet!' 
                                                : taskFilter === 'pending' 
                                                ? 'No pending tasks!' 
                                                : 'No tasks yet. Create a project to get started!'
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
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
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}