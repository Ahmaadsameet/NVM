// Images used by the capabilities cards.
export const capabilityImages = {
  denim: "/assets/capabilities/denim/01-straight-jeans-mid-blue.webp",
  leather: "/assets/capabilities/leather/01-leather-bomber-front.webp",
  biker: "/assets/capabilities/biker/1-leather-jacket-black-brown.webp",
  fashion: "/assets/capabilities/fashion/01-d-logo-hoodie-washed-black.webp",
  knit: "/assets/capabilities/knitwear/images (1).jpg",
  sport: "/assets/capabilities/sportswear/images (3).jpg"
};

// Client photos follow their source folder file numbers; the first photo is the tile.
export const capabilityGalleries = {
  denim: [
    "/assets/capabilities/denim/01-straight-jeans-mid-blue.webp",
    "/assets/capabilities/denim/02-straight-jeans-dark-blue.webp",
    "/assets/capabilities/denim/03-straight-jeans-washed-black.webp",
    "/assets/capabilities/denim/04-straight-jeans-vintage-wash.webp",
    "/assets/capabilities/denim/05-cargo-jeans-blue.webp",
    "/assets/capabilities/denim/06-denim-jorts.webp",
    "/assets/capabilities/denim/07-carpenter-jeans-light-blue.webp",
    "/assets/capabilities/denim/08-carpenter-jeans-washed-black.webp",
    "/assets/capabilities/denim/09-denim-shorts-light-blue.webp",
    "/assets/capabilities/denim/10-denim-shorts-washed-black.webp"
  ],
  leather: [
    "/assets/capabilities/leather/01-leather-bomber-front.webp",
    "/assets/capabilities/leather/02-leather-bomber-back.webp",
    "/assets/capabilities/leather/03-leather-blouson-front.webp",
    "/assets/capabilities/leather/04-leather-blouson-back.webp",
    "/assets/capabilities/leather/05-leather-trucker-jacket-front.webp",
    "/assets/capabilities/leather/06-leather-trucker-jacket-back.webp",
    "/assets/capabilities/leather/07-distressed-lace-up-jacket-front.webp",
    "/assets/capabilities/leather/08-distressed-lace-up-jacket-back.webp",
    "/assets/capabilities/leather/09-leather-bomber-worn.webp",
    "/assets/capabilities/leather/10-leather-trucker-worn.webp",
    "/assets/capabilities/leather/11-distressed-lace-up-worn.webp",
    "/assets/capabilities/leather/12-lace-up-detail.webp"
  ],
  fashion: [
    "/assets/capabilities/fashion/01-d-logo-hoodie-washed-black.webp",
    "/assets/capabilities/fashion/02-d-logo-hoodie-washed-black-back.webp",
    "/assets/capabilities/fashion/03-hoodie-blue.webp",
    "/assets/capabilities/fashion/04-hoodie-olive.webp",
    "/assets/capabilities/fashion/05-hoodie-cream.webp",
    "/assets/capabilities/fashion/06-zip-hoodie-black.webp",
    "/assets/capabilities/fashion/07-printed-half-zip-sweater-lilac.webp",
    "/assets/capabilities/fashion/08-printed-half-zip-sweater-teal.webp",
    "/assets/capabilities/fashion/09-printed-crewneck-teal.webp",
    "/assets/capabilities/fashion/10-printed-crewneck-teal-back.webp",
    "/assets/capabilities/fashion/11-gradient-crewneck-washed-grey.webp",
    "/assets/capabilities/fashion/12-crewneck-orange.webp"
  ],
  knit: [
    "/assets/capabilities/knitwear/images.jpg",
    "/assets/capabilities/knitwear/images (1).jpg",
    "/assets/capabilities/knitwear/images (2).jpg"
  ],
  sport: [
    "/assets/capabilities/sportswear/images (3).jpg",
    "/assets/capabilities/sportswear/images (4).jpg",
    "/assets/capabilities/sportswear/images (5).jpg"
  ],
  ...Object.fromEntries(
    Object.entries(capabilityImages)
      .filter(([key]) => !["denim", "biker", "leather", "fashion", "knit", "sport"].includes(key))
      .map(([key, image]) => [key, [image, null, null, null]])
  )
};

// Images used by the selected work gallery.
export const selectedWorkImages = [
  "/assets/capabilities/denim/zip-jacket.webp",
  "/assets/capabilities/denim/olive-overshirt.webp",
  "/assets/capabilities/leather/olive-jacket.webp",
  "/assets/capabilities/biker/touring-jacket.webp",
  "/assets/capabilities/fashion/green-buffalo-plaid-hooded-shirt.webp"
];

// Client board order. Gloves use all eight supplied photos; front/back pairs remain incomplete.
export const bikerGroups = [
  {
    "id": "gloves",
    "name": {
      "en": "Hand gloves",
      "de": "Handschuhe"
    },
    "images": [
      "/assets/capabilities/biker/gloves/1-racing-gloves-long.webp",
      "/assets/capabilities/biker/gloves/2-winter-gloves.webp",
      "/assets/capabilities/biker/gloves/3-short-textile-gloves.webp",
      "/assets/capabilities/biker/gloves/4-summer-leather-gloves-brown.webp",
      "/assets/capabilities/biker/gloves/5-leather-gloves-black-brown.webp",
      "/assets/capabilities/biker/gloves/6-sport-gloves-carbon.webp",
      "/assets/capabilities/biker/gloves/7-short-racing-gloves.webp",
      "/assets/capabilities/biker/gloves/8-fingerless-leather-gloves.webp"
    ]
  },
  {
    "id": "jeans",
    "name": {
      "en": "Biker jeans",
      "de": "Bikerjeans"
    },
    "images": [
      "/assets/capabilities/biker/jeans/1-aramid-jeans-steel-blue.webp",
      "/assets/capabilities/biker/jeans/2-aramid-jeans-raw-blue.webp",
      "/assets/capabilities/biker/jeans/3-aramid-jeans-dark-grey.webp",
      "/assets/capabilities/biker/jeans/4-aramid-jeans-phantom-grey.webp",
      "/assets/capabilities/biker/jeans/5-aramid-jeans-navy-washed.webp"
    ]
  },
  {
    "id": "hoodies",
    "name": {
      "en": "Biker hoodies",
      "de": "Bikerhoodies"
    },
    "images": [
      "/assets/capabilities/biker/hoodies/1-aramid-hoodie-black.webp",
      "/assets/capabilities/biker/hoodies/2-aramid-hoodie-orbit-blue.webp",
      "/assets/capabilities/biker/hoodies/3-aramid-hoodie-marine-grey.webp",
      "/assets/capabilities/biker/hoodies/4-aramid-hoodie-light-grey.webp",
      "/assets/capabilities/biker/hoodies/5-aramid-zip-hoodie-orbit-blue.webp"
    ]
  },
  {
    "id": "leather-jackets",
    "name": {
      "en": "Leather biker jackets",
      "de": "Leder-Bikerjacken"
    },
    "images": [
      "/assets/capabilities/biker/leather-jackets/1-leather-jacket-black-brown.webp",
      "/assets/capabilities/biker/leather-jackets/2-leather-jacket-maroon.webp",
      "/assets/capabilities/biker/leather-jackets/3-leather-jacket-olive.webp",
      "/assets/capabilities/biker/leather-jackets/4-cafe-racer-jacket-black.webp",
      "/assets/capabilities/biker/leather-jackets/5-cafe-racer-jacket-brown.webp"
    ]
  },
  {
    "id": "cordura-jackets",
    "name": {
      "en": "Cordura jackets",
      "de": "Cordura-Jacken"
    },
    "images": [
      "/assets/capabilities/biker/cordura-jackets/01-touring-jacket-blue-ice.webp",
      "/assets/capabilities/biker/cordura-jackets/02-touring-jacket-grey.webp",
      "/assets/capabilities/biker/cordura-jackets/03-touring-jacket-sand.webp",
      "/assets/capabilities/biker/cordura-jackets/04-long-touring-jacket-black.webp",
      "/assets/capabilities/biker/cordura-jackets/05-long-touring-jacket-ice-grey.webp"
    ]
  }
];
