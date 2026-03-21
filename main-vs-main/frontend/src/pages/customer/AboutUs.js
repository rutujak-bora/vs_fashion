import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const photoFrames = [
    {
      id: 1,
      title: "Hand Block Printing",
      placeholder: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop",
      alt: "Traditional hand block printing process"
    },
    {
      id: 2,
      title: "Natural Dyeing",
      placeholder: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=400&fit=crop",
      alt: "Natural dyes and colors"
    },
    {
      id: 3,
      title: "Craftsmanship",
      placeholder: "https://images.unsplash.com/photo-1558769132-cb1aea3c0b4d?w=600&h=400&fit=crop",
      alt: "Artisan at work"
    },
    {
      id: 4,
      title: "Final Creation",
      placeholder: "https://images.unsplash.com/photo-1599584082894-52c6d8fc48c6?w=600&h=400&fit=crop",
      alt: "Beautiful finished kurti"
    }
  ];

  return (
    <div className="py-24 px-6 md:px-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-20 traditional-border scroll-pattern"
      >
        <div className="traditional-divider mb-8">
          <span>❋</span>
        </div>
        <h1 className="text-6xl mb-6 traditional-text" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
          We are VS
        </h1>
        <div className="w-24 h-1 bg-[#C4969C] mx-auto mb-8"></div>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          I'm <span className="font-bold" style={{ color: '#4A2836' }}>Vaibhavi</span>, and VS is a dream that started at home when I was 21. 
          I named the brand from my mother, <span className="font-bold" style={{ color: '#4A2836' }}>Santoshi</span>, because she has always been my biggest inspiration.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          With constant support from my friends and family, and by showcasing my work through exhibitions, 
          VS completed one year. Today, at 22, I feel grateful, confident, and proud of how far this journey has come ✨
        </p>
      </motion.div>

      {/* Photo Frames Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="traditional-divider mb-12">
          <span>✦</span>
        </div>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl text-center mb-12 traditional-text" 
          style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}
        >
          Our Craft Process
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {photoFrames.map((frame, index) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] border-4 border-[#4A2836] shadow-lg henna-corner">
                <img
                  src={frame.placeholder}
                  alt={frame.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2836]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 left-2 text-[#C4969C] text-2xl opacity-40">✦</div>
                <div className="absolute top-2 right-2 text-[#C4969C] text-2xl opacity-40">✦</div>
                <div className="absolute bottom-2 left-2 text-[#C4969C] text-2xl opacity-40">✦</div>
                <div className="absolute bottom-2 right-2 text-[#C4969C] text-2xl opacity-40">✦</div>
              </div>
              <h3 
                className="text-center mt-4 text-lg font-semibold" 
                style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}
              >
                {frame.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hand Block Printing Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-[#C4969C] p-8 md:p-12"
        >
          <h2 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
            100% Hand Block Printed Fabric
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Our fabric is <strong>100% hand block printed</strong>, created completely by hand. First, the blocks are carefully 
              printed on the fabric using different colors. After printing, the fabric is soaked and washed in fresh water, 
              and once it dries, it becomes ready for use.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Behind every single block, there is a lot of <strong>hard work and dedication</strong>—which you can see in the photos.
            </p>
          </div>
        </motion.div>

        {/* Manufacturing Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FAFAFA] border border-[#C4969C] p-8 md:p-12"
        >
          <h2 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
            Crafted in Pune
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Our kurtis are <strong>manufactured in Pune</strong>. Each kurti has proper 2-inch margins on both sides 
              for easy alterations. The fabric is <strong>non-shrinking</strong> because it is pre-washed before stitching.
            </p>
          </div>
        </motion.div>

        {/* Quality Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#4A2836] text-white p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
            Our Promise
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            This is how we create kurtis that are <strong>comfortable</strong>, <strong>breathable</strong>, 
            and made with <strong>natural dyes</strong>, specially designed for everyday ease and long-lasting wear.
          </p>
        </motion.div>

        {/* Quality Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-6 border border-[#C4969C]"
          >
            <div className="w-16 h-16 bg-[#C4969C] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
              100% Handmade
            </h3>
            <p className="text-gray-600">Every piece is crafted with care and traditional techniques</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center p-6 border border-[#C4969C]"
          >
            <div className="w-16 h-16 bg-[#C4969C] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
              Natural Dyes
            </h3>
            <p className="text-gray-600">Eco-friendly and skin-safe coloring process</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-6 border border-[#C4969C]"
          >
            <div className="w-16 h-16 bg-[#C4969C] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl mb-2" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
              Made with Love
            </h3>
            <p className="text-gray-600">Each piece carries the passion of our artisans</p>
          </motion.div>
        </div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center py-12"
        >
          <p className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display', color: '#4A2836' }}>
            Thank you for being part of our journey
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every purchase supports traditional artisans and keeps the beautiful art of hand block printing alive.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
