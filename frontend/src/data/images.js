// Images used by the capabilities cards.
export const capabilityImages = {
  denim: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  leather: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  biker: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=85",
  fashion: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  knit: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=900&q=85",
  sport: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
};

// Replace the null entries with the three additional photos for each category.
export const capabilityGalleries = {
  denim: [
    "/assets/capabilities/denim/zip-jacket.png",
    "/assets/capabilities/denim/sherpa-jacket.png",
    "/assets/capabilities/denim/olive-overshirt.png",
    capabilityImages.denim
  ],
  biker: [
    "/assets/capabilities/biker/leather-glove.jpg",
    "/assets/capabilities/biker/carbon-glove.jpg",
    "/assets/capabilities/biker/touring-jacket.jpg",
    "/assets/capabilities/biker/racing-jacket.jpg"
  ],
  leather: [
    "/assets/capabilities/leather/olive-jacket.png",
    "/assets/capabilities/leather/distressed-black-jacket.png",
    "/assets/capabilities/leather/pocket-jacket.png",
    "/assets/capabilities/leather/brown-jacket.png"
  ],
  fashion: [
    "/assets/capabilities/fashion/navy-plaid-hooded-shirt.png",
    "/assets/capabilities/fashion/red-buffalo-plaid-hooded-shirt.png",
    "/assets/capabilities/fashion/red-white-plaid-hooded-shirt.png",
    "/assets/capabilities/fashion/green-buffalo-plaid-hooded-shirt.png"
  ],
  ...Object.fromEntries(
    Object.entries(capabilityImages)
      .filter(([key]) => !["denim", "biker", "leather", "fashion"].includes(key))
      .map(([key, image]) => [key, [image, null, null, null]])
  )
};

// Images used by the selected work gallery.
export const selectedWorkImages = [
  "/assets/capabilities/denim/zip-jacket.png",
  "/assets/capabilities/denim/olive-overshirt.png",
  "/assets/capabilities/leather/olive-jacket.png",
  "/assets/capabilities/biker/touring-jacket.jpg",
  "/assets/capabilities/fashion/green-buffalo-plaid-hooded-shirt.png"
];
