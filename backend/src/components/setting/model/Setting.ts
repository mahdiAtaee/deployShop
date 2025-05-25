import { model, Schema } from "mongoose";
import SettingScope from "./SettingScope";
import ISetting from "./ISetting";

const settingSchema: Schema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  scope: { type: Number, enum: SettingScope, default: SettingScope.PUBLIC },
  version: { type: String },
});

export default model<ISetting>("Setting", settingSchema);
