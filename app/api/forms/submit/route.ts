import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db/client";
import { formSubmissions } from "@/db/schema";

const MAX_FIELDS = 50;
const MAX_FIELD_BYTES = 10_000;

/**
 * Generic submit endpoint for editor-built forms (formContainerElement).
 * Accepts FormData OR JSON. Returns 200 on success.
 *
 * NOTE: this stores raw payloads. Sanitize anything sensitive at display time
 * (e.g. admin view). Spam / rate-limiting will be added in Phase 2.
 */
export async function POST(req: NextRequest) {
  let formKey: string;
  let payload: Record<string, unknown> = {};

  const contentType = req.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const body = await req.json();
      formKey = String(body.formKey || "");
      payload = (body.payload && typeof body.payload === "object") ? body.payload : {};
    } else {
      const form = await req.formData();
      formKey = String(form.get("__formKey") || "");
      let count = 0;
      for (const [k, v] of form.entries()) {
        if (k === "__formKey") continue;
        if (++count > MAX_FIELDS) break;
        if (v instanceof File) {
          // Phase 2: stream files to Sanity Assets. For now drop them.
          payload[k] = { __file: true, name: v.name, size: v.size, type: v.type };
        } else {
          const s = String(v);
          payload[k] = s.length > MAX_FIELD_BYTES ? s.slice(0, MAX_FIELD_BYTES) : s;
        }
      }
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form body" }, { status: 400 });
  }

  if (!formKey || !/^[a-z0-9-]+$/.test(formKey)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid formKey" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  try {
    await db.insert(formSubmissions).values({
      formKey,
      payload,
      ip,
      userAgent: req.headers.get("user-agent") || null,
      referer: req.headers.get("referer") || null,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[/api/forms/submit] db error:", err);
    return NextResponse.json({ ok: false, error: "Storage failure" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
