import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    series: String,
    size: String,
    colors: [{ // Rich color object
        name: String,
        code: String, // Hex
        image: String, // URL
    }],
    features: [String],
    description: String,
    images: [String],
    isNewItem: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    brand: { type: String, default: 'Bagmati Plastic' }, // 'Bagmati Plastic' or 'Bagmati Plastotech'
}, { timestamps: true });

const BannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: String,
}, { timestamps: true });

const FeaturedItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: String,
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // Cover photo
}, { timestamps: true });

const SeriesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // HTML content
    excerpt: String,
    image: String,
    category: String,
    tags: [String],
    author: { type: String, default: "Admin" },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true }, // URL
}, { timestamps: true });

const FactoryImageSchema = new mongoose.Schema({
    image: { type: String, required: true },
    caption: String,
}, { timestamps: true });

const CertificateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: String,
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true },
    company: String,
    message: String,
    status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
}, { timestamps: true });

// Prevent overwrite models if already compiled
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
export const FeaturedItem = mongoose.models.FeaturedItem || mongoose.model("FeaturedItem", FeaturedItemSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export const Series = mongoose.models.Series || mongoose.model("Series", SeriesSchema);
export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
export const FactoryImage = mongoose.models.FactoryImage || mongoose.model("FactoryImage", FactoryImageSchema);
export const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
