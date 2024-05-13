import supabase_client from "../resources/supabase_client";

export function Logout() {
  const logout = async () => {
    let { error } = await supabase_client.auth.signOut();
    localStorage.removeItem("userId");
    localStorage.removeItem("file");
  };
  logout();
  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}
