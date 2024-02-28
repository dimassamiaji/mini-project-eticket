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
function ModalPromotion(props) {
  const toast = useToast();
  const events = useContext(EventContext);
  const initalPromo = {
    id: 0,
    description: "",
    start_date: "",
    end_date: "",
    limit: 999999,
    discount: 0,
  };
  const formik = useFormik({
    initialValues: initalPromo,
    onSubmit: (values) => {
      save(values);
    },
  });
  const edit = async (id) => {
    console.log(props.id);
    const res = await axiosInstance().get("/promotions/" + props.id);
    const promo = res.data.result;
    if (promo) {
      formik.setFieldValue("id", promo.id);
      formik.setFieldValue("description", promo.description);
      formik.setFieldValue("limit", promo.limit);
      formik.setFieldValue("discount", promo.discount);
      formik.setFieldValue(
        "start_date",
        moment(promo.start_date).format("YYYY-MM-DD HH:mm:ss")
      );
      formik.setFieldValue(
        "end_date",
        moment(promo.end_date).format("YYYY-MM-DD HH:mm:ss")
      );
    }
  };
  const save = (values) => {
    const { id, description, limit, discount, start_date, end_date } = values;
    if (formik.values.start_date >= formik.values.end_date) {
      toast({
        title: "Error",
        position: "top",
        description: "start date need to be before end date",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (props.id) {
      axiosInstance()
        .patch("/promotions/" + props.id, {
          description,
          limit,
          discount,
          start_date,
          end_date,
        })
        .then(() => {
          onClose();
          events();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance()
        .post("/promotions/", {
          id: props.id,
          description,
          limit,
          discount,
          start_date,
          end_date,
        })
        .then(() => {
          onClose();
          events();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <ModalHeader>{props.button + " " + props.event_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" py-3">
              <form id="form" action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-1 ">
                  <table>
                    <tbody>
                      <tr>
                        <td> Description</td>
                        <td>
                          <textarea
                            type="text"
                            placeholder="Description"
                            className="border p-1 w-full"
                            required
                            value={formik.values.description}
                            id="description"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Discount %</td>
                        <td>
                          <input
                            type="number"
                            placeholder="10%"
                            className="border p-1 w-full"
                            required
                            value={formik.values.discount}
                            id="discount"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Start Date</td>
                        <td>
                          <input
                            type="datetime-local"
                            className="border p-1 w-full"
                            required
                            value={formik.values.start_date}
                            id="start_date"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> End Date</td>
                        <td>
                          <input
                            type="datetime-local"
                            className="border p-1 w-full"
                            required
                            value={formik.values.end_date}
                            id="end_date"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Limit</td>
                        <td>
                          <input
                            type="number"
                            className="border p-1 w-full"
                            required
                            value={formik.values.limit}
                            id="limit"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex mt-6 items-center justify-center">
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    type="submit"
                  >
                    submit
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalPromotion;
