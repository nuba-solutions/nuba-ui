import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface Maintenance {
	description: string
    created: Date
    imageUrl: Promise<string>
    authorName: string
    authorEmail: string
    authorId: string
}

export async function GET(request: Request) {
	let maintenanceList: Maintenance[] = [];
	const querySnapshot = await getDocs(collection(db, "maintenance"));

	querySnapshot.forEach((doc: any) => {
		doc.id, " => ", maintenanceList.push(doc.data());
	});

	return NextResponse.json(maintenanceList);
}

export async function POST(request: Request): Promise<Response> {
	const { description, imageUrl, created, authorName, authorEmail, authorId } = await request.json() as Maintenance;
	const newMaintenance = { description, imageUrl, created, authorName, authorEmail, authorId };

	const newMaintenanceRef = doc(collection(db, "maintenance"))

	await setDoc(
		newMaintenanceRef, {
			uid: newMaintenanceRef.id,
			description: newMaintenance.description,
			created: newMaintenance.created,
			imageUrl: newMaintenance.imageUrl,
			authorName: newMaintenance.authorName,
			authorEmail: newMaintenance.authorEmail,
			authorId: newMaintenance.authorId
		}
	)

	return NextResponse.json(newMaintenanceRef);
}

export async function DELETE(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const uid = searchParams.get("uid") || "";

	if (!uid) return NextResponse.json({success: false, message: "UID Does not exist"})

	const maintenanceDocRef = doc(db, "maintenance", uid)
	let response = null;

	try {
		await deleteDoc(maintenanceDocRef)
		response = {success: true, message: 'Maintenance deleted successfully'}
	} catch (error) {
		response = {success: false, message: 'Could not delete maintenance'}
	}

	return NextResponse.json(response)
}

