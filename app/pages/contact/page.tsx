// /components/ContactUs.tsx

"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Other/Breadcrumb";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setFormData({ username: "", email: "", message: "" }); // Clear the form
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb heading="Contact Us" subHeading="Contact Us" />
      <div className="contact-us md:py-20 py-10">
        <div className="container">
          <div className="flex justify-between max-lg:flex-col gap-y-10">
            <div className="left lg:w-2/3 lg:pr-4">
              <div className="heading3">Drop Us A Line</div>
              <div className="body1 text-secondary2 mt-3">
                Use the form below to get in touch with the sales team
              </div>
              <form className="md:mt-6 mt-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                  <div className="name">
                    <input
                      className="border-line px-4 py-3 w-full rounded-lg"
                      id="username"
                      type="text"
                      placeholder="Your Name *"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="email">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="email"
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="message sm:col-span-2">
                    <textarea
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="message"
                      rows={3}
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="block-button md:mt-6 mt-4">
                  <button
                    className="button-main"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </div>
                {success && (
                  <p className="text-green-500 mt-4">
                    Message sent successfully!
                  </p>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            </div>
            <div className="right lg:w-1/4 lg:pl-4">
              <div className="item">
                <div className="heading4">Our Store</div>
                <p className="mt-3">
                  2163 Phillips Gap Rd, West Jefferson, North Carolina, United
                  States
                </p>
                <p className="mt-3">
                  Phone: <span className="whitespace-nowrap">+1 666 8888</span>
                </p>
                <p className="mt-1">
                  Email:{" "}
                  <span className="whitespace-nowrap">hi.avitex@gmail.com</span>
                </p>
              </div>
              <div className="item mt-10">
                <div className="heading4">Open Hours</div>
                <p className="mt-3">
                  Mon - Fri:{" "}
                  <span className="whitespace-nowrap">7:30am - 8:00pm PST</span>
                </p>
                <p className="mt-3">
                  Saturday:{" "}
                  <span className="whitespace-nowrap">8:00am - 6:00pm PST</span>
                </p>
                <p className="mt-3">
                  Sunday:{" "}
                  <span className="whitespace-nowrap">9:00am - 5:00pm PST</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
