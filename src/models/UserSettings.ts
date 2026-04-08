import mongoose, { Schema } from "mongoose";

const FavCardSchema = new Schema({
    cardId: { type: String, required: true },
    type: { type: String, enum: ["base", "custom"], required: true },
}, { _id: false });

const UserSettingsSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    favCards: { type: [FavCardSchema], default: [] },
    audio: {
        rate: { type: Number, default: 1 },
        pitch: { type: Number, default: 1 },
        volume: { type: Number, default: 1 },
        selectedVoice: { type: String, default: "" },
        enabled: { type: Boolean, default: true },
    },
    categoryPref: { type: String, default: "general" },
});

const UserSettings = mongoose.models.UserSettings || mongoose.model("UserSettings", UserSettingsSchema);

export default UserSettings;