/** @format */
"use client";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Heading,
  Flex,
  Button,
  useToast,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstanceSSR } from "@/axios/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function PasswordChangerComponent({ token }) {
  const router = useRouter();

  YupPassword(Yup);
  const toast = useToast();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const inputFormik = () => {
    formik.setValues({
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      password: Yup.string().min(5).minNumbers(1).required().minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "password does not match"),
    }),
    async onSubmit(values) {
      try {
        const { password } = values;
        const res = await axiosInstanceSSR().patch(
          "/users/v4",
          { password },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(function () {
          router.push("/auth/login");
        });
      } catch (error) {
        toast({
          title: "Error",
          position: "top",

          description: error?.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    const { password, confirmPassword } = formik.values;
    if (password && confirmPassword) formik.handleSubmit();
  }, [formik.values]);
  return (
    <>
      <Flex className=" max-w-96 w-full flex-col gap-2 ">
        <Heading> Change Password</Heading>
        <FormControl className="flex flex-col gap-2">
          <div>
            <FormLabel>Password </FormLabel>
            <Input type="password" id="password" />
            <FormHelperText color={"red"}>
              {formik.errors.password}
            </FormHelperText>
          </div>
          <div>
            <FormLabel>Confirm Password </FormLabel>
            <Input type="password" id="confirmPassword" />
            <FormHelperText color={"red"}>
              {formik.errors.confirmPassword}
            </FormHelperText>
          </div>
        </FormControl>
        <div>
          Have account ?{" "}
          <Link href="/auth/login" className="text-[#4F46E5] font-bold">
            Login
          </Link>
        </div>
        <Button type="button" colorScheme={"facebook"} onClick={inputFormik}>
          Change Password
        </Button>
      </Flex>
    </>
  );
}
export default PasswordChangerComponent;
