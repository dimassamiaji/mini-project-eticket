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
function ModalTransactionUser(props) {
  const transactions = useContext(TransactionContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initalReview = {
    rating: 0,
    review: "",
  };
  const formik = useFormik({
    initialValues: initalReview,
    onSubmit: (values) => {
      save(values);
    },
  });
  const edit = async (id) => {
    const res = await axiosInstance().get("/transactions/users", {
      params: {
        invoice_no: props.invoice_no,
      },
    });
    const transaction = res.data.result;
    console.log(transaction);
    if (transaction) {
      formik.setFieldValue("rating", transaction[0].rating);
      formik.setFieldValue("review", transaction[0].review);
    }
  };
  const save = (values) => {
    const { review, rating } = values;
    axiosInstance()
      .patch("/transactions/users", {
        rating: Number(rating),
        review,
        invoice_no: props.invoice_no,
      })
      .then(() => {
        onClose();
        transactions();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    edit();
  }, [isOpen]);
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
                <form action="" onSubmit={formik.handleSubmit}>
                  <table>
                    <tbody>
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
                      <tr>
                        <td> Rating</td>
                        <td>
                          <Select
                            placeholder="Rating"
                            onChange={formik.handleChange}
                            value={formik.values.rating}
                            id="rating"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td> Review</td>
                        <td>
                          <textarea
                            type="text"
                            className="border p-1 w-full"
                            value={formik.values.review}
                            id="review"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <button
                            type="submit"
                            className="bg-black text-white p-1 px-2 rounded-md w-24 "
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalTransactionUser;
