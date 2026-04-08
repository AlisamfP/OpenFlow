import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongoose";
import UserSettings from "@/models/UserSettings";

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { cardId, type } = await request.json();

        await connectDB();

        let settings = await UserSettings.findOne({ userId: session.user.id });
        if (!settings) {
            settings = await UserSettings.create({ userId: session.user.id });
        }

        const alreadyFaved = settings.favCards.some(
            (f: { cardId: string; type: string }) => f.cardId === cardId
        );

        if (alreadyFaved) {
            settings.favCards = settings.favCards.filter(
                (f: { cardId: string; type: string }) => f.cardId !== cardId
            );
        } else {
            settings.favCards.push({ cardId, type });
        }

        await settings.save();
        return NextResponse.json(settings.favCards);
    } catch (error) {
        console.error("favorites error: ", error)
        return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 });
    }
}