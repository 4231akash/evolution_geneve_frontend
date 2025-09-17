"use client";

import { useState } from "react";
import styles from "../../styles/enquiry/Enquiry.module.css";
import Image from "next/image";

export default function EnquiryPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state for disabling button

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setLoading(true); // ✅ disable button

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        });
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Error: Could not send message.");
    } finally {
      setLoading(false); // ✅ re-enable button
    }
  };

  return (
    <div className={styles.enquiryPage}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h2>EVOLUTION GENÈVE</h2>
          <p className={styles.distributor}>Worldwide Distributor</p>

          <div className={styles.infoBlock}>
            <p>
              <strong>Company address:</strong>
            </p>
            <p>Mazaya Time Trading</p>
            <p>Office 412 - Bldg 2358 - Road 3830 - block 428</p>
            <p>Seef Area - Kingdom of Bahrain.</p>
          </div>

          <div className={styles.infoBlock}>
            <p>
              <strong>Tel:</strong> +97336440400
            </p>
            <p>
              <strong>Email:</strong> info@evolutiongeneve.com
            </p>
          </div>

          <div className={styles.social}>
            <a
              href="https://instagram.com/evolutiongeneve"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                /* Instagram Icon SVG */ width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>evolutiongeneve</span>
            </a>
          </div>

          <p className={styles.privacy}>
            All submitted information will remain confidential and will not be
            shared with third parties.
          </p>
        </div>

        <div className={styles.contactForm}>
          <h3>For Enquiry, Reach Out</h3>
          <p>
            Fill in the form to send us a message. We will be pleased to answer
            your requests.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formCheck}>
              <div className={styles.formLeft}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.formRight}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter Message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className={styles.sendButton}
              disabled={loading} // ✅ disable while sending
            >
              {loading ? "Sending..." : "SEND"}
            </button>
          </form>
          {status && <p className={styles.statusMessage}>{status}</p>}
        </div>
      </div>
    </div>
  );
}
