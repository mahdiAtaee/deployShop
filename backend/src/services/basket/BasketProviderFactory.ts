import IBasket from "./contracts/IBasket";
import BasketMemoryProvider from "./Providers/BasketMemoryProvider";
import BasketRedisProvider from "./Providers/BasketRedisProvider";

export default class BasketProviderFactory {
  private Providers: Map<string, IBasket> = new Map<string, IBasket>();
  constructor() {
    this.Providers.set("memory", new BasketMemoryProvider());
    this.Providers.set("redis", new BasketRedisProvider());
  }
  public registerProvider(name: string, provider: IBasket) {
    if (!this.has(name)) {
      this.Providers.set(name, provider);
    }
  }
  public getProviders(name: string): IBasket {
    if (!this.has(name)) {
        throw new Error(`Provider ${name} does not exists!`)
    }
    return this.Providers.get(name) as IBasket;
  }
  public has(name: string): boolean {
    return this.Providers.has(name);
  }
}
