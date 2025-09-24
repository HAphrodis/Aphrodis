import { motion } from 'framer-motion';

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl"
        >
            {title}
        </motion.h1>
    );
};

export default SectionTitle;