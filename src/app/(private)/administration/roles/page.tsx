"use client";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import React from "react";
import styled from "styled-components";

import { useQuery } from "react-query";
import { RolesQuery } from "@/lib/definitions";

import Ptable from "./Table";
import Loading from "./loading";
import Modal from "@/components/Modal";
import AddRoleModal from "./AddRoleModal";
import { QUERY_KEY } from "@/config/queryKeys";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 15px;
  & h1 {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const AddRoleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const AddRoleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  white-space: nowrap;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textPrimary};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.banner};
    background-color: ${({ theme }) => theme.primary};
  }
`;

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const { status, error, data, isLoading } = useQuery<RolesQuery>({
    queryKey: [QUERY_KEY.getAllCrmRoles, searchParams?.page],
    queryFn: async () => {
      return DashboardApiAgent.getAllCrmRoles().then((res) => res);
    },
    // suspense: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    // return notFound();
  }

  return (
    <Container>
      <AddRoleContainer>
        <h1>Crm Roles</h1>
        <div>
          <Modal
            ModalView={({ CloseModal }) => (
              <AddRoleModal CloseModal={CloseModal} />
            )}
          >
            {({ ToggleModal }) => {
              return (
                <AddRoleBtn onClick={ToggleModal}>
                  <p>Create New Role</p>
                  <FaPlus />
                </AddRoleBtn>
              );
            }}
          </Modal>
        </div>
      </AddRoleContainer>
      <Ptable roles={data?.roles} />
    </Container>
    // <Loading />
  );
}
