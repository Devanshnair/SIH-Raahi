import { useRef, useState } from "react";
import img from "../../src/assets/LogoTemp.png";

// type VetProps = {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

const Vet = () => {
  const keywords = [
    "Digestive",
    "Infection",
    "Injury",
    "Allergy",
    "Parasites",
    "Toxins",
    "Dental",
    "Stress",
    "Chronic",
    "Nutrition",
  ];

  const chatLogRef = useRef<HTMLTextAreaElement>(null);
  const chatMessageInputRef = useRef<HTMLInputElement>(null);
  console.log(chatLogRef.current);
  console.log(chatMessageInputRef.current);

  const chatSocket = new WebSocket("ws://localhost:8000/ws/chat/");

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    chatLogRef.current!.value += data.response + "\n";
  };

  chatSocket.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
  };

  function onChatMessageSend(target?: HTMLInputElement) {
    const messageInputDom = target;
    if (!messageInputDom) return;
    const message = messageInputDom.value;
    chatSocket.send(
      JSON.stringify({
        message: message,
      }),
    );
    messageInputDom.value = "";
  }

  return (
    <section className="relative h-[100svh] w-full bg-black/60">
      <div
        style={{
          display: "block",
        }}
        className="absolute bottom-0 h-[100svh] w-full bg-white p-0"
      >
        <h2 className="relative mx-auto p-3 text-center text-2xl font-semibold text-green-800">
          Vet
          <button className="absolute right-3 top-[.85rem] rounded-full bg-green-100 hover:bg-green-200">
            {" "}
            <span className="sr-only">close</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                className="size-7 fill-green-800"
              >
                <g id="Menu / Close_SM">
                  <path
                    id="Vector"
                    d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                    stroke="#166534"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </span>
          </button>
        </h2>
        <hr />
        <div className="flex justify-center">
          <picture>
            <img
              src={img}
              style={{
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              }}
              className="h-52 pt-6"
              alt=""
            />
          </picture>
        </div>
        <p className="mx-auto max-w-56 pt-4 text-center text-3xl text-green-800">
          Why isn't Hugo feeling good?
        </p>

        <div className="mx-auto mt-6 flex max-w-[512px] flex-wrap justify-center gap-2 px-2">
          {keywords.map((keyword) => (
            <KeyWordToggleButton text={keyword} />
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center">
          <textarea
            ref={chatLogRef}
            id="chat-log"
            cols={100}
            rows={3}
            className="rounded-lg border bg-stone-200 p-2 px-3 outline-offset-4"
          ></textarea>
          <input
            ref={chatMessageInputRef}
            id="chat-message-input"
            type="text"
            className="mt-2 rounded-full border bg-stone-200 p-2 px-4 outline-offset-4"
            onClick={(e) => (e.target as HTMLTextAreaElement).focus()}
          />
          <button
            id="chat-message-submit"
            className="mx-auto mt-3 w-32 rounded-full bg-green-800 py-2 text-white"
            onClick={() => {
              if (!chatMessageInputRef.current) return;
              onChatMessageSend(chatMessageInputRef.current);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

function KeyWordToggleButton({ text }: { text: string }) {
  const [toggle, setToggle] = useState(false);
  return (
    <button
      onClick={() => setToggle((prev) => !prev)}
      className={`${toggle ? "bg-green-800 text-white" : "border border-green-800 text-green-800"} rounded-full px-4 py-2`}
    >
      {text}
    </button>
  );
}

export default Vet;
