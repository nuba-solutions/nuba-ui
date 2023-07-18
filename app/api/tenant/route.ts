import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface Tenant {
	email: string
    displayName: string
	localId: string
}

export async function POST(request: Request) {
    const { email, displayName, localId } = await request.json() as Tenant;
	let response = {} as Response;
    let origin = request.headers.get('origin')

    response.headers.set("Access-Control-Allow-Origin", origin as string)
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    try {
        const newTenantRef = doc(collection(db, "users"))
		await setDoc(
			newTenantRef, {
				uid: localId,
                name: displayName,
                email: email,
			}
		)
        response = { ...response, ok: true , status: 200, statusText: "User created" };
    } catch (err) {
        response = { ...response, ok: false , status: 400, statusText: "Could not create user" };
    }

    return NextResponse.json(response);
}
