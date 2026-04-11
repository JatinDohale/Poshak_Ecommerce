import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { backendUrl } from '../App'
import { assets } from '../assets/assets'
import AccordionPanel from '../components/add/AccordionPanel'


//global constants
// Increase Colours when needed
const COLORS = [
    { name: "Black", hex: "#1a1a1a" },
    { name: "White", hex: "#f5f5f0" },
    { name: "Navy", hex: "#1e3a5f" },
    { name: "Red", hex: "#c0392b" },
    { name: "Olive", hex: "#6b7c3e" },
    { name: "Beige", hex: "#d4b896" },
    { name: "Burgundy", hex: "#7b2d42" },
    { name: "Sky", hex: "#5ba4cf" },
    { name: "Mustard", hex: "#d4a017" },
    { name: "Charcoal", hex: "#4a4a4a" },
    { name: "Coral", hex: "#e8734a" },
    { name: "Forest", hex: "#2d6a4f" },
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];


const labelClass = "block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2";
const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white outline-none transition focus:border-gray-800 focus:ring-2 focus:ring-gray-100";


const Add = ({ token }) => {

    // states for form fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);
    const [colorPhotos, setColorPhotos] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);
    const [onProcess, setOnProcess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [expandedColor, setExpandedColor] = useState(null);
    const [photoError, setPhotoError] = useState({});


    // function for changing the size selection
    const toggleSize = (s) => {
        setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    }


    // function for changing the color selection and handling the associated photos and errors
    const toggleColor = (c) => {
        setSelectedColors((prev) => {
            if (prev.includes(c.name)) {
                setColorPhotos((cp) => { const n = { ...cp }; delete n[c.name]; return n; });
                setPhotoError((pe) => { const n = { ...pe }; delete n[c.name]; return n; });
                if (expandedColor === c.name) setExpandedColor(null);
                return prev.filter((x) => x !== c.name);
            } else {
                setExpandedColor(c.name);
                return [...prev, c.name];
            }
        });
    };


    // function to validate that each selected color has at least one photo, setting error states for any that don't
    const validatePhotos = () => {
        const errors = {};
        selectedColors.forEach((c) => {
            if (!colorPhotos[c] || colorPhotos[c].length === 0) errors[c] = true;
        });
        setPhotoError(errors);
        return Object.keys(errors).length === 0;
    };

    // function to handle form submission, including validation, preparing form data, making the API request, and handling the response
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedColors.length === 0) return alert("Select at least one color.");
        if (!validatePhotos()) {
            setExpandedColor(selectedColors.find((c) => !colorPhotos[c]?.length));
            return;
        }

        setOnProcess(true);

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("bestseller", String(bestseller));
            formData.append("selectedColors", JSON.stringify(selectedColors));

            // Append each photo with field name: photos_Black_0, photos_Black_1 ...
            selectedColors.forEach((colorName) => {
                (colorPhotos[colorName] || []).forEach((file, idx) => {
                    formData.append(`photos_${colorName}_${idx}`, file);
                });
            });

            const response = await axios.post(
                `${backendUrl}/api/product/addproduct`,
                formData,
                { headers: { token } }
            );

            if (response.data.success) {
                setSubmitted(true);

                // reset form
                setName(""); setDescription(""); setPrice("");
                setSizes([]); setSelectedColors([]); setColorPhotos({});
                setBestseller(false);
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }

        setOnProcess(false);
    };

    // function to calculate the progress percentage based on filled fields and photo uploads, used for the progress bar at the top of the form
    const progressPct = () => {
        let s = 0;
        if (name) s++;
        if (description) s++;
        if (price) s++;
        if (selectedColors.length > 0) s++;
        if (sizes.length > 0) s++;
        if (selectedColors.length > 0 && selectedColors.every((c) => colorPhotos[c]?.length > 0)) s++;
        return `${Math.round((s / 6) * 100)}%`;
    };


    return (
        <div className="min-h-screen  bg-[#f7f5f2] px-4  font-sans">

            <div className="w-full ">

                {/* ── Header ── */}
                <div className="mb-4 anim-fadeup">
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">Admin Panel</p>
                    <h1 className="text-4xl font-semibold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
                        Add New Product
                    </h1>
                    <div className="w-10 h-[3px] bg-gray-900 mt-3 rounded-full" />
                </div>

                {/* ── Card ── */}
                <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden anim-fadeup">

                    {/* Progress bar */}
                    <div className="h-[3px] bg-gray-100">
                        <div
                            className="h-full bg-gray-900 rounded-full transition-all duration-500"
                            style={{ width: progressPct() }}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">

                        <div className="flex  gap-6">

                            <div className='w-[50%]'>
                                {/* Product Name */}
                                <div className="anim-slidein">
                                    <label className={labelClass}>Product Name</label>
                                    <input className={inputClass} type="text" placeholder="e.g. Classic Oxford Shirt"
                                        value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                {/* Description */}
                                <div className="anim-slidein">
                                    <label className={labelClass}>Description</label>
                                    <textarea className={`${inputClass} min-h-[90px] resize-y leading-relaxed`}
                                        placeholder="Describe the product — fabric, fit, occasion..."
                                        value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>

                                {/* ── Sizes ── */}
                                <div className="anim-slidein">
                                    <label className={labelClass}>Available Sizes</label>
                                    <div className="flex flex-wrap  gap-2">
                                        {SIZES.map((s) => {
                                            const active = sizes.includes(s);
                                            return (
                                                <div key={s}
                                                    className={`size-btn w-13 h-13 flex items-center justify-center rounded-xl text-sm font-semibold cursor-pointer select-none transition-all duration-150
                        ${active
                                                            ? "size-active bg-gray-900 text-white border-2 border-gray-900 shadow-md"
                                                            : "bg-gray-50 text-gray-500 border border-gray-200"}`}
                                                    style={{ width: 52, height: 52 }}
                                                    onClick={() => toggleSize(s)}>
                                                    {s}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>


                            {/* Category / Sub / Price */}
                            <div className=" anim-slidein">
                                <div>
                                    <label className={labelClass}>Category</label>
                                    <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option>Men</option>
                                        <option>Women</option>
                                        <option>Kids</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Sub-category</label>
                                    <select className={inputClass} value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                                        <option>Topwear</option>
                                        <option>Bottomwear</option>
                                        <option>Winterwear</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Price (₹)</label>
                                    <input className={inputClass} type="number" placeholder="0.00" min="0"
                                        value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                            </div>


                            {/* ── Colors & Photos ── */}
                            <div className="w-[30%] anim-slidein">
                                <label className={labelClass}>
                                    Colors &amp; Photos
                                    <span className="ml-2 text-[11px] normal-case tracking-normal font-normal text-gray-300">
                                        select a color · upload 1–4 photos
                                    </span>
                                </label>

                                {/* Swatches */}
                                <div className="grid grid-cols-5 gap-3 mb-5">
                                    {COLORS.map((c) => {
                                        const isSelected = selectedColors.includes(c.name);
                                        const isLight = ["White", "Beige", "Mustard"].includes(c.name);
                                        const photoCount = colorPhotos[c.name]?.length || 0;
                                        return (
                                            <div key={c.name} className="flex flex-col items-center gap-1 relative">
                                                <div
                                                    className="swatch w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 relative"
                                                    style={{
                                                        background: c.hex,
                                                        border: isSelected
                                                            ? "3px solid #1a1a1a"
                                                            : isLight ? "1.5px solid #d0cdc8" : "2px solid transparent",
                                                        boxShadow: isSelected
                                                            ? "0 0 0 2px #fff, 0 0 0 4px #1a1a1a"
                                                            : "0 2px 6px rgba(0,0,0,.12)",
                                                    }}
                                                    onClick={() => toggleColor(c)}
                                                    title={c.name}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            {photoCount === 0 ? (
                                                                <span className="text-sm font-bold" style={{ color: isLight ? "#1a1a1a" : "#fff" }}>✓</span>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                                                                    style={{
                                                                        background: isLight ? "rgba(0,0,0,.65)" : "rgba(255,255,255,.9)",
                                                                        color: isLight ? "#fff" : "#1a1a1a",
                                                                    }}>
                                                                    {photoCount}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-[9px] uppercase tracking-wide text-gray-400">{c.name}</span>
                                                {photoError[c.name] && (
                                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                               
                            </div>
                        </div>
                         {/* Empty hint */}
                                {selectedColors.length === 0 && (
                                    <p className="text-xs text-red-300 italic">Click a color to select it and upload photos</p>
                                )}

                        {/* Accordion panels */}
                        {selectedColors.length > 0 && <AccordionPanel COLORS={COLORS} selectedColors={selectedColors} colorPhotos={colorPhotos} photoError={photoError} expandedColor={expandedColor} setExpandedColor={setExpandedColor} setColorPhotos={setColorPhotos} setPhotoError={setPhotoError} />}

                        {/* ── Bestseller Toggle ── */}
                        <div className="flex items-center justify-between anim-slidein">
                            <div>
                                <p className="text-sm font-medium text-gray-800">Mark as Bestseller</p>
                                <p className="text-xs text-gray-400 mt-0.5">Show in featured &amp; trending section</p>
                            </div>
                            <div
                                className="relative cursor-pointer flex-shrink-0 transition-colors duration-250 rounded-full"
                                style={{
                                    width: 52, height: 28,
                                    background: bestseller ? "#1a1a1a" : "#e0ddd8",
                                }}
                                onClick={() => setBestseller(!bestseller)}
                            >
                                <div className="absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow transition-all duration-250"
                                    style={{ left: bestseller ? 27 : 3 }} />
                            </div>
                        </div>

                        {/* ── Submit ── */}
                        <button
                            type="submit"
                            disabled={onProcess}
                            className="submit-btn w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
                            style={{
                                background: onProcess ? "#e5e3df" : "#1a1a1a",
                                color: onProcess ? "#aaa" : "#fff",
                                cursor: onProcess ? "not-allowed" : "pointer",
                            }}
                        >
                            {onProcess ? (
                                <>
                                    <span className="anim-spin w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-500 inline-block" />
                                    Processing...
                                </>
                            ) : submitted ? (
                                <span className="anim-success">✓ Product Added!</span>
                            ) : (
                                "Add Product →"
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-xs text-gray-300 mt-4">
                    Each selected color requires at least 1 photo (max 4).
                </p>
            </div>
        </div>
    )
}

export default Add


