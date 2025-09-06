// lib\api-response.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";

export type ApiResponseMetadata = {
  requestId: string;
  serverTimestamp: number;
  processingTime: number;
  serverTimeZone: string;
  apiVersion: string;
  requestMethod: string;
  requestPath: string;
  userAgent: string;
  clientIp?: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type ApiResponse<T = any> = {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: any;
  } | null;
  metadata: ApiResponseMetadata;
  message?: string | undefined;
};

/**
 * Generates metadata for API responses
 */
function generateMetadata(
  request: NextRequest,
  startTime: number,
): ApiResponseMetadata {
  const url = new URL(request.url);
  const requestId = crypto.randomUUID();
  const now = performance.now();

  return {
    requestId,
    serverTimestamp: Date.now(),
    processingTime: Math.round((now - startTime) * 100) / 100, // Round to 2 decimal places
    serverTimeZone: "Africa/Kigali", // Consider making this dynamic or configurable
    apiVersion: process.env.API_VERSION || "v1",
    requestMethod: request.method,
    requestPath: url.pathname,
    userAgent: request.headers.get("user-agent") || "Unknown",
    clientIp:
      request.headers.get("x-forwarded-for")?.split(",")[0] || undefined,
  };
}

/**
 * Creates a standardized successful API response
 */
export function successResponse<T>(
  request: NextRequest,
  data: T,
  options?: {
    statusCode?: number;
    message?: string;
    startTime?: number;
    pagination?: ApiResponseMetadata["pagination"];
  },
): NextResponse<ApiResponse<T>> {
  const startTime = options?.startTime || performance.now();
  const metadata = generateMetadata(request, startTime);

  // Add message to metadata if provided
  const responseMessage = options?.message;

  if (options?.pagination) {
    metadata.pagination = options.pagination;
  }

  return NextResponse.json(
    {
      success: true,
      data,
      message: responseMessage, // Include message in the response if provided
      error: null,
      metadata,
    },
    {
      status: options?.statusCode || 200,
      headers: {
        "X-Request-ID": metadata.requestId,
      },
    },
  );
}

/**
 * Creates a standardized error API response
 */
export function errorResponse(
  request: NextRequest,
  error: {
    code: string;
    message: string;
    details?: any;
  },
  options?: {
    statusCode?: number;
    startTime?: number;
  },
): NextResponse<ApiResponse<null>> {
  const startTime = options?.startTime || performance.now();
  const metadata = generateMetadata(request, startTime);

  return NextResponse.json(
    {
      success: false,
      data: null,
      error,
      metadata,
    },
    {
      status: options?.statusCode || 400,
      headers: {
        "X-Request-ID": metadata.requestId,
      },
    },
  );
}

/**
 * Error codes for standardized API errors
 */
export const ErrorCodes = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  RATE_LIMITED: "RATE_LIMITED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
