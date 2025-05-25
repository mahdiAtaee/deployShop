import IProduct from "src/components/product/model/IProduct";
import IBasket from "../contracts/IBasket";

class BasketMemoryProvider implements IBasket {
  private basketItems: IProduct[] = [];
  public add(product: IProduct): void {
    if (!this.has(product)) {
    }
    this.has(product)
      .then((result) => {
        if (!result) {
          this.basketItems.push(product);
        }
      })
      .catch((error) => console.log("product not exists on basket"));
  }
  public remove(product: IProduct): void {
    this.has(product)
      .then((result) => {
        if (result) {
          this.basketItems.splice(this.basketItems.indexOf(product), 1);
        }
      })
      .catch((error) => console.log("product not exists on basket"));
  }
  public items(): Promise<IProduct[]> {
    return Promise.resolve(this.basketItems);
  }
  public count(): Promise<number> {
    return Promise.resolve(this.basketItems.length);
  }
  public clear(): void {
    this.basketItems = [];
  }
  public total(): Promise<number> {
    const totalBasket = this.basketItems.reduce((total, product: IProduct) => {
      return total + product.price;
    }, 0);
    return Promise.resolve(totalBasket);
  }
  public async has(product: IProduct): Promise<boolean> {
    return await this.basketItems.includes(product);
  }
}

export default BasketMemoryProvider;
