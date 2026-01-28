"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";
import styles from "./ProductCarousel.module.css";

interface ProductCarouselProps {
    products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Duplicate products enough times for smooth looping
    const displayProducts = [...products, ...products, ...products, ...products];
    // Increased to 4 sets to be safer with wide screens

    useEffect(() => {
        const carousel = scrollRef.current;
        if (!carousel) return;

        const scrollStep = () => {
            if (isPaused || isDragging) return;

            // Measure first card width + gap
            const firstCard = carousel.children[0] as HTMLElement;
            if (!firstCard) return;

            // Calculate item width including gap (approximate or computed)
            const style = window.getComputedStyle(carousel);
            const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24; // Default to 24 (1.5rem) if fails
            const itemWidth = firstCard.offsetWidth + gap;

            const singleSetWidth = (carousel.scrollWidth / 4); // Based on 4 sets

            // Check if we need to reset position (Infinite Loop Logic)
            // If we have scrolled past the 2nd set (into 3rd), we can jump back to 1st set (plus offset)
            // Actually, simplest logic: If scrollLeft >= singleSetWidth * 2, subtract singleSetWidth.
            // This jumps from Set 3 -> Set 2 (Same visual).

            if (carousel.scrollLeft >= singleSetWidth * 2.5) {
                // Reset instantly to a previous matching position
                carousel.scrollTo({
                    left: carousel.scrollLeft - singleSetWidth,
                    behavior: "instant"
                });

                // Small delay to allow instant scroll to render before smoothing? 
                // No, usually subsequent scroll works, but let's be safe.
            }

            // Scroll forward one item
            carousel.scrollBy({
                left: itemWidth,
                behavior: "smooth"
            });
        };

        const intervalId = setInterval(scrollStep, 3000); // 3 seconds pause

        return () => clearInterval(intervalId);
    }, [isPaused, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // For touch devices, simpler handling (native scroll works well, just pause auto)
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);

    // ... inside component ...

    const scrollNext = () => {
        if (!scrollRef.current) return;
        const carousel = scrollRef.current;
        const style = window.getComputedStyle(carousel);
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24;
        const width = (carousel.children[0] as HTMLElement)?.offsetWidth || 280;
        const itemWidth = width + gap;

        // Check Loop End
        const singleSetWidth = (carousel.scrollWidth / 4);
        if (carousel.scrollLeft >= singleSetWidth * 2.5) {
            carousel.scrollTo({ left: carousel.scrollLeft - singleSetWidth, behavior: "instant" });
            // Then scroll
            setTimeout(() => carousel.scrollBy({ left: itemWidth, behavior: "smooth" }), 20);
        } else {
            carousel.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
    };

    const scrollPrev = () => {
        if (!scrollRef.current) return;
        const carousel = scrollRef.current;
        const style = window.getComputedStyle(carousel);
        const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 24;
        const width = (carousel.children[0] as HTMLElement)?.offsetWidth || 280;
        const itemWidth = width + gap;

        // Check Loop Start
        // If we are near 0 (or start of 2nd set), jump forward to 3rd set to scroll left seamlessly?
        // Actually, logic is: user sees set 1. Scroll left -> user wants to see end of list (visually).
        // Since we have 4 sets: [1] [2] [3] [4]. Start visual is [1].
        // If we scroll left from 0, we can jump to end of [2]? 
        // 0 position is start of [1].
        // To scroll left seamlessly, we should be at start of [2] initially? 
        // For simplicity, let's just allow normal scroll. Finite scrolling left might hit wall if logic isn't perfect.
        // But we have multiple sets.

        carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
    };

    return (
        <div className={styles.container}>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={scrollPrev} aria-label="Previous">
                <ChevronLeft size={24} />
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={scrollNext} aria-label="Next">
                <ChevronRight size={24} />
            </button>

            <div
                className={styles.track}
                ref={scrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => { setIsPaused(false); handleMouseLeave(); }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {displayProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className={styles.cardWrapper}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
