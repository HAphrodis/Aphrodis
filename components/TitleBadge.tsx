// components\TitleBadge.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TitleBadgeProps {
    text: string;
}

const TitleBadge: React.FC<TitleBadgeProps> = ({ text }) => {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mb-4 inline-block rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-sm font-semibold text-main_blue"
        >
            {text}
        </motion.span>
    );
};

export default TitleBadge;