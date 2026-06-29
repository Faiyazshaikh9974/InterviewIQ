import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsCloudArrowUp, BsFileEarmarkPdf, BsStars, BsCheckCircle } from "react-icons/bs";

function Step1({ onStart }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useSelector((state) => state.user);
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError("Please upload your resume before analyzing.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setIsUploading(true);
    setError("");

    try {
      const response = await axios.post(`${serverUrl}/api/interview/resume`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.data) {
        onStart(response.data.data);
      } else {
        throw new Error("No profile data was returned from the parser.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Resume analysis failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-4 py-10 md:py-16">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[32px] border border-gray-200 shadow-sm p-8 md:p-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            <BsStars size={16} />
            Resume intelligence
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-semibold text-gray-900">
            Turn the candidate’s resume into a polished interview profile.
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Upload a PDF resume and let the system extract the candidate’s experience, skills, projects, and strengths in seconds.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Upload PDF resume</span>
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-green-500 hover:bg-green-50/60">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    setResumeFile(e.target.files?.[0] || null);
                    setError("");
                  }}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <BsCloudArrowUp size={24} className="text-green-600" />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-gray-800">
                    {resumeFile ? resumeFile.name : "Drop your resume here or click to browse"}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">PDF only • Fast parsing • Smart candidate insights</p>
                </label>
              </div>
            </label>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading ? "Analyzing resume..." : "Analyze Resume"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[32px] border border-gray-200 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-8 text-white shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <BsCheckCircle size={16} className="text-green-400" />
            Ready for live review
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {userData?.name ? `Welcome back, ${userData.name}` : "Premium candidate review experience"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            The extracted report will show contact information, role fit, strengths, experience, projects, and a quick resume review score so your team can act fast.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { title: "Instant AI parsing", detail: "Resume content is converted into structured candidate data." },
              { title: "Rich profile cards", detail: "Experience, skills, and projects are displayed beautifully." },
              { title: "Professional review", detail: "The report highlights strengths, gaps, and suggestions." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-2">
                    <BsFileEarmarkPdf size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Step1;