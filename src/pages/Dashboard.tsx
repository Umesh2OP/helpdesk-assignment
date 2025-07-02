import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';

type Ticket = {
  id: number;
  title: string;
  description: string;
  status?: string;
  assignedTo?: string;
};

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Pending' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      axios.get('http://localhost:5000/tickets').then((res) => {
        setTickets(res.data);
      });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">
        🔐 Please log in to view the dashboard. Redirecting...
      </div>
    );
  }

  const filteredTickets =
    statusFilter === 'All' ? tickets : tickets.filter((t) => t.status === statusFilter);

  const searchedTickets = filteredTickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    const newTicket: Ticket = {
      id: tickets.length + 1,
      title,
      description,
      status: 'Open',
      assignedTo: 'Unassigned',
    };

    setTickets([newTicket, ...tickets]);
    form.reset();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">HelpDesk</h2>
        <nav className="space-y-6 text-gray-700">
          <a className="block">Dashboard</a>
          <a className="block">Profile</a>
          <a className="block">Settings</a>
        </nav>
        <button
          className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-600"
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            navigate('/');
          }}
        >
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Welcome back 👋</h1>
          <div className="relative group">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 cursor-pointer">
              U
            </div>
            <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded hidden group-hover:block z-10">
              <a className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
              <button
                className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  navigate('/');
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tickets', value: tickets.length, color: 'bg-blue-100 text-blue-700' },
            { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: 'bg-green-100 text-green-700' },
            { label: 'Pending', value: tickets.filter(t => t.status === 'Pending').length, color: 'bg-yellow-100 text-yellow-800' },
            { label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, color: 'bg-gray-100 text-gray-700' },
          ].map(stat => (
            <div key={stat.label} className={`p-4 rounded-lg shadow ${stat.color}`}>
              <h4 className="text-lg font-bold">{stat.value}</h4>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <input
          type="text"
          placeholder="Search tickets..."
          className="w-full md:w-1/2 px-4 py-2 border rounded mb-4"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-4 mb-4">
          {['All', 'Open', 'Pending', 'Resolved'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-4 py-2 rounded-full border ${
                statusFilter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Ticket Cards */}
        <div className="grid gap-4">
          {searchedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500 flex justify-between items-start"
            >
              <div>
                <h2 className="font-semibold text-lg">{ticket.title}</h2>
                <p className="text-sm text-gray-600">{ticket.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    {ticket.status}
                  </span>
                  <span>Assigned to: {ticket.assignedTo}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                {ticket.assignedTo?.[0] || 'A'}
              </div>
            </div>
          ))}
        </div>

        {/* New Ticket Form */}
        <form onSubmit={handleSubmit} className="bg-white mt-10 p-6 rounded shadow space-y-4">
          <h3 className="text-xl font-bold">Create New Ticket</h3>
          <input name="title" type="text" placeholder="Title" className="w-full border px-4 py-2 rounded" required />
          <textarea name="description" placeholder="Description" className="w-full border px-4 py-2 rounded" required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
