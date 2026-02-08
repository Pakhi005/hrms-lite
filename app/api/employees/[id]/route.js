import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';
import Attendance from '@/models/Attendance';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        await dbConnect();

        // Cascading delete is not automatic in Mongoose unless middleware is used.
        // Manual deletion is safer/explicit here.
        await Employee.findByIdAndDelete(id);
        await Attendance.deleteMany({ employee: id });

        return NextResponse.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
    }
}
