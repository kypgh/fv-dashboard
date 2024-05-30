"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import FTextField from "../../../components/Formik/FTextField";
import FPasswordField from "../../../components/Formik/FPasswordField";
import SubmitButton from "../../../components/Form/SubmitButton";
import { DashboardApiAgent } from "@/utils/agents/dashboardApiAgent";
import { useRouter } from "next/navigation";
import Lottie from "@/components/Lottie";
import { ClipLoader } from "react-spinners";
import Loader from "@/components/Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 550px;
  margin: auto;

  padding: 20px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 0 5px 2px #00000033;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 15px;
  & h1 {
    text-align: center;
  }
`;

const FormSc = styled(Form)`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  position: relative;
  min-height: 300px;
  padding: 20px;

  & p {
    color: ${({ theme }) => theme.textPrimary};
  }

  & > span {
    color: red;
    bottom: 0;
    position: absolute;
  }
`;

export default function Login() {
  const router = useRouter();

  const signInSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Container>
      {isLoading && <Loader />}
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          setIsLoading(true);

          try {
            const result = await DashboardApiAgent.login(
              values.email,
              values.password
            );

            setErrorMsg("");
            return router.push("/");
          } catch (err: any) {
            console.error(err.response.data?.message);
            setErrorMsg(err.response.data?.message);
            setIsLoading(false);
          }
        }}
      >
        {({}) => (
          <FormSc>
            <FTextField name="email" label="Email" />
            <FPasswordField name="password" label="Password" />
            <SubmitButton name="Login" />

            {errorMsg && <span>{errorMsg}</span>}
          </FormSc>
        )}
      </Formik>
    </Container>
  );
}
