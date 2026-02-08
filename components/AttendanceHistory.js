'use client';

import { useState, useEffect } from 'react';

export default function AttendanceHistory() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await fetch('/api/attendance');
            if (res.ok) {
                const data = await res.json();
                setRecords(data);
            }
        } catch (error) {
            console.error('Failed to fetch attendance', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (records.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">No attendance records found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Recent Logs</h3>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">{records.length} Records</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {records.map((record) => (
                            <tr key={record.idString} className="hover:bg-slate-50/80 transition-colors duration-150">
                                <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-semibold text-slate-900">{record.employee ? record.employee.name : 'Unknown'}</div>
                                    <div className="text-xs text-slate-400 mt-0.5">{record.employee ? record.employee.employeeId : 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {record.employee ? record.employee.department : '-'}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${record.status === 'PRESENT'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                            : 'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${record.status === 'PRESENT' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
