import { useState } from 'react';
import { 
  UserCircleIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar: string;
  lastActive: string;
  projects: number;
  verified: boolean;
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    role: 'Product Manager',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastActive: '2 hours ago',
    projects: 12,
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    role: 'Senior Developer',
    status: 'active',
    joinDate: '2022-11-08',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastActive: '1 hour ago',
    projects: 8,
    verified: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    role: 'UX Designer',
    status: 'pending',
    joinDate: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastActive: '5 minutes ago',
    projects: 3,
    verified: false
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    role: 'Data Analyst',
    status: 'active',
    joinDate: '2023-06-22',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastActive: '30 minutes ago',
    projects: 15,
    verified: true
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    role: 'Marketing Lead',
    status: 'inactive',
    joinDate: '2022-03-14',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    lastActive: '2 days ago',
    projects: 7,
    verified: true
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '+1 (555) 678-9012',
    location: 'Boston, MA',
    role: 'DevOps Engineer',
    status: 'active',
    joinDate: '2023-09-05',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastActive: '15 minutes ago',
    projects: 6,
    verified: true
  }
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowAddModal(false); // Close modal after adding
  };
  const UserCard = ({ user }: { user: User }) => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-neutral-700"
            />
            {user.verified && (
              <CheckBadgeIcon className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <EnvelopeIcon className="w-4 h-4 mr-2" />
          {user.email}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <PhoneIcon className="w-4 h-4 mr-2" />
          {user.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {user.location}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-neutral-700">
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">Projects: </span>
          <span className="font-semibold text-gray-900 dark:text-white">{user.projects}</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Active {user.lastActive}
        </div>
      </div>
    </div>
  );

  const UserRow = ({ user }: { user: User }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {user.verified && (
              <CheckBadgeIcon className="w-3 h-3 text-blue-500 absolute -bottom-0.5 -right-0.5 bg-white dark:bg-neutral-900 rounded-full" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.role}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.location}</td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.projects}</td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</td>
      <td className="px-6 py-4">
        <button className="text-gray-400 hover:text-gray-600">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your team members and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>
      {/* Modal for adding user */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold">Add New User</h2>
            {/* Add User Form */}
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              addUser({ id: '7', name: 'New User', email: 'new.user@example.com', phone: '', location: '', role: '', status: 'active', joinDate: '', avatar: '', lastActive: '', projects: 0, verified: false });
            }}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 p-2 border border-gray-300 dark:border-neutral-600 rounded w-full" />
              </div>
              {/* Additional form fields for email, role, etc. */}
              <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Add User</button>
            </form>
            <button onClick={() => setShowAddModal(false)} className="mt-4 text-gray-600 hover:text-gray-800">Close</button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <UserCircleIcon className="w-12 h-12 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Users</p>
              <p className="text-3xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <CheckBadgeIcon className="w-12 h-12 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending</p>
              <p className="text-3xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
            </div>
            <CalendarIcon className="w-12 h-12 text-yellow-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Projects</p>
              <p className="text-3xl font-bold">{users.reduce((sum, u) => sum + u.projects, 0)}</p>
            </div>
            <FunnelIcon className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Users Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {filteredUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}