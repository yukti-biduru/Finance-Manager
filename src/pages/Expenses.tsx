import { Grid } from "gridjs-react";
import * as xlsx from "xlsx";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import supabase_client from "../resources/supabase_client";
Chart.register(...registerables);

function Expenses() {
  const userId = localStorage.getItem("userId");
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [bardata, setBarData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({ labels: [], datasets: [] });
  const readUploadFile = (e: any) => {
    // e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        localStorage.setItem("file", JSON.stringify(json));
        setUploadedFile(JSON.stringify(json));
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  function submit_file() {
    const sub_file = async () => {
      const { data, error } = await supabase_client
        .from("file_upload")
        .insert([
          {
            file: JSON.parse(localStorage.getItem("file") || "[]"),
            user_id: userId,
          },
        ])
        .select();
      console.log(error);
    };
    sub_file();
  }

  function createData() {
    let dates: string[] = [];
    let amts: number[] = [];
    const uploadedFile = JSON.parse(localStorage.getItem("file") || "[]");
    uploadedFile.forEach((element: any) => {
      dates.push(element["Post Date"]);
      amts.push(element["Amount"]);
    });

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Expenses",
          data: amts,
          backgroundColor: "red",
        },
      ],
    };
    // console.log(data);
    setBarData(data);
  }
  useEffect(() => {
    createData();
  }, [uploadedFile]);
  return (
    <div>
      <h2>Expenses</h2>
      <div>
        <h1>Upload your csv file please</h1>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </div>
      <div>
        <Grid
          data={JSON.parse(localStorage.getItem("file") || "[]")}
          columns={[
            {
              id: "Trans. Date",
              name: "Transaction Date",
            },
            {
              id: "Post Date",
              name: "Email",
            },
            {
              id: "Description",
              name: "Description",
            },
            {
              id: "Amount",
              name: "Amt",
            },
            {
              id: "Category",
              name: "category",
            },
          ]}
        />
        <div>
          <button onClick={() => submit_file()}>Submit File</button>
        </div>
        <div>
          <Bar data={bardata} />
        </div>
      </div>
    </div>
  );
}
export default Expenses;
