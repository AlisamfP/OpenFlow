import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import connectDB from "@/lib/mongoose";
import UserSettings from "@/models/UserSettings";

export async function GET() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        let settings = await UserSettings.findOne({ userId: session.user.id });

        if (!settings) {
            settings = await UserSettings.create({ userId: session.user.id });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}