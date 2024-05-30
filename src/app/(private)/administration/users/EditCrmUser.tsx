import { Flex } from "@/components/generic";
import { H1 } from "@/components/typography";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import SubmitButton from "@/components/Form/SubmitButton";
import FTextField from "@/components/Formik/FTextField";
import styled from "styled-components";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "@/config/queryKeys";
import permissions from "@/config/permissions";
import FPermissionInput from "../roles/FPermissionInput";
import { CrmUser } from "@/lib/definitions";

const FlexExtend = styled(Flex)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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

const CrmUserContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 10px;
  position: relative;
`;

const CrmLabel = styled.div`
  background: ${({ theme }) => theme.banner};
  width: 100%;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 4;
  & span {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

const PermissionsContainer = styled.div`
  width: 600px;
  height: 350px;
  overflow-y: auto;
  flex: 2;
  gap: 20px;
  padding: 0 10px;
  border-left: 2px solid ${({ theme }) => theme.primary};
`;

const PermissionsInner = styled.div`
  & p {
    margin: 10px 0;
  }
`;

const PermissionData = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 5px;
`;

const RolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  height: 350px;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

type Props = {
  CloseModal?: any;
  crmUser: CrmUser;
};

export default function EditCrmUser({ CloseModal, crmUser }: Props) {
  const crmUserSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    role: Yup.string(),
    permissions: Yup.array().of(Yup.string()),
  });
  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationKey: [QUERY_KEY.editCrmUser],
    mutationFn: async ({
      _id,
      firstName,
      lastName,
      role,
      permissions,
    }: {
      _id: string;
      firstName: string;
      lastName: string;
      role: string;
      permissions: string[];
    }) =>
      DashboardApiAgent.updateCrmUser({
        _id: _id,
        firstName: firstName,
        lastName: lastName,
      }).then((res) =>
        DashboardApiAgent.changeCrmPermissions({
          _id: res.crmUser._id,
          permissions: permissions,
        })
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries(QUERY_KEY.getCrmUsers);
      CloseModal();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <FlexExtend $direction="column" $gap={20}>
      <H1>Edit Crm User</H1>

      <Formik
        validationSchema={crmUserSchema}
        initialValues={{
          role: "",
          permissions: [],
          firstName: crmUser.firstName,
          lastName: crmUser.lastName,
        }}
        onSubmit={(values) => {
          updateUser.mutate({
            _id: crmUser._id,
            role: values.role,
            firstName: values.firstName,
            lastName: values.lastName,
            permissions: values.permissions,
          });
          console.log(values);
        }}
      >
        {({ values }) => (
          <FormExtend>
            <CrmUserContainer>
              <RolesContainer>
                <CrmLabel>
                  <span>Edit User:</span>
                </CrmLabel>
                <FTextField label="FirstName" name="firstName" />
                <FTextField label="LastName" name="lastName" />
              </RolesContainer>
              <PermissionsContainer>
                <CrmLabel>
                  <span>Permissions:</span>
                </CrmLabel>
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
            </CrmUserContainer>
            <SubmitContainer>
              <SubmitButton name="Create Role" />
            </SubmitContainer>
          </FormExtend>
        )}
      </Formik>
    </FlexExtend>
  );
}
