/**
 * Admin API Service
 * Centralized API client for all private admin dashboard operations.
 * Sends authorization headers automatically from session storage.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const ADMIN_STORAGE_KEY = "aayush_admin_key";

/**
 * Get stored admin key
 */
export function getStoredAdminKey() {
  try {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

/**
 * Save admin key to session storage
 */
export function setStoredAdminKey(key) {
  try {
    if (key) {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, key.trim());
    } else {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  } catch {}
}

/**
 * Remove admin key on logout
 */
export function clearStoredAdminKey() {
  try {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch {}
}

/**
 * Helper to make authenticated admin requests
 */
async function fetchAdminJson(endpoint, options = {}) {
  const adminKey = getStoredAdminKey();

  let response;
  try {
    response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
        ...(options.headers || {}),
      },
    });
  } catch (netErr) {
    console.error("Network error fetching admin endpoint:", endpoint, netErr);
    throw new Error("Unable to connect to the backend server. Please check connection.");
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    console.error("JSON parse error from admin endpoint:", parseErr);
    throw new Error("Received an invalid response from the server.");
  }

  if (response.status === 401) {
    clearStoredAdminKey();
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok || !data.success) {
    throw new Error(data?.message || "Admin operation failed.");
  }

  return data;
}

/**
 * Verify admin key
 */
export async function verifyAdminKey(key) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/auth/verify`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": (key || "").trim(),
    },
  });

  if (response.status === 401) {
    return false;
  }

  const data = await response.json();
  if (response.ok && data.success) {
    setStoredAdminKey(key);
    return true;
  }
  return false;
}

/**
 * Get dashboard overview metrics and recent records
 */
export async function getDashboardSummary() {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/dashboard`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}

/**
 * Get paginated, searchable, filtered leads
 */
export async function getAdminLeads({ page = 1, limit = 20, search = "", status = "all", projectType = "all", range = "" } = {}) {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (status && status !== "all") params.append("status", status);
  if (projectType && projectType !== "all") params.append("projectType", projectType);
  if (range) params.append("range", range);

  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/leads?${params.toString()}`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}

/**
 * Get lead detail with conversation history
 */
export async function getAdminLeadById(id) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/leads/${encodeURIComponent(id)}`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}

/**
 * Update lead status
 */
export async function updateAdminLeadStatus(id, status) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/leads/${encodeURIComponent(id)}/status`;
  return await fetchAdminJson(endpoint, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/**
 * Get paginated conversations list
 */
export async function getAdminConversations({ page = 1, limit = 20, search = "", range = "" } = {}) {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (range) params.append("range", range);

  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/conversations?${params.toString()}`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}

/**
 * Get full chronological conversation messages for a session
 */
export async function getAdminConversationBySessionId(sessionId) {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/conversations/${encodeURIComponent(sessionId)}`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}

/**
 * Get analytics metrics and distribution charts
 */
export async function getAdminAnalytics(range = "30d") {
  const endpoint = `${BASE_URL.replace(/\/+$/, "")}/admin/analytics?range=${encodeURIComponent(range)}`;
  return await fetchAdminJson(endpoint, { method: "GET" });
}
