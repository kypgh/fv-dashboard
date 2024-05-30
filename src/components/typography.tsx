import styled, { DefaultTheme } from "styled-components";
import React, { ReactElement, ReactNode } from "react";

type TypographyProps = {
  $color?: string | ((theme: DefaultTheme) => string);
  $align?: "left" | "center" | "right";
  $mb?: number;
  $mt?: number;
  $ml?: number;
  $mr?: number;
  $mall?: number;
  $pb?: number;
  $pt?: number;
  $pl?: number;
  $pr?: number;
  $pall?: number;
};

// prettier-ignore
const H1 = styled.h1.attrs<TypographyProps>( ({ $color = "#000000", $align = "center", $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall,
  }) => ({ $color, $align, $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall })
)`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ $color, theme }) =>
    typeof $color === "function" ? $color(theme) : $color};
  text-align: ${({ $align }) => $align};
  ${({ $mb }) => $mb && `margin-bottom: ${$mb}px;`}
  ${({ $mt }) => $mt && `margin-top: ${$mt}px;`}
  ${({ $ml }) => $ml && `margin-left: ${$ml}px;`}
  ${({ $mr }) => $mr && `margin-right: ${$mr}px;`}
  ${({ $mall }) => $mall && `margin: ${$mall}px;`}
  ${({ $pb }) => $pb && `padding-bottom: ${$pb}px;`}
  ${({ $pt }) => $pt && `padding-top: ${$pt}px;`}
  ${({ $pl }) => $pl && `padding-left: ${$pl}px;`}
  ${({ $pr }) => $pr && `padding-right: ${$pr}px;`}
  ${({ $pall }) => $pall && `padding: ${$pall}px;`}
`;

// prettier-ignore
const H2 = styled.h2.attrs<TypographyProps>( ({ $color = "#000000", $align = "center", $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall,
  }) => ({ $color, $align, $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall })
)`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ $color, theme }) =>
    typeof $color === "function" ? $color(theme) : $color};
  text-align: ${({ $align }) => $align};
  ${({ $mb }) => $mb && `margin-bottom: ${$mb}px;`}
  ${({ $mt }) => $mt && `margin-top: ${$mt}px;`}
  ${({ $ml }) => $ml && `margin-left: ${$ml}px;`}
  ${({ $mr }) => $mr && `margin-right: ${$mr}px;`}
  ${({ $mall }) => $mall && `margin: ${$mall}px;`}
  ${({ $pb }) => $pb && `padding-bottom: ${$pb}px;`}
  ${({ $pt }) => $pt && `padding-top: ${$pt}px;`}
  ${({ $pl }) => $pl && `padding-left: ${$pl}px;`}
  ${({ $pr }) => $pr && `padding-right: ${$pr}px;`}
  ${({ $pall }) => $pall && `padding: ${$pall}px;`}
`;

// prettier-ignore
const H3 = styled.h3.attrs<TypographyProps>( ({ $color = "#000000", $align = "center", $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall,
  }) => ({ $color, $align, $mb, $mt, $ml, $mr, $mall, $pb, $pt, $pl, $pr, $pall })
)`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  color: ${({ $color, theme }) =>
    typeof $color === "function" ? $color(theme) : $color};
  text-align: ${({ $align }) => $align};
  ${({ $mb }) => $mb && `margin-bottom: ${$mb}px;`}
  ${({ $mt }) => $mt && `margin-top: ${$mt}px;`}
  ${({ $ml }) => $ml && `margin-left: ${$ml}px;`}
  ${({ $mr }) => $mr && `margin-right: ${$mr}px;`}
  ${({ $mall }) => $mall && `margin: ${$mall}px;`}
  ${({ $pb }) => $pb && `padding-bottom: ${$pb}px;`}
  ${({ $pt }) => $pt && `padding-top: ${$pt}px;`}
  ${({ $pl }) => $pl && `padding-left: ${$pl}px;`}
  ${({ $pr }) => $pr && `padding-right: ${$pr}px;`}
  ${({ $pall }) => $pall && `padding: ${$pall}px;`}
`;

interface LiProps {
  children: ReactNode;
  Prefix: ReactNode | React.FC | string | number | (() => React.ReactElement);
  position?: "center" | "top";
}

const LiSC = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 20px;
  position: relative;
`;

const PrefixSC = styled.span.attrs<{ $position: "center" | "top" }>(
  ({ $position }) => ({ $position })
)`
  position: absolute;
  left: 0;
  top: ${({ $position }) => ($position === "center" ? "50%" : "5px")};
  transform: ${({ $position }) => $position === "center" && "translateY(-50%)"};
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Li = ({ children, Prefix, position = "center" }: LiProps) => {
  return (
    <LiSC>
      <PrefixSC $position={position}>
        {typeof Prefix === "function" ? <Prefix /> : Prefix}
      </PrefixSC>
      {children}
    </LiSC>
  );
};

interface ULProps {
  children: ReactNode;
  Prefix: ReactNode | React.FC | string | number | (() => React.ReactElement);
  position?: "center" | "top";
}

const Ul = ({ children, Prefix, position }: ULProps) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Li) {
          return React.cloneElement(child as ReactElement, {
            Prefix,
            position,
          });
        }
        return child;
      })}
    </>
  );
};

export { H1, H2, H3, Li, Ul };
