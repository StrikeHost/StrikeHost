import { Handler } from "./Handler";
import { DeleteInstanceEvent } from "../../interfaces/ServerEvents";

export class DeleteInstanceHandler extends Handler {
  public async dispatch(event: DeleteInstanceEvent) {}
}
