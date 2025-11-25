"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export default function ApiTest() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function testApi() {
      try {
        const health = await apiClient.healthCheck();
        setStatus("success");
        setMessage(`API conectada! Versão: ${health.version}`);
      } catch (error) {
        setStatus("error");
        setMessage(
          "Erro ao conectar com a API. Verifique se o backend está rodando."
        );
      }
    }
    testApi();
  }, []);

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        status === "loading"
          ? "border-gray-300 bg-gray-50"
          : status === "success"
          ? "border-green-300 bg-green-50"
          : "border-red-300 bg-red-50"
      }`}
    >
      <div className="flex items-center gap-2">
        {status === "loading" && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
        )}
        {status === "success" && (
          <svg
            className="h-5 w-5 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {status === "error" && (
          <svg
            className="h-5 w-5 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span
          className={`text-sm font-medium ${
            status === "success"
              ? "text-green-800"
              : status === "error"
              ? "text-red-800"
              : "text-gray-700"
          }`}
        >
          {message || "Testando conexão..."}
        </span>
      </div>
    </div>
  );
}
