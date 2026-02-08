'use client';

import { useState } from 'react';

export default function EmployeeForm({ onEmployeeAdded }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        email: '',
        department: '',
    });
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Employee added successfully!');
                setFormData({ employeeId: '', name: '', email: '', department: '' });
                onEmployeeAdded();
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to add employee');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error occurred');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Employee ID"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. EMP001"
                />
                <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                />
                <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@company.com"
                />

                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">Department</label>
                    <div className="relative">
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                        >
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={`text-sm p-3 rounded-lg font-medium ${status === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:shadow-none font-semibold mt-2"
                >
                    {status === 'loading' ? 'Creating...' : 'Create Employee'}
                </button>
            </form>
        </div>
    );
}

function InputField({ label, type = "text", ...props }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-semibold text-slate-700">{label}</label>
            <input
                type={type}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                {...props}
            />
        </div>
    )
}
