import Pusher from "pusher-js";
// import { pusherAuthEndpoint } from "./apiEndpoints";
import { PUSHER_API_KEY, PUSHER_APP_CLUSTER } from "./../constants/config";

// Required to make cross-origin requests
Pusher.Runtime.createXHR = function () {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  return xhr;
};

export const channels = {
  channel_name: () => "channel_name"
};
export const events = {
  event_name: () => "event_name"
};

export const pusher = new Pusher(PUSHER_API_KEY, {
  cluster: PUSHER_APP_CLUSTER,
  encrypted: true
});
