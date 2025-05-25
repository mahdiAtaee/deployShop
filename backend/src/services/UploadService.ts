import { UploadedFile } from "express-fileupload";
import { HashFromUUID } from "./HashService";
import { join } from "path";
const ROOT_PATH: string = process.cwd();
const CONTENT_PATH: string = "/public/contents/";

export default class UploadService {
  private readonly base_Path: string;
  constructor() {
    this.base_Path = join(ROOT_PATH, CONTENT_PATH);
  }
  public async upload(file: UploadedFile) {
    const newFileName: string = this.generateNewFileName(file.name);
    await file.mv(`${this.base_Path}${newFileName}`);
    return newFileName;
  }

  public async uploadMany(files: UploadedFile[]) {
    const newFilesName: string[] = [];
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const newFileName: string = this.generateNewFileName(files[index].name);
        await files[index].mv(`${this.base_Path}${newFileName}`);
        newFilesName.push(newFileName);
      }
    }
    return newFilesName;
  }

  private generateNewFileName(fileName: string): string {
    const fileExtention: string = fileName.split(".").pop() as string;
    const newFileName = HashFromUUID();
    return `${newFileName}.${fileExtention}`;
  }
}
