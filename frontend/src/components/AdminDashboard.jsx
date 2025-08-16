import React, { useState, useEffect, useCallback } from 'react';
import adminService from '../services/admin.service';
import { Users, Store, Star, ArrowDown, ArrowUp, PlusCircle } from 'lucide-react';
import AddStoreModal from './AddStoreModal';
import AddUserModal from './AddUserModal';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [error, setError] = useState('');

    // Modal states
    const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    // Filter and Sort states
    const [filters, setFilters] = useState({ name: '', email: '', role: '' });
    const [sortBy, setSortBy] = useState({ field: 'createdAt', order: 'desc' });

    // Sirf stats fetch karne ke liye (sirf ek baar chalega)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await adminService.getDashboardStats();
                setStats(statsData.stats);
            } catch (err) {
                setError('Failed to fetch stats.');
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    // Sirf users ki list fetch karne ke liye (filter/sort badalne par chalega)
    const fetchUsers = useCallback(async () => {
        setLoadingUsers(true);
        try {
            const params = { ...filters, sortBy: sortBy.field, order: sortBy.order };
            const usersData = await adminService.getAllUsers(params);
            setUsers(usersData.users);
        } catch (err) {
            setError('Failed to fetch users.');
        } finally {
            setLoadingUsers(false);
        }
    }, [filters, sortBy]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchUsers();
        }, 500); // Debouncing
        return () => clearTimeout(handler);
    }, [filters, sortBy, fetchUsers]);


    const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSort = (field) => {
        const newOrder = sortBy.field === field && sortBy.order === 'asc' ? 'desc' : 'asc';
        setSortBy({ field, order: newOrder });
    };

    const SortIcon = ({ field }) => {
        if (sortBy.field !== field) return null;
        return sortBy.order === 'asc' ? <ArrowUp size={16} className="inline ml-1" /> : <ArrowDown size={16} className="inline ml-1" />;
    };

    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold drop-shadow-lg">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center gap-2 bg-yellow-400 text-indigo-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition"> <PlusCircle size={20}/> Add User</button>
                        <button onClick={() => setIsAddStoreModalOpen(true)} className="flex items-center gap-2 bg-yellow-400 text-indigo-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition"> <PlusCircle size={20}/> Add Store</button>
                    </div>
                </div>
                
                {loadingStats ? <div className="text-center">Loading Stats...</div> :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<Users />} title="Total Users" value={stats?.totalUsers} />
                    <StatCard icon={<Store />} title="Total Stores" value={stats?.totalStores} />
                    <StatCard icon={<Star />} title="Total Ratings" value={stats?.totalRatings} />
                </div>
                }

                <div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input type="text" name="name" placeholder="Search by name..." value={filters.name} onChange={handleFilterChange} className="input-style"/>
                        <input type="text" name="email" placeholder="Search by email..." value={filters.email} onChange={handleFilterChange} className="input-style"/>
                        <select name="role" value={filters.role} onChange={handleFilterChange} className="input-style bg-white/10"><option value="" className="text-black">All Roles</option><option value="NORMAL_USER" className="text-black">Normal User</option><option value="SYSTEM_ADMINISTRATOR" className="text-black">Administrator</option><option value="STORE_OWNER" className="text-black">Store Owner</option></select>
                    </div>

                    {loadingUsers ? <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-yellow-300"></div></div> :
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead><tr><th className="py-2 px-4 cursor-pointer hover:text-yellow-300" onClick={() => handleSort('name')}>Name <SortIcon field="name" /></th><th className="py-2 px-4 cursor-pointer hover:text-yellow-300" onClick={() => handleSort('email')}>Email <SortIcon field="email" /></th><th className="py-2 px-4 cursor-pointer hover:text-yellow-300" onClick={() => handleSort('role')}>Role <SortIcon field="role" /></th></tr></thead>
                            <tbody>{users.map(user => (<tr key={user.id} className="border-t border-white/20 hover:bg-white/10 transition-colors"><td className="py-3 px-4">{user.name}</td><td className="py-3 px-4">{user.email}</td><td className="py-3 px-4">{user.role.replace('_', ' ')}</td></tr>))}</tbody>
                        </table>
                    </div>
                    }
                </div>
            </div>

            {isAddStoreModalOpen && <AddStoreModal onClose={() => setIsAddStoreModalOpen(false)} onSuccess={fetchUsers} />}
            {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} onSuccess={fetchUsers} />}
            <InputStyle />
        </div>
    );
};

const StatCard = ({ icon, title, value }) => (<div className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg backdrop-blur-md flex items-center gap-4"><div className="bg-white/20 p-3 rounded-full">{icon}</div><div><h2 className="text-lg font-semibold text-gray-200">{title}</h2><p className="text-3xl font-bold">{value ?? '...'}</p></div></div>);
const InputStyle = () => (<style>{`.input-style {background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);border-radius: 0.5rem; padding: 0.5rem 1rem; color: white; transition: all 0.2s;}.input-style::placeholder { color: #d1d5db; }.input-style:focus {outline: none; box-shadow: 0 0 0 2px #facc15; border-color: transparent;}`}</style>);

export default AdminDashboard;