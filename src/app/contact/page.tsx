export default function ContactPage() {
    return (
        <div className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--primary)" }}>Contact Us</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
                <div>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Get in Touch</h2>
                    <p style={{ marginBottom: "0.5rem" }}><strong>Address:</strong><br />Kathmandu, Nepal</p>
                    <p style={{ marginBottom: "0.5rem" }}><strong>Phone:</strong><br />+977-1-4XXXXXX</p>
                    <p style={{ marginBottom: "0.5rem" }}><strong>Email:</strong><br />info@bagmatiplastic.com.np</p>
                </div>

                <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input type="text" placeholder="Your Name" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
                    <input type="email" placeholder="Your Email" style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }} />
                    <textarea placeholder="Message" rows={5} style={{ padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px" }}></textarea>
                    <button type="submit" style={{ padding: "0.75rem", background: "var(--primary)", color: "white", borderRadius: "4px", fontWeight: "bold", border: "none" }}>Send Message</button>
                </form>
            </div>
        </div>
    );
}
