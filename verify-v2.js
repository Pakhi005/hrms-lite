const BASE_URL = 'http://127.0.0.1:3000/api';

async function runVerification() {
    console.log('Starting Verification V2...');

    // 0. Cleanup - Find and delete test employee if exists
    console.log('0. Cleaning up previous test data...');
    try {
        let res = await fetch(`${BASE_URL}/employees`);
        if (res.ok) {
            let employees = await res.json();
            const existing = employees.find(e => e.employeeId === 'EMP_TEST_001');
            if (existing) {
                const id = existing.id || existing.idString;
                console.log(`Found existing test employee (${id}). Deleting...`);
                await fetch(`${BASE_URL}/employees/${id}`, { method: 'DELETE' });
            }
        }
    } catch (e) {
        console.log('Cleanup failed (might be first run):', e.message);
    }

    // 1. Initial List
    console.log('\n1. Fetching Employees...');
    let res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    let employees = await res.json();
    const initialCount = employees.length;
    console.log(`Initial count: ${initialCount}`);

    // 2. Add Employee
    console.log('\n2. Adding Employee...');
    res = await fetch(`${BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: 'EMP_TEST_001',
            name: 'John Test',
            email: 'john.test@example.com',
            department: 'Testing'
        })
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Add failed: ${res.status} - ${text}`);
    }
    const newEmployee = await res.json();
    const empId = newEmployee.id || newEmployee.idString;
    console.log(`Added employee: ${empId}`);

    // 4. Duplicate Check
    console.log('\n4. Testing Duplicate...');
    res = await fetch(`${BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: 'EMP_TEST_001',
            name: 'John Test',
            email: 'john.test@example.com',
            department: 'Testing'
        })
    });
    if (res.status === 409) {
        console.log('Duplicate rejected correctly.');
    } else {
        throw new Error(`Duplicate NOT rejected. Status: ${res.status}`);
    }

    // 5. Mark Attendance
    console.log('\n5. Marking Attendance...');
    res = await fetch(`${BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: empId,
            date: '2025-01-01',
            status: 'PRESENT'
        })
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Mark attendance failed: ${res.status} - ${text}`);
    }
    console.log('Attendance marked.');

    // 6. Get Attendance
    console.log('\n6. Verifying Attendance...');
    res = await fetch(`${BASE_URL}/attendance?employeeId=${empId}`);
    const att = await res.json();
    if (att.length > 0 && att[0].status === 'PRESENT') {
        console.log('Attendance verified.');
    } else {
        throw new Error('Attendance not found.');
    }

    // 7. Delete
    console.log('\n7. Deleting...');
    res = await fetch(`${BASE_URL}/employees/${empId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    console.log('Deleted.');

    console.log('\nSUCCESS!');
}

runVerification().catch(e => console.error('\nFAILURE:', e));
