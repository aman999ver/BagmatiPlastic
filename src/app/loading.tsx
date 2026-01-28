export default function Loading() {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "white",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem"
        }}>
            <div className="spinner"></div>
            <p style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "#F44336",
                fontWeight: "600",
                letterSpacing: "1px"
            }}>
                BAGMATI PLASTIC
            </p>

            <style dangerouslySetInnerHTML={{
                __html: `
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #F44336;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
