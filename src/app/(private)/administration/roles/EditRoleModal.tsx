import { Flex } from "@/components/generic";
import { H1 } from "@/components/typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import SubmitButton from "@/components/Form/SubmitButton";
import styled from "styled-components";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "@/config/queryKeys";
import permissions from "@/config/permissions";
import FPermissionInput from "./FPermissionInput";

const FlexExtend = styled(Flex)`
  width: 100%;
`;

const FormExtend = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: 5px;
`;

const PermissionsContainer = styled.div`
  /* justify-content: center; */
  width: 500px;
  overflow-y: auto;
  gap: 20px;
`;

const PermissionsInner = styled.div``;

const PermissionData = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  gap: 5px;
`;

const RolesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

type Props = {
  CloseModal?: any;
  roleInfo: any;
};

export default function EditRoleModal({ CloseModal, roleInfo }: Props) {
  const RoleSchema = Yup.object().shape({
    permissions: Yup.array().of(Yup.string()),
  });
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationKey: [QUERY_KEY.updateCrmRole],
    mutationFn: async ({
      _id,
      permissions,
    }: {
      _id: string;
      permissions: string[];
    }) => {
      console.log(_id, permissions);

      return DashboardApiAgent.updateCrmRole({
        _id: _id,
        permissions: permissions,
      }).then((res) => res.data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(QUERY_KEY.getAllCrmRoles);
      CloseModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <FlexExtend $direction="column" $gap={20}>
      <H1>Edit Role</H1>

      <Formik
        validationSchema={RoleSchema}
        initialValues={{
          permissions: roleInfo.permissions,
        }}
        onSubmit={(values) => {
          editMutation.mutate({
            _id: roleInfo?._id,
            permissions: values.permissions,
          });
        }}
      >
        {({ values }) => (
          <FormExtend>
            <RolesContainer>
              <p>
                Update Role: <strong>{roleInfo?.name}</strong>
              </p>
            </RolesContainer>
            <PermissionsContainer>
              {Object.keys(permissions).map((key: any, _) => (
                <PermissionsInner key={key}>
                  <p>{key}</p>
                  <PermissionData>
                    {Object.values(
                      permissions[key as keyof typeof permissions]
                    ).map((element: any, index) => (
                      <FPermissionInput
                        key={index}
                        label={element.label}
                        name={`permissions`}
                        value={element.value}
                        description={element.description}
                      />
                    ))}
                  </PermissionData>
                </PermissionsInner>
              ))}
            </PermissionsContainer>
            <RolesContainer>
              <SubmitButton name="Update Role" />
            </RolesContainer>
          </FormExtend>
        )}
      </Formik>
    </FlexExtend>
  );
}
