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

  useEffect(() => {
    fetchEvents();
  }, [value]);
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
            </div>

            <table className="w-full">
              <thead>
                <tr className=" text-center ">
                  <th>IMAGE</th>
                  <th>EVENT NAME</th>
                  <th>PRICE</th>
                  <th>
                    <ModalEventEditComponent button="Add Event" />
                  </th>
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
          </div>
        </div>
      </EventContext.Provider>
    </>
  );
}

export default Page;
