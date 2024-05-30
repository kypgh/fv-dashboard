import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserNinja } from "react-icons/fa6";
import { PiEggCrackDuotone } from "react-icons/pi";

export default [
  {
    title: "Home",
    href: "/",
    icon: IoMdHome,
  },
  {
    title: "Users",
    href: "/users",
    icon: FaUsers,
  },
  {
    title: "Posts",
    href: "/posts",
    icon: IoNewspaperSharp,
  },
  {
    title: "Administration",
    href: "/administration",
    icon: GrUserAdmin,
    children: [
      { title: "CRM Users", href: "/users", icon: FaUserNinja },
      { title: "CRM Roles", href: "/roles", icon: PiEggCrackDuotone },
    ],
  },
];
