'use client';

import { useState, useEffect } from 'react';
import AttendanceMarker from '@/components/AttendanceMarker';
import AttendanceHistory from '@/components/AttendanceHistory';

export default function AttendancePage() {
    const [employees, setEmployees] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/employees');
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    const handleAttendanceMarked = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Attendance Tracker</h1>
                    <p className="text-slate-500 mt-1">Monitor daily presence and absence records.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <AttendanceMarker
                        employees={employees}
                        onAttendanceMarked={handleAttendanceMarked}
                    />
                </div>
                <div className="md:col-span-2">
                    <AttendanceHistory key={refreshTrigger} />
                </div>
            </div>
        </div>
    );
}
