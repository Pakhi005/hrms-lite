'use client';

import { useState, useEffect } from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeList from '@/components/EmployeeList';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchEmployees();
    }, [refreshTrigger]);

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/employees');
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmployeeAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleEmployeeDeleted = async (id) => {
        try {
            const res = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setRefreshTrigger(prev => prev + 1);
            } else {
                alert('Failed to delete employee');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Team Management</h1>
                    <p className="text-slate-500 mt-1">View and manage your organization's workforce.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
                </div>
                <div className="md:col-span-2">
                    <EmployeeList
                        employees={employees}
                        loading={loading}
                        onDelete={handleEmployeeDeleted}
                    />
                </div>
            </div>
        </div>
    );
}
