import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import opinioIcon from "@/images/opinio-icon.png";
import { motion, AnimatePresence } from "framer-motion";

function Opinio() {
  const matches = Array(8).fill({ title: "DUR Vs HAM", status: "LIVE" });

  const records = [
    {
      id: "U-1001",
      name: "Raj Sharma",
      match: "India vs AUS",
      question: "Who will win today?",
      option: "India",
      result: "Correct",
      time: "21-Oct-25",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <AdminLayout title="Games > Opinio">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8"
      >
        {/* View All Button */}
        <div className="flex justify-end">
          <button className="text-[#119D82] text-xs sm:text-sm font-semibold hover:underline transition-colors">
            View All
          </button>
        </div>

        {/* Match Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            grid 
            grid-cols-1 
            xs:grid-cols-2
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-3 sm:gap-4 md:gap-5
          "
        >
          {matches.map((match, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="
                relative 
                bg-[#E8F7E8] 
                rounded-lg 
                shadow-md 
                flex 
                justify-between 
                items-center 
                px-3 sm:px-4 
                py-3 sm:py-4 
                border-l-4 border-[#D1EAD1]
                min-h-[80px] sm:min-h-[88px]
                transition-transform hover:scale-105
              "
            >
              <div className="absolute top-2 left-2 sm:left-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E90000] rounded-full animate-pulse"></span>
                <span className="text-[#E90000] text-[10px] sm:text-xs font-semibold">LIVE</span>
              </div>

              <div className="flex-1 text-center px-2 sm:px-4 mt-4 sm:mt-0">
                <h3 className="font-semibold text-[#1D1D1D] text-xs sm:text-sm md:text-base">
                  {match.title}
                </h3>
              </div>

              <img
                src={opinioIcon}
                alt="team"
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain flex-shrink-0"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* User Spin Record */}
        <motion.div layout className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-5 border border-gray-200">

          {/* Header + Filters */}
          <div
            className="
              flex 
              flex-col 
              sm:flex-row 
              items-start 
              sm:items-center 
              justify-between 
              gap-3 sm:gap-4 
              mb-4 sm:mb-5
            "
          >
            <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1D]">
              User Opinio Record
            </h3>

            {/* Filter Buttons */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="
                  bg-[#E8E8C6] 
                  text-[#1D1D1D] 
                  hover:bg-[#119D82] 
                  hover:text-white
                  text-xs sm:text-sm 
                  flex 
                  items-center 
                  justify-center
                  gap-2 
                  border-none 
                  shadow-sm
                  w-full 
                  xs:w-auto
                  h-9 sm:h-10
                  transition-colors
                "
              >
                Filter by Wheel <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>

              <Button
                variant="outline"
                className="
                  bg-[#E8E8C6] 
                  text-[#1D1D1D] 
                  hover:bg-[#119D82] 
                  hover:text-white
                  text-xs sm:text-sm 
                  flex 
                  items-center 
                  justify-center
                  gap-2 
                  border-none 
                  shadow-sm
                  w-full 
                  xs:w-auto
                  h-9 sm:h-10
                  transition-colors
                "
              >
                Date Range <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#E8E8C6] text-[#1D1D1D]">
                <tr>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">User ID</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">User Name</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Match</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Poll Question</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Selected Option</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Result</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Timestamp</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {records.map((r, i) => (
                    <motion.tr
                      key={i}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b last:border-none hover:bg-[#F9F9F9] text-[#1D1D1D] transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">{r.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.match}</td>
                      <td className="px-4 py-3">{r.question}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.option}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {r.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">{r.time}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            <AnimatePresence>
              {records.map((r, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#F9F9F9] rounded-lg border border-gray-200 p-3 sm:p-4 space-y-2"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">User ID</p>
                      <p className="text-sm font-semibold text-[#1D1D1D]">{r.id}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {r.result}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Name</p>
                      <p className="text-sm text-[#1D1D1D]">{r.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Match</p>
                      <p className="text-sm text-[#1D1D1D]">{r.match}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 font-medium">Poll Question</p>
                    <p className="text-sm text-[#1D1D1D]">{r.question}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Selected Option</p>
                      <p className="text-sm text-[#1D1D1D] font-medium">{r.option}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Timestamp</p>
                      <p className="text-sm text-gray-600">{r.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

export default Opinio;