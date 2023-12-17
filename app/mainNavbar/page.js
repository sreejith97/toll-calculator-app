"use client";
import GuideModal from "@/components/guideModal/page";
import React, { useState } from "react";

import Image from "next/image";

export default function MainNavBar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav className="w-full  flex  flex-row justify-between py-4">
        <div className="font-bold text-[24px] sm:text-[18px] md:text-[19px] lg:text-[24px] xl:text-[25px]  text-blue-600">
          Toll Expert
        </div>
        <div
          className="flex  flex-row justify-between w-[70px] max-w-[70px] cursor-pointer"
          onClick={openModal}
        >
          <div className="border-transparent rounded-full bg-amber-300 broder w-8 h-8 flex justify-center items-center font-bold">
            ?
          </div>
          <div className="border-transparent rounded-full bg-blue-300 broder w-8 h-8 flex justify-center items-center font-bold">
            P
          </div>
        </div>
      </nav>
      <div>
        <GuideModal isOpen={isModalOpen} onClose={closeModal}>
          <Image
            src="/TollExpDash.png"
            width={1920}
            height={1080}
            alt="Basic working details"
            className="w-full h-auto "
          />
          <button
            onClick={closeModal}
            className="mt-4 text-white py-2 px-4 rounded-md bg-red-400"
          >
            Close
          </button>
        </GuideModal>
      </div>
    </>
  );
}
