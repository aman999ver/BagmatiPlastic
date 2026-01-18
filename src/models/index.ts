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

// Prevent overwrite models if already compiled
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
export const FeaturedItem = mongoose.models.FeaturedItem || mongoose.model("FeaturedItem", FeaturedItemSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export const Series = mongoose.models.Series || mongoose.model("Series", SeriesSchema);
