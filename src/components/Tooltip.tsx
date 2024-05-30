import React, {
  cloneElement,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import useOnClickAway from "@/utils/hooks/useOnClickAway";

interface TooltipProps {
  children: ReactElement;
  content: ReactElement | string;
  position?:
    | "top-left"
    | "top"
    | "top-right"
    | "bottom-left"
    | "bottom"
    | "bottom-right"
    | "left-up"
    | "left"
    | "left-down"
    | "right-up"
    | "right"
    | "right-down";
  disabled?: boolean;
  useOnClickInstead?: boolean;
  style?: React.CSSProperties;
}

const openAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Outer = styled.div`
  display: contents;
`;

const TooltipSc = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  font-size: small;
  border: 1px solid ${({ theme }) => theme.accent};
  /* width: 200px; */
  font-weight: 600;
  animation: ${openAnimation} 0.2s ease-in-out;
  color: ${({ theme }) => theme.accent};
`;

const TooltipArrow = styled.div`
  content: "";
  position: absolute;
  height: 8px;
  width: 8px;
  background-color: inherit;
  transform: rotate(45deg) translateY(-1px);
  border-bottom: 1px solid ${({ theme }) => theme.accent};
  border-right: 1px solid ${({ theme }) => theme.accent};
`;

type Pos = {
  top: number;
  left: number;
  arrowTop: number;
  arrowLeft: number;
  transfrom: string;
};

function calcPos(
  child: HTMLDivElement,
  tooltip: HTMLDivElement,
  position: string
): Pos {
  if (child.children.length === 0) throw new Error("Invalid children");
  const childRect = child.children[0].getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const arrowRect = { width: 8, height: 8 };
  const borderRadius = 4;
  const [pos1, pos2] = position.split("-");
  const gap = 4;
  let transfrom = "rotate(45deg) translateY(-1px)";
  let top = childRect.top - tooltipRect.height;
  let left = childRect.left - tooltipRect.width / 2 + childRect.width / 2;
  let arrowTop = tooltipRect.height - arrowRect.height / 2;
  let arrowLeft = tooltipRect.width / 2 - arrowRect.width / 2;
  if (pos1 === "top") {
    top -= gap;
    transfrom = "rotate(45deg) translateY(-1px)";
    if (pos2 === "left") {
      left = childRect.left;
      arrowLeft = borderRadius;
    } else if (pos2 === "right") {
      left = childRect.left - tooltipRect.width + childRect.width;
      arrowLeft = tooltipRect.width - borderRadius - arrowRect.width;
    }
  } else if (pos1 === "bottom") {
    transfrom = "rotate(225deg) translateY(1px)";
    top = childRect.top + childRect.height + gap;
    arrowTop = -arrowRect.height / 2;
    if (pos2 === "left") {
      left = childRect.left;
      arrowLeft = borderRadius;
    } else if (pos2 === "right") {
      left = childRect.left - tooltipRect.width + childRect.width;
      arrowLeft = tooltipRect.width - borderRadius - arrowRect.width;
    }
  } else if (pos1 === "left") {
    transfrom = "rotate(-45deg) translateY(-1px)";
    left = childRect.left - tooltipRect.width - gap;
    top = childRect.top - tooltipRect.height / 2 + childRect.height / 2;
    arrowTop = tooltipRect.height / 2 - arrowRect.height / 2;
    arrowLeft = tooltipRect.width - arrowRect.width / 2;
    if (pos2 === "up") {
      top = childRect.top;
      arrowTop = borderRadius;
    } else if (pos2 === "down") {
      top = childRect.bottom - tooltipRect.height;
      arrowTop = tooltipRect.height - borderRadius - arrowRect.height;
    }
  } else if (pos1 === "right") {
    transfrom = "rotate(-225deg) translateY(1px)";
    left = childRect.left + childRect.width + gap;
    top = childRect.top - tooltipRect.height / 2 + childRect.height / 2;
    arrowTop = tooltipRect.height / 2 - arrowRect.height / 2;
    arrowLeft = -arrowRect.width / 2;
    if (pos2 === "up") {
      top = childRect.top;
      arrowTop = borderRadius;
    } else if (pos2 === "down") {
      top = childRect.bottom - tooltipRect.height;
      arrowTop = tooltipRect.height - borderRadius - arrowRect.height;
    }
  } else {
    throw new Error("Invalid position");
  }

  if (left < 0) left = 0;
  if (top < 0) top = 0;

  let diffLeft = window.innerWidth - (left + tooltipRect.width);
  if (diffLeft < 0) {
    left = left + diffLeft - 20;
    arrowLeft = arrowLeft - diffLeft + 20;
  }

  return {
    top,
    left,
    arrowTop,
    arrowLeft,
    transfrom,
  };
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  disabled = false,
  useOnClickInstead = false,
  style,
}) => {
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState(false);

  const childRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!temp) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [temp]);

  useOnClickAway(ref, () => setShow(false), [childRef, contentRef]);

  return (
    <Outer ref={ref}>
      <div ref={childRef} style={{ display: "contents" }}>
        {cloneElement(children, {
          ...children.props,
          onMouseEnter: () => {
            if (useOnClickInstead) return;
            setShow(true);
            setTemp(true);
          },
          onMouseLeave: () => {
            if (useOnClickInstead) return;
            setTemp(false);
          },
          onClick: (event: React.MouseEvent) => {
            children.props.onClick?.(event); // Forward the original onClick event
            if (!useOnClickInstead) return;
            setShow(!show);
          },
        })}
      </div>
      {show &&
        !disabled &&
        createPortal(
          <TooltipSc
            style={{
              padding: `${typeof content === "string" ? "4px" : "0px"}`,
              ...style,
            }}
            onMouseEnter={() => {
              if (useOnClickInstead) return;
              setShow(true);
              setTemp(true);
            }}
            onMouseLeave={() => {
              if (useOnClickInstead) return;
              setShow(false);
            }}
            ref={(r) => {
              if (!r || !childRef.current) return;
              let pos = calcPos(childRef.current, r, position);
              r.style.top = pos.top + "px";
              r.style.left = pos.left + "px";
              if (
                r.children.length > 0 &&
                r.children[0] instanceof HTMLElement
              ) {
                const arrow = r.children[0] as HTMLElement;
                arrow.style.top = pos.arrowTop + "px";
                arrow.style.left = pos.arrowLeft + "px";
                arrow.style.transform = pos.transfrom;
              }
              contentRef.current = r;
            }}
          >
            <TooltipArrow />
            {content}
          </TooltipSc>,
          document.getElementById("tooltipsContainer")!
        )}
    </Outer>
  );
};

export default Tooltip;
