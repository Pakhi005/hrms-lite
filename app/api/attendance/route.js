import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Employee from '@/models/Employee'; // Ensure model is registered

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');

    try {
        await dbConnect();
        let query = {};
        if (employeeId) {
            query.employee = employeeId;
        }

        const records = await Attendance.find(query)
            .populate('employee', 'name employeeId department')
            .sort({ date: -1 });

        return NextResponse.json(records);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch attendance records' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();

        const { employeeId, date, status } = body;

        if (!employeeId || !date || !status) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if exists using compound query
        // We used 'employee' field in schema which stores ObjectId
        // Ideally frontend sends 'id' (which is ObjectId) as 'employeeId'

        const filter = { employee: employeeId, date: new Date(date) };
        const update = { status };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const attendance = await Attendance.findOneAndUpdate(filter, update, options);

        return NextResponse.json(attendance, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to mark attendance' }, { status: 500 });
    }
}
