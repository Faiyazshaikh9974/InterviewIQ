import { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3InterviewReport from "../components/Step3InterviewReport";

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  // Called when resume analysis is completed
  const handleResumeAnalysis = (data) => {
    setInterviewData(data);
    setStep(2);
  };

  // Called when user continues from Step2
  const handleContinue = () => {
    setStep(3);
  };

  // Called when Step3 finishes (optional)
  const handleInterviewFinish = (report) => {
    setInterviewData(report);
    console.log("Interview Completed:", report);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {step === 1 && (
        <Step1
          onStart={handleResumeAnalysis}
        />
      )}

      {step === 2 && (
        <Step2
          interviewData={interviewData}
          onContinue={handleContinue}
        />
      )}

      {step === 3 && (
        <Step3InterviewReport
          interviewData={interviewData}
          onFinish={handleInterviewFinish}
        />
      )}
    </div>
  );
}

export default InterviewPage;