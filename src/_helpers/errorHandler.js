import { logout } from "./../_actions/auth_actions";
import { notify } from "./notify";

export function errorHandler(dispatch, error, type) {
  notify(error, "error");
}
