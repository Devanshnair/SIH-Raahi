import React, { useEffect, useCallback, useState, useRef } from "react";
import peer from "./peer";
import { useSocket } from "../../context/SocketProvider";
import { TiVideo } from "react-icons/ti";
import { PiPhoneCallLight } from "react-icons/pi";
import { IoArrowUpOutline, IoCameraOutline, IoCloseOutline, IoMicOffOutline, IoMicOutline, IoVideocamOffOutline, IoVideocamOutline } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type Stream = MediaStream | null;
type SocketId = string | null;

const RoomPage: React.FC = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [remoteSocketId, setRemoteSocketId] = useState<SocketId>(null);
  const [myStream, setMyStream] = useState<Stream>(null);
  const [remoteStream, setRemoteStream] = useState<Stream>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [screenSharing, setScreenSharing] = useState<boolean>(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const [searchParams] = useSearchParams();

  const emailId = searchParams.get('emailId');
  const { roomId } = useParams();

  const handleJoinRoom = useCallback(
    (data: { email: string; room: string }) => {
      const { room } = data;
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );


  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      console.log(`Email ${email} joined room`);
      setRemoteSocketId(id);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    if (!remoteSocketId) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (!myStream) return;
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: string; offer: RTCSessionDescriptionInit }) => {
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleToggleMute = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleShareScreen = async () => {
    if (!screenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      const senders = peer.peer.getSenders();
      const videoSender = senders.find(sender => sender.track?.kind === 'video');
      if (videoSender) {
        videoSender.replaceTrack(screenTrack);
      }
      setScreenSharing(true);
      screenTrack.onended = () => {
        if (videoSender) {
          videoSender.replaceTrack(myStream?.getVideoTracks()[0] || screenTrack);
        }
        setScreenSharing(false);
      };
    }
  };

  const handleEndCall = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    setRemoteStream(null);
    socket.disconnect();
  };

  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: RTCTrackEvent) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  
 useEffect(() => {
  if (socket) {
    setEmail(emailId);
    setRoom(roomId)
    socket.emit("room:join", { email, room });
  }
}, [email, emailId, room, roomId, socket]);


  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket?.off("room:join", handleJoinRoom);
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);

    };
  }, [socket, handleJoinRoom, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal]);

  return (
    <div className="flex flex-col justify-start gap-14 bg-zinc-900 h-screen w-full px-24 py-14 overflow-hidden">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-10">
        <div className="flex gap-10 items-center ">
          <div className="flex justify-center items-center rounded-xl py-1 px-2 h-10 w-14 bg-blue-800 border-2 border-white">
            <TiVideo className="h-6 w-6 text-neutral-200"/>
          </div>
          <p className="text-lg tracking-tighter font-mono text-white border-l-2 border-neutral-200  pl-10">
            {remoteSocketId ? "Connected" : "No one in the room"}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
        {myStream && <button className="flex flex-row-reverse justify-center items-center gap-4 rounded-xl bg-neutral-100 mr-3 py-[0.3rem] px-3" onClick={sendStreams}>
                        <IoCameraOutline  className="h-7 w-7"/>
                        <p className="text-[#26262b]">Give Video Permission</p>
                      </button>}
        {remoteSocketId && <button className="flex flex-row-reverse justify-center items-center gap-4 rounded-xl bg-neutral-100 -scale-x-100 mr-3 py-[0.3rem] px-3" onClick={handleCallUser}>
                              <p className=" text-lg text-[#26262b] font-medium -scale-x-100">Call</p>
                              <PiPhoneCallLight className="h-6 w-6 "/>
                            </button>}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        {myStream && (
          <>
            <div className="w-[36rem] h-[23rem] rounded-2xl overflow-hidden relative">
              {/* <ReactPlayer
              playing
              muted
              height="100px"
              width="200px"
              url={myStream}
            /> */}
              <video ref={localVideoRef} autoPlay muted={isMuted} className="h-[100%] w-[100%] object-cover" />
            </div>
          </>
        )}
        {remoteStream && (
          <>
            <div className="w-[36rem] h-[23rem] rounded-2xl overflow-hidden relative">
              {/* <ReactPlayer
              playing
              muted
              height="100px"
              width="200px"
              url={remoteStream}
            /> */}
              <video ref={remoteVideoRef} autoPlay muted={isMuted} className="h-[100%] w-[100%] object-cover" />
            </div>
          </>
        )}
      </div>
      {myStream && (
        <>
          <div className="bg-transparent mt-6 flex gap-6 justify-center items-center w-full">
            <button onClick={handleToggleMute}>
              {isMuted ? (
                <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                  <IoMicOffOutline className="h-6 w-6 text-neutral-200" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                  <IoMicOutline className="h-6 w-6 text-neutral-200" />
                </div>
              )}
            </button>
            <button onClick={handleToggleVideo}>
              {isVideoOff ? (
                <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                  <IoVideocamOffOutline className="h-6 w-6 text-neutral-200" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                  <IoVideocamOutline className="h-6 w-6 text-neutral-200" />
                </div>
              )}
            </button>
            <button onClick={handleShareScreen}>
              {screenSharing ?(
                  <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                    <IoCloseOutline className="h-6 w-6 text-neutral-200" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-11 w-14 rounded-lg py-2 px-3 bg-[#26262b] border border-neutral-100">
                    <IoArrowUpOutline className="h-6 w-6 text-neutral-200" />
                  </div>
                )}
            </button>
            <button className="flex justify-center items-center py-[0.3rem] px-3 bg-[#ff0035] text-white rounded-lg text-[1.3rem] font-mono tracking-tight" onClick={handleEndCall}>Leave</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomPage;
