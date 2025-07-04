import IPaymentRequest from "./IPaymentRequest"
import IPaymentVerify from "./IPaymentVerify"

export default interface onlineGateway {
    paymentRequest(request: IPaymentRequest): any
    paymentVerify(verify: IPaymentVerify): any
}