import { axiosInstance } from "@/axios/axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { EventContext } from "@/app/admin/dashboard/page";
import moment from "moment";
import { TransactionContext } from "@/app/admin/transaction/page";
function ModalTransaction(props) {
  const transactions = useContext(TransactionContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="h-[30px] border min-w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black px-2"
      >
        {props.button}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"24rem"}>
          <ModalHeader>Invoice no. </ModalHeader>
          <ModalHeader>{props.invoice_no}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" py-3">
              <div className="flex flex-col gap-1 ">
                <table>
                  <tbody>
                    <tr>
                      <td> User Email</td>
                      <td>: {props.user.email}</td>
                    </tr>
                    <tr>
                      <td> Event Name</td>
                      <td>: {props.event.event_name}</td>
                    </tr>
                    <tr>
                      <td> Total</td>
                      <td>
                        : IDR {Number(props.price).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalTransaction;
