import React from "react";
import { motion } from "framer-motion";
import { IoMale, IoPersonSharp } from "react-icons/io5";
import { PersonStanding, PersonStandingIcon } from "lucide-react";
import { SiMentorcruise } from "react-icons/si";

interface CategoryCardProps {
  title: string;
  mentors: number;
  icon: string;
  color: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  mentors,
  icon,
  color,
}) => {
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent" />

      <motion.div className="relative z-10 flex size-48 items-center justify-center rounded-full bg-slate-100">
        <img src={icon} alt={title} className="h-32 w-32 object-contain" />
      </motion.div>

      <div className="relative z-10 mb-2 mt-5 text-center">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <div className="flex items-center justify-center text-slate-600">
          <IoMale className="mr-2 size-5 text-2xl" />
          <span className="text-xl font-semibold">{mentors}+ Mentors</span>
        </div>
      </div>

      <motion.div
        style={{ background: color }}
        className={`absolute bottom-0 left-0 right-0 h-2 opacity-70 transition-all duration-300 group-hover:h-4 group-hover:opacity-100`}
        // initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
