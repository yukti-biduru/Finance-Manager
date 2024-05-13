import { useState } from "react";
import supabase_client from "../resources/supabase_client";

function Budgeting() {
  const [budget, setBudget] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(0); // New state variable
  const userId = localStorage.getItem("userId");

  function get_budget() {
    const get_budget = async () => {
      const res = await supabase_client
        .from("budget")
        .select("budget_value")
        .eq("user_id", userId)
        .limit(1);
      if (res.data?.length! > 0) {
        setBudget(res.data![0].budget_value);
      }
    };
    get_budget();
  }
  function submit_budget() {
    const submit_budget = async () => {
      setBudget(inputValue);
      const res = await supabase_client
        .from("budget")
        .select("*")
        .eq("user_id", userId)
        .limit(1);
      if (res.data?.length! > 0) {
        const { data, error } = await supabase_client
          .from("budget")
          .update({ budget_value: budget })
          .eq("user_id", userId);
        console.log(budget);
      } else {
        const { data, error } = await supabase_client
          .from("budget")
          .insert([{ budget_value: budget, user_id: userId }])
          .select();
        console.log(error);
      }
    };
    submit_budget();
  }
  get_budget();
  return (
    <div>
      <div className="App">
        <label htmlFor="Budget_input">Overall Budget:</label>
        <input
          type="number"
          id="Budget_input"
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="Budget_input">Your budget is: {budget}</label>
        <button onClick={() => submit_budget()}>Update Budget</button>
      </div>
    </div>
  );
}
export default Budgeting;
