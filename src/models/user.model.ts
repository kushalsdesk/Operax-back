import { Schema, Document, models, model, Model } from "mongoose";
import { IGame } from "./game.model";

export interface IUser extends Document {
  displayName: string;
  email: string;
  photoURL: string;
  games: Array<IGame["_id"]>;
}

const userSchema: Schema = new Schema<IUser>(
  {
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    photoURL: { type: String, required: true },
    games: [{ type: Schema.Types.ObjectId, ref: "Games" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default (models.Users as Model<IUser>) ||
  model<IUser>("Users", userSchema);
