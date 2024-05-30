"use client";

import { QUERY_KEY } from "@/config/queryKeys";
import { CrmUser, RoleResults, User } from "@/lib/definitions";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import React, { use } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";

import Modal from "@/components/Modal";
import EditRoleModal from "./EditRoleModal";
import GridTable from "@/components/Table/GridTable";

type Props = {};

export default function Ptable({
  roles,
}: {
  roles: RoleResults<string>[] | undefined;
}) {
  const tableHeaders = ["Actions", "Role", "Permissions"];
  const flex = [1, 1, 10];

  const editMutation = useMutation({
    mutationKey: [QUERY_KEY.updateCrmRole],
    mutationFn: async ({ _id }: { _id: string }) => {
      return DashboardApiAgent.updateCrmRole({
        _id: _id,
        permissions: ["posts.view_posts", "posts.update_posts"],
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.getAllCrmRoles);
    },
  });

  const edit = async ({ _id }: { _id: string }) => {
    editMutation.mutate({ _id });
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: [QUERY_KEY.deleteCrmRole],
    mutationFn: async ({ _id }: { _id: string }) => {
      return DashboardApiAgent.deleteCrmRole({
        _id: _id,
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.getAllCrmRoles);
    },
  });

  const deleteRole = async ({ _id }: { _id: string }) => {
    deleteMutation.mutate({ _id });
  };
  console.log();

  return (
    <GridTable tableHeadersFlex={tableHeaders}>
      {({ Field, Nh2, Row }) => (
        <>
          {roles?.map((element: any, index) => (
            <Row key={index}>
              <Field>
                <Modal
                  ModalView={({ CloseModal }) => (
                    <EditRoleModal roleInfo={element} CloseModal={CloseModal} />
                  )}
                >
                  {({ ToggleModal }) => {
                    return (
                      <MdEdit
                        cursor={"pointer"}
                        size={20}
                        onClick={ToggleModal}
                      />
                    );
                  }}
                </Modal>

                <MdDelete
                  cursor={"pointer"}
                  size={20}
                  onClick={() => deleteRole({ _id: element?._id })}
                />
              </Field>
              <Field>
                <Nh2>{`${element?.name}`}</Nh2>
              </Field>
              <Field>
                <Nh2>{`${element?.permissions}`}</Nh2>
              </Field>
            </Row>
          ))}
        </>
      )}
    </GridTable>
  );
}
