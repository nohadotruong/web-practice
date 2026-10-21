import AdidasLogo from "../assets/Adidas/Logo/Adidas.png";
import NikeLogo from "../assets/Nike/Logo/Nike.png";
import PumaLogo from "../assets/Puma/Logo/Puma.png";

import AdidasBg from "../assets/Adidas/Pack/VividHorizonPack.png";
import NikeBg from "../assets/Nike/Pack/MadEnergyPack.jpg";
import PumaBg from "../assets/Puma/Pack/FormularPack.png";

import F50Logo from "../assets/Adidas/Logo/F50.png";
import PredatorLogo from "../assets/Adidas/Logo/Predator.png";
import CopaLogo from "../assets/Adidas/Logo/Copa.png";

import PredatorImage from "../assets/Adidas/Predator/PredatorEnergyCitrusPack.png";
import F50Image from "../assets/Adidas/F50/F50AdvancementPack.png";
import CopaImage from "../assets/Adidas/Copa/CopaCelestialVictoryPack.jpg";

import MercurialLogo from "../assets/Nike/Logo/Mercurial.png";
import PhantomLogo from "../assets/Nike/Logo/Phantom.png";
import TiempoLogo from "../assets/Nike/Logo/Tiempo.png";

import MercurialImage from "../assets/Nike/Mercurial/MerMadVoltagePack.png";
import PhantomlImage from "../assets/Nike/Phantom/PhantomLuminous.png";
import TiempoImage from "../assets/Nike/Tiempo/TiempoMotivation.png";

import FutureLogo from "../assets/Puma/Logo/Future.png";
import KingLogo from "../assets/Puma/Logo/King.png";
import UltraLogo from "../assets/Puma/Logo/Ultra.png";

import FutureImage from "../assets/Puma/Future/FutureGearUpPack.png";
import KingImage from "../assets/Puma/King/KingLaunchEdition.png";
import UltraImage from "../assets/Puma/Ultra/UltraPursuitPack.png";

export const brandsData = [
  {
    brand: "Adidas",
    bgColor: "#2c2f36",
    brandLogo: AdidasLogo,
    brandBg: AdidasBg,
    brandPath: "/shop?brand=1",
    products: [
      {
        id: "f50-fg",
        image: F50Image,
        logo: F50Logo,
        path: "/shop?brand=1&type=f50",
      },
      {
        id: "predator-fg",
        image: PredatorImage,
        logo: PredatorLogo,
        path: "/shop?brand=1&type=predator",
      },
      {
        id: "copa-fg",
        image: CopaImage,
        logo: CopaLogo,
        path: "/shop?brand=1&type=copa",
      },
    ],
  },
  {
    brand: "Nike",
    bgColor: "#222831",
    brandLogo: NikeLogo,
    brandBg: NikeBg,
    brandPath: "/shop?brand=2",
    products: [
      {
        id: "mer-fg",
        image: MercurialImage,
        logo: MercurialLogo,
        path: "/shop?brand=2&type=mercurial",
      },
      {
        id: "phantom-fg",
        image: PhantomlImage,
        logo: PhantomLogo,
        path: "/shop?brand=2&type=phantom",
      },
      {
        id: "tiempo-fg",
        image: TiempoImage,
        logo: TiempoLogo,
        path: "/shop?brand=2&type=tiempo",
      },
    ],
  },
  {
    brand: "Puma",
    bgColor: "#383838",
    brandLogo: PumaLogo,
    brandBg: PumaBg,
    brandPath: "/shop?brand=3",
    products: [
      {
        id: "future-fg",
        image: FutureImage,
        logo: FutureLogo,
        path: "/shop?brand=3&type=future",
      },
      {
        id: "king-fg",
        image: KingImage,
        logo: KingLogo,
        path: "/shop?brand=3&type=king",
      },
      {
        id: "ultra-fg",
        image: UltraImage,
        logo: UltraLogo,
        path: "/shop?brand=3&type=ultra",
      },
    ],
  },
];
