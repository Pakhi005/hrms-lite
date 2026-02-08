import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(employees);
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { employeeId, email } = body;

        const existing = await prisma.employee.findFirst({
            where: {
                OR: [{ employeeId }, { email }]
            }
        });

        if (existing) {
            return NextResponse.json({ error: 'Employee ID or Email already exists' }, { status: 409 });
        }

        const employee = await prisma.employee.create({
            data: body
        });
        return NextResponse.json(employee, { status: 201 });
    } catch (error) {
        console.error("❌ Creation Error:", error);
        return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
    }
}
