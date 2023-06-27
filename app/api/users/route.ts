import { collection, getDoc, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import crypto from 'crypto'
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface User {
	uid: string;
	firstName: string;
	lastName: string;
	age: number;
}

export async function GET(request: Request) {
	let users: User[] = [];
	const querySnapshot = await getDocs(collection(db, "users"));

	querySnapshot.forEach((doc: any) => {
		doc.id, " => ", users.push(doc.data());
	});

	return NextResponse.json(users);
}

export async function POST(request: Request): Promise<Response> {
	const { firstName, lastName, age } = await request.json() as User;
	const uid = crypto.randomUUID()
	const newUser = { uid, firstName, lastName, age };

	const newUserRef = await addDoc(collection(db, "users"), {
		uid: newUser.uid,
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		age: newUser.age
	});

	return NextResponse.json(newUserRef);
}

export async function DELETE(request: Request): Promise<Response> {
	const { uid } = await request.json()
	const response = await deleteDoc(doc(db, "users", "6WF4lqYJsgVSz4OyJBnT")).then((res) => res)
	return NextResponse.json(response)
}

// export async function PUT(request: Request): Promise<Response> {
// 	const { uid, firstName, lastName, age } = await request.json() as User;
// 	updateUser(uid, firstName, lastName, age);
// 	const data = { uid, firstName, lastName, age };
// 	return NextResponse.json({ message: 'User updated', data, status: 200 });
// }

// const updateUser = (uid: string, firstName: string, lastName: string, age: number) => {
// 	const userIndex = users.findIndex(user => user.uid === uid);
// 	if (userIndex !== -1) {
// 		users[userIndex].firstName = firstName;
// 		users[userIndex].lastName = lastName;
// 		users[userIndex].age = age;
// 	}
// }
