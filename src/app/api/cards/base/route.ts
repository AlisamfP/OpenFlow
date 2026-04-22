import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import BaseCard from "@/models/BaseCard";

export async function GET() {
    try {
        await connectDB();
        const cards = await BaseCard.find({});
        return NextResponse.json(cards);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch base cards" },
            { status: 500 }
        );
    }
}