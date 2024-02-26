/** @format */
"use client";
import { createContext, useEffect, useRef, useState } from "react";

import { NavbarAdminComponent } from "@/components/navbar";
import Search from "@/assets/search.png";
import { axiosInstance } from "@/axios/axios";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import Swal from "sweetalert2";
import AdminPromoCard from "@/components/admin/adminPromoCard";

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
      .get("/promotions/", {
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
            <h1 className=" text-2xl font-bold m-4">Promotions</h1>
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
                </tr>
              </thead>
              <tbody>
                {events.map((event, key) => (
                  <AdminPromoCard
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
