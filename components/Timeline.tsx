import { motion } from "framer-motion";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechInnovate Solutions",
    period: "2021 - Present",
    description:
      "Leading development of scalable web applications and mentoring junior developers.",
  },
  {
    title: "Full Stack Developer",
    company: "Global Tech Enterprises",
    period: "2018 - 2021",
    description:
      "Developed client-facing web applications and optimized database performance.",
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Innovators",
    period: "2016 - 2018",
    description:
      "Assisted in frontend development and learned backend technologies.",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-emerald-400/30"></div>
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="relative mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div
            className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <div
                className={`p-4 rounded-lg bg-emerald-950/50 shadow-sm ${index % 2 === 0 ? "mr-4" : "ml-4"}`}
              >
                <h4 className="text-lg font-semibold text-emerald-400">
                  {experience.title}
                </h4>
                <p className="text-white/60">
                  {experience.company} | {experience.period}
                </p>
                <p className="mt-2 text-white/80">{experience.description}</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-4 border-[#002922] flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
