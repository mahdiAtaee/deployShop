import IPaymentRequest from "../contracts/IPaymentRequest";
import IPaymentVerify from "../contracts/IPaymentVerify";
import PaymentGateway from "../contracts/onlineGateway";
import * as ZarinPalCheckout from "zarinpal-checkout";

export default class ZarinPal implements PaymentGateway {
    constructor() { }
    public async paymentRequest(request: IPaymentRequest): Promise<any> {
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const appUrl = process.env.APP_URL
        const zarinpal = ZarinPalCheckout.create(merchant as string, Number(sandbox) ? true : false);

        const requestResult = await zarinpal
            .PaymentRequest({
                Amount: request.amount, // In Tomans
                CallbackURL: `${appUrl}/payment/verify/zarinpal`,
                Description: request.description,
            })

        if (requestResult && requestResult.status === 100) {
            return {
                success: true,
                url: requestResult.url
            }
        }
        return {
            success: false
        }
    }
    public async paymentVerify(verify: IPaymentVerify): Promise<any> {
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const zarinpal = ZarinPalCheckout.create(merchant as string, Number(sandbox) ? true : false);

        const verifyResult = await zarinpal
            .PaymentVerification({
                Amount: verify.amount, // In Tomans
                Authority: verify.refID,
            })

        if (verifyResult && verifyResult.status === 100) {
            return {
                success: true,
                refID: verifyResult.refId
            }
        }
        return {
            success: false
        }
    }

}