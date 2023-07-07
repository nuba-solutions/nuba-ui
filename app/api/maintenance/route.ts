import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from 'next/server';

interface Maintenance {
	description: string
    created: Date
    imageUrl: Promise<string>
    authorName: string
    authorEmail: string
    authorId: string
	uid: string
}

export async function GET(request: Request) {
	let maintenanceList: Maintenance[] = [];
	let response = null;

	try {
		const querySnapshot = await getDocs(collection(db, "maintenance"));
		querySnapshot.forEach((doc: any) => {
			doc.id, " => ", maintenanceList.push(doc.data());
		});
		response = maintenanceList;
	} catch (error) {
		response = {success: false, message: "Could not get maintenance list"}
	}

	return NextResponse.json(response);
}

export async function POST(request: Request): Promise<Response> {
	const { description, imageUrl, created, authorName, authorEmail, authorId } = await request.json() as Maintenance;
	const newMaintenance = { description, imageUrl, created, authorName, authorEmail, authorId };
	let response = null;

	try {
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
		response = newMaintenanceRef;
	} catch (error) {
		response = {success: false, message: "Could not create maintenance"}
	}

	return NextResponse.json(response)
}

export async function DELETE(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const uid = searchParams.get("uid") || "";
	let response = null;

	if (!uid) return NextResponse.json({success: false, message: "UID Does not exist"})

	try {
		const maintenanceDocRef = doc(db, "maintenance", uid)
		await deleteDoc(maintenanceDocRef)
		response = {success: true, message: 'Maintenance deleted successfully'}
	} catch (error) {
		response = {success: false, message: 'Could not delete maintenance'}
	}

	return NextResponse.json(response)
}

export async function PUT(request: Request): Promise<Response> {
	const { description, imageUrl, created, authorName, authorEmail, authorId, uid } = await request.json() as Maintenance;
	const updatedMaintenance = { description, imageUrl, created, authorName, authorEmail, authorId, uid };
	let response = null;

	try {
		const updatedMaintenanceRef = doc(db, "maintenance", uid)
		await updateDoc(
			updatedMaintenanceRef, {
				uid: updatedMaintenance.uid,
				description: updatedMaintenance.description,
				created: updatedMaintenance.created,
				imageUrl: updatedMaintenance.imageUrl,
				authorName: updatedMaintenance.authorName,
				authorEmail: updatedMaintenance.authorEmail,
				authorId: updatedMaintenance.authorId
			}
		)
		response = updatedMaintenanceRef;
	} catch (error) {
		response = {success: false, message: "Could not update maintenance"}
	}

	return NextResponse.json(response)
}

