import React from 'react';

// The { users } part here matches the 'users' key you sent from UserController.php
export default function UserList({ users }) {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                System User List
            </h1>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* This loops through the 11 users you created with your seeders */}
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>
                                No users found. Did you run php artisan db:seed?
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}