'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({ employees: 0, presentToday: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [empRes, attRes] = await Promise.all([
          fetch('/api/employees'),
          fetch('/api/attendance')
        ]);

        if (empRes.ok && attRes.ok) {
          const employees = await empRes.json();
          const attendance = await attRes.json();
          const today = new Date().toISOString().split('T')[0];
          const todayAttendance = attendance.filter(a =>
            a.date.startsWith(today) && a.status === 'PRESENT'
          );

          setStats({
            employees: employees.length,
            presentToday: todayAttendance.length
          });
        }
      } catch (error) {
        console.error('Failed to load stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome to <span className="gradient-text">HRMS Lite</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Streamline your workforce management with our intuitive and powerful platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <StatsCard
          title="Total Employees"
          value={stats.employees}
          link="/employees"
          linkText="Manage Team"
          color="indigo"
        />
        <StatsCard
          title="Present Today"
          value={stats.presentToday}
          link="/attendance"
          linkText="View Logs"
          color="teal"
        />
      </div>
    </div>
  );
}

function StatsCard({ title, value, link, linkText, color }) {
  const colors = {
    indigo: "from-indigo-500 to-purple-600",
    teal: "from-teal-500 to-emerald-600"
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 card-hover flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</h2>
      <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${colors[color]} mb-6`}>
        {value}
      </div>
      <Link
        href={link}
        className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 rounded-full bg-gradient-to-r ${colors[color]} hover:shadow-lg hover:scale-105 active:scale-95`}
      >
        {linkText} &rarr;
      </Link>
    </div>
  );
}
