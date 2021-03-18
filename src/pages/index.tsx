import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import FlowerCart from "../components/FlowerCart";
import { Flower } from "../types";

dayjs.extend(relativeTime);

export default function Home() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  useEffect(() => {
    Axios.get("/flower")
      .then((res) => setFlowers(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pt-12">
      <Head>
        <title>Flower Basket</title>
      </Head>
      <div className="container flex pt-4">
        {/* flowers */}
        <div className="flex w-full">
          {flowers.map((flower) => (
            <FlowerCart
              shopName={flower.shop.name}
              shopSlug={flower.shop.slug}
              key={flower.id}
              amount={flower.amount}
              location={flower.shop.city + "," + flower.shop.state}
              title={flower.title}
              username={flower.user.username}
              timestamp={dayjs(flower.createdAt).fromNow()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
