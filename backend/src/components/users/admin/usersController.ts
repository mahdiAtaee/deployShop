import { Request, Response } from "express";
import User from "../model/User";

class UsersController {
  public async index(req: Request, res: Response) {
    res.send({ allUsers: [] });
  }
  public async create(req: Request, res: Response) {
    const newUser = await User.create({
      first_name: "mahdi",
      last_name: "ataee",
      mobile: "09301234567",
      password: "pass1234",
      email: "Mahdi@gmail.com",
    });
    newUser.addresses.push({
      title: "سفارش 1",
      state: "تهران",
      city: "یومهن",
      address: "تهران بومهن خیابان ازادواری",
      zip_code: "1234567890",
      full_name: "مهدی عطایی",
      mobile: "09123456789",
    });
    await newUser.save();
    res.send({
      User: newUser,
    });
  }
}

export default UsersController;
