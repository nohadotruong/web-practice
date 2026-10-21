import React, { useState } from "react";
import CateMenu from "../../components/Menu/CateMenu";
import SubCateMenu from "../../components/Menu/SubCateMenu";

export default function Home() {
  return (
    <div className="h-fit w-full p-2">
      <div
        className="w-full h-[200px] sm:h-[400px]
        flex gap-3 relative
        transition-all duration-300 ease-in-out"
      >
        <CateMenu />

        {/* <SubCateMenu subMenu={subMenu} /> */}

        <div className="flex-1 border-1">Slide</div>

        <div
          className="w-fit h-full border-1
          hidden lg:grid grid-rows-3 gap-3"
        >
          <div className="border-1">Sale 1</div>
          <div className="border-1">Sale 2</div>
          <div className="border-1">Sale 3</div>
        </div>
      </div>
    </div>
  );
}
