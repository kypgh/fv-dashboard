"use client";
import Modal from "@/components/Modal";
import GridTable from "@/components/Table/GridTable";
import { CrmUser, User } from "@/lib/definitions";
import Link from "next/link";
import React from "react";
import EditCrmUser from "./EditCrmUser";

type Props = {};

export default function Ptable({ users }: { users: CrmUser[] | undefined }) {
  const tableH = ["Username", "Email", "Client Id"];
  return (
    <GridTable tableHeadersFlex={tableH}>
      {({ Field, Nh2, LRow, Row }) => (
        <>
          {users?.map((crmUser: any, index) => (
            <Row key={index}>
              <Modal
                ModalView={({ CloseModal }) => (
                  <EditCrmUser CloseModal={CloseModal} crmUser={crmUser} />
                )}
              >
                {({ ToggleModal }) => {
                  return (
                    <Row
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={ToggleModal}
                    >
                      <Field>
                        <Nh2>{`${crmUser?.firstName} ${crmUser?.lastName}`}</Nh2>
                      </Field>
                      <Field>
                        <Nh2>{`${crmUser?.email}`}</Nh2>
                      </Field>
                      <Field>
                        <Nh2>{`${crmUser?._id}`}</Nh2>
                      </Field>
                    </Row>
                  );
                }}
              </Modal>
            </Row>
          ))}
        </>
      )}
    </GridTable>
  );
}
