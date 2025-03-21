import React from "react";

const latestProducts = [
  { id: 1, image: "https://m.media-amazon.com/images/I/81rxulFBZoL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 2, image: "https://m.media-amazon.com/images/I/61yw3xmGdpL._AC_UL960_FMwebp_QL65_.jpg" },
  { id: 3, image: "https://m.media-amazon.com/images/I/9168NMg+3sL._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 4, image: "https://m.media-amazon.com/images/I/61CzyMAMoHL._AC_UL480_FMwebp_QL65_.jpg" },
];

function Home() {
  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Latest Products</h2>
      <div className="row">
        {latestProducts.map((product) => (
          <div key={product.id} className="col-6 col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={`Product ${product.id}`}
                className="card-img-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
