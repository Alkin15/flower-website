import Link from "next/link";

interface FlowerCart {
  amount: bigint;
  title: string;
  shopName: string;
  location: string;
  shopSlug: string;
  username: String;
  timestamp: any;
}

const FlowerCart: React.FC<FlowerCart> = ({
  amount,
  title,
  shopName,
  shopSlug,
  location,
  username,
  timestamp,
}) => {
  return (
    <div className="w-full max-w-sm mt-2 ml-2 overflow-hidden bg-white border rounded shadow">
      <div className="relative">
        <div
          className="h-48 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url(https://picsum.photos/245/245)" }}
        ></div>
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          className="absolute bottom-0 px-2 py-1 mb-2 ml-3 text-sm text-white rounded"
        >
          {amount} $
        </div>
        <div style={{ bottom: "-20px" }} className="absolute right-0 w-10 mr-2">
          <a href="#">
            <img
              className="border-2 border-white rounded-full"
              src="https://randomuser.me/api/portraits/women/17.jpg"
            />
          </a>
        </div>
      </div>
      <div className="p-3">
        <h3 className="mr-10 text-sm truncate-2nd">
          <a
            className="hover:text-blue-500"
            href="/huawwei-p20-pro-complete-set-with-box-a.7186128376"
          >
            {title}
          </a>
        </h3>
        <div className="flex items-start justify-between">
          <Link href={`/${shopSlug}`}>
            <a className="text-xs font-bold text-gray-500 hover:underline">
              {shopName}
            </a>
          </Link>
          <p className="text-xs font-bold text-gray-500">{location}</p>

          <button
            className="text-xs text-gray-500 outline hover:text-blue-500"
            title="Bookmark this ad"
          >
            <i className="far fa-bookmark"></i>
          </button>
        </div>
        <p className="text-xs text-gray-500">
          <a href="#" className="hover:underline hover:text-blue-500">
            {username}
          </a>{" "}
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default FlowerCart;
