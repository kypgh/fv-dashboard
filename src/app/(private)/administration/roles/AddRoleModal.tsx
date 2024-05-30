import { Container, Flex } from "@/components/generic";
import { H1 } from "@/components/typography";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import SubmitButton from "@/components/Form/SubmitButton";
import FTextField from "@/components/Formik/FTextField";
import styled from "styled-components";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY_KEY } from "@/config/queryKeys";
import CheckBoxField from "@/components/Form/CheckBoxField";
import permissions from "@/config/permissions";
import FCheckBoxField from "@/components/Formik/FCheckBoxField";
import FPermissionInput from "./FPermissionInput";

const FlexExtend = styled(Flex)`
  width: 100%;
  color: ${({ theme }) => theme.textPrimary};
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
};

export default function AddRoleModal({ CloseModal }: Props) {
  const RoleSchema = Yup.object().shape({
    role: Yup.string().required("Required"),
    permissions: Yup.array().of(Yup.string()),
  });
  const queryClient = useQueryClient();

  const createRole = useMutation({
    mutationKey: [QUERY_KEY.createCrmRole],
    mutationFn: async ({
      role,
      permissions,
    }: {
      role: string;
      permissions: string[];
    }) =>
      DashboardApiAgent.addCrmRoles({ role: role }).then((res) =>
        DashboardApiAgent.updateCrmRole({
          _id: res.message._id,
          permissions,
        })
      ),
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
      <H1>Add Role</H1>

      <Formik
        validationSchema={RoleSchema}
        initialValues={{
          role: "",
          permissions: [],
        }}
        onSubmit={(values) => {
          // DashboardApiAgent.addCrmRoles({ role: values.role });
          createRole.mutate({
            role: values.role,
            permissions: values.permissions,
          });
        }}
      >
        {({ values }) => (
          <FormExtend>
            <RolesContainer>
              <FTextField label="Create Role" name="role" />
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
              <SubmitButton name="Create Role" />
            </RolesContainer>
          </FormExtend>
        )}
      </Formik>
    </FlexExtend>
  );
}
