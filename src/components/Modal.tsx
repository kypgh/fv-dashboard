import { useModal } from "@/utils/hooks/useModal";
import { ReactNode } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  cursor: pointer;
  padding: 5px;
  background-color: ${({ theme }) => `${theme.background}66`};
  backdrop-filter: blur(4px);
`;

export const ModalContainerinner = styled.div<{
  $maxWidth?: string;
  $maxHeight?: string;
}>`
  display: flex;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  height: max-content;
  width: max-content;
  max-width: ${({ $maxWidth }) => $maxWidth || "80vh"};
  max-height: ${({ $maxHeight }) => $maxHeight || "70vh"};
  overflow: auto;
  top: 0;
  left: 0;
  cursor: default;
  border-radius: 8px;
  background-color: ${({ theme }) => `${theme.banner}`};
  box-shadow: 0 0 10px 2px ${({ theme }) => `${theme.secondary}99`};
`;

export const ModalContainerSize = styled.div<{
  $maxWidth?: string;
  $maxHeight?: string;
}>`
  width: 100%;
  height: 100%;
`;

type Props = {
  ModalView?: (props: { CloseModal?: () => void; isOpen?: any }) => ReactNode;
  children: (props: {
    OpenModal?: () => void;
    ToggleModal?: () => void;
    isOpen?: any;
  }) => ReactNode;
};

function Modal({ children, ModalView }: Props) {
  const { CloseModal, ToggleModal, OpenModal, isOpen } = useModal();

  return (
    <>
      {children && children({ OpenModal, ToggleModal, isOpen })}
      {isOpen && (
        <ModalContainer onClick={CloseModal}>
          <ModalContainerinner onClick={(e) => e.stopPropagation()}>
            {ModalView && ModalView({ CloseModal })}
          </ModalContainerinner>
        </ModalContainer>
      )}
    </>
  );
}

export default Modal;
