import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';

export async function GET() {
    try {
        await dbConnect();
        const employees = await Employee.find({}).sort({ createdAt: -1 });
        return NextResponse.json(employees);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();

        // Mongoose handles validation via Schema, but we can do a quick check or let it fail
        // Duplicate check is also handled by unique index, but custom error is nicer
        const { employeeId, email } = body;
        const existing = await Employee.findOne({ $or: [{ employeeId }, { email }] });

        if (existing) {
            return NextResponse.json({ error: 'Employee ID or Email already exists' }, { status: 409 });
        }

        const employee = await Employee.create(body);
        return NextResponse.json(employee, { status: 201 });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 });
    }
}
