import mongoose, { Schema } from "mongoose";

const BaseCardSchema = new Schema({
    text: { type: String, required: true },
    emojiUnicode: { type: String, required: true },
    emojiName: { type: String, required: true },
    category: { 
        type: String, 
        enum: ["general", "feelings"], 
        required: true 
    },
});

const BaseCard = mongoose.models.BaseCard || mongoose.model("BaseCard", BaseCardSchema);

export default BaseCard;