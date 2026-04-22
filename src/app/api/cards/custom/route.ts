import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongoose";
import CustomCard from "@/models/CustomCard";

const MAX_CUSTOM_CARDS = 20;

export async function GET() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const cards = await CustomCard.find({ ownerId: session.user.id });
        return NextResponse.json(JSON.parse(JSON.stringify(cards)));
    } catch (error) {
        console.error("Get custom cards error:", error);
        return NextResponse.json({ error: "Failed to fetch custom cards" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const count = await CustomCard.countDocuments({ ownerId: session.user.id });
        if (count >= MAX_CUSTOM_CARDS) {
            return NextResponse.json(
                { error: `You can only have ${MAX_CUSTOM_CARDS} custom cards` },
                { status: 400 }
            );
        }

        const { text, emojiUnicode, emojiName } = await request.json();

        const card = await CustomCard.create({
            ownerId: session.user.id,
            text,
            emojiUnicode,
            emojiName,
        });

        return NextResponse.json(JSON.parse(JSON.stringify(card)));
    } catch (error) {
        console.error("Create custom card error:", error);
        return NextResponse.json({ error: "Failed to create custom card" }, { status: 500 });
    }
}