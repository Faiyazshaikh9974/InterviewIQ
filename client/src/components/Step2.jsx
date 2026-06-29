import { motion } from "motion/react";
import {
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsAward,
  BsBriefcase,
  BsBook,
  BsCodeSquare,
} from "react-icons/bs";

function Step2({ interviewData, onContinue }) {
  const candidate = interviewData?.candidate || {};
  const role = interviewData?.role || "Candidate profile";
  const summary = interviewData?.summary || "No summary available yet.";
  const experience = interviewData?.experience || [];
  const education = interviewData?.education || [];
  const projects = interviewData?.projects || [];
  const skills = interviewData?.skills || {};
  const review = interviewData?.resumeReview || {};

  const skillGroups = [
    { label: "Frontend", items: skills.frontend || [] },
    { label: "Backend", items: skills.backend || [] },
    { label: "Database", items: skills.database || [] },
    { label: "Languages", items: skills.languages || [] },
    { label: "Tools", items: skills.tools || [] },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-[28px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-8 text-white"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-green-400">
                Candidate profile
              </p>
              <h1 className="mt-3 text-3xl font-semibold">
                {candidate.name || "Candidate"}
              </h1>
              <p className="mt-2 text-lg text-gray-300">{role}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <BsAward size={16} className="text-green-400" />
                Resume score:{" "}
                <span className="ml-1 font-semibold text-white">
                  {review.score || 0}/100
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-300">
                <BsEnvelope size={15} />
                <span>{candidate.email || "Not available"}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-300">
                <BsTelephone size={15} />
                <span>{candidate.phone || "Not available"}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-300">
                <BsGeoAlt size={15} />
                <span>{candidate.location || "Location not shared"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsBriefcase size={16} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Professional summary
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600">{summary}</p>
            </section>

            <section className="rounded-[24px] border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsBriefcase size={16} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Experience
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                {experience.length > 0 ? (
                  experience.map((exp, index) => (
                    <div
                      key={`${exp.company}-${index}`}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {exp.designation || "Role"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {exp.company || "Company"}
                          </p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-sm text-gray-500">
                          {exp.duration || "Duration not shared"}
                        </span>
                      </div>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600">
                        {(exp.responsibilities || []).map((item, idx) => (
                          <li key={`${item}-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Experience details will appear here once detected.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[24px] border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsCodeSquare size={16} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Projects
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div
                      key={`${project.name}-${index}`}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {project.name || "Project"}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {project.description || "No description provided."}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech, idx) => (
                          <span
                            key={`${tech}-${idx}`}
                            className="rounded-full bg-white px-3 py-1 text-sm text-gray-600 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Project highlights will appear here once detected.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[24px] border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsBook size={16} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Education
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                {education.length > 0 ? (
                  education.map((item, index) => (
                    <div
                      key={`${item.college}-${index}`}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {item.degree || "Degree"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.college || "College"}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.year || "Year not shared"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Education history will appear here after parsing.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[24px] border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsCodeSquare size={16} />
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="mt-5 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      {group.label}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.length > 0 ? (
                        group.items.map((skill, idx) => (
                          <span
                            key={`${skill}-${idx}`}
                            className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          Not detected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-gray-200 p-6">
              <div className="flex items-center gap-2 text-green-700">
                <BsAward size={16} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Resume review
                </h2>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Strengths
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {(review.strengths || []).map((item, idx) => (
                      <li key={`${item}-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Weaknesses
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {(review.weaknesses || []).map((item, idx) => (
                      <li key={`${item}-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Suggestions
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {(review.suggestions || []).map((item, idx) => (
                      <li key={`${item}-${idx}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
            <div className="mt-10 flex justify-end">
              <button
                onClick={onContinue}
                className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
              >
                Continue
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;
