import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import services from ".";
import { getBrowserName } from "../utils";
import config from "../config";

const trackService = {
  async trackEvent(
    event: string,
    metadata: Record<string, string | number | boolean | undefined | null> = {},
  ) {
    const user = await services.auth.getCurrentUser();
    if (user) {
      metadata = {
        ...metadata,
        userId: user.id,
      };
    }

    Object.assign(metadata, {
      browser: getBrowserName(navigator.userAgent),
      platform:
        // @ts-expect-error userAgentData is not supported in all browsers
        navigator.userAgentData?.platform || navigator.platform || "unknown",
      mobile:
        // @ts-expect-error userAgentData is not supported in all browsers
        navigator.userAgentData?.mobile ?? navigator.userAgent.includes("Mobi"),
      href: location.href,
      env: config.env,
    });

    console.log(
      `%c[EVENT] [${event.toUpperCase()}]`,
      "background:green;color:white",
      metadata,
    );

    sendGAEvent("event", event, metadata);
    sendGTMEvent({ event, ...metadata });
  },
};

export default trackService;
