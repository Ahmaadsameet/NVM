const productImage = (category, filename) =>
  `/assets/products/${category}/${encodeURIComponent(filename.replace(/\.jpg$/i, ".jpg"))}`;

// Images used by the capabilities cards.
export const capabilityImages = {
  denim: "/assets/covers/denim.png",
  leather: "/assets/covers/leatherwear.png",
  biker: "/assets/covers/bikerwear.png",
  fashion: "/assets/covers/tracksuits.png",
  knit: "/assets/covers/hoodies.png",
  sport: "/assets/covers/gray-tshirt.png"
};

export const capabilityGalleries = {
  denim: [
    "01. Straight Jeans Mid Blue.jpg",
    "02. Straight Jeans Dark Blue.jpg",
    "03. Straight Jeans Washed Black.jpg",
    "04. Straight Jeans Vintage Wash.jpg",
    "05. Cargo Jeans Blue.jpg",
    "06. Denim Jorts.jpg",
    "07. Carpenter Jeans Light Blue.jpg",
    "08. Carpenter Jeans Washed Black.jpg",
    "09. Denim Shorts Light Blue.jpg",
    "10. Denim Shorts Washed Black.jpg"
  ].map((filename) => productImage("fashionwear/denim", filename)),
  leather: [
    "01. Leather Bomber Front.jpg",
    "02. Leather Bomber Back.jpg",
    "03. Leather Blouson Front.jpg",
    "04. Leather Blouson Back.jpg",
    "05. Leather Trucker Jacket Front.jpg",
    "06. Leather Trucker Jacket Back.jpg",
    "07. Distressed Lace-Up Jacket Front.jpg",
    "08. Distressed Lace-Up Jacket Back.jpg",
    "09. Leather Bomber Worn.jpg",
    "10. Leather Trucker Worn.jpg",
    "11. Distressed Lace-Up Worn.jpg",
    "12. Lace-Up Detail.jpg"
  ].map((filename) => productImage("fashionwear/leather", filename)),
  fashion: [
    "01. Rhinestone Track Jacket Front.jpg",
    "02. Rhinestone Track Jacket Back.jpg",
    "03. Rhinestone D Detail.jpg",
    "04. Track Jacket Front.jpg",
    "05. Track Jacket Back.jpg",
    "06. Hooded Track Jacket Front.jpg",
    "07. Hooded Track Jacket Back.jpg",
    "08. Track Pants.jpg",
    "09. Cargo Track Pants.jpg",
    "10. Track Set Worn.jpg"
  ].map((filename) => productImage("fashionwear/tracksuits", filename)),
  knit: [
    "01. D-Logo Hoodie Washed Black.jpg",
    "03. Hoodie Blue.jpg",
    "04. Hoodie Olive.jpg",
    "05. Hoodie Cream.jpg",
    "06. Zip Hoodie Black.jpg",
    "07. Printed Half-Zip Sweater Lilac.jpg",
    "08. Printed Half-Zip Sweater Teal.jpg",
    "09. Printed Crewneck Teal.jpg",
    "10. Printed Crewneck Teal Back.jpg",
    "11. Gradient Crewneck Washed Grey.jpg",
    "12. Crewneck Orange.jpg"
  ].map((filename) => productImage("fashionwear/hoodies", filename)),
  sport: [
    "1. Jogger Washed Black.jpg",
    "2. Gradient Jogger Washed Grey.jpg",
    "3. Printed Jogger Teal.jpg",
    "4. Printed Jogger Lilac.jpg",
    "5. Jogger Blue.jpg",
    "6. Jogger Cream.jpg",
    "7. Sweat Shorts Black.jpg",
    "8. Sweat Shorts Blue.jpg"
  ].map((filename) => productImage("fashionwear/joggers-shorts", filename))
};

// Images used by the selected work gallery.
export const selectedWorkImages = [
  capabilityImages.denim,
  productImage("fashionwear/denim", "06. Denim Jorts.jpg"),
  capabilityImages.leather,
  capabilityImages.biker,
  capabilityImages.fashion
];

export const bikerGroups = [
  {
    id: "jeans",
    name: {"en": "Aramid jeans", "de": "Aramid-Jeans"},
    images: [
      "1. Aramid Jeans Steel Blue.jpg",
      "2. Aramid Jeans Raw Blue.jpg",
      "3. Aramid Jeans Dark Grey.jpg",
      "4. Aramid Jeans Phantom Grey.jpg",
      "5. Aramid Jeans Navy Washed.jpg",
      "6. Aramid Carpenter Jeans Black.jpg",
      "7. Aramid Jeans Stone Washed Blue.jpg",
      "8. Aramid Carpenter Jeans Stone Blue.jpg"
    ].map((filename) => productImage("bikerwear/aramid-jeans", filename))
  },
  {
    id: "hoodies",
    name: {"en": "Hoodies and racing zippers", "de": "Hoodies und Racing Zipper"},
    images: [
      "1. Aramid Hoodie Black.jpg",
      "2. Aramid Hoodie Orbit Blue.jpg",
      "3. Aramid Hoodie Marine Grey.jpg",
      "4. Aramid Hoodie Light Grey.jpg",
      "5. Aramid Zip Hoodie Orbit Blue.jpg",
      "6. Aramid Zip Hoodie Light Grey.jpg",
      "7. Aramid Racing Zipper Black.jpg",
      "8. Aramid Racing Zipper Green.jpg",
      "9. Aramid Racing Zipper White.jpg"
    ].map((filename) => productImage("bikerwear/hoodies", filename))
  },
  {
    id: "joggers",
    name: {"en": "Joggers", "de": "Jogger"},
    images: [
      "1. Aramid Jogger Black.jpg",
      "2. Aramid Jogger Orbit Blue.jpg",
      "3. Aramid Jogger Marine Grey.jpg",
      "4. Aramid Jogger Light Grey.jpg"
    ].map((filename) => productImage("bikerwear/joggers", filename))
  },
  {
    id: "leather-jackets",
    name: {"en": "Leather jackets", "de": "Lederjacken"},
    images: [
      "1. Leather Jacket Black Brown.jpg",
      "2. Leather Jacket Maroon.jpg",
      "3. Leather Jacket Olive.jpg",
      "4. Cafe Racer Jacket Black.jpg",
      "5. Cafe Racer Jacket Brown.jpg",
      "6. Cafe Racer Jacket Grey.jpg",
      "7. Sport Leather Jacket Red.jpg",
      "8. Sport Leather Jacket Blue.jpg"
    ].map((filename) => productImage("bikerwear/leather-jackets", filename))
  },
  {
    id: "cordura-jackets",
    name: {"en": "Cordura jackets and trousers", "de": "Cordura-Jacken und -Hosen"},
    images: [
      "01. Touring Jacket Blue Ice.jpg",
      "02. Touring Jacket Grey.jpg",
      "03. Touring Jacket Sand.jpg",
      "04. Long Touring Jacket Black.jpg",
      "05. Long Touring Jacket Ice Grey.jpg",
      "06. Adventure Jacket.jpg",
      "07. Adventure Jacket Blue.jpg",
      "08. Sport Textile Jacket Red.jpg",
      "09. Riding Trousers Black.jpg",
      "10. Riding Trousers Hybrid Black.jpg",
      "11. Riding Trousers Grey Blue.jpg"
    ].map((filename) => productImage("bikerwear/cordura", filename))
  },
  {
    id: "gloves",
    name: {"en": "Hand gloves", "de": "Handschuhe"},
    images: [
      "1. Racing Gloves Long.jpg",
      "2. Winter Gloves.jpg",
      "3. Short Textile Gloves.jpg",
      "4. Summer Leather Gloves Brown.jpg",
      "5. Leather Gloves Black Brown.jpg",
      "6. Sport Gloves Carbon.jpg",
      "7. Short Racing Gloves.jpg",
      "8. Fingerless Leather Gloves.jpg"
    ].map((filename) => productImage("bikerwear/gloves", filename))
  },
  {
    id: "suits",
    name: {"en": "Racing suits", "de": "Kombis"},
    images: [
      "1. One-Piece Leather Suit Red.jpg",
      "2. One-Piece Leather Suit Blue.jpg",
      "3. Two-Piece Leather Suit Yellow.jpg",
      "4. Two-Piece Leather Suit Grey.jpg"
    ].map((filename) => productImage("bikerwear/suits", filename))
  }
];

export const sportswearGroups = [
  {
    id: "joggers-shorts",
    name: { en: "Joggers and shorts", de: "Jogger und Shorts" },
    images: capabilityGalleries.sport
  },
  {
    id: "tees",
    name: { en: "Tees", de: "T-Shirts" },
    images: [
      "1. Oversized Tee Black.jpg",
      "2. Oversized Tee White.jpg",
      "3. Oversized Tee Blue.jpg",
      "4. Oversized Tee Light Blue.jpg",
      "5. Vintage Washed Print Tee.jpg"
    ].map((filename) => productImage("fashionwear/t-shirts", filename))
  }
];
