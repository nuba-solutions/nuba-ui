import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface Tenant {
	email: string
    displayName: string
	localId: string
}

export async function POST(request: Request) {
    const { email, displayName, localId } = await request.json() as Tenant;
	let response = null;
    let origin = request.headers.get('origin')

    try {
        await addDoc(collection(db, "users"), {
            uid: localId,
            name: displayName,
            email: email,
        }).then((res) => {
            response = res
        })
    } catch (err) {
        response = {success: false, message: "Could not create user", error: err}
    }

    response = {...response,
        headers: {
			"Access-Control-Allow-Origin": origin,
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
    }

    return NextResponse.json(response);
}
