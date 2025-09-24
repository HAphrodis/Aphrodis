import { motion, Variants } from "framer-motion";

const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  const variants:Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
      },
    },
  };

  return (
    <motion.h2
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span key={index} transition={{ duration: 0.1 * index }}>
          {word} &nbsp;
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default AnimatedText;
