import { Image } from "lucide-react";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: "AeroMax Pro",
      price: "$179.99",
      originalPrice: "$219.99",
      color: "Electric Blue",
      image: "/images/Adobe Express - file (1).png",
      features: ["Lightweight", "Breathable", "Durable"]
    },
    {
      id: 2,
      name: "RunForce Elite",
      price: "$199.99",
      originalPrice: "$249.99",
      color: "Sunset Orange",
      image: "/images/erasebg-transformed (2).png",
      features: ["Energy Return", "Cushioned", "Flexible"]
    },
    {
      id: 3,
      name: "UrbanStyle X",
      price: "$159.99",
      originalPrice: "$189.99",
      color: "Forest Green",
      image: "/images/3.png",
      features: ["Street Style", "Comfortable", "Versatile"]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const productsTimer = setTimeout(() => {
      setProductsVisible(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(productsTimer);
    };
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleProductHover = (productId) => {
    // Future functionality placeholder
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Hero Section */}
      <div
        className={`max-w-6xl w-full transition-all duration-1000 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        {/* Main Product Showcase */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Large Typography Overlay */}
          <div className="absolute top-8 left-8 z-20">
            <h1 className="text-6xl sm:text-8xl font-black text-white leading-none drop-shadow-lg animate-productBob">
              shoe<span className="text-blue-400">Wave</span>
            </h1>
            <p className="text-lg text-white mt-2 font-medium drop-shadow-md">
              Sneakers 2024 Limited Edition
            </p>
          </div>

          {/* Main Product Video */}
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              poster="/images/product 1.jpeg"
            >
              <source
                src="/images/Nike Air Max 270 - Animation - Trim.mp4"
                type="video/mp4"
              />
              <source
                src="/path-to-your-shoe-animation.webm"
                type="video/webm"
              />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-black/30 z-10"></div>

            {!videoLoaded && (
              <img
                src="/images/product 1.jpeg"
                alt="Premium Sneakers"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Featured Products */}
        <div
          className={`mt-16 transition-all duration-1000 transform ${
            productsVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-800 mb-4">
              Featured <span className="text-blue-600">Products</span>
            </h2>
          </div>

          <div className="relative min-h-[600px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-12 h-full items-center">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`transform transition-all duration-700 hover:scale-105 animate-productFloat${
                    index + 1
                  }`}
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    animationFillMode: "both"
                  }}
                  onMouseEnter={() => handleProductHover(product.id)}
                >
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      SALE
                    </div>

                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 animate-productBob">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-3">
                        {product.color}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-green-400">
                          {product.price}
                        </span>
                        <span className="text-sm text-white/50 line-through">
                          {product.originalPrice}
                        </span>
                      </div>

                      <div className="flex flex-wrap justify-center gap-1 mb-6">
                        {product.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm border border-white/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: "⚡",
              title: "Fast Delivery",
              desc: "Get your shoes delivered in 24 hours"
            },
            {
              icon: "🛡️",
              title: "Quality Guarantee",
              desc: "Premium materials and craftsmanship"
            },
            {
              icon: "🔄",
              title: "Easy Returns",
              desc: "30-day hassle-free return policy"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-slideUp`}
              style={{
                animationDelay: `${2000 + index * 200}ms`,
                animationFillMode: "forwards"
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes floatParticle1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.4; }
          50% { transform: translate(-10px, -15px) scale(1.2); opacity: 0.8; }
        }
        @keyframes floatParticle2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
          50% { transform: translate(8px, -10px) scale(0.8); opacity: 0.3; }
        }
        @keyframes floatParticle3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.5; }
          50% { transform: translate(-5px, -18px) scale(1.3); opacity: 0.9; }
        }
        @keyframes productFloat1,
        @keyframes productFloat2,
        @keyframes productFloat3 {
          0% { opacity: 0; transform: translateY(50px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes productBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes miniFloat1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
          50% { transform: translate(-5px, -8px) scale(1.2); opacity: 1; }
        }
        @keyframes miniFloat2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.4; }
          50% { transform: translate(3px, -6px) scale(0.8); opacity: 0.8; }
        }
        @keyframes miniFloat3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.5; }
          50% { transform: translate(-3px, -10px) scale(1.3); opacity: 0.9; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-floatParticle1 { animation: floatParticle1 2s ease-in-out infinite; }
        .animate-floatParticle2 { animation: floatParticle2 2.5s ease-in-out infinite 0.3s; }
        .animate-floatParticle3 { animation: floatParticle3 2.2s ease-in-out infinite 0.7s; }
        .animate-productFloat1 { animation: productFloat1 0.8s ease-out; }
        .animate-productFloat2 { animation: productFloat2 1s ease-out; }
        .animate-productFloat3 { animation: productFloat3 1.2s ease-out; }
        .animate-productBob { animation: productBob 3s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 1s ease forwards; }
      `}</style>
    </section>
  );
};

export default Home;
