import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface Tenant {
	email: string
    name: string
	id: string
}

export async function POST(request: Request) {
    const { email, name, id } = await request.json() as Tenant;
	let response = null;

    try {
        await addDoc(collection(db, "users"), {
            uid: id,
            name: name,
            email: email,
        }).then((res) => {
            response = res
        })
    } catch (err) {
        response = {success: false, message: "Could not create user", error: err}
    }

    return NextResponse.json(response);
}
