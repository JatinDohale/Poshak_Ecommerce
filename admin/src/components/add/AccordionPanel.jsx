import React from 'react'


const MAX_PHOTOS = 4;

const AccordionPanel = ({ COLORS, selectedColors, colorPhotos, photoError, expandedColor, setColorPhotos, setPhotoError, setExpandedColor }) => {
    // function for adding photos to a specific color, ensuring the max limit and updating errors
    const handlePhotoAdd = (colorName, files) => {
        const current = colorPhotos[colorName] || [];
        const remaining = MAX_PHOTOS - current.length;
        if (remaining <= 0) return;
        const newFiles = Array.from(files).slice(0, remaining);
        setColorPhotos((prev) => ({ ...prev, [colorName]: [...current, ...newFiles] }));
        setPhotoError((prev) => ({ ...prev, [colorName]: "" }));
    };

    // function for removing a specific photo from a color, updating the state accordingly
    const removePhoto = (colorName, idx) => {
        setColorPhotos((prev) => {
            const updated = [...(prev[colorName] || [])];
            updated.splice(idx, 1);
            return { ...prev, [colorName]: updated };
        });
    };

    return (
        <div className="flex flex-col gap-3">
            {selectedColors.map((colorName) => {
                const c = COLORS.find((x) => x.name === colorName);
                const photos = colorPhotos[colorName] || [];
                const isExpanded = expandedColor === colorName;
                const isLight = ["White", "Beige", "Mustard"].includes(colorName);
                const hasError = !!photoError[colorName];



                return (
                    <div key={colorName}
                        className={`rounded-xl overflow-hidden border transition-all duration-200 ${hasError ? "border-red-300" : "border-gray-200"} ${isExpanded ? "shadow-sm" : ""}`}>

                        {/* Panel header */}
                        <div
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer select-none transition-colors duration-200 ${isExpanded ? "bg-gray-50" : "bg-white"}`}
                            onClick={() => setExpandedColor(isExpanded ? null : colorName)}
                        >
                            <div className="w-6 h-6 rounded-full flex-shrink-0 shadow-sm"
                                style={{
                                    background: c?.hex,
                                    border: isLight ? "1px solid #d0cdc8" : "none",
                                }} />
                            <span className="text-sm font-medium text-gray-800 flex-1">{colorName}</span>

                            <div className="flex items-center gap-2">
                                {/* 4-dot progress */}
                                <div className="flex gap-1">
                                    {Array.from({ length: MAX_PHOTOS }).map((_, i) => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i < photos.length ? "bg-gray-800" : "bg-gray-200"}`} />
                                    ))}
                                </div>

                                {photos.length === 0 ? (
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full border ${hasError ? "text-red-500 bg-red-50 border-red-200" : "text-gray-400 bg-gray-50 border-gray-200"}`}>
                                        {hasError ? "required!" : "no photos"}
                                    </span>
                                ) : (
                                    <span className="text-[11px] px-2 py-0.5 rounded-full text-green-700 bg-green-50 border border-green-200">
                                        {photos.length}/{MAX_PHOTOS}
                                    </span>
                                )}

                                <span className={`text-gray-400 text-base transition-transform duration-250 inline-block ${isExpanded ? "rotate-180" : "rotate-0"}`}>▾</span>
                            </div>
                        </div>

                        {/* Panel body */}
                        {isExpanded && (
                            <div className="anim-expand px-4 pb-4 bg-gray-50">

                                {/* Thumbnails */}
                                {photos.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {photos.map((file, idx) => (
                                            <div key={idx} className="thumb relative w-20 h-20 rounded-lg overflow-hidden transition-transform duration-200">
                                                <img src={URL.createObjectURL(file)} alt=""
                                                    className="w-full h-full object-cover" />
                                                <div className="rm-btn opacity-0 absolute top-1 right-1 w-5 h-5 rounded-full bg-black/65 text-white flex items-center justify-center text-xs cursor-pointer transition-opacity duration-200 z-10"
                                                    onClick={() => removePhoto(colorName, idx)}>×</div>
                                                <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[9px] rounded px-1">
                                                    {idx === 0 ? "main" : `#${idx + 1}`}
                                                </div>
                                            </div>
                                        ))}

                                        {/* + add slot */}
                                        {photos.length < MAX_PHOTOS && (
                                            <label className="add-slot w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer text-gray-300 text-xs gap-0.5 transition-colors duration-200">
                                                <span className="text-2xl leading-none">+</span>
                                                <span>add</span>
                                                <input type="file" accept="image/*" multiple hidden
                                                    onChange={(e) => handlePhotoAdd(colorName, e.target.files)} />
                                            </label>
                                        )}
                                    </div>
                                )}

                                {/* Drop zone when empty */}
                                {photos.length === 0 && (
                                    <label className="upload-zone block border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer transition-colors duration-200 mb-3">
                                        <input type="file" accept="image/*" multiple hidden
                                            onChange={(e) => handlePhotoAdd(colorName, e.target.files)} />
                                        <div className="text-3xl mb-2">📷</div>
                                        <p className="text-sm font-medium text-gray-600">
                                            Upload photos for <strong>{colorName}</strong>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">Click to browse · JPG, PNG, WEBP · Max {MAX_PHOTOS}</p>
                                    </label>
                                )}

                                {/* Slot bar */}
                                <div className="flex gap-1 mt-2">
                                    {Array.from({ length: MAX_PHOTOS }).map((_, i) => (
                                        <div key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${i < photos.length ? "bg-gray-800" : "bg-gray-200"}`} />
                                    ))}
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1.5">
                                    {photos.length === 0
                                        ? "⚠ At least 1 photo required per color"
                                        : photos.length === MAX_PHOTOS
                                            ? "✓ Maximum photos reached"
                                            : `${photos.length} uploaded · ${MAX_PHOTOS - photos.length} more slot${MAX_PHOTOS - photos.length > 1 ? "s" : ""} available`}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )
}

export default AccordionPanel
