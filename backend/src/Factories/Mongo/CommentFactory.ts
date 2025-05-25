import { fakerFA as faker } from "@faker-js/faker";
import CommentModel from "../../components/comment/model/Comment";
import IComment from "../../components/comment/model/IComment";
import CommentStatus from "../../components/comment/model/CommentStatus";
import AdviceToBuy from "../../components/comment/model/AdviceToBuy";
import IUser from "src/components/users/model/IUser";
import { create as CreateUser } from "./UserFactory";
import { create as CreateProduct } from "./ProductFactory";

async function buildAdviseToBuy(count: number = 1) { }

export async function create(count: number = 1, params?: Partial<IComment>) {
  const Comments: IComment[] = [];
  for (let index = 1; index <= count; index++) {
    const user: IUser[] = await CreateUser(1);
    const product = await CreateProduct(1);
    const defaultCommentParams = {
      user: user[0]._id,
      product: product[0]._id,
      title: faker.lorem.sentence(3),
      body: faker.lorem.sentence(),
      isBuyer: faker.datatype.boolean(),
      adviceToBuy: faker.helpers.arrayElement([
        AdviceToBuy.NO,
        AdviceToBuy.NOT_SURE,
        AdviceToBuy.YES
      ]),
      status: faker.helpers.arrayElement([
        CommentStatus.APPROVED,
        CommentStatus.PENDING,
        CommentStatus.REJECTED,
      ]),
    };
    const CommentParams = { ...defaultCommentParams, ...params };
    const newComment = new CommentModel(CommentParams);
    await newComment.save();
    Comments.push(newComment);
  }
  return Comments;
}
