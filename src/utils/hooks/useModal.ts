import React, { useState } from "react";

type Props = {};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const OpenModal = () => {
    setIsOpen(true);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };

  return { isOpen, ToggleModal, OpenModal, CloseModal };
};
