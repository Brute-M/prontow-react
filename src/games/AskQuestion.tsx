import { AdminLayout } from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AskQuestion() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  return (
    <AdminLayout title="Games > Opinio > Ask Question">
      <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-10 py-6">

        {/* Content Wrapper */}
        <div className="w-full max-w-xl flex flex-col space-y-6">

          {/* Question Input */}
          <Input
            placeholder="Enter your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D]
            placeholder:text-gray-500 h-[48px] rounded-[6px] focus:ring-0 w-full"
          />

          {/* Options Section */}
          <div className="w-full">
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
          </div>

          {/* ✅ Responsive Button Here */}
          <div className="w-full">
            <Button
              className="w-full h-[48px] bg-[#199C78] text-white rounded-[6px] font-medium 
              hover:bg-[#178C6C] transition"
            >
              Done
            </Button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AskQuestion;
