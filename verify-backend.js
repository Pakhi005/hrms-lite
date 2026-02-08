const BASE_URL = 'http://127.0.0.1:3000/api';

async function runVerification() {
    console.log('Starting Backend Verification...');

    // 1. Initial List
    console.log('\n1. Fetching Employees (Initial)...');
    let res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    let employees = await res.json();
    console.log('Employees:', employees.length);

    // 2. Add Employee
    console.log('\n2. Adding Employee (John Doe)...');
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
        const err = await res.json();
        throw new Error(`Failed to add employee: ${res.status} - ${JSON.stringify(err)}`);
    }
    const newEmployee = await res.json();
    console.log('Employee Added:', newEmployee.id);

    // 3. Verify List
    console.log('\n3. Verifying Employee in List...');
    res = await fetch(`${BASE_URL}/employees`);
    employees = await res.json();
    const exists = employees.find(e => e.employeeId === 'EMP_TEST_001');
    if (!exists) throw new Error('Employee not found in list');
    console.log('Employee verified in list.');

    // 4. Duplicate Check
    console.log('\n4. Testing Duplicate Prevention...');
    res = await fetch(`${BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: 'EMP_TEST_001',
            name: 'John Duplicate',
            email: 'john.test@example.com',
            department: 'Testing'
        })
    });
    if (res.status === 409) {
        console.log('Duplicate correctly rejected (409 Conflict).');
    } else {
        throw new Error(`Duplicate NOT rejected. Status: ${res.status}`);
    }

    // 5. Mark Attendance
    console.log('\n5. Marking Attendance...');
    res = await fetch(`${BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: newEmployee.idString, // Ensure we use the correct ID field from response
            date: '2023-10-27',
            status: 'PRESENT'
        })
    });
    // Note: The API returns {idString, ...} or {id, ...}? 
    // checking db.js: "id TEXT PRIMARY KEY"
    // checking route.js: returns object with "id" property.
    // checking schema.prisma was "idString". 
    // In route.js I returned keys like row.id directly?
    // POST /employees returns: { id, employeeId, ... }

    // Let's correct the ID usage:
    const empId = newEmployee.id || newEmployee.idString;

    res = await fetch(`${BASE_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            employeeId: empId,
            date: '2023-10-27',
            status: 'PRESENT'
        })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(`Failed to mark attendance: ${res.status} - ${JSON.stringify(err)}`);
    }
    console.log('Attendance Marked.');

    // 6. Get Attendance
    console.log('\n6. Verifying Attendance...');
    res = await fetch(`${BASE_URL}/attendance?employeeId=${empId}`);
    const attendance = await res.json();
    if (attendance.length > 0 && attendance[0].status === 'PRESENT') {
        console.log('Attendance verified.');
    } else {
        throw new Error('Attendance record not found or incorrect.');
    }

    // 7. Delete Employee
    console.log('\n7. Deleting Employee...');
    res = await fetch(`${BASE_URL}/employees/${empId}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
    console.log('Employee Deleted.');

    // 8. Final Verify
    console.log('\n8. Final List Check...');
    res = await fetch(`${BASE_URL}/employees`);
    employees = await res.json();
    const stillExists = employees.find(e => e.employeeId === 'EMP_TEST_001');
    if (stillExists) throw new Error('Employee still exists after delete');
    console.log('Employee successfully removed.');

    console.log('\nVERIFICATION SUCCESSFUL!');
}

runVerification().catch(e => {
    console.error('\nVERIFICATION FAILED:', e);
});
