import { AdminLayout } from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  return (
    <AdminLayout title="Games > Opinio > Ask Question">
      <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-10 py-6">
        {/* Content Wrapper */}
        <motion.div
          className="w-full max-w-xl flex flex-col space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Question Input */}
          <motion.div 
          // @ts-ignore
          variants={itemVariants}>
            <Input
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D]
            placeholder:text-gray-500 h-[48px] rounded-[6px] focus:ring-0 w-full"
            />
          </motion.div>

          {/* Options Section */}
          <motion.div className="w-full" 
          // @ts-ignore
          variants={itemVariants}>
            <p className="text-sm text-[#1D1D1D] font-medium mb-2">Options</p>

            <div className="flex flex-wrap gap-4 w-full">
              <Input
                placeholder="Team DUR"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D] 
                placeholder:text-gray-600 h-[48px] rounded-[6px] focus:ring-0 flex-1 min-w-[140px]"
              />

              <Input
                placeholder="Team HAM"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D] 
                placeholder:text-gray-600 h-[48px] rounded-[6px] focus:ring-0 flex-1 min-w-[140px]"
              />
            </div>
          </motion.div>

          {/* ✅ Responsive Button Here */}
          <motion.div className="w-full" 
          // @ts-ignore
          variants={itemVariants}>
            <Button
              className="w-full h-[48px] bg-[#199C78] text-white rounded-[6px] font-medium 
              hover:bg-[#178C6C] transition"
            >
              Done
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export default AskQuestion;
