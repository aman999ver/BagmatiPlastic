import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const footerData = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Product Categories", href: "/products" },
        { name: "Blog", href: "/blogs" },
        { name: "Contact Us", href: "/contact" },
    ],
    products: {
        bathroom: {
            title: "Bathroom",
            items: ["Basin", "Buckets", "Bucket Lid", "Cleaning Brush", "Mugs", "Soap Case", "Stools", "Tub"]
        },
        drinkware: {
            title: "Drinkware",
            items: ["Bottles", "Jug"]
        },
        foodStorage: {
            title: "Food Storage",
            items: ["Airtight Container", "Hotcase", "Lunch Boxes", "Tiffin Boxes"]
        },
        gardening: {
            title: "Gardening Accessories",
            items: ["Planters", "Square Planters", "Rectangular Planters", "Planter with Trays", "J Hook Planter", "Hanging Planter", "Wall Hanging Planter"]
        },
        jars: {
            title: "Jars & Containers",
            items: ["Large Storage Capacity", "Premium Containers", "Print Series Containers", "Transparent Containers"]
        },
        kitchen: {
            title: "Kitchen Utilities",
            items: ["Baskets", "Kitchen Racks", "Masala box", "Bowls", "Plate", "Nanglo", "Basin", "Trays", "Other Kitchen Utility"]
        },
        waste: {
            title: "Waste Management",
            items: ["Dome Bin", "Drums", "Pedal Bins", "Swing Bins", "Dustpan", "Dustpan with brush"]
        }
    },
    series: [
        "Office Utility", "Pet Jars", "Poultry Farming", "Planter Series", "BIG Series", "Printing Series",
        "RHINO Unbreakable Series", "Bagmati Super Strong", "SQUARE Series", "STRIPE Series",
        "Fishtail Series", "Bagmati Ware", "Everest Series"
    ]
};

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo Section */}
                <div className={styles.logoSection}>
                    <Link href="/" className={styles.brandLogo}>
                        <div className="desktop-logo">
                            <Image src="/bagmati-logo.png" alt="Bagmati Plastic" width={180} height={60} style={{ objectFit: "contain", height: "60px", width: "auto" }} />
                        </div>
                        <div className="mobile-logo">
                            <Image src="/mobilelogo.png" alt="Bagmati Plastic" width={60} height={60} style={{ objectFit: "contain", height: "60px", width: "auto" }} />
                        </div>
                    </Link>
                </div>

                <div className={styles.mainGrid}>

                    {/* Left Column: Company */}
                    <div className={styles.column}>
                        <h3 className={styles.headingStatic}>Company</h3>
                        <ul className={styles.companyList}>
                            {footerData.company.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Middle: Bagmati Products (Spanning multiple sub-cols visually) */}
                    <div className={styles.productsWrapper}>
                        <h3 className={styles.headingStatic}>Bagmati Products</h3>
                        <div className={styles.productsGrid}>
                            {/* Sub-col 1 */}
                            <div className={styles.subCol}>
                                <CategoryBlock data={footerData.products.bathroom} />
                                <CategoryBlock data={footerData.products.drinkware} />
                                <CategoryBlock data={footerData.products.foodStorage} />
                            </div>
                            {/* Sub-col 2 */}
                            <div className={styles.subCol}>
                                <CategoryBlock data={footerData.products.gardening} />
                                <CategoryBlock data={footerData.products.jars} />
                                <div className={styles.simpleLinks}>
                                    <Link href="/products?type=Multi" className={styles.pinkLink}>Multi Usable</Link>
                                    <Link href="/products?type=Baby" className={styles.pinkLink}>Baby Series</Link>
                                    <Link href="/products?type=Hanger" className={styles.pinkLink}>Hanger</Link>
                                </div>
                            </div>
                            {/* Sub-col 3 */}
                            <div className={styles.subCol}>
                                <CategoryBlock data={footerData.products.kitchen} />
                                <CategoryBlock data={footerData.products.waste} />
                            </div>
                        </div>
                    </div>

                    {/* Right Middle: Series */}
                    <div className={styles.column}>
                        <ul className={styles.seriesList}>
                            {footerData.series.map((item) => (
                                <li key={item}><Link href={`/products?series=${item}`} className={styles.seriesLink}>{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Far Right: Industry Solutions / Contact */}
                    <div className={styles.column} style={{ minWidth: "250px" }}>
                        <h3 className={styles.headingStatic}>Industry Solutions</h3>

                        <div className={styles.contactBlock}>
                            <h4 className={styles.contactLabel}>CORPORATE OFFICE</h4>
                            <p>4th Floor Four Square Building, Naxal,<br />Kathmandu, Pradesh 3, Nepal</p>
                            <p>+977-9801121153</p>
                            <p>pankajrathi13@gmail.com</p>
                        </div>

                        <div className={styles.contactBlock}>
                            <h4 className={styles.contactLabel}>FACTORY</h4>
                            <p>Malaya Road, Biratnagar-13, Morang,<br />Pradesh 1, Nepal</p>
                            <p>+977-21-435407/436082</p>
                            <p>bagmatiplastic@gmail.com</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.legalLinks}>
                        <Link href="#">Terms of Service</Link>
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Security</Link>
                        <Link href="#">Sitemap</Link>
                    </div>
                    <div className={styles.copyright}>
                        &copy; 2026 Bagmati Plastic Pvt. Industries Ltd. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

function CategoryBlock({ data }: { data: { title: string, items: string[] } }) {
    return (
        <div className={styles.categoryBlock}>
            <h4 className={styles.categoryTitle}>{data.title}</h4>
            <ul className={styles.itemList}>
                {data.items.map(item => (
                    <li key={item}><Link href={`/products?type=${item}`}>{item}</Link></li>
                ))}
            </ul>
        </div>
    );
}
