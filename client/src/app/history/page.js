/** @format */
"use client";
import { createContext, useEffect, useRef, useState } from "react";

import { NavbarAdminComponent } from "@/components/navbar";
import Search from "@/assets/search.png";
import { axiosInstance } from "@/axios/axios";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import Swal from "sweetalert2";
import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import UserTransactionCard from "@/components/userTransactionCard";

export const TransactionContext = createContext(null);
/** @format */
function Page() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [transactions, setTransactions] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [page, setPage] = useState(1);
  // const theme = createTheme();
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };
  const fetchTransactions = () => {
    axiosInstance()
      .get("/transactions/users", {
        params: {
          invoice_no: search,
        },
      })
      .then((res) => {
        setTransactions(res.data.result);
        // setPageCount(res.data.pageCount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTransactions();
  }, [value]);
  return (
    <>
      <NavbarAdminComponent />
      <TransactionContext.Provider value={fetchTransactions}>
        <div className="w-full">
          <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
            <h1 className=" text-2xl font-bold m-4">Transactions</h1>
            <div className="py-5 w-full flex justify-between">
              <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2 justify-between">
                <Image src={Search} alt="" className=" w-3 h-3" />
                <input
                  type="text"
                  placeholder="Type invoice no. here"
                  className=" outline-none             "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <table className=" w-full">
              <thead>
                <tr className=" text-center ">
                  <th width="60%">INVOICE NO</th>
                  <th width="40%"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <UserTransactionCard
                    {...transaction}
                    key={key}
                    // hapus={() => hapus(event.id, event.event_name)}
                  />
                ))}
              </tbody>
            </table>

            {/* <ThemeProvider theme={theme}>
              <Pagination
                count={pageCount}
                page={page}
                color="primary"
                className=" flex justify-center mb-4"
                onChange={handleChange}
              />
            </ThemeProvider> */}
          </div>
        </div>
      </TransactionContext.Provider>
    </>
  );
}

export default Page;
