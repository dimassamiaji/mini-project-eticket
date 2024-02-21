/** @format */
import PasswordChangerComponent from "@/components/auth/forgotPass";
import { Center } from "@chakra-ui/react";
import { axiosInstanceSSR } from "@/axios/axios";

async function Page({ params }) {
  const token = params.token;
  return (
    <Center className=" min-h-screen ">
      <PasswordChangerComponent token={token} />
    </Center>
  );
}
export default Page;
