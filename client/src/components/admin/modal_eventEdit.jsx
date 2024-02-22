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
  Select,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import CategoriesComponent from "./categories";
import LocationsComponent from "./locations";
import { EventContext } from "@/app/admin/dashboard/page";
import moment from "moment";
function ModalEventEditComponent(props) {
  const toast = useToast();
  const upload = useRef(null);
  const events = useContext(EventContext);
  const initalEvent = {
    event_name: "",
    price: 0,
    description: "",
    address: "",
    image_url: "",
    image: null,
    id: 0,
    start_date: "",
    end_date: "",
    availability: 0,
    category_id: 0,
    location_id: 0,
    price_type: "paid",
  };
  const formik = useFormik({
    initialValues: initalEvent,
    onSubmit: () => {
      save();
    },
  });
  const edit = async (id) => {
    const res = await axiosInstance().get("/events/" + props.id);
    const event = res.data.result;
    formik.setFieldValue("id", event.id);
    formik.setFieldValue("event_name", event.event_name);
    formik.setFieldValue("image_url", event.image_url);
    formik.setFieldValue("price", event.price);
    formik.setFieldValue("description", event.description);
    formik.setFieldValue("address", event.address);
    formik.setFieldValue(
      "start_date",
      moment(event.start_date).format("YYYY-MM-DD HH:mm:ss")
    );
    formik.setFieldValue(
      "end_date",
      moment(event.end_date).format("YYYY-MM-DD HH:mm:ss")
    );
    formik.setFieldValue("availability", event.availability);
    formik.setFieldValue("category_id", event.category_id);
    formik.setFieldValue("location_id", event.location_id);
    // formik.setFieldValue("price_type", event.price_type);
  };

  const save = () => {
    const form = new FormData();
    form.append("event_name", formik.values.event_name);
    form.append("image_url", formik.values.image_url);
    form.append("image", formik.values.image);
    form.append("price", formik.values.price);
    form.append("description", formik.values.description);
    form.append("address", formik.values.address);
    form.append("start_date", formik.values.start_date);
    form.append("end_date", formik.values.end_date);
    form.append("availability", formik.values.availability);
    form.append("category_id", document.getElementById("category_id").value);
    form.append("location_id", document.getElementById("location_id").value);
    // form.append("price_type", document.getElementById("price_type").value);
    if (formik.values.start_date > formik.values.end_date) {
      toast({
        title: "Error",
        position: "top",
        description: "start date need to be before end date",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (formik.values.id) {
      axiosInstance()
        .patch("/events/" + formik.values.id, form)
        .then(() => {
          onClose();
          events();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance()
        .post("/events/", form)
        .then(() => {
          onClose();
          events();
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchCategories = () => {
    axiosInstance()
      .get("/ecl/categories/")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  const fetchLocations = () => {
    axiosInstance()
      .get("/ecl/locations/")
      .then((res) => {
        setLocations(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  const renderFile = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };
  useEffect(() => {
    fetchCategories();
    fetchLocations();
    if (props.button == "Edit") {
      edit(props.id);
    }
  }, [props.id]);
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
          <ModalHeader>{props.button}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" py-3">
              <form id="form" action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-1 ">
                  <table>
                    <tbody>
                      <tr>
                        <td> Event Name</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Event Name"
                            className="border p-1  w-full "
                            required
                            id="event_name"
                            value={formik.values.event_name}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Image</td>
                        <td>
                          <input
                            type="file"
                            placeholder="Image URL"
                            className="border p-1  w-full hidden"
                            id="image_url"
                            onChange={(e) => renderFile(e)}
                            ref={upload}
                          />
                          <button
                            className="bg-full bg-green-500  w-32 text-white rounded-md "
                            type="button"
                            onClick={() => {
                              upload.current.click();
                            }}
                          >
                            upload
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td> Ticket Price</td>
                        <td>
                          <input
                            type="number"
                            placeholder="Ticket Price"
                            className="border p-1 w-full"
                            required
                            id="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
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
                        <td> Address</td>
                        <td>
                          <textarea
                            type="text"
                            placeholder="Address"
                            className="border p-1 w-full"
                            required
                            value={formik.values.address}
                            id="address"
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
                        <td> Availability</td>
                        <td>
                          <input
                            type="number"
                            className="border p-1 w-full"
                            required
                            value={formik.values.availability}
                            id="availability"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Category</td>
                        <td>
                          <Select
                            defaultValue={formik.values.category_id}
                            id="category_id"
                          >
                            {categories.map((categories, key) => (
                              <CategoriesComponent {...categories} key={key} />
                            ))}
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td> Location</td>
                        <td>
                          <Select
                            defaultValue={formik.values.location_id}
                            id="location_id"
                          >
                            {locations.map((locations, key) => (
                              <LocationsComponent {...locations} key={key} />
                            ))}
                          </Select>
                        </td>
                      </tr>
                      {/* <tr>
                        <td> Type</td>
                        <td>
                          <Select
                            defaultValue={formik.values.price_type}
                            id="price_type"
                          >
                            <option value="paid">Paid</option>
                            <option value="free">Free</option>
                          </Select>
                        </td>
                      </tr> */}
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
export default ModalEventEditComponent;
