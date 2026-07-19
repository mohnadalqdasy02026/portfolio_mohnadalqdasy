// Direct Supabase REST API - no package needed!

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

interface SupabaseResponse<T> {
  data: T | null;
  error: string | null;
}

async function fetchFromSupabase<T>(
  table: string,
  options: {
    method?: string;
    body?: object;
    filters?: Record<string, string>;
  } = {}
): Promise<SupabaseResponse<T>> {
  const { method = "GET", body, filters } = options;
  
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  
  if (filters) {
    const params = new URLSearchParams(filters);
    url += `?${params.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": method === "GET" ? "return=representation" : "return=minimal"
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase error:", errorText);
      return { data: null, error: errorText };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: String(error) };
  }
}

// Portfolio Data Operations
export async function getPortfolioData() {
  const result = await fetchFromSupabase<any[]>("portfolio_data", {
    filters: { data_key: "eq.main" }
  });
  return result.data?.[0]?.data || null;
}

export async function savePortfolioData(data: object) {
  // First try to update
  const updateResult = await fetchFromSupabase("portfolio_data", {
    method: "PATCH",
    body: { data, updated_at: new Date().toISOString() },
    filters: { data_key: "eq.main" }
  });

  if (updateResult.error || !updateResult.data) {
    // If update failed (no rows), insert
    return await fetchFromSupabase("portfolio_data", {
      method: "POST",
      body: { data_key: "main", data, updated_at: new Date().toISOString() }
    });
  }

  return updateResult;
}

// Admin User Operations
export async function getAdminUser(email: string) {
  const result = await fetchFromSupabase<any[]>("admin_users", {
    filters: { email: `eq.${email}` }
  });
  return result.data?.[0] || null;
}

export async function createAdminUser(email: string, passwordHash: string, name: string) {
  return await fetchFromSupabase("admin_users", {
    method: "POST",
    body: { email, password_hash: passwordHash, name, role: "admin" }
  });
}

export async function updateLastLogin(id: number) {
  return await fetchFromSupabase("admin_users", {
    method: "PATCH",
    body: { last_login: new Date().toISOString() },
    filters: { id: `eq.${id}` }
  });
}
