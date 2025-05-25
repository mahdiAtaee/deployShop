import { Document } from "mongoose";
import SettingScope from "./SettingScope";

export default interface ISetting extends Document {
  key: string;
  value: string;
  scope: SettingScope;
  version: string;
}
