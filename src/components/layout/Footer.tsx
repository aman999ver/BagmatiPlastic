import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.brandLogo}>
                            <Image
                                src="/bagmati-logo.png"
                                alt="Bagmati Plastic"
                                width={180}
                                height={60}
                                style={{ objectFit: "contain", width: "auto", height: "60px" }}
                            />
                        </Link>
                        <p className={styles.brandDesc}>
                            Bagmati Plastic Industries Pvt. Ltd.<br />
                            Leading manufacturer of high-quality plastic products in Nepal.
                            Durable, Stylish, and Affordable.
                        </p>
                    </div>

                    <div className={styles.productsGrid}>
                        <div className={styles.column}>
                            <h3>Bathroom</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="/products?type=Bucket">Buckets</Link></li>
                                <li><Link href="/products?type=Mug">Mugs</Link></li>
                                <li><Link href="/products?type=Basin">Basins</Link></li>
                                <li><Link href="/products?type=Stool">Bath Stools</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>Kitchen</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="/products?type=Container">Containers</Link></li>
                                <li><Link href="/products?type=Rack">Racks</Link></li>
                                <li><Link href="/products?type=Basket">Baskets</Link></li>
                                <li><Link href="/products?type=Jug">Jugs</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>Household</h3>
                            <ul className={styles.linkList}>
                                <li><Link href="/products?type=Dustbin">Dustbins</Link></li>
                                <li><Link href="/products?type=Chair">Chairs</Link></li>
                                <li><Link href="/products?type=Table">Tables</Link></li>
                                <li><Link href="/products?type=Drawer">Drawers</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column} style={{ minWidth: "250px" }}>
                            <h3>Contact Us</h3>
                            <ul className={styles.linkList}>
                                <li style={{ marginBottom: "1rem" }}>
                                    <strong>Corporate Office:</strong><br />
                                    4th Floor Four Square Building,<br />
                                    Naxal, Kathmandu, Bagmati, Nepal<br />
                                    +977-9801121153<br />
                                    pankajrathi13@gmail.com
                                </li>
                                <li>
                                    <strong>Factory:</strong><br />
                                    Malaya Road, Biratnagar-13,<br />
                                    Morang, Koshi, Nepal<br />
                                    +977-21-435407/436082<br />
                                    bagmatiplastic@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Bagmati Plastic Industries. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
