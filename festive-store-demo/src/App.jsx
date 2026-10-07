import React, { useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Minus,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";

import hero from "./assets/hero.jpg";
import saree1 from "./assets/saree1.jpg";
import saree2 from "./assets/saree2.jpg";
import lehenga1 from "./assets/lehenga1.jpg";
import lehenga2 from "./assets/lehenga2.jpg";
import anarkali1 from "./assets/anarkali1.jpg";
import sharara1 from "./assets/sharara1.jpg";
import kurta1 from "./assets/kurta1.jpg";
import editorial from "./assets/editorial.jpg";

/* =========================================================
   DATA
========================================================= */

const categories = [
  "All",
  "Sarees",
  "Lehengas",
  "Anarkalis",
  "Sharara Sets",
  "Kurta Sets",
];

const products = [
  {
    id: 1,
    name: "Meher Embroidered Silk Saree",
    category: "Sarees",
    image: saree1,
    price: 6990,
    originalPrice: 8990,
    rating: 4.9,
    reviews: 124,
    badge: "Bestseller",
    description:
      "A luxurious festive silk saree detailed with delicate zari embroidery and an elegant handcrafted border.",
    colors: ["Wine", "Maroon", "Emerald"],
  },
  {
    id: 2,
    name: "Zoya Banarasi Festive Saree",
    category: "Sarees",
    image: saree2,
    price: 7490,
    originalPrice: 9990,
    rating: 4.8,
    reviews: 98,
    badge: "Festive Edit",
    description:
      "A timeless Banarasi-inspired saree designed for weddings, festive evenings and traditional celebrations.",
    colors: ["Ruby", "Gold", "Navy"],
  },
  {
    id: 3,
    name: "Noor Handwork Lehenga Set",
    category: "Lehengas",
    image: lehenga1,
    price: 12990,
    originalPrice: 16990,
    rating: 4.9,
    reviews: 87,
    badge: "New",
    description:
      "An opulent lehenga ensemble featuring intricate handwork, a statement blouse and a soft flowing dupatta.",
    colors: ["Maroon", "Rose", "Ivory"],
  },
  {
    id: 4,
    name: "Aarohi Embellished Lehenga",
    category: "Lehengas",
    image: lehenga2,
    price: 14990,
    originalPrice: 19990,
    rating: 4.9,
    reviews: 72,
    badge: "Premium",
    description:
      "A richly embellished festive lehenga crafted for wedding celebrations and glamorous festive occasions.",
    colors: ["Wine", "Plum", "Gold"],
  },
  {
    id: 5,
    name: "Ira Festive Anarkali Set",
    category: "Anarkalis",
    image: anarkali1,
    price: 8990,
    originalPrice: 11990,
    rating: 4.7,
    reviews: 64,
    badge: "Trending",
    description:
      "A graceful floor-length Anarkali with traditional embroidery and a beautifully finished festive silhouette.",
    colors: ["Emerald", "Wine", "Midnight"],
  },
  {
    id: 6,
    name: "Ruhani Embroidered Sharara",
    category: "Sharara Sets",
    image: sharara1,
    price: 7990,
    originalPrice: 10490,
    rating: 4.8,
    reviews: 53,
    badge: "Festive Edit",
    description:
      "A contemporary sharara set combining festive embroidery, flattering proportions and effortless comfort.",
    colors: ["Rose", "Maroon", "Sage"],
  },
  {
    id: 7,
    name: "Aaina Luxury Kurta Set",
    category: "Kurta Sets",
    image: kurta1,
    price: 5990,
    originalPrice: 7990,
    rating: 4.7,
    reviews: 81,
    badge: "Bestseller",
    description:
      "An elevated kurta set with refined embroidery, festive detailing and an elegant dupatta.",
    colors: ["Ivory", "Wine", "Emerald"],
  },
];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [page, setPage] = useState("home");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [wishlist, setWishlist] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [cartOpen, setCartOpen] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredProducts =
    useMemo(() => {
      let list =
        selectedCategory === "All"
          ? products
          : products.filter(
              (product) =>
                product.category ===
                selectedCategory,
            );

      if (search.trim()) {
        const value =
          search.toLowerCase();

        list = list.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(value) ||
            product.category
              .toLowerCase()
              .includes(value),
        );
      }

      return list;
    }, [selectedCategory, search]);

  const openCollection = (
    category = "All",
  ) => {
    setSelectedCategory(category);
    setPage("collection");
    setMobileMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage("product");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () => {
    setPage("home");
    setMobileMenu(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((old) => {
      if (
        old.some(
          (item) =>
            item.id === product.id,
        )
      ) {
        return old.filter(
          (item) =>
            item.id !== product.id,
        );
      }

      return [...old, product];
    });
  };

  const addToCart = (
    product,
    size = "M",
  ) => {
    setCart((old) => {
      const existing =
        old.find(
          (item) =>
            item.id === product.id &&
            item.size === size,
        );

      if (existing) {
        return old.map((item) =>
          item.id === product.id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...old,
        {
          ...product,
          size,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const updateQuantity = (
    id,
    size,
    amount,
  ) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity +
                  amount,
              }
            : item,
        )
        .filter(
          (item) =>
            item.quantity > 0,
        ),
    );
  };

  const removeCartItem = (
    id,
    size,
  ) => {
    setCart((old) =>
      old.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          ),
      ),
    );
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0,
  );

  if (page === "checkout") {
    return (
      <Checkout
        cart={cart}
        total={cartTotal}
        onBack={() =>
          setPage("collection")
        }
        onSuccess={() => {
          setCart([]);
          setPage("success");
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  if (page === "success") {
    return (
      <OrderSuccess
        onHome={goHome}
        onShop={() =>
          openCollection("All")
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-[#32191C]">
      <AnnouncementBar />

      <Navbar
        goHome={goHome}
        openCollection={
          openCollection
        }
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        mobileMenu={mobileMenu}
        setMobileMenu={
          setMobileMenu
        }
        wishlistCount={
          wishlist.length
        }
        searchOpen={searchOpen}
        setSearchOpen={
          setSearchOpen
        }
        search={search}
        setSearch={setSearch}
      />

      {page === "home" && (
        <Home
          openCollection={
            openCollection
          }
          openProduct={openProduct}
          wishlist={wishlist}
          toggleWishlist={
            toggleWishlist
          }
          addToCart={addToCart}
        />
      )}

      {page === "collection" && (
        <Collection
          products={
            filteredProducts
          }
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
          openProduct={openProduct}
          wishlist={wishlist}
          toggleWishlist={
            toggleWishlist
          }
          addToCart={addToCart}
        />
      )}

      {page === "product" &&
        selectedProduct && (
          <ProductDetails
            product={
              selectedProduct
            }
            onBack={() =>
              setPage("collection")
            }
            addToCart={
              addToCart
            }
            wishlist={wishlist}
            toggleWishlist={
              toggleWishlist
            }
          />
        )}

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cart={cart}
        total={cartTotal}
        updateQuantity={
          updateQuantity
        }
        removeCartItem={
          removeCartItem
        }
        checkout={() => {
          setCartOpen(false);
          setPage("checkout");
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

/* =========================================================
   ANNOUNCEMENT
========================================================= */

function AnnouncementBar() {
  return (
    <div className="bg-[#5A1722] px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#F8E7C2]">
      Festive Edit • Complimentary
      shipping on orders above ₹3,999
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({
  goHome,
  openCollection,
  cartCount,
  setCartOpen,
  mobileMenu,
  setMobileMenu,
  wishlistCount,
  searchOpen,
  setSearchOpen,
  search,
  setSearch,
}) {
  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-[#EADDD3] bg-[#FFFDF9]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1450px] items-center justify-between px-5 lg:px-10">
          <button
            onClick={goHome}
            className="text-left"
          >
            <h1 className="font-serif text-3xl tracking-[0.16em] text-[#5A1722]">
              AAVYA
            </h1>

            <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-[#A97D50]">
              Celebration Couture
            </p>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            <NavItem
              text="New Arrivals"
              onClick={() =>
                openCollection(
                  "All",
                )
              }
            />

            <NavItem
              text="Festive Collection"
              onClick={() =>
                openCollection(
                  "All",
                )
              }
              special
            />

            <NavItem
              text="Sarees"
              onClick={() =>
                openCollection(
                  "Sarees",
                )
              }
            />

            <NavItem
              text="Lehengas"
              onClick={() =>
                openCollection(
                  "Lehengas",
                )
              }
            />

            <NavItem
              text="Anarkalis"
              onClick={() =>
                openCollection(
                  "Anarkalis",
                )
              }
            />
          </div>

          <div className="flex items-center gap-1">
            <IconButton
              onClick={() =>
                setSearchOpen(
                  !searchOpen,
                )
              }
            >
              <Search size={19} />
            </IconButton>

            <IconButton
              className="hidden sm:flex"
            >
              <UserRound size={19} />
            </IconButton>

            <button className="relative hidden h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#F7ECE3] sm:flex">
              <Heart size={19} />

              {wishlistCount > 0 && (
                <Counter
                  value={
                    wishlistCount
                  }
                />
              )}
            </button>

            <button
              onClick={() =>
                setCartOpen(true)
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#F7ECE3]"
            >
              <ShoppingBag
                size={19}
              />

              {cartCount > 0 && (
                <Counter
                  value={cartCount}
                />
              )}
            </button>

            <button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu,
                )
              }
              className="ml-1 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              {mobileMenu ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t bg-white p-4">
            <div className="relative mx-auto max-w-3xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                autoFocus
                value={search}
                onChange={(e) => {
                  setSearch(
                    e.target.value,
                  );

                  openCollection(
                    "All",
                  );
                }}
                placeholder="Search festive styles..."
                className="h-12 w-full rounded-full border border-[#E5D4C8] bg-[#FFF9F3] pl-12 pr-5 outline-none focus:border-[#7B2734]"
              />
            </div>
          </div>
        )}
      </nav>

      {mobileMenu && (
        <div className="fixed inset-x-0 top-[111px] z-30 border-b bg-white p-5 shadow-xl lg:hidden">
          {[
            "All",
            "Sarees",
            "Lehengas",
            "Anarkalis",
            "Sharara Sets",
            "Kurta Sets",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                openCollection(
                  item,
                )
              }
              className="block w-full border-b py-4 text-left font-semibold"
            >
              {item === "All"
                ? "Festive Collection"
                : item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function NavItem({
  text,
  onClick,
  special,
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[13px] font-bold transition ${
        special
          ? "text-[#A66C2F]"
          : "text-[#4C3031] hover:text-[#7B2734]"
      }`}
    >
      {text}
    </button>
  );
}

function IconButton({
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#F7ECE3]"
    >
      {children}
    </button>
  );
}

function Counter({ value }) {
  return (
    <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7B2734] px-1 text-[9px] font-black text-white">
      {value}
    </span>
  );
}

/* =========================================================
   HOME
========================================================= */

function Home({
  openCollection,
  openProduct,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  return (
    <>
      {/* HERO */}

      <section
        className="relative min-h-[760px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#351014]/85 via-[#45151B]/45 to-transparent" />

        <div className="relative mx-auto flex min-h-[760px] max-w-[1450px] items-center px-6 lg:px-10">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 border-y border-[#E7C58B]/60 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#F2D39D]">
              <Sparkles size={15} />
              The Festive Collection
              2026
            </div>

            <h1 className="mt-7 font-serif text-6xl leading-[0.98] tracking-tight sm:text-7xl lg:text-[92px]">
              Made for
              <span className="block italic text-[#E7C58B]">
                celebration.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#F8EDE5] sm:text-lg">
              Discover timeless
              silhouettes, intricate
              craftsmanship and rich
              festive colours designed
              for your most memorable
              celebrations.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  openCollection(
                    "All",
                  )
                }
                className="flex items-center gap-3 bg-[#F4E3C4] px-8 py-4 text-xs font-black uppercase tracking-[0.12em] text-[#5A1722] transition hover:bg-white"
              >
                Shop Festive Edit
                <ArrowRight
                  size={16}
                />
              </button>

              <button
                onClick={() =>
                  openCollection(
                    "Lehengas",
                  )
                }
                className="border border-white/60 bg-white/10 px-8 py-4 text-xs font-black uppercase tracking-[0.12em] backdrop-blur transition hover:bg-white hover:text-[#5A1722]"
              >
                Explore Lehengas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}

      <section className="border-b border-[#EADDD3] bg-[#FFFDF9]">
        <div className="mx-auto grid max-w-[1450px] grid-cols-2 lg:grid-cols-4">
          <Benefit
            icon={Sparkles}
            title="Crafted With Care"
            text="Premium festive detailing"
          />

          <Benefit
            icon={Truck}
            title="Free Shipping"
            text="On orders above ₹3,999"
          />

          <Benefit
            icon={ShieldCheck}
            title="Secure Checkout"
            text="Protected payments"
          />

          <Benefit
            icon={PackageCheck}
            title="Easy Returns"
            text="7 day return policy"
          />
        </div>
      </section>

      {/* OCCASIONS */}

      <section className="mx-auto max-w-[1450px] px-5 py-24 lg:px-10">
        <SectionTitle
          eyebrow="Find your moment"
          title="Shop by Occasion"
          text="Curated festive styles for every celebration on your calendar."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OccasionCard
            title="Wedding Guest"
            subtitle="Make an entrance"
            image={lehenga1}
            onClick={() =>
              openCollection(
                "Lehengas",
              )
            }
          />

          <OccasionCard
            title="Diwali Edit"
            subtitle="Glow beautifully"
            image={saree1}
            onClick={() =>
              openCollection(
                "Sarees",
              )
            }
          />

          <OccasionCard
            title="Festive Evenings"
            subtitle="Modern traditions"
            image={anarkali1}
            onClick={() =>
              openCollection(
                "Anarkalis",
              )
            }
          />

          <OccasionCard
            title="Mehendi & Haldi"
            subtitle="Joy in every colour"
            image={sharara1}
            onClick={() =>
              openCollection(
                "Sharara Sets",
              )
            }
          />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="bg-[#F8EEE5] py-24">
        <div className="mx-auto max-w-[1450px] px-5 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionTitle
              align="left"
              eyebrow="Our favourites"
              title="Festive Bestsellers"
              text="Pieces loved for their craftsmanship, elegance and effortless celebration-ready style."
            />

            <button
              onClick={() =>
                openCollection(
                  "All",
                )
              }
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#6D1F2A]"
            >
              View Collection
              <ArrowRight
                size={16}
              />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {products
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  openProduct={
                    openProduct
                  }
                  wishlist={
                    wishlist
                  }
                  toggleWishlist={
                    toggleWishlist
                  }
                  addToCart={
                    addToCart
                  }
                />
              ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}

      <section className="mx-auto max-w-[1450px] px-5 py-24 lg:px-10">
        <div className="grid overflow-hidden bg-[#571B25] lg:grid-cols-2">
          <div className="min-h-[500px]">
            <img
              src={editorial}
              alt="Celebration Edit"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center px-8 py-14 text-white sm:px-14 lg:px-20">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#E8C890]">
                AAVYA EDIT
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">
                The Celebration
                <span className="block italic text-[#E7C58B]">
                  Edit.
                </span>
              </h2>

              <p className="mt-6 max-w-lg leading-8 text-[#F1DFD9]">
                From intimate festive
                gatherings to grand
                wedding celebrations,
                discover pieces that
                honour tradition while
                embracing modern
                femininity.
              </p>

              <button
                onClick={() =>
                  openCollection(
                    "All",
                  )
                }
                className="mt-8 flex items-center gap-3 border-b border-[#E7C58B] pb-2 text-xs font-black uppercase tracking-[0.15em] text-[#F2D39D]"
              >
                Discover the edit
                <ArrowRight
                  size={16}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY STYLE */}

      <section className="border-y border-[#EADDD3] bg-white py-24">
        <div className="mx-auto max-w-[1450px] px-5 lg:px-10">
          <SectionTitle
            eyebrow="Find your style"
            title="The Festive Wardrobe"
            text="From timeless drapes to contemporary silhouettes."
          />

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {categories
              .filter(
                (item) =>
                  item !== "All",
              )
              .map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    openCollection(
                      item,
                    )
                  }
                  className="rounded-full border border-[#DCC7B8] px-6 py-3 text-sm font-bold text-[#5A3435] transition hover:border-[#6D1F2A] hover:bg-[#6D1F2A] hover:text-white"
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section className="mx-auto max-w-6xl px-5 py-24 text-center">
        <div className="flex justify-center gap-1 text-[#B27A32]">
          {[1, 2, 3, 4, 5].map(
            (item) => (
              <Star
                key={item}
                size={18}
                fill="currentColor"
              />
            ),
          )}
        </div>

        <blockquote className="mx-auto mt-7 max-w-4xl font-serif text-3xl leading-relaxed text-[#4D292D] sm:text-4xl">
          “The detailing is
          beautiful and the outfit
          looked even better in
          person. It felt elegant,
          festive and incredibly
          special.”
        </blockquote>

        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#A47851]">
          — Riya • Verified Customer
        </p>
      </section>

      <Footer
        openCollection={
          openCollection
        }
      />
    </>
  );
}

/* =========================================================
   HOME HELPERS
========================================================= */

function Benefit({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex items-center justify-center gap-3 border-r border-[#EADDD3] px-4 py-6">
      <Icon
        size={20}
        className="text-[#8A3A42]"
      />

      <div>
        <p className="text-xs font-black text-[#4C292C]">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[#987979]">
          {text}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  align = "center",
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#A96E38]">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-4xl text-[#541A24] sm:text-5xl">
        {title}
      </h2>

      <p className="mt-4 leading-7 text-[#85696A]">
        {text}
      </p>
    </div>
  );
}

function OccasionCard({
  title,
  subtitle,
  image,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group relative min-h-[480px] overflow-hidden bg-[#5A1722] text-left"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E9C58B]">
          {subtitle}
        </p>

        <h3 className="mt-2 font-serif text-3xl">
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
          Shop now
          <ArrowRight
            size={15}
          />
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   COLLECTION
========================================================= */

function Collection({
  products,
  selectedCategory,
  setSelectedCategory,
  openProduct,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const [sort, setSort] =
    useState("Featured");

  let sorted = [...products];

  if (sort === "Low to High") {
    sorted.sort(
      (a, b) =>
        a.price - b.price,
    );
  }

  if (sort === "High to Low") {
    sorted.sort(
      (a, b) =>
        b.price - a.price,
    );
  }

  return (
    <>
      <section className="bg-[#641F2A] px-5 py-16 text-center text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E7C58B]">
          AAVYA • FESTIVE 2026
        </p>

        <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
          Women’s Festive
          Collection
        </h1>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#F1DCDD]">
          A celebration of colour,
          craft and timeless Indian
          silhouettes designed for
          unforgettable occasions.
        </p>
      </section>

      <section className="mx-auto max-w-[1450px] px-5 py-10 lg:px-10">
        <div className="flex flex-col justify-between gap-5 border-b border-[#E4D4C9] pb-6 lg:flex-row lg:items-center">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category,
                    )
                  }
                  className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold ${
                    selectedCategory ===
                    category
                      ? "bg-[#681F2A] text-white"
                      : "border border-[#DDC9BB] bg-white text-[#66494A]"
                  }`}
                >
                  {category}
                </button>
              ),
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#987A79]">
              {products.length} styles
            </span>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value,
                )
              }
              className="rounded-full border border-[#DDC9BB] bg-white px-5 py-2.5 text-xs font-bold outline-none"
            >
              <option>
                Featured
              </option>

              <option>
                Low to High
              </option>

              <option>
                High to Low
              </option>
            </select>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                openProduct={
                  openProduct
                }
                wishlist={
                  wishlist
                }
                toggleWishlist={
                  toggleWishlist
                }
                addToCart={
                  addToCart
                }
              />
            ),
          )}
        </div>

        {sorted.length === 0 && (
          <div className="py-24 text-center">
            <ShoppingBag
              className="mx-auto text-[#C6A9A0]"
              size={40}
            />

            <h3 className="mt-5 font-serif text-3xl text-[#5A1722]">
              No styles found
            </h3>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  product,
  openProduct,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  const loved = wishlist.some(
    (item) =>
      item.id === product.id,
  );

  const discount = Math.round(
    ((product.originalPrice -
      product.price) /
      product.originalPrice) *
      100,
  );

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EFE2D8]">
        <button
          onClick={() =>
            openProduct(product)
          }
          className="h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </button>

        <span className="absolute left-3 top-3 bg-[#FFF9EF] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#6D1F2A]">
          {product.badge}
        </span>

        <button
          onClick={() =>
            toggleWishlist(
              product,
            )
          }
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow"
        >
          <Heart
            size={17}
            className={
              loved
                ? "fill-[#7B2734] text-[#7B2734]"
                : ""
            }
          />
        </button>

        <button
          onClick={() =>
            addToCart(product)
          }
          className="absolute inset-x-4 bottom-4 translate-y-20 bg-[#5D1B25] py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition duration-300 group-hover:translate-y-0"
        >
          Quick Add
        </button>
      </div>

      <div className="pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#A47755]">
          {product.category}
        </p>

        <button
          onClick={() =>
            openProduct(product)
          }
          className="mt-1 text-left"
        >
          <h3 className="font-serif text-lg text-[#49282A] transition hover:text-[#7B2734]">
            {product.name}
          </h3>
        </button>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-black text-[#4A282B]">
            ₹
            {product.price.toLocaleString(
              "en-IN",
            )}
          </span>

          <span className="text-xs text-[#A18B87] line-through">
            ₹
            {product.originalPrice.toLocaleString(
              "en-IN",
            )}
          </span>

          <span className="text-[10px] font-black text-emerald-700">
            {discount}% OFF
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[11px] text-[#7A6362]">
          <Star
            size={12}
            fill="#A87534"
            className="text-[#A87534]"
          />

          {product.rating}
          <span className="text-[#BCAAA4]">
            ({product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PRODUCT DETAILS
========================================================= */

function ProductDetails({
  product,
  onBack,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [size, setSize] =
    useState("M");

  const loved = wishlist.some(
    (item) =>
      item.id === product.id,
  );

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10 lg:py-14">
        <button
          onClick={onBack}
          className="mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#78595A]"
        >
          <ArrowLeft size={15} />
          Back to collection
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden bg-[#EFE2D8]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A66C35]">
              {product.category} •{" "}
              {product.badge}
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight text-[#511A23] sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-[#AD7837]">
                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <Star
                      key={item}
                      size={14}
                      fill="currentColor"
                    />
                  ),
                )}
              </div>

              <span className="text-xs text-[#927675]">
                {product.rating} •{" "}
                {product.reviews} reviews
              </span>
            </div>

            <div className="mt-7 flex items-end gap-3">
              <p className="text-2xl font-black text-[#3E2426]">
                ₹
                {product.price.toLocaleString(
                  "en-IN",
                )}
              </p>

              <p className="pb-1 text-sm text-[#A38D89] line-through">
                ₹
                {product.originalPrice.toLocaleString(
                  "en-IN",
                )}
              </p>
            </div>

            <p className="mt-2 text-xs font-semibold text-emerald-700">
              Inclusive of all taxes
            </p>

            <p className="mt-7 max-w-xl leading-8 text-[#765B5C]">
              {product.description}
            </p>

            <div className="mt-8 border-t border-[#E4D4C9] pt-7">
              <div className="flex justify-between">
                <p className="text-xs font-black uppercase tracking-[0.12em]">
                  Select Size
                </p>

                <button className="text-xs font-bold text-[#8B5C37] underline">
                  Size Guide
                </button>
              </div>

              <div className="mt-4 flex gap-3">
                {[
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                ].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setSize(
                          item,
                        )
                      }
                      className={`flex h-12 w-12 items-center justify-center border text-xs font-black ${
                        size === item
                          ? "border-[#681F2A] bg-[#681F2A] text-white"
                          : "border-[#D9C5B7] bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() =>
                  addToCart(
                    product,
                    size,
                  )
                }
                className="flex h-14 flex-1 items-center justify-center gap-2 bg-[#641F2A] text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#49151C]"
              >
                <ShoppingBag
                  size={17}
                />
                Add to Bag
              </button>

              <button
                onClick={() =>
                  toggleWishlist(
                    product,
                  )
                }
                className="flex h-14 w-14 items-center justify-center border border-[#D5C1B3]"
              >
                <Heart
                  className={
                    loved
                      ? "fill-[#681F2A] text-[#681F2A]"
                      : ""
                  }
                />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(
                  product,
                  size,
                );
              }}
              className="mt-3 h-14 w-full border border-[#641F2A] text-xs font-black uppercase tracking-[0.12em] text-[#641F2A]"
            >
              Buy Now
            </button>

            <div className="mt-8 divide-y border-y border-[#E4D4C9]">
              <DetailRow
                title="Product Details"
              />

              <DetailRow
                title="Shipping & Returns"
              />

              <DetailRow
                title="Care Instructions"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function DetailRow({ title }) {
  return (
    <button className="flex w-full items-center justify-between py-5 text-left text-sm font-bold">
      {title}
      <ChevronDown size={17} />
    </button>
  );
}

/* =========================================================
   CART
========================================================= */

function CartDrawer({
  open,
  setOpen,
  cart,
  total,
  updateQuantity,
  removeCartItem,
  checkout,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        onClick={() =>
          setOpen(false)
        }
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col bg-[#FFFDF9] shadow-2xl">
        <div className="flex h-20 items-center justify-between border-b px-6">
          <div>
            <h2 className="font-serif text-2xl text-[#551B24]">
              Your Bag
            </h2>

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#9D7D76]">
              {cart.length} item(s)
            </p>
          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag
                size={44}
                className="text-[#CBB4A8]"
              />

              <h3 className="mt-5 font-serif text-3xl text-[#5A1722]">
                Your bag is empty
              </h3>

              <p className="mt-2 text-sm text-[#947776]">
                Add something
                beautiful for your
                next celebration.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map(
                (item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 border-b border-[#E8DAD0] pb-6"
                  >
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="h-32 w-24 object-cover"
                    />

                    <div className="flex flex-1 flex-col">
                      <h4 className="font-serif text-lg text-[#4D282B]">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-[#9A7D79]">
                        Size:{" "}
                        {item.size}
                      </p>

                      <p className="mt-2 text-sm font-black">
                        ₹
                        {item.price.toLocaleString(
                          "en-IN",
                        )}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                -1,
                              )
                            }
                            className="p-2"
                          >
                            <Minus
                              size={
                                13
                              }
                            />
                          </button>

                          <span className="px-2 text-xs font-bold">
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                1,
                              )
                            }
                            className="p-2"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeCartItem(
                              item.id,
                              item.size,
                            )
                          }
                          className="text-[#A16A66]"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t bg-white p-6">
            <div className="flex justify-between">
              <span className="font-semibold">
                Subtotal
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN",
                )}
              </strong>
            </div>

            <p className="mt-2 text-[10px] text-[#9B7E79]">
              Shipping and taxes
              calculated at checkout.
            </p>

            <button
              onClick={checkout}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 bg-[#641F2A] text-xs font-black uppercase tracking-[0.14em] text-white"
            >
              Proceed to Checkout
              <ArrowRight
                size={15}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   CHECKOUT
========================================================= */

function Checkout({
  cart,
  total,
  onBack,
  onSuccess,
}) {
  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const finalTotal =
    total - discount;

  return (
    <div className="min-h-screen bg-[#F8F2EC]">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold"
          >
            <ArrowLeft
              size={15}
            />
            Continue Shopping
          </button>

          <h1 className="font-serif text-2xl tracking-[0.15em] text-[#5A1722]">
            AAVYA
          </h1>

          <ShieldCheck
            className="text-[#6D1F2A]"
          />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <CheckoutBox
            title="Contact Information"
          >
            <input
              placeholder="Email address"
              className="input"
            />

            <input
              placeholder="Phone number"
              className="input"
            />
          </CheckoutBox>

          <CheckoutBox
            title="Shipping Address"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="First name"
                className="input"
              />

              <input
                placeholder="Last name"
                className="input"
              />
            </div>

            <input
              placeholder="Address"
              className="input"
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <input
                placeholder="City"
                className="input"
              />

              <input
                placeholder="State"
                className="input"
              />

              <input
                placeholder="PIN code"
                className="input"
              />
            </div>
          </CheckoutBox>

          <CheckoutBox
            title="Payment"
          >
            <div className="rounded-xl border border-[#6D1F2A] bg-[#FFF8F4] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#6D1F2A]" />

                <div>
                  <p className="text-sm font-black">
                    Card / UPI
                  </p>

                  <p className="text-xs text-[#987D79]">
                    Secure dummy
                    payment for demo
                  </p>
                </div>
              </div>
            </div>
          </CheckoutBox>

          <button
            onClick={onSuccess}
            disabled={
              cart.length === 0
            }
            className="h-14 w-full bg-[#641F2A] text-xs font-black uppercase tracking-[0.14em] text-white disabled:opacity-40"
          >
            Pay ₹
            {finalTotal.toLocaleString(
              "en-IN",
            )}
          </button>
        </div>

        <aside className="h-fit rounded-2xl border bg-white p-6">
          <h2 className="font-serif text-2xl text-[#541A24]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart.map(
              (item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-3"
                >
                  <img
                    src={item.image}
                    className="h-20 w-16 object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {item.name}
                    </p>

                    <p className="text-xs text-[#9B817D]">
                      Size{" "}
                      {item.size} •
                      Qty{" "}
                      {
                        item.quantity
                      }
                    </p>
                  </div>

                  <p className="text-xs font-black">
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 flex gap-2 border-t pt-5">
            <input
              value={coupon}
              onChange={(e) =>
                setCoupon(
                  e.target.value,
                )
              }
              placeholder="Coupon code"
              className="h-11 flex-1 border px-3 text-sm outline-none"
            />

            <button
              onClick={() => {
                if (
                  coupon
                    .trim()
                    .toUpperCase() ===
                  "FESTIVE10"
                ) {
                  setDiscount(
                    Math.round(
                      total * 0.1,
                    ),
                  );
                }
              }}
              className="bg-[#5A1722] px-5 text-xs font-black text-white"
            >
              Apply
            </button>
          </div>

          <p className="mt-2 text-[10px] text-[#A0837D]">
            Demo coupon:
            FESTIVE10
          </p>

          <div className="mt-6 space-y-3 border-t pt-5 text-sm">
            <SummaryRow
              label="Subtotal"
              value={`₹${total.toLocaleString(
                "en-IN",
              )}`}
            />

            <SummaryRow
              label="Shipping"
              value="FREE"
            />

            {discount > 0 && (
              <SummaryRow
                label="Festive Discount"
                value={`-₹${discount.toLocaleString(
                  "en-IN",
                )}`}
              />
            )}

            <div className="flex justify-between border-t pt-4 text-lg font-black">
              <span>Total</span>

              <span>
                ₹
                {finalTotal.toLocaleString(
                  "en-IN",
                )}
              </span>
            </div>
          </div>
        </aside>
      </main>

      <style>{`
        .input {
          width: 100%;
          height: 52px;
          border: 1px solid #dfcec4;
          background: white;
          padding: 0 15px;
          outline: none;
          font-size: 14px;
        }

        .input:focus {
          border-color: #6d1f2a;
        }
      `}</style>
    </div>
  );
}

function CheckoutBox({
  title,
  children,
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="font-serif text-2xl text-[#541A24]">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between text-[#755B59]">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   SUCCESS
========================================================= */

function OrderSuccess({
  onHome,
  onShop,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8EFE7] p-5">
      <div className="w-full max-w-xl bg-white px-7 py-14 text-center shadow-xl sm:px-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF5EC] text-emerald-700">
          <Check size={36} />
        </div>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.25em] text-[#A47444]">
          Order Confirmed
        </p>

        <h1 className="mt-3 font-serif text-5xl text-[#581B25]">
          Thank you.
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-[#836968]">
          Your festive favourites
          are on their way. This is
          a demo order and no payment
          has been processed.
        </p>

        <div className="mt-7 rounded-xl bg-[#FFF8F2] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A0837B]">
            Order Number
          </p>

          <p className="mt-1 font-black text-[#5A1722]">
            AAVYA-2026-1048
          </p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={onShop}
            className="bg-[#641F2A] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white"
          >
            Continue Shopping
          </button>

          <button
            onClick={onHome}
            className="border border-[#641F2A] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[#641F2A]"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({
  openCollection = () => {},
}) {
  return (
    <footer className="bg-[#3C1117] text-white">
      <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <h2 className="font-serif text-3xl tracking-[0.15em]">
            AAVYA
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-7 text-[#CDAFB0]">
            Contemporary Indian
            occasion wear celebrating
            craftsmanship, tradition
            and modern femininity.
          </p>
        </div>

        <FooterColumn
          title="Shop"
          items={[
            "New Arrivals",
            "Festive Collection",
            "Sarees",
            "Lehengas",
            "Anarkalis",
          ]}
          onClick={
            openCollection
          }
        />

        <FooterColumn
          title="Customer Care"
          items={[
            "Contact Us",
            "Shipping",
            "Returns",
            "Size Guide",
            "Track Order",
          ]}
        />

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#E2C08D]">
            The AAVYA Letter
          </h3>

          <p className="mt-4 text-sm leading-6 text-[#CDAFB0]">
            New collections,
            festive edits and
            stories from our world.
          </p>

          <div className="mt-5 flex border-b border-[#A47678]">
            <input
              placeholder="Your email"
              className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9E7C7E]"
            />

            <button>
              <ArrowRight
                size={17}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-[#A98B8D] md:flex-row">
          <span>
            © 2026 AAVYA. Demo
            storefront.
          </span>

          <span>
            Privacy • Terms •
            Payments
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  onClick,
}) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#E2C08D]">
        {title}
      </h3>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => {
              if (!onClick) return;

              const category =
                categories.includes(
                  item,
                )
                  ? item
                  : "All";

              onClick(category);
            }}
            className="block text-sm text-[#CDAFB0] transition hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}