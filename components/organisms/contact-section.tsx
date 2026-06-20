"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ContactCard } from "@/components/ui/contact-card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/molecules/form-field";
import { Phone, MailIcon, PhoneIcon, MapPinIcon, CheckCircle2, Loader2 } from "lucide-react";
import { LocationMap } from "@/components/ui/expand-map";
import GeometricBackground from "@/components/ui/geometric";

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );
      setIsSuccess(true);
      formRef.current.reset();
    } catch (error) {
      console.error("FAILED...", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);

      // Reset success message after 5 seconds
      if (isSuccess) {
        setTimeout(() => setIsSuccess(false), 5000);
      }
    }
  };

  return (
    <div id="contact">
      <GeometricBackground className="py-24 border-t border-slate-200">
        <div className="px-6 md:px-12 max-w-5xl mx-auto w-full relative z-20">
          <ContactCard
          title="Inquire"
          description="Request analytics consulting or custom curriculum training. We do our best to respond within 1 business day."
          locationMap={<LocationMap />}
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'Contact@avismita.com',
            },
            {
              icon: PhoneIcon,
              label: 'Phone',
              value: '+91 76671 37760',
            },
            {
              icon: MapPinIcon,
              label: 'Location',
              value: 'Kolkata, India\nRemote-First Global Delivery Model',
              className: 'col-span-2',
            }
          ]}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-4">
            <FormField name="user_name" label="Contact Name" type="text" placeholder="John Doe" required />
            <FormField name="user_email" label="Work Email" type="email" placeholder="john@company.com" required />
            <FormField isTextarea textareaProps={{ name: "message", placeholder: "How can we help?", required: true }} label="Message" />

            {isError && (
              <div className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-md">
                Oops! Something went wrong. Please check your EmailJS configuration.
              </div>
            )}

            <Button
              className="w-full mt-4 h-12 uppercase tracking-widest font-bold text-base transition-all"
              type="submit"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Message Sent
                </>
              ) : (
                <>
                  <Phone className="h-5 w-5 mr-2" />
                  Send Inquiry
                </>
              )}
            </Button>
          </form>
        </ContactCard>
      </div>
    </GeometricBackground>
    </div>
  );
}
