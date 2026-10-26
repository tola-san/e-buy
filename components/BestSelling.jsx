'use client'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from './ProductCard'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { ArrowRight, Check, Flame, ShieldCheck, ShoppingBag, Sparkles, Star, Truck, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

const BestSelling = () => {
    const dispatch = useDispatch()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const products = useSelector(state => state.product.list)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isSpotlightAdded, setIsSpotlightAdded] = useState(false)

    // Sort products by popularity (review count)
    const sortedProducts = products.slice().sort((a, b) => b.rating.length - a.rating.length)

    // Extract unique categories
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))]

    // Filtered list
    const filteredProducts = selectedCategory === 'All'
        ? sortedProducts
        : sortedProducts.filter(p => p.category === selectedCategory)

    // Spotlight item (top seller)
    const spotlightProduct = sortedProducts[0]

    // Calculate spotlight rating
    const spotlightRatingCount = spotlightProduct?.rating?.length || 0
    const spotlightRating = spotlightRatingCount > 0
        ? spotlightProduct.rating.reduce((acc, curr) => acc + (curr.rating || 0), 0) / spotlightRatingCount
        : 5

    const spotlightDiscount = spotlightProduct?.mrp && spotlightProduct.mrp > spotlightProduct.price
        ? Math.round(((spotlightProduct.mrp - spotlightProduct.price) / spotlightProduct.mrp) * 100)
        : 0

    const handleSpotlightAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!spotlightProduct) return

        dispatch(addToCart({ productId: spotlightProduct.id }))
        setIsSpotlightAdded(true)
        toast.success(`${spotlightProduct.name} added to cart!`, {
            icon: '🛍️',
            style: {
                borderRadius: '12px',
                background: '#1e293b',
                color: '#fff',
                fontSize: '13px',
            }
        })
        setTimeout(() => setIsSpotlightAdded(false), 1200)
    }

    if (!products || products.length === 0) {
        return null
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-600 mb-3">
                        <Sparkles size={14} className="fill-orange-600" />
                        <span>Customer Favorites</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Best Selling <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Products</span>
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
                        Our highest-rated tech and gadgets, backed by thousands of 5-star customer reviews.
                    </p>
                </div>

                {/* Categories & View All Link */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl">
                        {categories.slice(0, 5).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${selectedCategory === cat
                                    ? 'bg-white text-orange-600 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-xl transition-all"
                    >
                        View all <ArrowRight size={15} />
                    </Link>
                </div>
            </div>

            {/* Bento Grid (when 'All' is active) */}
            {selectedCategory === 'All' ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* BENTO HERO SPOTLIGHT: #1 Best Seller (spans 2 cols, 2 rows on desktop) */}
                    {spotlightProduct && (
                        <div className="col-span-2 lg:col-span-2 lg:row-span-2 relative bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 rounded-xl border border-orange-200/70 p-5 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-300 transition-all duration-300 group">
                            {/* Top row */}
                            <div className="flex items-center justify-between w-full z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-l text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                                    <Flame size={14} className="fill-white" />
                                    #1 Top Seller
                                </span>
                                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                    {spotlightProduct.category}
                                </span>
                            </div>

                            {/* Showcase Image Area */}
                            <div className="relative my-4 sm:my-8 flex items-center justify-center min-h-[220px] sm:min-h-[280px]">
                                <div className="absolute inset-0 bg-radial from-orange-400/20 via-amber-200/10 to-transparent blur-2xl pointer-events-none" />
                                <Link href={`/product/${spotlightProduct.id}`} className="relative z-10 flex items-center justify-center">
                                    <Image
                                        src={spotlightProduct.images[0]}
                                        alt={spotlightProduct.name}
                                        width={500}
                                        height={500}
                                        className="max-h-48 sm:max-h-68 w-auto object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-500 ease-out"
                                    />
                                </Link>
                            </div>

                            {/* Bottom Content Area */}
                            <div className="relative z-10 flex flex-col gap-2.5">
                                {/* Rating Row */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {Array(5).fill('').map((_, i) => (
                                            <Star key={i} size={14} className="text-transparent" fill={spotlightRating >= i + 1 ? '#F59E0B' : '#E2E8F0'} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{spotlightRating.toFixed(1)}</span>
                                    <span className="text-xs text-slate-400">({spotlightRatingCount} verified reviews)</span>
                                </div>

                                {/* Title */}
                                <Link href={`/product/${spotlightProduct.id}`}>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                        {spotlightProduct.name}
                                    </h3>
                                </Link>

                                {/* Value perks */}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                                    <span className="flex items-center gap-1 font-medium">
                                        <Truck size={14} className="text-orange-500" /> Free 2-Day Delivery
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="flex items-center gap-1 font-medium">
                                        <ShieldCheck size={14} className="text-emerald-500" /> 1-Year Guarantee
                                    </span>
                                </div>

                                {/* Price & Action CTA */}
                                <div className="flex items-center justify-between pt-4 mt-2 border-t border-orange-100">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                                {currency}{spotlightProduct.price}
                                            </span>
                                            {spotlightProduct.mrp > spotlightProduct.price && (
                                                <span className="text-sm text-slate-400 line-through">
                                                    {currency}{spotlightProduct.mrp}
                                                </span>
                                            )}
                                        </div>
                                        {spotlightDiscount > 0 && (
                                            <span className="text-xs font-bold text-emerald-600">
                                                Save {currency}{spotlightProduct.mrp - spotlightProduct.price} ({spotlightDiscount}% OFF)
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/product/${spotlightProduct.id}`}
                                            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 font-semibold text-xs sm:text-sm transition-all"
                                        >
                                            Details
                                        </Link>
                                        <button
                                            onClick={handleSpotlightAddToCart}
                                            type="button"
                                            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center gap-1.5 font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95 ${isSpotlightAdded
                                                ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                                                : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white shadow-orange-500/25'
                                                }`}
                                        >
                                            {isSpotlightAdded ? (
                                                <>
                                                    <Check size={16} strokeWidth={2.5} />
                                                    <span>Added</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag size={16} />
                                                    <span>Add to Cart</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Card 1 */}
                    {sortedProducts[1] && <ProductCard product={sortedProducts[1]} />}

                    {/* Product Card 2 */}
                    {sortedProducts[2] && <ProductCard product={sortedProducts[2]} />}

                    {/* BENTO PROMO TILE: Special Discount Banner Card */}
                    <div className="col-span-2 sm:col-span-1 relative bg-gradient-to-br from-orange-500 via-orange-600/20 to-orange-700/10 text-white rounded-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-lg shadow-slate-900/10 group">
                        <div className="absolute -top-12 -right-12 size-36 rounded-full bg-white blur-2xl group-hover:bg-orange-500/35 transition-all pointer-events-none" />
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-orange-400 border border-orange-500/30 mb-3">
                                <Zap size={12} className="fill-orange-400" />
                                Limited Offer
                            </div>
                            <h4 className="text-lg font-bold text-white leading-snug">
                                Save 20% on Your First Order
                            </h4>
                            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                                Use our welcome coupon code at checkout for instant savings.
                            </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-700/60">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] text-slate-400 font-medium">Coupon Code</span>
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-700 border border-slate-700 text-white">
                                    NEW20
                                </span>
                            </div>
                            <Link
                                href="/shop"
                                className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition-all"
                            >
                                Shop Deals <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Product Card 3 */}
                    {sortedProducts[3] && <ProductCard product={sortedProducts[3]} />}

                    {/* Additional Product Cards in balanced 4-column flow */}
                    {/* {sortedProducts.slice(4, 8).map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))} */}
                </div>
            ) : (
                /* Category Filtered Grid */
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id || index} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default BestSelling