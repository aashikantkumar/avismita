"use client";
 
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, HelpCircle } from "lucide-react";
 
interface FAQItem {
  question: string;
  answer: string;
}
 
const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is data streaming?",
    answer: "Data streaming is the continuous, real-time ingestion, processing, and analysis of data records as they occur. Unlike traditional batch processing, streaming allows businesses to react instantly to live events, user actions, and operational telemetry."
  },
  {
    question: "How does the data lifecycle pipeline work at Avismita?",
    answer: "Avismita integrates real-time event streaming brokers like Apache Kafka and Azure Event Hubs with processing engines like Databricks Structured Streaming. This architecture ingests high-throughput data streams, processes them in-memory, and delivers structured tables with sub-second latency."
  },
  {
    question: "How is your real-time analytics engine different from traditional BI?",
    answer: "Traditional BI operates on a request-response pull model, which can cause latency and overhead. Avismita's engine uses a publish-subscribe push model, where systems continuously stream updates as soon as they are generated, eliminating polling delays and manual dashboard refreshes."
  },
  {
    question: "What is a modern data platform?",
    answer: "A modern data platform is an end-to-end framework designed to ingest, process, store, and route continuous data feeds. It provides the infrastructure needed to maintain high-throughput pipelines with guaranteed delivery, security, and fault tolerance."
  },
  {
    question: "Who benefits from Avismita's cloud-native scaling capabilities?",
    answer: "Any enterprise requiring real-time insights—such as financial platforms tracking fraudulent transactions, e-commerce systems managing live inventory, or IoT networks monitoring device health—benefits from our cloud-scale architecture."
  },
  {
    question: "What kinds of applications thrive on your platform?",
    answer: "Real-time dashboards, fraud detection systems, recommendation engines, predictive maintenance pipelines, and event-driven microservices thrive on our high-speed streaming infrastructure."
  },
  {
    question: "What use cases does Avismita enable?",
    answer: "We enable real-time business intelligence, automated anomaly detection, predictive forecasting, synchronized multi-cloud databases, and instant customer notifications based on live user behavior."
  },
  {
    question: "What data formats and integrations do you support?",
    answer: "We support major formats including JSON, CSV, Apache Avro, Parquet, and Protocol Buffers. We integrate seamlessly with Databricks, Snowflake, Microsoft Fabric, Azure, AWS, and modern BI tools like PowerBI and Tableau."
  },
  {
    question: "Can I integrate my existing cloud databases (Databricks, Snowflake)?",
    answer: "Yes. Our platform is built on open standards and connects directly to your existing Apache Kafka, Confluent Cloud, or cloud-native event hubs without requiring complex schema migrations."
  },
  {
    question: "Is Avismita secure and compliant?",
    answer: "Security and scale are core to our design. We implement end-to-end encryption (TLS 1.3), OAuth2 authentication, role-based access control, and auto-scaling compute groups that scale down to zero when idle to optimize costs."
  },
  {
    question: "How do I get started with a proof of concept?",
    answer: "You can book a demo with our engineering team to assess your current data infrastructure. We typically deliver a customized Proof of Concept (PoC) illustrating real-time data ingestion and modeling within two weeks."
  },
  {
    question: "Wait, I thought Confluent and Confluence were the same thing?",
    answer: "It is a common point of confusion! Confluent is a real-time data streaming platform built on Apache Kafka, while Confluence is a popular team collaboration and wiki documentation software developed by Atlassian."
  }
];
 
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
 
  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };
 
  return (
    <div className="w-full bg-[#000000] text-white py-12 lg:py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Title & Contact support */}
        <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 lg:sticky lg:top-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-xs font-bold tracking-wider text-rose-400 font-mono stagger-item">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
 
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none font-sans stagger-item">
            Frequently Asked <br />
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,63,94,0.15)]">
              Questions
            </span>
          </h2>
 
          {/* Subtitle */}
          <p className="text-[14px] text-slate-400 leading-relaxed max-w-sm stagger-item">
            Find answers to the most common questions about our platform, solutions, and services.
          </p>
 
          {/* Animated divider with glowing dot */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent relative py-2 flex items-center justify-center stagger-item">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
          </div>
 
          {/* Contact Card */}
          <div className="w-full max-w-sm bg-slate-950/45 border border-rose-500/10 rounded-2xl p-6 flex items-start gap-4 shadow-xl backdrop-blur stagger-item">
            <div className="w-10 h-10 rounded-full bg-rose-950/30 border border-rose-500/25 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-rose-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Still have questions?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors pt-2 group"
              >
                Contact Support
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
 
        {/* Right Column: Accordions list */}
        <div className="lg:col-span-7 space-y-4 w-full max-h-[60vh] lg:max-h-[72vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-500/20 scrollbar-track-transparent stagger-item">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-white/10 pb-4 transition-colors duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-3 text-left group"
                >
                  <span className={`text-[15px] sm:text-base font-medium transition-colors ${
                    isOpen ? "text-rose-400" : "text-slate-200 group-hover:text-white"
                  }`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className={`h-5 w-5 transition-colors ${
                      isOpen ? "text-rose-400" : "text-rose-500 group-hover:text-rose-400"
                    }`} />
                  </motion.div>
                </button>
 
                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[13px] sm:text-[14px] text-slate-400 leading-relaxed pt-2 pb-1 pr-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
 
      </div>
    </div>
  );
}
