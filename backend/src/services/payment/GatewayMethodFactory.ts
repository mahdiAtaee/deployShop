import ServerException from "../../components/exceptions/ServerException";
import onlineGateway from "./contracts/onlineGateway";
import ZarinPal from "./online/ZarinPal";

export default class GatewayMethodFactory {
    private gateways: Map<string, onlineGateway> = new Map<string, onlineGateway>()
    constructor() {
        this.gateways.set('zarinpal', new ZarinPal)
    }
    public make(gateway: string): onlineGateway {
        if (!this.gateways.has(gateway)) {
            throw new ServerException("درگاه آنلاین معتبر نمی باشد")
        }
        return this.gateways.get(gateway) as onlineGateway
    }
}