"use client";
import ErrorPage from "@/components/layout/ErrorPage";
import React from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorPage error={error} reset={reset} />;
};

export default error;
