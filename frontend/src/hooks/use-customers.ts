"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  title: string | null;
  rfm_segment: string | null;
  rfm_score: number | null;
  clv_total: number;
  clv_predicted: number;
  clv_order_count: number;
  last_activity_at: string | null;
  created_at: string;
  tags: string[];
}

interface PaginatedResponse {
  data: Customer[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface UseCustomersParams {
  page?: number;
  perPage?: number;
  search?: string;
  segment?: string;
  sort?: string;
  direction?: "asc" | "desc";
}

export function useCustomers(params: UseCustomersParams = {}) {
  const [data, setData] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (params.page) query.set("page", String(params.page));
      if (params.perPage) query.set("per_page", String(params.perPage));
      if (params.search) query.set("search", params.search);
      if (params.segment) query.set("rfm_segment", params.segment);
      if (params.sort) query.set("sort", params.sort);
      if (params.direction) query.set("dir", params.direction);

      const qs = query.toString();
      const res = await api<PaginatedResponse>(`/customers${qs ? `?${qs}` : ""}`);
      setData(res.data);
      setPagination({
        current_page: res.current_page,
        last_page: res.last_page,
        per_page: res.per_page,
        total: res.total,
      });
    } catch {
      // silently fail — will show empty state
    } finally {
      setLoading(false);
    }
  }, [params.page, params.perPage, params.search, params.segment, params.sort, params.direction]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { data, pagination, loading, refetch: fetchCustomers };
}
