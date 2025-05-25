/* eslint-disable react/prop-types */
import BestSellers from "@/components/home/BestSellers";
import Header from "@/components/home/Header";
import Latests from "@/components/home/Latests";
import MostViewed from "@/components/home/MostViewed";
import Popular from "@/components/home/Popular";
import ShopLayout from "@/components/layouts/Shop";
import React from "react";
import * as API from '../services/api'
import Banner from "@/components/home/Banner";
import SmallBanner from "@/components/home/SmallBanner";
import DiscountedProduct from "@/components/home/DiscountedProduct";

export default function Home(props) {
  return (
    <div>
      <ShopLayout title="فروشگاه">
        <Header products={props.popular}/>
        <BestSellers products={props.best_sellers} />
        <Banner />
        <MostViewed products={props.most_viewed} />
        <SmallBanner />
        <Latests products={props.latest} />
        <DiscountedProduct products={props.popular}/>
        <Popular products={props.popular} />
      </ShopLayout>
    </div>
  );
}

export async function getStaticProps() {
  const result = await API.get('/home')
  
  return {
    props: {
      best_sellers: result.data.best_sellers,
      most_viewed: result.data.most_viewed,
      popular: result.data.popular,
      latest: result.data.latest
    }
  }
}
