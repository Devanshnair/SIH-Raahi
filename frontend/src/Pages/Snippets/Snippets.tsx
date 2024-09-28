import React from "react";
import InsightsComponent from "../../components/InsightsCompoonent";
import videoSrc from "../../../src/assets/WhatsApp Video 2024-09-03 at 11.18.40.mp4";
import videoSrc1 from "../../assets/How to master javascript.mp4";
import videoSrc2 from "../../assets/3 Daily Habits To Become Mentally Strong _ Raj Shamani shorts.mp4";
import videoSrc3 from "../../assets/95in10.mp4";
import ChatbotButton from "../../components/ChatbotButton";


const Snippets = () => {

  //  useEffect(() => {
  //    const request = async () => {
  //      const response = await fetch(
  //        "https://live-merely-drum.ngrok-free.app/api/mentors/",
  //        {
  //          method: "GET",
  //          headers: {
  //            "Content-Type": "application/json",
  //            "ngrok-skip-browser-warning": "true",
  //          },
  //        }
  //      );

  //      const data = await response.json();
  //      setDetails(data);
  //      console.log(data);
  //    };

  //    request();
  //  }, []);
  return (
    <>
      <div className="main grid gap-5">
        <InsightsComponent videoSrc={videoSrc1} name="Hitesh Chaudhary" />
        <InsightsComponent videoSrc={videoSrc2} name="Raj Shamani" />
        <InsightsComponent videoSrc={videoSrc3} name="Amrit Nair" />
        <InsightsComponent videoSrc={videoSrc} name="Sakshi Sharma" />

        <InsightsComponent
          videoSrc="https://rr2---sn-h5t5u5h5pq-q0hl.googlevideo.com/videoplayback?expire=1725359875&ei=o5LWZtKOItXp9fwPp8m40A4&ip=203.153.20.205&id=o-AIaV59g90UDBj-1UAwhhMEBmuCW7P2bc0pQBGBVyzhvM&itag=136&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=u3&mm=31%2C29&mn=sn-h5t5u5h5pq-q0hl%2Csn-npoldn7s&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=726250&bui=AQmm2ex20aEMU5VCZtds7Vy1gNOHBAhNX_DrNw8HQBohX_lW1V6vcC5QS6d73taLp11p_M2u1TkahLfl&spc=Mv1m9lZfJ3L1XENZkfwQrOq2KkUFtqg3RCejp4T6okH8VPMCuoL5lTgZz-dt&vprv=1&svpuc=1&mime=video%2Fmp4&ns=vqN_ZxR0v65ehH7RSPUiKfMQ&rqh=1&gir=yes&clen=8180722&dur=59.166&lmt=1678367112070186&mt=1725337744&fvip=1&keepalive=yes&c=WEB&sefc=1&txp=631A224&n=I0ZjeaTR6JSStg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJN_zA2xN2SLZnnKCDu5dIM7FesNjNmy-dyDdyb3GfxEAiEA4Fav_jK2YR_p_ko44zwSh1DYdE-H-5izPIwEMrGaiVg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIgXVwIBeaCOKAFgQ8_BA8tcv6Bldsjv4lqDnUYAUpuQaUCIQDWnj4ypI9hHAW-WCJQaA0pEZYBaJvq2mZIhP0D4O8G-w%3D%3D"
          name="Vaibhav Sharma"
        />
        <InsightsComponent videoSrc={videoSrc} name="Vaibhav Sharma" />
        <InsightsComponent
          videoSrc="https://rr2---sn-h5t5u5h5pq-q0hl.googlevideo.com/videoplayback?expire=1725359875&ei=o5LWZtKOItXp9fwPp8m40A4&ip=203.153.20.205&id=o-AIaV59g90UDBj-1UAwhhMEBmuCW7P2bc0pQBGBVyzhvM&itag=136&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=u3&mm=31%2C29&mn=sn-h5t5u5h5pq-q0hl%2Csn-npoldn7s&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=726250&bui=AQmm2ex20aEMU5VCZtds7Vy1gNOHBAhNX_DrNw8HQBohX_lW1V6vcC5QS6d73taLp11p_M2u1TkahLfl&spc=Mv1m9lZfJ3L1XENZkfwQrOq2KkUFtqg3RCejp4T6okH8VPMCuoL5lTgZz-dt&vprv=1&svpuc=1&mime=video%2Fmp4&ns=vqN_ZxR0v65ehH7RSPUiKfMQ&rqh=1&gir=yes&clen=8180722&dur=59.166&lmt=1678367112070186&mt=1725337744&fvip=1&keepalive=yes&c=WEB&sefc=1&txp=631A224&n=I0ZjeaTR6JSStg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJN_zA2xN2SLZnnKCDu5dIM7FesNjNmy-dyDdyb3GfxEAiEA4Fav_jK2YR_p_ko44zwSh1DYdE-H-5izPIwEMrGaiVg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIgXVwIBeaCOKAFgQ8_BA8tcv6Bldsjv4lqDnUYAUpuQaUCIQDWnj4ypI9hHAW-WCJQaA0pEZYBaJvq2mZIhP0D4O8G-w%3D%3D"
          name="Vaibhav Sharma"
        />
        <InsightsComponent
          videoSrc="https://rr2---sn-h5t5u5h5pq-q0hl.googlevideo.com/videoplayback?expire=1725359875&ei=o5LWZtKOItXp9fwPp8m40A4&ip=203.153.20.205&id=o-AIaV59g90UDBj-1UAwhhMEBmuCW7P2bc0pQBGBVyzhvM&itag=136&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=u3&mm=31%2C29&mn=sn-h5t5u5h5pq-q0hl%2Csn-npoldn7s&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=726250&bui=AQmm2ex20aEMU5VCZtds7Vy1gNOHBAhNX_DrNw8HQBohX_lW1V6vcC5QS6d73taLp11p_M2u1TkahLfl&spc=Mv1m9lZfJ3L1XENZkfwQrOq2KkUFtqg3RCejp4T6okH8VPMCuoL5lTgZz-dt&vprv=1&svpuc=1&mime=video%2Fmp4&ns=vqN_ZxR0v65ehH7RSPUiKfMQ&rqh=1&gir=yes&clen=8180722&dur=59.166&lmt=1678367112070186&mt=1725337744&fvip=1&keepalive=yes&c=WEB&sefc=1&txp=631A224&n=I0ZjeaTR6JSStg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJN_zA2xN2SLZnnKCDu5dIM7FesNjNmy-dyDdyb3GfxEAiEA4Fav_jK2YR_p_ko44zwSh1DYdE-H-5izPIwEMrGaiVg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIgXVwIBeaCOKAFgQ8_BA8tcv6Bldsjv4lqDnUYAUpuQaUCIQDWnj4ypI9hHAW-WCJQaA0pEZYBaJvq2mZIhP0D4O8G-w%3D%3D"
          name="Vaibhav Sharma"
        />
        <InsightsComponent
          videoSrc="https://rr2---sn-h5t5u5h5pq-q0hl.googlevideo.com/videoplayback?expire=1725359875&ei=o5LWZtKOItXp9fwPp8m40A4&ip=203.153.20.205&id=o-AIaV59g90UDBj-1UAwhhMEBmuCW7P2bc0pQBGBVyzhvM&itag=136&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=u3&mm=31%2C29&mn=sn-h5t5u5h5pq-q0hl%2Csn-npoldn7s&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=726250&bui=AQmm2ex20aEMU5VCZtds7Vy1gNOHBAhNX_DrNw8HQBohX_lW1V6vcC5QS6d73taLp11p_M2u1TkahLfl&spc=Mv1m9lZfJ3L1XENZkfwQrOq2KkUFtqg3RCejp4T6okH8VPMCuoL5lTgZz-dt&vprv=1&svpuc=1&mime=video%2Fmp4&ns=vqN_ZxR0v65ehH7RSPUiKfMQ&rqh=1&gir=yes&clen=8180722&dur=59.166&lmt=1678367112070186&mt=1725337744&fvip=1&keepalive=yes&c=WEB&sefc=1&txp=631A224&n=I0ZjeaTR6JSStg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJN_zA2xN2SLZnnKCDu5dIM7FesNjNmy-dyDdyb3GfxEAiEA4Fav_jK2YR_p_ko44zwSh1DYdE-H-5izPIwEMrGaiVg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIgXVwIBeaCOKAFgQ8_BA8tcv6Bldsjv4lqDnUYAUpuQaUCIQDWnj4ypI9hHAW-WCJQaA0pEZYBaJvq2mZIhP0D4O8G-w%3D%3D"
          name="Vaibhav Sharma"
        />
      </div>
      <ChatbotButton />
    </>
  );
};

export default Snippets;
