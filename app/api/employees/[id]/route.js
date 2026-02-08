import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        await prisma.employee.delete({
            where: { idString: id }
        });

        return NextResponse.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error("❌ Delete Error:", error);
        return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 });
    }
}
