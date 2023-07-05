import { collection, getDoc, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
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

	const newMaintenanceRef = await addDoc(collection(db, "maintenance"), {
        description: newMaintenance.description,
        created: newMaintenance.created,
        imageUrl: newMaintenance.imageUrl,
        authorName: newMaintenance.authorName,
        authorEmail: newMaintenance.authorEmail,
		authorId: newMaintenance.authorId
	});

	return NextResponse.json(newMaintenanceRef);
}

