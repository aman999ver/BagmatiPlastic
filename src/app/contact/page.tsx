"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", company: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission failed", error);
            setStatus("error");
        }
    };

    return (
        <div style={{ backgroundColor: "#fff", color: "#333", fontFamily: "sans-serif" }}>

            {/* Header Section */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem 2rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Welcome to our Contact Us page!</h1>
                <p style={{ lineHeight: "1.6", color: "#666", maxWidth: "1000px" }}>
                    We are conveniently located on the 4th Floor of the Four Square Building in Naxal, Kathmandu, Bagmati Pradesh. Our dedicated team is here to provide exceptional service and top-quality household plastic products to customers across Nepal. If you have any questions, need assistance with an order, or want to learn more about our plastic products, please don't hesitate to reach out. You can contact us by phone, email, or by visiting our office in Kathmandu. We look forward to hearing from you and helping you find the perfect plastic products for your home or business.
                </p>
            </div>

            {/* Info Grid */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ color: "#F44336", marginBottom: "0.5rem" }}><MapPin /></div>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Headquarters</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5" }}>
                        4th Floor Four Square Building,<br />
                        Naxal, Kathmandu, Pradesh 3, Nepal
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ color: "#F44336", marginBottom: "0.5rem" }}><Clock /></div>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Open Hours</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5" }}>
                        Sunday - Friday : 10am - 6pm
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ color: "#F44336", marginBottom: "0.5rem" }}><Phone /></div>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Call Us</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5" }}>
                        +977-9801121153
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ color: "#F44336", marginBottom: "0.5rem" }}><Mail /></div>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Email Us</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5" }}>
                        pankajrathi13@gmail.com
                    </p>
                </div>

            </div>

            {/* Form Section */}
            <div style={{ background: "#FFFBF5", padding: "4rem 1rem" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", padding: "2rem", borderRadius: "12px" }}>

                    {/* Left: Text */}
                    <div>
                        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem", lineHeight: "1.2" }}>
                            Have a General Question?
                        </h2>
                        <p style={{ fontSize: "1.1rem", fontWeight: "500", color: "#444" }}>
                            Send us a message and we will get back to you.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>First Name</label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }} placeholder="Gabriella" />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Last Name</label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }} placeholder="McPhereson" />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }} placeholder="gabriella.mcphereson@email.com" />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Company</label>
                            <input name="company" value={formData.company} onChange={handleChange} style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }} placeholder="Your Company Name" />
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "4px", background: "#fff" }} placeholder="Type your message here"></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            style={{ background: "#111", color: "white", padding: "1rem", borderRadius: "4px", fontWeight: "bold", border: "none", cursor: "pointer", marginTop: "0.5rem" }}
                        >
                            {status === "submitting" ? "Sending..." : "Submit Message"}
                        </button>

                        {status === "success" && <p style={{ color: "green", marginTop: "0.5rem" }}>Message sent successfully!</p>}
                        {status === "error" && <p style={{ color: "red", marginTop: "0.5rem" }}>Failed to send message. Please try again.</p>}
                    </form>

                </div>
            </div>

            {/* Location Section */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3rem" }}>Location</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>

                    {/* Head Office */}
                    <div>
                        <h3 style={{ color: "#F44336", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "1rem" }}>Head Office</h3>
                        <p style={{ marginBottom: "0.5rem", fontSize: "0.95rem" }}>4th Floor Four Square Building, Naxal,<br />Kathmandu, Pradesh 3, Nepal</p>
                        <p style={{ marginBottom: "0.5rem", fontSize: "0.95rem" }}>+977-9801121153</p>
                        <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>pankajrathi13@gmail.com</p>

                        <div style={{ width: "100%", height: "300px", background: "#eee", borderRadius: "8px", overflow: "hidden" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.222384705596!2d85.32623197616995!3d27.71041692535567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19090684f83b%3A0x6bde1c7657929bd4!2sFour%20Square%20Complex!5e0!3m2!1sen!2snp!4v1701234567890!5m2!1sen!2snp"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    {/* Factory */}
                    <div>
                        <h3 style={{ color: "#F44336", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "1rem" }}>Factory</h3>
                        <p style={{ marginBottom: "0.5rem", fontSize: "0.95rem" }}>Malaya Road, Biratnagar-13, Morang,<br />Pradesh 1, Nepal</p>
                        <p style={{ marginBottom: "0.5rem", fontSize: "0.95rem" }}>+977-21-435407 / 436082</p>
                        <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>bagmatiplastic@gmail.com</p>

                        <div style={{ width: "100%", height: "300px", background: "#eee", borderRadius: "8px", overflow: "hidden" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.289052643594!2d87.26620937611867!3d26.47863197886475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744641e7d01d%3A0xb35345691456w9!2sBiratnagar!5e0!3m2!1sen!2snp!4v1701234567891"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @media (max-width: 900px) {
                    .container { padding: 2rem 1rem !important; }
                    form { grid-template-columns: 1fr !important; }
                    .location-grid { grid-template-columns: 1fr !important; }
                    div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
