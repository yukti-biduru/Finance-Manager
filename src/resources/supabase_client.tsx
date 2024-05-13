import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "../resources/constants";

const supabase_client = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase_client;
