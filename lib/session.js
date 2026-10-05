import { cookies } from "next/headers";
import { verifyJwt } from "./auth.js";

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyJwt(token);
    return payload;
  } catch {
    return null;
  }
}
