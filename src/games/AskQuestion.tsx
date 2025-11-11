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
      <div className="p-10 flex flex-col items-start space-y-6">
        {/* Question Input */}
        <div className="w-full max-w-lg">
          <Input
            placeholder="Enter your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D] placeholder:text-gray-500 h-[48px] rounded-[6px] focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Options */}
        <div className="w-full max-w-lg">
          <p className="text-sm text-[#1D1D1D] font-medium mb-2">Options</p>
          <div className="flex gap-4">
            <Input
              placeholder="Team DUR"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D] placeholder:text-gray-600 h-[48px] rounded-[6px] focus:ring-0 focus:outline-none"
            />
            <Input
              placeholder="Team HAM"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className="bg-[#E8E8C6] border-none shadow-sm text-[#1D1D1D] placeholder:text-gray-600 h-[48px] rounded-[6px] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        
      </div>
      <div className="w-full max-w-lg m-10">
          <Button
            className="w-full h-[48px] bg-[#199C78] text-white rounded-[6px] font-medium hover:bg-[#178C6C] transition"
          >
            Done
          </Button>
        </div>
    </AdminLayout>
  );
}

export default AskQuestion;
