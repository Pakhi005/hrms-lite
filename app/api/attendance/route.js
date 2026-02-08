import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    try {
        const where = employeeId ? { employeeId } : {};

        const records = await prisma.attendance.findMany({
            where,
            include: {
                employee: {
                    select: { name: true, employeeId: true, department: true }
                }
            },
            orderBy: { date: 'desc' }
        });

        return NextResponse.json(records);
    } catch (error) {
        console.error("❌ Fetch Attendance Error:", error);
        return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { employeeId, date, status } = body;

        if (!employeeId || !date || !status) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const attendance = await prisma.attendance.upsert({
            where: {
                employeeId_date: {
                    employeeId,
                    date: new Date(date)
                }
            },
            update: { status },
            create: {
                employeeId,
                date: new Date(date),
                status
            }
        });

        return NextResponse.json(attendance, { status: 201 });
    } catch (error) {
        console.error("❌ Mark Attendance Error:", error);
        return NextResponse.json({ error: 'Failed to mark attendance' }, { status: 500 });
    }
}
