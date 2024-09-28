import { format } from "date-fns";
import { Events } from "../modifyEvents";

export function setEventInUpadateModal(event: Events[0]) {
  (document.querySelector("#update-modal-name")! as HTMLInputElement).value =
    event?.name;
  (
    document.querySelector("#update-modal-startDateTime")! as HTMLInputElement
  ).value = format(event?.startDateTime, "yyyy-MM-dd'T'HH:mm");

  (
    document.querySelector("#update-modal-endDateTime")! as HTMLInputElement
  ).value = format(event?.endDateTime, "yyyy-MM-dd'T'HH:mm");

  (
    document.querySelector(
      "#update-modal-theme > button > .text",
    )! as HTMLDivElement
  ).textContent = event?.theme;

  (
    document.querySelector("#update-modal-description")! as HTMLTextAreaElement
  ).value = event?.description ?? "";
  (
    document.querySelector("[data-eventid]") as HTMLDialogElement
  ).dataset.eventid = event?.id ?? "";
}
