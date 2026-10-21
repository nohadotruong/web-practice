export const CategoryMenuData = [];
export const FootballBootsMenu = [];
export const BootBrandMenu = [];
export const BootSurfaceMenu = [];
export const AdidasBootMenu = [];
export const NikeBootMenu = [];
export const PumaBootMenu = [];
export const FGMenu = [];
export const AGMenu = [];
export const SGMenu = [];
export const ICMenu = [];
export const TFMenu = [];

const CategoryMenuDataItems = [
  {
    buttonid: "boots-button",
    label: "Football boots",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: FootballBootsMenu,
    parent_menu: [],
  },
  {
    buttonid: "shirts-button",
    label: "Football shirts",
    path: "/store?type=2",
    right_icon: "",
    child_menu: [],
    parent_menu: [],
  },
  {
    buttonid: "socks-button",
    label: "Football socks",
    path: "/store?type=3",
    right_icon: "",
    child_menu: [],
    parent_menu: [],
  },
  {
    buttonid: "balls-button",
    label: "Footballs",
    path: "/store?type=4",
    right_icon: "",
    child_menu: [],
    parent_menu: [],
  },
];

const FootballBootsMenuItems = [
  {
    label: "See all football boots",
    path: "/store?type=1",
    right_icon: "",
    child_menu: [],
    parent_menu: CategoryMenuData,
  },
  {
    label: "Select brand",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: BootBrandMenu,
    parent_menu: CategoryMenuData,
  },
  {
    label: "Select surface",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: BootSurfaceMenu,
    parent_menu: CategoryMenuData,
  },
];

const BootBrandMenuItems = [
  {
    label: "adidas Football boots",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: AdidasBootMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "Nike Football boots",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: NikeBootMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "PUMA Football boots",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: PumaBootMenu,
    parent_menu: FootballBootsMenu,
  },
];

const AdidasBootMenuItems = [
  {
    label: "See all adidas football boots",
    path: "/store?type=1&brand=1",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "adidas F50",
    path: "/store?type=1&brand=1&collection=f50",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "adidas Predator",
    path: "/store?type=1&brand=1&collection=predator",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "adidas Copa",
    path: "/store?type=1&brand=1&collection=copa",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
];

const NikeBootMenuItems = [
  {
    label: "See all Nike football boots",
    path: "/store?type=1&brand=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "Nike Mercurial",
    path: "/store?type=1&brand=2&collection=mercurial",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "Nike Phantom",
    path: "/store?type=1&brand=2&collection=phantom",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "Nike Tiempo",
    path: "/store?type=1&brand=2&collection=tiempo",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
];

const PumaBootMenuItems = [
  {
    label: "See all PUMA football boots",
    path: "/store?type=1&brand=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "PUMA Ultra",
    path: "/store?type=1&brand=3&collection=ultra",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "PUMA Future",
    path: "/store?type=1&brand=3&collection=future",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
  {
    label: "PUMA King",
    path: "/store?type=1&brand=3&collection=king",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootBrandMenu,
  },
];

const BootSurfaceMenuItems = [
  {
    label: "Grass (FG)",
    path: "",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: FGMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "Artifical Grass (AG)",
    path: "/store?type=1&surface=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: AGMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "Soft Ground (SG)",
    path: "/store?type=1&surface=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: SGMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "Indoor (IC)",
    path: "/store?type=1&surface=4",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: ICMenu,
    parent_menu: FootballBootsMenu,
  },
  {
    label: "Turf & Street (TF)",
    path: "/store?type=1&surface=5",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: TFMenu,
    parent_menu: FootballBootsMenu,
  },
];

const FGMenuItems = [
  {
    label: "See all FG football boots",
    path: "/store?type=1&surface=1",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "adidas FG Boots",
    path: "/store?type=1&brand=1&surface=1",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "Nike FG Boots",
    path: "/store?type=1&brand=2&surface=1",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "PUMA FG Boots",
    path: "/store?type=1&brand=3&surface=1",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
];

const AGMenuItems = [
  {
    label: "See all AG football boots",
    path: "/store?type=1&surface=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "adidas AG Boots",
    path: "/store?type=1&brand=1&surface=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "Nike AG Boots",
    path: "/store?type=1&brand=2&surface=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "PUMA AG Boots",
    path: "/store?type=1&brand=3&surface=2",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
];

const SGMenuItems = [
  {
    label: "See all SG football boots",
    path: "/store?type=1&surface=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "adidas SG Boots",
    path: "/store?type=1&brand=1&surface=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "Nike SG Boots",
    path: "/store?type=1&brand=2&surface=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "PUMA SG Boots",
    path: "/store?type=1&brand=3&surface=3",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
];

const ICMenuItems = [
  {
    label: "See all IC football boots",
    path: "/store?type=1&surface=4",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "adidas IC Boots",
    path: "/store?type=1&brand=1&surface=4",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "Nike IC Boots",
    path: "/store?type=1&brand=2&surface=4",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "PUMA IC Boots",
    path: "/store?type=1&brand=3&surface=4",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
];

const TFMenuItems = [
  {
    label: "See all TF football boots",
    path: "/store?type=1&surface=5",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "adidas TF Boots",
    path: "/store?type=1&brand=1&surface=5",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "Nike TF Boots",
    path: "/store?type=1&brand=2&surface=5",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
  {
    label: "PUMA TF Boots",
    path: "/store?type=1&brand=3&surface=5",
    right_icon: "bi bi-chevron-right ms-auto",
    child_menu: [],
    parent_menu: BootSurfaceMenu,
  },
];

CategoryMenuData.push(...CategoryMenuDataItems);
FootballBootsMenu.push(...FootballBootsMenuItems);
BootBrandMenu.push(...BootBrandMenuItems);
AdidasBootMenu.push(...AdidasBootMenuItems);
NikeBootMenu.push(...NikeBootMenuItems);
PumaBootMenu.push(...PumaBootMenuItems);
BootSurfaceMenu.push(...BootSurfaceMenuItems);
FGMenu.push(...FGMenuItems);
AGMenu.push(...AGMenuItems);
SGMenu.push(...SGMenuItems);
ICMenu.push(...ICMenuItems);
TFMenu.push(...TFMenuItems);

// console.log(CategoryMenuData);
// console.log(FootballBootsMenu);
// console.log(BootBrandMenu);
// console.log(AdidasBootMenu);
// console.log(NikeBootMenu);
// console.log(PumaBootMenu);
