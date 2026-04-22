import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongoose";
import CustomCard from "@/models/CustomCard";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const card = await CustomCard.findOneAndDelete({
            _id: id,
            ownerId: session.user.id,
        });

        if (!card) {
            return NextResponse.json({ error: "Card not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete custom card error:", error);
        return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
    }
}