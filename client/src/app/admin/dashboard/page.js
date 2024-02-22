/** @format */
"use client";
import { createContext, useEffect, useRef, useState } from "react";

import { NavbarAdminComponent } from "@/components/navbar";
import Search from "@/assets/search.png";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";
import AdminEventCard from "@/components/admin/adminCard";
import { useDebounce } from "use-debounce";
import { Select } from "@chakra-ui/react";
import CategoriesComponent from "@/components/admin/categories";
import LocationsComponent from "@/components/admin/locations";
import Image from "next/image";
import Swal from "sweetalert2";
import { warning } from "framer-motion";
import ModalEventEditComponent from "@/components/admin/modal_eventEdit";

export const EventContext = createContext(null);
/** @format */
function Page() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
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
    form.append("price_type", document.getElementById("price_type").value);

    axiosInstance()
      .post("/events/", form)
      .then(() => {
        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });
    formik.resetForm();
  };

  const hapus = (id, event_name) => {
    Swal.fire({
      title: "are you sure you want to delete  " + event_name + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance()
          .delete("/events/" + id)
          .then(() => {
            fetchEvents();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const fetchEvents = () => {
    axiosInstance()
      .get("/events/", {
        params: {
          event_name: search,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
      })
      .catch((err) => console.log(err));
  };
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
    fetchEvents();
  }, [value]);
  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);
  const upload = useRef(null);
  return (
    <>
      <NavbarAdminComponent />
      <EventContext.Provider value={fetchEvents}>
        <div className="w-full">
          <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
            <div className="py-5 w-full flex justify-between">
              <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2">
                <Image src={Search} alt="" className=" w-3 h-3" />
                <input
                  type="text"
                  placeholder="Type any event here"
                  className=" outline-none             "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className=" flex items-center">
                <ModalEventEditComponent button="Add Event" />
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className=" text-center ">
                  <th>IMAGE</th>
                  <th>EVENT NAME</th>
                  <th>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, key) => (
                  <AdminEventCard
                    {...event}
                    key={key}
                    edit={() => edit(event.id)}
                    hapus={() => hapus(event.id, event.event_name)}
                  />
                ))}
              </tbody>
            </table>
            <div className="mt-16 py-3">
              <form id="form" action="" onSubmit={formik.handleSubmit}>
                <h1 className="font-bold text-2xl mb-3">Add Event</h1>
                <div className="flex flex-col gap-1 ">
                  <table>
                    <tbody>
                      <tr>
                        <td> Event Name</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Event Name"
                            className="border p-1  w-96 "
                            required
                            id="event_name"
                            value={formik.values.event_name}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td> Event Banner</td>
                        <td>
                          <input
                            type="file"
                            placeholder="Image URL"
                            className="border p-1  w-96 hidden"
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
                            className="border p-1 w-96"
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
                            className="border p-1 w-96"
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
                            className="border p-1 w-96"
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
                            type="date"
                            className="border p-1 w-96"
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
                            type="date"
                            className="border p-1 w-96"
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
                            className="border p-1 w-96"
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
                            defaultValue={categories[0]?.id}
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
                            defaultValue={locations[0]?.id}
                            id="location_id"
                          >
                            {locations.map((locations, key) => (
                              <LocationsComponent {...locations} key={key} />
                            ))}
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td> Type</td>
                        <td>
                          <Select defaultValue="paid" id="price_type">
                            <option value="paid">Paid</option>
                            <option value="free">Free</option>
                          </Select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex gap-2">
                    <button
                      className="bg-black text-white p-1 px-2 rounded-md w-24 "
                      type="submit"
                    >
                      submit
                    </button>
                    <button
                      className="bg-black text-white p-1 px-2 rounded-md w-24 "
                      onClick={() => formik.resetForm()}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </EventContext.Provider>
    </>
  );
}

export default Page;
