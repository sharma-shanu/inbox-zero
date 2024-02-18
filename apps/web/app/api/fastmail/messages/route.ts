import { withError } from "@/utils/middleware";
import { NextResponse } from "next/server";
import JamClient from "jmap-jam";
import { env } from "@/env.mjs";

export const GET = withError(async () => {
  const jam = new JamClient({
    sessionUrl: env.FASTMAIL_SESSION_PROVIDER,
    bearerToken: env.FASTMAIL_TOKEN,
  });

  const accountId = await jam.getPrimaryAccount();

  const [emails] = await jam.api.Email.query({ accountId });
  const [mailboxes] = await jam.api.Email.get({
    accountId,
    ids: emails.ids,
  });

  return NextResponse.json(mailboxes);
});
