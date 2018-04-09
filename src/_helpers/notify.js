import { message } from "antd";

message.config({ top: 10, duration: 3 });

export const notify = (content, type) => {
  message[type](content);
};
