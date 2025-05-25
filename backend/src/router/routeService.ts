import { Application, Router } from "express";
import RouteEngine from "./router";
import usersAdminRouter from "../components/users/admin/usersRouter";
import usersRouter from "../components/users/front/Router"
import productAdminRouter from "../components/product/admin/Router";
import productRouter from "../components/product/front/Router";
import CategoryAdminRouter from "../components/category/admin/CategoryRouter";
import categoryRouter from "../components/category/front/Router";
import OrderRouter from "../components/order/front/Router"
import OrderAdminRouter from "../components/order/admin/OrderRouter"
import paymentAdminRouter from "../components/payment/admin/PaymentRouter"
import paymentRouter from "../components/payment/front/Router"
import CouponAdminRouter from '../components/coupon/admin/CouponRouter'
import CouponRouter from '../components/coupon/front/Router'
import authRouter from '../components/auth/authRouter'
import purchaseRouter from '../components/purchase/Router'
import HomeRouter from '../components/home/Router'
import commentRouter from '../components/comment/front/CommentRouter'
import commentAdminRouter from '../components/comment/admin/CommentRouter'


class RouteService {
  public app: Application;
  private router: RouteEngine;

  constructor(app: Application) {
    this.app = app;
    this.router = new RouteEngine();
    this.bindRouter();
  }

  public bindRouter() {
    //admin
    this.router.registerRouter("/api/v1/admin/products", productAdminRouter);
    this.router.registerRouter("/api/v1/admin/coupons", CouponAdminRouter)
    this.router.registerRouter("/api/v1/admin/users", usersAdminRouter)
    this.router.registerRouter("/api/v1/admin/payments", paymentAdminRouter)
    this.router.registerRouter("/api/v1/admin/orders", OrderAdminRouter)
    this.router.registerRouter("/api/v1/admin/categories", CategoryAdminRouter)
    this.router.registerRouter("/api/v1/admin/comments", commentAdminRouter)

    //front
    this.router.registerRouter("/api/v1/products", productRouter);
    this.router.registerRouter("/api/v1/auth", authRouter)
    this.router.registerRouter("/api/v1/users", usersRouter);
    this.router.registerRouter("/api/v1/categories", categoryRouter);
    this.router.registerRouter("/api/v1/purchase", purchaseRouter)
    this.router.registerRouter("/api/v1/payments", paymentRouter)
    this.router.registerRouter("/api/v1/coupons", CouponRouter)
    this.router.registerRouter("/api/v1/home", HomeRouter)
    this.router.registerRouter("/api/v1/orders", OrderRouter);
    this.router.registerRouter("/api/v1/comments", commentRouter)
  }

  public run() {
    this.router.getRouters().forEach((router: Router, route: string) => {
      this.app.use(route, router);
    });
  }
}

export default RouteService;
