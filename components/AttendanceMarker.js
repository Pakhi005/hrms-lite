'use client';

import { useState } from 'react';

export default function AttendanceMarker({ employees, onAttendanceMarked }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'PRESENT',
    });
    const [submitStatus, setSubmitStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitStatus('success');
                setMessage('Attendance marked successfully!');
                onAttendanceMarked();
                setTimeout(() => setSubmitStatus('idle'), 3000);
            } else {
                const data = await res.json();
                setSubmitStatus('error');
                setMessage(data.error || 'Failed to mark attendance');
            }
        } catch (error) {
            setSubmitStatus('error');
            setMessage('Network error occurred');
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-slate-800">Mark Attendance</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">Employee</label>
                    <div className="relative">
                        <select
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.idString} value={emp.idString}>
                                    {emp.name} ({emp.employeeId})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-semibold text-slate-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Status</label>
                    <div className="grid grid-cols-2 gap-4">
                        <StatusOption
                            label="Present"
                            value="PRESENT"
                            current={formData.status}
                            onChange={handleChange}
                            color="green"
                        />
                        <StatusOption
                            label="Absent"
                            value="ABSENT"
                            current={formData.status}
                            onChange={handleChange}
                            color="red"
                        />
                    </div>
                </div>

                {message && (
                    <div className={`text-sm p-3 rounded-lg font-medium ${submitStatus === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-70 disabled:shadow-none font-semibold"
                >
                    {submitStatus === 'loading' ? 'Saving...' : 'Save Record'}
                </button>
            </form>
        </div>
    );
}

function StatusOption({ label, value, current, onChange, color }) {
    const isChecked = current === value;
    const baseClass = "cursor-pointer rounded-lg border px-4 py-3 flex items-center justify-center transition-all duration-200";
    const activeClass = color === 'green'
        ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500"
        : "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500";
    const inactiveClass = "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50";

    return (
        <label className={`${baseClass} ${isChecked ? activeClass : inactiveClass}`}>
            <input
                type="radio"
                name="status"
                value={value}
                checked={isChecked}
                onChange={onChange}
                className="sr-only"
            />
            <span className="font-medium">{label}</span>
        </label>
    );
}
