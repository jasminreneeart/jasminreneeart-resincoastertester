"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Structure: baseColors[colorIndex].accents[accentType] = image path
const baseColors = [
  {
    name: "Pearl Snow White",
    color: "#F8F8FF",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/pearl-snow-white_0b37a7ba-5780-4964-b181-7dcc4d49e3ae.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pearl_Snow_White-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pearl_Snow_White_f9458d19-bc3d-46f0-b629-5b9a67c05f4d.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pearl_Snow_White-copper.png",
    },
  },
  {
    name: "White Beige Cream",
    color: "#F5F5DC",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/white-beige-cream.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/White_Beige_Cream-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/White_Beige_Cream_a363ac61-c3ba-4de7-89fe-782509aed4dd.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/White_Beige_Cream-copper.png",
    },
  },
  {
    name: "Coastal Sand Ivory",
    color: "#FFFFF0",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/coastal-sand-ivory.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coastal_Sand_Ivory-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coastal_Sand_Ivory_7b22f173-fc01-4422-a34f-0dc87681c5ce.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coastal_Sand_Ivory-copper.png",
    },
  },
  {
    name: "Tahitian Sand Deep Beige",
    color: "#D2B48C",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/tahitian_sand_deep_beige.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Tahitian_Sand_Beige.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Tahitian_Sand_Beige_061e05ca-60f9-4166-ba9e-ae29075989ba.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Tahitian_Sand_Beige_779a807d-ad3a-4481-b707-9ead5a7aef79.png",
    },
  },
  {
    name: "Marigold Sun Yellow",
    color: "#FFD700",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/marigold-sun-yellow.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Marigold_Sun_Yellow.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Marigold_Sun_Yellow_26f658a0-fbbb-464d-a3d4-4656fe6ac127.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Marigold_Sun_Yellow_e56d48b0-c3fd-4756-b6cf-04492bfd5b1f.png",
    },
  },
  {
    name: "Apricot Honey Yellow",
    color: "#FFCC5C",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/apricot-honey-yellow.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Apricot_Honey_Yellow.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Apricot_Honey_Yellow_ed850759-cd47-42c8-ad96-c813d93de4ba.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Apricot_Honey_Yellow_d891d27c-6908-4b6c-898d-26faebb385d2.png",
    },
  },
  {
    name: "Mango Pineapple Yellow",
    color: "#FFCC33",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/mango-pineapple-yellow.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mango_Pineapple_Yellow.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mango_Pineapple_Yellow_5d199bc2-1d20-4e7c-936b-9df565bab80a.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mango_Pineapple_Yellow_f7960a1b-cb11-4022-963a-893a3c2a24a2.png",
    },
  },
  {
    name: "Glowy Blush Peach",
    color: "#FFCBA4",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/glowly-blush-peach.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Glowy_Blush_Peach.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Glowy_Blush_Peach_86afdbdd-4b89-4263-beb2-18db3c1e2295.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Glowy_Blush_Peach_c4d9d963-165d-4f73-971d-571badf38b62.png",
    },
  },
  {
    name: "California Poppy Orange",
    color: "#FF8C00",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/california-poppy-orange.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/California_Poppy_Orange.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/California_Poppy_Orange_241bf68d-c090-48ab-ac7a-7c4dcd21b506.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/California_Poppy_Orange_62f76792-66ae-4dc7-8e29-bd7ed5049517.png",
    },
  },
  {
    name: "Pumpkin Spice Orange",
    color: "#FF7518",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/pumpkin-spice-orange.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pumpkin_Spice_Orange.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pumpkin_Spice_Orange_2ead9300-f1a9-480e-8e5e-82140843a348.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pumpkin_Spice_Orange_469177e7-a349-4476-afb4-77d678ff425e.png",
    },
  },
  {
    name: "Caramel Toffee Orange",
    color: "#D2691E",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/caramel-toffee-orange.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caramel_Toffee_Orange.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caramel_Toffee_Orange_263c73ea-8493-4d30-b7d2-53a9af4d9033.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caramel_Toffee_Orange_5235faef-b24f-4064-94ea-90f1d413843f.png",
    },
  },
  {
    name: "Chocolate Mocha Brown",
    color: "#8B4513",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/chocolate-mocha-brown.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Chocolate_Mocha_Brown.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Chocolate_Mocha_Brown_6a5216ba-7c35-4c1b-b0e2-01f4556f719f.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Chocolate_Mocha_Brown_8a0ed9ba-95e2-40bb-947f-783782d75993.png",
    },
  },
  {
    name: "Crimson Cherry Red",
    color: "#DC143C",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/crimson-cherry-red.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Crimson_Cherry_Red.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Crimson_Cherry_Red_e2e545e1-a01f-4aa4-90e4-3175ba27b77c.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Crimson_Cherry_Red_fad688e9-698b-446e-bfd2-f1362bd933a3.png",
    },
  },
  {
    name: "Fuchsia Hot Pink",
    color: "#FF1493",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/fuchsia-hot-pink.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Fuchsia_Hot_Pink.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Fuchsia_Hot_Pink_e49ccbe5-83f1-4afc-8dc7-ef4f86b443a0.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Fuchsia_Hot_Pink_5b4e0232-8d45-41aa-9a78-113d06743121.png",
    },
  },
  {
    name: "Cherry Blossom Pink",
    color: "#FFB7C5",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/cherry-blossom-pink.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Cherry_Blossom_Pink.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Cherry_Blossom_Pink_4370959c-a8a4-4cc0-b07e-6e9c5a2399f6.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Cherry_Blossom_Pink_09cdcc65-1e1f-462f-b129-126881feb010.png",
    },
  },
  {
    name: "Obsidian Midnight Purple",
    color: "#2F1B69",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/obsidian-midnight-purple.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Obsidian_Midnight_Purple.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Obsidian_Midnight_Purple_64e38bb4-e54e-4b48-b917-0b78c7a9b005.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Obsidian_Midnight_Purple_0f65f98c-1673-4e30-873c-84e351459ba8.png",
    },
  },
  {
    name: "Amethyst Royal Indigo",
    color: "#6A0DAD",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/amethyst-royal-indigo.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo_8a96f70b-fa2b-4be3-a09c-b30242d16109.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo_f9a7dbea-972c-40a1-bf72-98864dad1852.png",
    },
  },
  {
    name: "Amethyst Royal Indigo Plum",
    color: "#8E4585",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/amethyst-royal-indigo-plum.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo_Plum.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo_Plum_bda46065-b93f-47f6-b5d1-8f083cc14114.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Amethyst_Royal_Indigo_Plum_ee125332-6d6d-462d-9835-4a7daae0b7dd.png",
    },
  },
  {
    name: "Royal Velvet Petunia",
    color: "#9932CC",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/royal-velvet-petunia.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Royal_Velvet_Petunia.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Royal_Velvet_Petunia_bbda4afc-c2e3-4dc3-bf06-6b533d9e657f.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Royal_Velvet_Petunia_02f511cc-edf6-4e79-a515-13bf3eca4027.png",
    },
  },
  {
    name: "Mystic Violet Iris",
    color: "#8A2BE2",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/mystic-violet-iris.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mystic_Violet_Iris.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mystic_Violet_Iris_f9b7130b-4133-4f59-9234-dfd4b3540bee.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mystic_Violet_Iris_abe5a325-d73c-4fdb-9f20-8927c79aa91f.png",
    },
  },
  {
    name: "Mauve Rose Lilac",
    color: "#E0B0FF",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/mauve-rose-lilac.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mauve_Rose_Lilac.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mauve_Rose_Lilac_838509a0-1769-41c5-aa93-803729317211.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mauve_Rose_Lilac_d7421258-b0fc-4524-bb7d-1670408d6631.png",
    },
  },
  {
    name: "Moonlight Orchid Lavender",
    color: "#E6E6FA",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/moonlight-orchid-lavender.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Moonlight_Orchid_Lavender-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Moonlight_Orchid_Lavender_7c97bcf2-1c5c-43cf-82db-daea7692dfb1.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Moonlight_Orchid_Lavender-copper.png",
    },
  },
  {
    name: "Pacific Ocean Blue",
    color: "#0077BE",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/pacific-ocean-blue.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pacific_Ocean_Blue.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pacific_Ocean_Blue_c782641b-94be-4fdc-b291-e5d3b5ee4ec3.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Pacific_Ocean_Blue_39a62ba4-6c10-4b5f-a516-c465c7661ad3.png",
    },
  },
  {
    name: "Deep Ocean Blue",
    color: "#003366",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/deep-ocean-blue.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Blue.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Blue_9f6cf7c2-9cb3-4eba-baf1-1d2f8dfc4aa0.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Blue_dce60c0b-34e5-43ec-bbd7-268ca6f3ca7a.png",
    },
  },
  {
    name: "Baby Sky Blue",
    color: "#87CEEB",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/baby-sky-blue.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Baby_Sky_Blue.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Baby_Sky_Blue_62d6abc1-635d-4917-9269-310fdd6b7502.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Baby_Sky_Blue_71910e38-d010-44a2-b612-8f310fda3947.png",
    },
  },
  {
    name: "Caribbean Cerulean Blue",
    color: "#007BA7",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/caribbean-cerulean-blue.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caribbean_Cerulean_Blue.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caribbean_Cerulean_Blue_80b736da-ec86-4a20-b5c9-0cc69e3ced36.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Caribbean_Cerulean_Blue_c08b8155-78f4-454a-808c-22b1a2e9244e.png",
    },
  },
  {
    name: "Orchid Azure Blue",
    color: "#4169E1",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/orchid-azure-blue.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Orchid_Azure_Blue.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Orchid_Azure_Blue_85c02f2d-b50f-404b-8a69-52ebe2acd9fc.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Orchid_Azure_Blue_34a0889f-0ec8-4e4e-ad57-3cad5a7d5ce7.png",
    },
  },
  {
    name: "Sea Glass Turquoise",
    color: "#40E0D0",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/sea-glass-turquoise.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sea_Glass_Turquoise.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sea_Glass_Turquoise_2ebfa8ca-d7ff-40a1-9670-fe78e37b83fc.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sea_Glass_Turquoise_b5cf088e-8830-43a8-876c-318f3af4fe7f.png",
    },
  },
  {
    name: "Deep Tealwood Pine",
    color: "#355E3B",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/deep-tealwood-pine.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Tealwood_Pine.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Tealwood_Pine_1f18237f-3300-4c2b-bae9-3c684d33192b.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Tealwood_Pine_e88b777a-31e6-40e3-91c3-384997f8d1b7.png",
    },
  },
  {
    name: "Mermaid Aqua Green",
    color: "#7FFFD4",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/mermaid-aqua-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mermaid_Aqua_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mermaid_Aqua_Green_0689c74f-aa72-47b1-8c66-b83e513ce058.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Mermaid_Aqua_Green_0dde3faf-b6da-4c25-98c8-8f2df0273aba.png",
    },
  },
  {
    name: "Coral Reef Teal",
    color: "#008080",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/coral-reef-teal.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coral_Reef_Teal.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coral_Reef_Teal_6a4ae179-2328-4c74-b89e-7bb057e0d974.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Coral_Reef_Teal_c0f05fda-fe3d-45b3-a7a1-8aa370747a07.png",
    },
  },
  {
    name: "Seafoam Misty Green",
    color: "#93E9BE",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/seafoam-misty-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Seafoam_Misty_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Seafoam_Misty_Green_379adb5d-72c0-4aad-96b5-0780791543f9.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Seafoam_Misty_Green_e00507b1-616a-4c10-9964-0f36821b5c21.png",
    },
  },
  {
    name: "Deep ocean Sea Green",
    color: "#2E8B57",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/deep-ocean-sea-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Sea_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Sea_Green_2d5492ee-a601-4fd2-b828-b7d4a16a9c02.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Deep_Ocean_Sea_Green_336fa95b-65ea-4618-ae59-5f509c2449b5.png",
    },
  },
  {
    name: "Forest Olive Green",
    color: "#556B2F",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/forest-olive-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Forest_Olive_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Forest_Olive_Green_bf421739-604f-4e67-9dca-bf9a682426a4.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Forest_Olive_Green_e86afb89-5a15-482f-b210-025a69c760b9.png",
    },
  },
  {
    name: "Canopy Olive Moss",
    color: "#8FBC8F",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/canopy-olive-moss.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Canopy_Olive_Moss.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Canopy_Olive_Moss_981e463a-8ca7-4f46-8672-97f4a6276c83.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Canopy_Olive_Moss_40df6b08-0ed5-4d3f-98f1-f7b41f4e11d7.png",
    },
  },
  {
    name: "Hunter Cascade Pine",
    color: "#355E3B",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/hunter-cascade-pine.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Hunter_Cascade_Pine.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Hunter_Cascade_Pine_a19124ef-9f13-4653-ab5c-32aa04b5292c.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Hunter_Cascade_Pine_dd8088de-6982-4ad0-94d4-7f10a6f13113.png",
    },
  },
  {
    name: "Garden Fern Willow",
    color: "#4F7942",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/garden-fern-willow.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Garden_Fern_Willow.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Garden_Fern_Willow_8c7f0fa9-a3fd-491f-a624-9026188514b6.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Garden_Fern_Willow_605b23a2-160f-4110-b7d7-bc60f97b04d5.png",
    },
  },
  {
    name: "Sage Mint Green",
    color: "#9CAF88",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/sage-mint-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sage_Mint_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sage_Mint_Green_def45c41-408f-4a61-aae1-6f1c21f349df.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Sage_Mint_Green_697739aa-0ac6-4dc1-9c5c-b9f9cfcb4ec2.png",
    },
  },
  {
    name: "Botanical Green Meadow",
    color: "#7CB342",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/botanical-meadow-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Botanical_Green_Meadow.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Botanical_Green_Meadow_40641f5c-3a07-44ad-808b-d91417cfe08b.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Botanical_Green_Meadow_802f38cc-5f4a-4061-8054-0f6cd0844363.png",
    },
  },
  {
    name: "Herbal Aloe Green",
    color: "#8FBC8F",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/herbal-aloe-green.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Herbal_Aloe_Green.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Herbal_Aloe_Green_6c0481a0-b299-4e84-ab48-a2e457ad89b1.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Herbal_Aloe_Green_a9778906-1f13-4c82-96b2-2d6328768621.png",
    },
  },
  {
    name: "Midnight Raven Black",
    color: "#000000",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/midnight-raven-black.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Midnight_Black_Raven.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Midnight_Black_Raven_267cea98-1c55-466b-9e78-ba213c768630.png",
      copper:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Midnight_Black_Raven_ad4738d5-de56-401f-ae43-70fd558aa83c.png",
    },
  },
  {
    name: "Iridescent White Opal",
    color: "linear-gradient(45deg, #FFFFFF 0%, #E6E6FA 25%, #F0F8FF 50%, #FFFACD 75%, #FFFFFF 100%)",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/iridescent-white-opal.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_White_Opal-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_White_Opal_ff221953-784c-43b8-81ad-93da3b00516d.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_White_Opal-copper.png",
    },
  },
  {
    name: "Iridescent Pink Opal",
    color: "linear-gradient(45deg, #FFB6C1 0%, #FFC0CB 25%, #FFCCCB 50%, #FFE4E1 75%, #FFB6C1 100%)",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/iridescent-pink-opal.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Pink_Opal-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Pink_Opal_49fe04b3-4060-432a-bf27-181c53db4767.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Pink_Opal-copper.png",
    },
  },
  {
    name: "Iridescent Purple Opal",
    color: "linear-gradient(45deg, #DDA0DD 0%, #E6E6FA 25%, #D8BFD8 50%, #E6E6FA 75%, #DDA0DD 100%)",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/iridescent-purple-opal.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Purple_Opal-gold.png",
      silver:
        "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Purple_Opal_642226a3-c8c9-41f0-958e-016024bfe41f.png",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Purple_Opal-copper.png",
    },
  },
  {
    name: "Iridescent Green Opal",
    color: "linear-gradient(45deg, #98FB98 0%, #90EE90 25%, #8FBC8F 50%, #98FB98 75%, #90EE90 100%)",
    imageUrl: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/iridescent-green-opal.png",
    accents: {
      gold: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Green_Opal-gold.png",
      silver: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Green_Opal_68288cb6-7906-4abd-bdce-c6b13f81853e.png?v=1751019457",
      copper: "https://cdn.shopify.com/s/files/1/0600/6397/3548/files/Iridescent_Green_Opal-copper.png",
    },
  },
]

const accentColors = [
  {
    name: "Gold Leaf Flakes",
    key: "gold",
    metallic: "url('https://cdn.shopify.com/s/files/1/0600/6397/3548/files/gold.png')",
    isImage: true,
  },
  {
    name: "Silver Leaf Flakes",
    key: "silver",
    metallic: "url('https://cdn.shopify.com/s/files/1/0600/6397/3548/files/silver.png')",
    isImage: true,
  },
  {
    name: "Copper Leaf Flakes",
    key: "copper",
    metallic: "url('https://cdn.shopify.com/s/files/1/0600/6397/3548/files/copper.png')",
    isImage: true,
  },
]

interface CoasterConfig {
  baseColor: (typeof baseColors)[0]
  accentColor: (typeof accentColors)[0]
}

// Coaster Customizer Component
interface CoasterCustomizerProps {
  coasterIndex: number
  currentBaseColor: (typeof baseColors)[0]
  currentAccentColor: (typeof accentColors)[0]
  onUpdate: (index: number, baseColor: (typeof baseColors)[0], accentColor: (typeof accentColors)[0]) => void
}

function CoasterCustomizer({ coasterIndex, currentBaseColor, currentAccentColor, onUpdate }: CoasterCustomizerProps) {
  const [selectedBase, setSelectedBase] = useState(currentBaseColor)
  const [selectedAccent, setSelectedAccent] = useState(currentAccentColor)

  // Auto-save when base color or accent color changes
  useEffect(() => {
    onUpdate(coasterIndex, selectedBase, selectedAccent)
  }, [selectedBase, selectedAccent, coasterIndex, onUpdate])

  const previewImage = selectedBase.accents[selectedAccent.key as keyof typeof selectedBase.accents]

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={previewImage || "/placeholder.svg"}
            alt={`Preview - ${selectedBase.name} with ${selectedAccent.name} accent`}
            className="w-32 h-32 object-contain object-center rounded-lg shadow-lg"
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "multiply",
            }}
          />
          <div className="text-center">
            <div className="text-sm font-medium">{selectedBase.name}</div>
            <div className="text-xs text-gray-500">{selectedAccent.name}</div>
          </div>
        </div>
      </div>

      {/* Base Color Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Base Color</h3>
        <div className="grid grid-cols-8 gap-3 max-h-64 overflow-y-auto">
          {baseColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedBase(color)}
              className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                selectedBase.name === color.name
                  ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              title={color.name}
              style={{
                backgroundColor: color.imageUrl ? "transparent" : color.color,
                backgroundImage: color.imageUrl ? `url('${color.imageUrl}')` : "none",
                backgroundSize: color.imageUrl ? "cover" : "auto",
                backgroundPosition: color.imageUrl ? "center" : "initial",
                backgroundRepeat: color.imageUrl ? "no-repeat" : "initial",
              }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Selected: <span className="font-medium">{selectedBase.name}</span>
        </p>
      </div>

      {/* Accent Color Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Accent Color</h3>
        <div className="flex justify-center gap-6">
          {accentColors.map((accent) => (
            <button
              key={accent.name}
              onClick={() => setSelectedAccent(accent)}
              className={`w-20 h-20 rounded-full border-2 transition-all hover:scale-110 ${
                selectedAccent.name === accent.name
                  ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              title={accent.name}
              style={{
                backgroundColor: accent.isImage ? "transparent" : accent.metallic,
                backgroundImage: accent.isImage ? accent.metallic : "none",
                backgroundSize: accent.isImage ? "cover" : "auto",
                backgroundPosition: accent.isImage ? "center" : "initial",
                backgroundRepeat: accent.isImage ? "no-repeat" : "initial",
              }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          Selected: <span className="font-medium">{selectedAccent.name}</span>
        </p>
      </div>
    </div>
  )
}

export default function CoasterColorTester() {
  const [selectedBaseColor, setSelectedBaseColor] = useState(baseColors[0])
  const [selectedAccentColor, setSelectedAccentColor] = useState(accentColors[0])
  const [coasterSetSize, setCoasterSetSize] = useState(1)
  const [individualCoasters, setIndividualCoasters] = useState<CoasterConfig[]>([])
  const [editingCoaster, setEditingCoaster] = useState<number | null>(null)

  // Initialize individual coasters when component mounts
  useEffect(() => {
    const newCoasters: CoasterConfig[] = Array.from({ length: coasterSetSize }, (_, index) => ({
      baseColor: baseColors[index % baseColors.length],
      accentColor: selectedAccentColor,
    }))
    setIndividualCoasters(newCoasters)
  }, []) // Empty dependency array - only run on mount

  // Update individual coasters when set size changes
  const updateCoasterSetSize = useCallback(
    (newSize: number) => {
      setCoasterSetSize(newSize)
      setIndividualCoasters((prevCoasters) => {
        const newCoasters: CoasterConfig[] = Array.from({ length: newSize }, (_, index) => {
          // Keep existing coaster config if it exists, otherwise use default
          if (index < prevCoasters.length) {
            return prevCoasters[index]
          }
          return {
            baseColor: baseColors[index % baseColors.length],
            accentColor: selectedAccentColor,
          }
        })
        return newCoasters
      })
    },
    [selectedAccentColor],
  )

  // Update a specific coaster's configuration
  const updateCoaster = useCallback(
    (index: number, baseColor: (typeof baseColors)[0], accentColor: (typeof accentColors)[0]) => {
      setIndividualCoasters((prevCoasters) => {
        const newCoasters = [...prevCoasters]
        newCoasters[index] = { baseColor, accentColor }
        return newCoasters
      })
    },
    [],
  )

  // Update single coaster colors (for set size 1)
  const updateSingleCoasterColors = useCallback(
    (baseColor: (typeof baseColors)[0], accentColor: (typeof accentColors)[0]) => {
      setSelectedBaseColor(baseColor)
      setSelectedAccentColor(accentColor)
      setIndividualCoasters([{ baseColor, accentColor }])
    },
    [],
  )

  // Get the current preview image for single coaster
  const singleCoasterImage =
    selectedBaseColor.accents[selectedAccentColor.key as keyof typeof selectedBaseColor.accents]

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8"></div>

        {/* Layout changes based on set size */}
        {coasterSetSize === 1 ? (
          // Single coaster layout matching the provided design
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Side - Preview Section and Set Size */}
            <div className="lg:col-span-1 space-y-8">
              {/* Preview Section */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold tracking-normal">PREVIEW</h2>
                  <p className="text-gray-600 mt-2">
                    {selectedBaseColor.name} with {selectedAccentColor.name} accent
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  {/* Coaster Preview */}
                  <div className="rounded-lg p-8 flex justify-center items-center bg-transparent">
                    <img
                      src={singleCoasterImage || "/placeholder.svg"}
                      alt={`${selectedBaseColor.name} with ${selectedAccentColor.name} accent`}
                      className="object-contain object-center rounded-lg w-[500px] h-[500px]"
                      style={{
                        backgroundColor: "transparent",
                        mixBlendMode: "multiply",
                      }}
                    />
                  </div>

                  {/* Disclaimer Text */}
                  <div className="text-center max-w-md">
                    <p className="text-sm text-gray-500 italic">
                      *Please note: the light area on the right side is a glare from the lighting and not part of the
                      actual coaster design or function
                    </p>
                  </div>

                  {/* Color Info with Icons */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: selectedBaseColor.color.includes("gradient")
                            ? "#FFFFFF"
                            : selectedBaseColor.color,
                          backgroundImage: selectedBaseColor.imageUrl ? `url('${selectedBaseColor.imageUrl}')` : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <span className="text-sm font-medium">{selectedBaseColor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundImage: selectedAccentColor.metallic,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <span className="text-sm font-medium">{selectedAccentColor.name} Accent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Set Size Selector - Only for set size 1 */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="font-semibold text-2xl">{"SET SIZE"} </h3>
                  <p className="text-gray-600 text-sm">Choose how many coasters you'd like in your set</p>
                </div>
                <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateCoasterSetSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all hover:scale-105 font-medium ${
                        coasterSetSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-500 bg-white text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Selected:{" "}
                  <span className="font-medium">
                    {coasterSetSize} coaster{coasterSetSize !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Side - Color Controls */}
            <div className="lg:col-span-1 space-y-8">
              {/* Base Color Selection */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h2 className="font-bold text-2xl tracking-normal">COASTER COLOR</h2>
                  <p className="text-gray-600 mt-2">Select your pigment color</p>
                </div>

                <div className="grid grid-cols-7 sm:grid-cols-8 gap-3 mb-4">
                  {baseColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => updateSingleCoasterColors(color, selectedAccentColor)}
                      className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedBaseColor.name === color.name
                          ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      title={color.name}
                      style={{
                        backgroundColor: color.imageUrl ? "transparent" : color.color,
                        backgroundImage: color.imageUrl ? `url('${color.imageUrl}')` : "none",
                        backgroundSize: color.imageUrl ? "cover" : "auto",
                        backgroundPosition: color.imageUrl ? "center" : "initial",
                        backgroundRepeat: color.imageUrl ? "no-repeat" : "initial",
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Selected: <span className="font-medium">{selectedBaseColor.name}</span>
                </p>
              </div>

              {/* Accent Color Section */}
              <div className="border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-bold mb-2 text-center text-2xl">ACCENT COLOR </h3>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  Please select an accent color to compliment the center and rim edge of your coasters
                </p>

                <div className="flex justify-center gap-8 mb-4">
                  {accentColors.map((accent) => (
                    <div key={accent.name} className="flex flex-col items-center">
                      <button
                        onClick={() => updateSingleCoasterColors(selectedBaseColor, accent)}
                        className={`w-20 h-20 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedAccentColor.name === accent.name
                            ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                        title={accent.name}
                        style={{
                          backgroundColor: accent.isImage ? "transparent" : accent.metallic,
                          backgroundImage: accent.isImage ? accent.metallic : "none",
                          backgroundSize: accent.isImage ? "cover" : "auto",
                          backgroundPosition: accent.isImage ? "center" : "initial",
                          backgroundRepeat: accent.isImage ? "no-repeat" : "initial",
                        }}
                      />
                      <span className="text-xs text-gray-600 mt-2 text-center max-w-20">{accent.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Selected: <span className="font-medium">{selectedAccentColor.name}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Multiple coasters layout (existing layout)
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Preview Section */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-center tracking-wider font-semibold">{"PREVIEW"}</CardTitle>
                <CardDescription className="text-center">
                  Set of {coasterSetSize} coasters - Click on any coaster to customize it individually
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-6 bg-transparent text-transparent min-h-[400px]">
                {/* Multiple Coasters Preview */}
                <div className="relative flex justify-center items-center rounded-lg p-4 bg-transparent text-transparent">
                  <div
                    className={`grid gap-6 ${
                      coasterSetSize === 2
                        ? "grid-cols-2"
                        : coasterSetSize === 3
                          ? "grid-cols-3"
                          : coasterSetSize <= 4
                            ? "grid-cols-2"
                            : coasterSetSize <= 6
                              ? "grid-cols-3"
                              : coasterSetSize <= 8
                                ? "grid-cols-4"
                                : "grid-cols-5"
                    } max-w-6xl`}
                  >
                    {individualCoasters.map((coaster, index) => {
                      const coasterImage =
                        coaster.baseColor.accents[coaster.accentColor.key as keyof typeof coaster.baseColor.accents]

                      return (
                        <Dialog
                          key={index}
                          open={editingCoaster === index}
                          onOpenChange={(open) => setEditingCoaster(open ? index : null)}
                        >
                          <DialogTrigger asChild>
                            <div className="flex flex-col items-center space-y-2 cursor-pointer group">
                              <div className="relative">
                                <img
                                  src={coasterImage || "/placeholder.svg"}
                                  alt={`Coaster ${index + 1} - ${coaster.baseColor.name} with ${coaster.accentColor.name} accent`}
                                  className={`object-contain object-center rounded-lg shadow-lg bg-transparent text-transparent border-transparent transition-all group-hover:scale-105 group-hover:shadow-xl ${
                                    coasterSetSize === 2
                                      ? "w-56 h-56" // Very large for 2 coasters
                                      : coasterSetSize === 3
                                        ? "w-48 h-48" // Large for 3 coasters
                                        : coasterSetSize === 4
                                          ? "w-40 h-40" // Medium-large for 4 coasters
                                          : coasterSetSize === 5
                                            ? "w-36 h-36" // Medium for 5 coasters
                                            : coasterSetSize === 6
                                              ? "w-32 h-32" // Medium-small for 6 coasters
                                              : coasterSetSize === 7
                                                ? "w-28 h-28" // Small-medium for 7 coasters
                                                : coasterSetSize === 8
                                                  ? "w-26 h-26" // Small for 8 coasters
                                                  : coasterSetSize === 9
                                                    ? "w-24 h-24" // Smaller for 9 coasters
                                                    : "w-20 h-20" // Smallest for 10 coasters
                                  }`}
                                  style={{
                                    backgroundColor: "transparent",
                                    mixBlendMode: "multiply",
                                  }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-center">
                                    Click to customize
                                  </span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 text-center">{coaster.baseColor.name}</div>
                              <div className="text-xs text-gray-400 text-center">{coaster.accentColor.name}</div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Customize Coaster {index + 1}</DialogTitle>
                              <DialogDescription>
                                Choose the base color and accent color for this individual coaster. Changes are saved
                                automatically.
                              </DialogDescription>
                            </DialogHeader>
                            <CoasterCustomizer
                              coasterIndex={index}
                              currentBaseColor={coaster.baseColor}
                              currentAccentColor={coaster.accentColor}
                              onUpdate={updateCoaster}
                            />
                          </DialogContent>
                        </Dialog>
                      )
                    })}
                  </div>
                </div>

                {/* Disclaimer Text */}
                <div className="text-center max-w-md mx-auto">
                  <p className="text-sm text-gray-600 italic">
                    *Please note: the light area on the right side is a glare from the lighting and not part of the
                    actual coaster design or function
                  </p>
                </div>

                {/* Color Info */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">{""}</p>
                </div>
              </CardContent>
            </Card>

            {/* Set Size Selector - For multiple coasters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Set Size</CardTitle>
                <CardDescription className="text-center">
                  Choose how many coasters you'd like in your set
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateCoasterSetSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all hover:scale-105 font-medium ${
                        coasterSetSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-500 bg-white text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Selected:{" "}
                  <span className="font-medium">
                    {coasterSetSize} coaster{coasterSetSize !== 1 ? "s" : ""}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
