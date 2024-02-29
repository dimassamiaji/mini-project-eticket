/** @format */
"use client";

import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";

import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { Select } from "@chakra-ui/react";
import CategoriesComponent from "./admin/categories";
import LocationsComponent from "./admin/locations";
import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
function EventListComponent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [location, setLocation] = useState(0);
  const [events, setEvents] = useState([]);
  const [value] = useDebounce(search, 500);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const theme = createTheme();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const fetchEvents = () => {
    axiosInstance()
      .get("/events/page/" + page, {
        params: {
          event_name: search,
          category_id: category,
          location_id: location,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
        setPageCount(res.data.pageCount);
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
  useEffect(() => {
    fetchEvents();
    fetchCategories();
    fetchLocations();
  }, [value, category, location, page]);

  const ps = useMemo(() => [...events].sort((a, b) => a.id - b.id), [events]);
  // const ps = [...events].sort((a, b) => a.price - b.price);

  return (
    <div className="w-full">
      <div className=" mt-5 px-7 max-w-screen-2xl  w-full">
        <div className="flex flex-col lg:flex-row px-3 items-center justify-center gap-3  border-gray-300 border-b   p-2">
          <div className="flex gap-3 items-center justify-center">
            <Image src={Search} alt="" className=" w-3 h-3" />
            <input
              type="text"
              placeholder="Type any events here"
              className=" outline-none             "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            placeholder="Category"
            id="category_id"
            width={"200px "}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((categories, key) => (
              <CategoriesComponent {...categories} key={key} />
            ))}
          </Select>
          <Select
            placeholder="Location"
            id="location_id"
            width={"200px "}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((locations, key) => (
              <LocationsComponent {...locations} key={key} />
            ))}
          </Select>
        </div>
      </div>
      <div className="grid max-w-screen-2xl w-full grid-cols-1 lg:grid-cols-4 p-7 gap-3 justify-items-center">
        {ps?.map((event, key) => (
          <EventCard {...event} key={key} />
        ))}
      </div>
      <ThemeProvider theme={theme}>
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          className=" flex justify-center mb-4"
          onChange={handleChange}
        />
      </ThemeProvider>
    </div>
  );
}

export default EventListComponent;

export function EventCard({ image_url, event_name, id, price }) {
  return (
    <Link className="flex flex-col" href={"/events/" + id}>
      <img
        src={process.env.API_URL + image_url}
        className=" max-h-[154px] h-full max-w-[212px] w-full"
        alt=""
      />
      <div className="p-5 w-full h-full flex flex-col justify-between gap-2 ">
        <div className=" font-bold w-full "> {event_name}</div>

        <div className="text-[#249C58] font-semibold  ">
          IDR {Number(price).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
