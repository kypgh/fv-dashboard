"use client";

import styled from "styled-components";
import { GiFlame } from "react-icons/gi";
import { CgDarkMode } from "react-icons/cg";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { useTheme } from "@/utils/hooks/useTheme";
import NavListItem from "./NavListItem";
import { Flex } from "@/components/generic";
import navData from "./navData";
import Tooltip from "@/components/Tooltip";
import { H1 } from "@/components/typography";
import Image from "next/image";
import images from "@/config/images";
import {
  DashboardApiAgent,
  getRefreshToken,
} from "@/utils/agents/dashboardApiAgent";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.banner};
  gap: 10px;
  /* box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.3); */
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
    0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
    0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  &:hover {
    box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
      0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
      0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
  }
  z-index: 2;
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100%;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 0 8px 0 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const UserIcon = styled.div`
  padding: 7px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListContainer = styled(Flex)`
  margin-left: -15px;
  margin-right: -15px;
  width: calc(100% + 30px);
`;

const UserNameEmail = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.background};
  border-top: 1px solid #00000033;
  color: ${({ theme }) => theme.textPrimary};
  & svg {
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      color: ${({ theme }) => theme.accent};
    }
  }
`;

const PageBackground = styled.div`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
  padding: 15px;
`;

const PageContainer = styled.div`
  flex: 1;
  padding: 20px;
  /* background-color: ${({ theme }) => theme.secondary}; */
  border-radius: 16px;
  max-height: calc(100vh - 30px);
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 5px; /* width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent}; /* color of the thumb */
    border-radius: 8px; /* roundness of the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.accent}99 0%, ${theme.accent} 100%)`}; /* color of the track */
  }
`;

const SecBg = styled(H1)`
  background-color: ${({ theme }) => theme.secondary};
  width: 100%;
  padding: 5px;
`;

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const rToken = getRefreshToken();

  const currentPath = usePathname();

  useEffect(() => {
    if (!rToken) {
      router.push("/login");
    }
  }, [rToken, currentPath]);

  return (
    <Container>
      <Outer>
        <SidebarContainer>
          <Flex $align="center" $justify="center" $gap={10} $mb={20}>
            <Image src={images.logo} width={50} height={50} alt="" />
            <SidebarHeader>ForexView Dashboard</SidebarHeader>
          </Flex>
          <UserDetails>
            <UserIcon>
              <GiFlame size={50} color="#bf2929" />
            </UserIcon>
            <UserNameEmail>
              <div>John Doe</div>
              <div>john@example.com</div>
            </UserNameEmail>
          </UserDetails>
          <ListContainer $direction="column">
            {navData.map((item) => (
              <NavListItem key={item.href} {...item} />
            ))}
          </ListContainer>
        </SidebarContainer>
        <BottomContainer>
          <Tooltip content={"Log out"}>
            <BiSolidLogOutCircle
              size={28}
              onClick={async () =>
                DashboardApiAgent.logout().then((res) => router.push("/login"))
              }
            />
          </Tooltip>
          <Tooltip content={"Theme"}>
            <CgDarkMode size={28} onClick={toggleTheme} />
          </Tooltip>
          <Tooltip content={"Settings"}>
            <IoSettings size={28} />
          </Tooltip>
        </BottomContainer>
      </Outer>
      <PageBackground>
        <PageContainer>{children}</PageContainer>
      </PageBackground>
    </Container>
  );
}
