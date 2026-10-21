export const sortMenuData = [
  {
    label: "A-Z",
    column: "name",
    order_by: "ASC",
  },
  {
    label: "Z-A",
    column: "name",
    order_by: "DESC",
  },
  {
    label: "Price (Lowest)",
    column: "price",
    order_by: "ASC",
  },
  {
    label: "Price (Highest)",
    column: "price",
    order_by: "DESC",
  },
];

export const brandMenuData = [
  {
    label: "adidas",
    column: "brand_id",
    value: 1,
  },
  {
    label: "Nike",
    column: "brand_id",
    value: 2,
  },
  {
    label: "PUMA",
    column: "brand_id",
    value: 3,
  },
];
export const surfaceMenuData = [
  {
    label: "Grass (FG)",
    column: "surface_id",
    value: 1,
  },
  {
    label: "Artifical Grass (AG)",
    column: "surface_id",
    value: 2,
  },
  {
    label: "Soft Ground (SG)",
    column: "surface_id",
    value: 3,
  },
  {
    label: "Indoor (IC)",
    column: "surface_id",
    value: 4,
  },
  {
    label: "Turf & Street (TF)",
    column: "surface_id",
    value: 5,
  },
];
export const priceMenuData = [
  {
    label: `0 \u20ab - 1.500.000 \u20ab`,
    column: "price",
    min: 0,
    max: 600000,
  },
  {
    label: `1.500.000 \u20ab - 3.000.000 \u20ab`,
    column: "price",
    min: 1000000,
    max: 3000000,
  },
  {
    label: `3.000.000 \u20ab - 4.500.000 \u20ab`,
    column: "price",
    min: 3000000,
    max: 4500000,
  },
  {
    label: `4.500.000 \u20ab - 6.000.000 \u20ab`,
    column: "price",
    min: 4500000,
    max: 6000000,
  },
  {
    label: `> 6.000.000 \u20ab`,
    column: "price",
    min: 6000000,
    max: "",
  },
];

export const typeMenuData = [
  {
    label: "Boots",
    column: "type_id",
    value: 1,
  },
  {
    label: "Shirts",
    column: "type_id",
    value: 2,
  },
  {
    label: "Socks",
    column: "type_id",
    value: 3,
  },
  {
    label: "Balls",
    column: "type_id",
    value: 4,
  },
];

export const filterMenuData = [
  {
    label: "Type",
    menu: typeMenuData,
  },
  {
    label: "Brand",
    menu: brandMenuData,
  },
  {
    label: "Surface",
    menu: surfaceMenuData,
  },
  {
    label: "Shop by Price",
    menu: priceMenuData,
  },
];
