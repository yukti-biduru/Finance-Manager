import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import supabase_client from "../resources/supabase_client";
Chart.register(...registerables);

function Status() {
  // console.log(userId + "   is the user id");
  const [uploadedFile, setUploadedFile] = useState<[]>([]);
  const [bardata, setBarData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({ labels: [], datasets: [] });

  function get_file() {
    const file = async () => {
      const userId = localStorage.getItem("userId");

      console.log(userId + " is the user id");
      console.log("get_file");
      const { data, error } = await supabase_client
        .from("file_upload")
        .select("*")
        .eq("user_id", userId)
        .limit(1);
      // if (file.length! > 0) {
      //   console.log(error);
      //   setUploadedFile(data![0].file);
      // }
      console.log(file.length);
    };
  }

  // function createData() {
  //   let dates: string[] = [];
  //   let amts: number[] = [];
  //   uploadedFile.forEach((element: any) => {
  //     dates.push(element["Post Date"]);
  //     amts.push(element["Amount"]);
  //   });

  //   const data = {
  //     labels: dates,
  //     datasets: [
  //       {
  //         label: "Expenses",
  //         data: amts,
  //         backgroundColor: "red",
  //       },
  //     ],
  //   };
  //   // console.log(data);
  //   setBarData(data);
  // }

  get_file();
  // useEffect(() => {
  //   createData();
  // }, [uploadedFile]);

  return (
    <div>
      <Bar data={bardata} />
    </div>
  );
}
export default Status;
