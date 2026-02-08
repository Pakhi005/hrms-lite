import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/60 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
                <Link href="/" className="text-2xl font-bold tracking-tight gradient-text">
                    HRMS Lite
                </Link>
                <div className="flex gap-1">
                    <NavLink href="/employees">Employees</NavLink>
                    <NavLink href="/attendance">Attendance</NavLink>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors duration-200"
        >
            {children}
        </Link>
    );
}
