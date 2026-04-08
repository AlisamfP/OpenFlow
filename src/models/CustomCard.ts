import mongoose, { Schema } from "mongoose";

const CustomCardSchema = new Schema({
    ownerId: { type: String, required: true },
    text: { type: String, required: true },
    emojiUnicode: { type: String, required: true },
    emojiName: { type: String, required: true },
});

const CustomCard = mongoose.models.CustomCard || mongoose.model("CustomCard", CustomCardSchema);

export default CustomCard;