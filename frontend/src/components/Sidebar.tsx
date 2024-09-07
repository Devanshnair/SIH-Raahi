// import React, { useState } from "react";

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { cn } from "../lib/utils";
// // import Settingsicon from "../assets/settingsicon.png"
// import Dashboard from "../Pages/Shelter/Dashboard";

// export function SidebarDemo() {
//   const links = [
//     {
//       label: "Home",
//       to: "/shelter",
//       icon: (
//         <div className="flex h-8 w-8 items-center justify-center">
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-[2.1rem] w-[2.1rem] flex-shrink-0 text-black dark:text-neutral-200"
//           >
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M2 7C2 4.23858 4.5 2 7 2H17C19.5 2 22 4.23858 22 7V17C22 19.5 19.5 22 17 22H7C4.5 22 2 19.5 2 17V7ZM7 4C5.5 4 4 5.5 4 7V17C4 18.5 5.5 20 7 20H17C18.5 20 20 18.5 20 17V7C20 5.5 18.5 4 17 4H7ZM7 17C7 16.5 7.5 16 8 16H16C16.5 16 17 16.5 17 17C17 17.5 16.5 18 16 18H8C7.5 18 7 17.5 7 17ZM8.707 7.293C8.3165 6.902 7.6835 6.902 7.293 7.293C6.9025 7.6835 6.9025 8.3165 7.293 8.707L9.586 11L7.293 13.293C6.9025 13.6835 6.9025 14.3165 7.293 14.707C7.6835 15.0975 8.3165 15.0975 8.707 14.707L11.707 11.707C11.895 11.5195 12 11.265 12 11C12 10.735 11.895 10.4805 11.707 10.293L8.707 7.293Z"
//               fill="#000000"
//             ></path>
//           </svg>
//         </div>
//       ),
//     },
//     {
//       label: "PetFolio",
//       to: "/shelter/mypetspage",
//       icon: (
//         <div className="flex h-8 w-8 items-center justify-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 448 512"
//             className="w-[1.6rem]] h-[1.6rem] flex-shrink-0 text-black dark:text-neutral-200"
//           >
//             <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
//           </svg>
//         </div>
//       ),
//     },
//     {
//       label: "Settings",
//       to: "/settings",
//       icon: (
//         <div className="flex h-8 w-8 items-center justify-center">
//           <img
//             src={""}
//             alt="icon"
//             className="h-7 w-7 flex-shrink-0 text-black dark:text-neutral-200"
//           />
//         </div>
//       ),
//     },
//     {
//       label: "Logout",
//       to: "/logout",
//       icon: (
//         <div className="flex h-8 w-8 items-center justify-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//             className="h-[1.58rem] w-[1.58rem] flex-shrink-0 text-black dark:text-neutral-200"
//           >
//             <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
//           </svg>
//         </div>
//       ),
//     },
//   ];
//   const [open, setOpen] = useState(false);
//   return (
//     <Sidebar open={open} setOpen={setOpen}>
//       <SidebarBody className="justify-between gap-10">
//         <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-2">
//           {open ? <Logo /> : <LogoIcon />}
//           <div className="mt-8 flex flex-col gap-3">
//             {links.map((link, idx) => (
//               <SidebarLink key={idx} link={link} />
//             ))}
//           </div>
//         </div>
//         <div className="">
//           <SidebarLink
//             link={{
//               label: "Manu Arora",
//               to: "#",
//               icon: (
//                 <img
//                   src="https://assets.aceternity.com/manu.png"
//                   className="h-7 w-7 flex-shrink-0 rounded-full"
//                   alt="Avatar"
//                 />
//               ),
//             }}
//           />
//         </div>
//       </SidebarBody>
//     </Sidebar>
//   );
// }

// export const Logo = () => {
//   return (
//     <Link
//       to="/"
//       className="relative z-20 flex items-center space-x-8 pb-5 pt-8 text-sm font-normal text-black"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={31}>
//         <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
//       </svg>
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="whitespace-pre text-2xl font-medium text-black dark:text-white"
//       >
//         आश्रय
//       </motion.span>
//     </Link>
//   );
// };

// export const LogoIcon = () => {
//   return (
//     <Link
//       to="/"
//       className="relative z-20 flex items-center space-x-2 pb-5 pt-8 text-sm font-normal text-black"
//     >
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={31}>
//         <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
//       </svg>
//     </Link>
//   );
// };
