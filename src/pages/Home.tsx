import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-blue-800">Welcome to HelpDesk</h1>
      <p className="mt-4 text-gray-700 text-center max-w-lg">
        Your one-stop solution for all your IT support needs.
      </p>
    </motion.div>
  );
};

export default Home;
