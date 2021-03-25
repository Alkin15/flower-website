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
  let rows: any = [];

  rows = flowers.reduce((rows, key, index) => {
    return (
      (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);
  return (
    <div className="pt-12">
      <Head>
        <title>Flower Basket</title>
      </Head>
      <div className="container items-center justify-between pt-4 mx-auto max">
        {rows.map((element: Flower[]) => (
          <div key={element[0].id} className="flex">
            <FlowerCart
              shopName={element[0].shop.name}
              shopSlug={element[0].shop.slug}
              key={element[0].id}
              amount={element[0].amount}
              location={element[0].shop.city + "," + element[0].shop.state}
              title={element[0].title}
              username={element[0].user.username}
              timestamp={dayjs(element[0].createdAt).fromNow()}
            />
            {element[1] && (
              <FlowerCart
                shopName={element[1].shop.name}
                shopSlug={element[1].shop.slug}
                key={element[1].id}
                amount={element[1].amount}
                location={element[1].shop.city + "," + element[1].shop.state}
                title={element[1].title}
                username={element[1].user.username}
                timestamp={dayjs(element[1].createdAt).fromNow()}
              />
            )}
            {element[2] && (
              <FlowerCart
                shopName={element[2].shop.name}
                shopSlug={element[2].shop.slug}
                key={element[2].id}
                amount={element[2].amount}
                location={element[2].shop.city + "," + element[2].shop.state}
                title={element[2].title}
                username={element[2].user.username}
                timestamp={dayjs(element[2].createdAt).fromNow()}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
