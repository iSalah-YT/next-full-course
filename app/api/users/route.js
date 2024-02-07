import { users } from '@/app/utils/db';
import { NextResponse } from 'next/server';
import fs from 'fs';

// 1. All Users Data
export function GET() {
  const data = users;
  return NextResponse.json({ data }, { status: 200 });
}

// 4. Create User
export async function POST(req, res) {
  let { id, name, email, password } = await req.json();

  // check if the data is provided
  if (!id || !name || !email || !password) {
    return NextResponse.json({ result: 'required not found' }, { status: 400 });
  } else {
    // add the new user to the in-memory array
    users.push({ id, name, email, password });

    // extract just the user array from the update data
    const updateUsersArray = users;

    // convert the updated users array to a json string
    const updatedData = JSON.stringify(updateUsersArray, null, 2);

    // write the updated users array to a JSON string
    fs.writeFileSync(
      './app/utils/db.js',
      `export const users = ${updatedData}`,
      'utf-8'
    );

    return NextResponse.json({ success: 'User added successfully' });
  }
}

// 5. Update User
export async function PUT(req, res) {
  let { id, name, email, password } = await req.json();

  // find the user in the users array by ID
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return NextResponse.json({ result: 'User not found' }, { status: '404' });
  }

  if (name) {
    users[userIndex].name = name;
  }

  if (email) {
    users[userIndex].email = email;
  }

  if (password) {
    users[userIndex].password = password;
  }

  // extract just the user array from the update data
  const updateUsersArray = users;

  // convert the updated users array to a json string
  const updatedData = JSON.stringify(updateUsersArray, null, 2);

  // write the updated users array to a JSON string
  fs.writeFileSync(
    './app/utils/db.js',
    `export const users = ${updatedData}`,
    'utf-8'
  );

  return NextResponse.json({ success: 'User updated successfully' });
}
