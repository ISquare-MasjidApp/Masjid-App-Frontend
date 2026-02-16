(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api/prayer-times.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bulkCreatePrayerTimes",
    ()=>bulkCreatePrayerTimes,
    "createPrayerTime",
    ()=>createPrayerTime,
    "deletePrayerTime",
    ()=>deletePrayerTime,
    "getPrayerTimeById",
    ()=>getPrayerTimeById,
    "getPrayerTimes",
    ()=>getPrayerTimes,
    "updatePrayerTime",
    ()=>updatePrayerTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
;
// ============================================
// Prayer Times API Service
// ============================================
const BASE = '/admin/prayer-times';
async function getPrayerTimes(params) {
    const query = new URLSearchParams();
    if (params?.startDate) query.set('startDate', params.startDate);
    if (params?.endDate) query.set('endDate', params.endDate);
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));
    const queryStr = query.toString();
    const url = queryStr ? `${BASE}?${queryStr}` : BASE;
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(url);
    return response.data;
}
async function getPrayerTimeById(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(`${BASE}/${id}`);
    return response.data;
}
async function createPrayerTime(data) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])(BASE, data);
    return response.data;
}
async function bulkCreatePrayerTimes(data) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"])(`${BASE}/bulk`, data);
    return response.data;
}
async function updatePrayerTime(id, data) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["put"])(`${BASE}/${id}`, data);
    return response.data;
}
async function deletePrayerTime(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["del"])(`${BASE}/${id}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UpdatePrayerTimeModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/prayer-times.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const EMPTY_PRAYERS = {
    fajr: {
        athan: '',
        jamah: ''
    },
    sunrise: {
        athan: ''
    },
    zuhr: {
        athan: '',
        jamah: ''
    },
    asr: {
        athan: '',
        jamah: ''
    },
    maghrib: {
        athan: '',
        jamah: ''
    },
    isha: {
        athan: '',
        jamah: ''
    }
};
const EMPTY_JUMUAH = {
    begins: '',
    khutbah: '',
    jamah: ''
};
const PRAYER_ROWS = [
    {
        key: 'fajr',
        label: 'FAJR',
        hasJamah: true
    },
    {
        key: 'sunrise',
        label: 'SUNRISE',
        hasJamah: false
    },
    {
        key: 'zuhr',
        label: 'ZUHR',
        hasJamah: true
    },
    {
        key: 'asr',
        label: 'ASR',
        hasJamah: true
    },
    {
        key: 'maghrib',
        label: 'MAGHRIB',
        hasJamah: true
    },
    {
        key: 'isha',
        label: 'ISHA',
        hasJamah: true
    }
];
function UpdatePrayerTimeModal({ prayerTime, onClose, onSuccess }) {
    _s();
    const isEditing = prayerTime !== null;
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('daily');
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(prayerTime?.date || '');
    const [hijriDate, setHijriDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(prayerTime?.hijriDate || '');
    const [prayers, setPrayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(prayerTime?.prayers || EMPTY_PRAYERS);
    const [jumuahTimes, setJumuahTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(prayerTime?.jumuahTimes || [
        {
            ...EMPTY_JUMUAH
        }
    ]);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UpdatePrayerTimeModal.useEffect": ()=>{
            const handleEsc = {
                "UpdatePrayerTimeModal.useEffect.handleEsc": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["UpdatePrayerTimeModal.useEffect.handleEsc"];
            window.addEventListener('keydown', handleEsc);
            return ({
                "UpdatePrayerTimeModal.useEffect": ()=>window.removeEventListener('keydown', handleEsc)
            })["UpdatePrayerTimeModal.useEffect"];
        }
    }["UpdatePrayerTimeModal.useEffect"], [
        onClose
    ]);
    const handlePrayerChange = (prayer, field, value)=>{
        setPrayers((prev)=>({
                ...prev,
                [prayer]: {
                    ...prev[prayer],
                    [field]: value
                }
            }));
    };
    const handleJumuahChange = (index, field, value)=>{
        setJumuahTimes((prev)=>{
            const updated = [
                ...prev
            ];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        });
    };
    const addJumuahSlot = ()=>setJumuahTimes((prev)=>[
                ...prev,
                {
                    ...EMPTY_JUMUAH
                }
            ]);
    const removeJumuahSlot = (index)=>{
        if (jumuahTimes.length > 1) setJumuahTimes((prev)=>prev.filter((_, i)=>i !== index));
    };
    const handleSave = async ()=>{
        if (!isEditing && !date) {
            setError('Date is required');
            return;
        }
        setSaving(true);
        setError(null);
        try {
            const filteredJumuah = jumuahTimes.filter((j)=>j.jamah || j.begins || j.khutbah);
            if (isEditing) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePrayerTime"])(prayerTime.id, {
                    hijriDate: hijriDate || undefined,
                    prayers,
                    jumuahTimes: filteredJumuah.length > 0 ? filteredJumuah : undefined
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPrayerTime"])({
                    date,
                    hijriDate: hijriDate || undefined,
                    prayers,
                    jumuahTimes: filteredJumuah.length > 0 ? filteredJumuah : undefined
                });
            }
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save prayer time');
        } finally{
            setSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-[24px] w-full max-w-[1020px] max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--border-01)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 pt-6 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-urbanist font-semibold text-[20px] text-[var(--grey-800)]",
                                children: isEditing ? 'Update Prayer Time' : 'Add Prayer Time'
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 106,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1.5 hover:bg-[var(--neutral-100)] rounded-full transition-colors cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 20 20",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M15 5L5 15M5 5l10 10",
                                        stroke: "var(--grey-800)",
                                        strokeWidth: "2",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                    lineNumber: 113,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                        lineNumber: 105,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-6 pb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block font-urbanist font-medium text-[13px] text-[var(--neutral-500)] mb-1.5",
                                        children: "Date Range"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 124,
                                        columnNumber: 25
                                    }, this),
                                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-4 py-2.5 border border-[var(--border-01)] rounded-[8px] bg-[var(--neutral-100)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 16 16",
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "1",
                                                        y: "2",
                                                        width: "14",
                                                        height: "12",
                                                        rx: "2",
                                                        stroke: "var(--neutral-500)",
                                                        strokeWidth: "1.2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M1 6h14",
                                                        stroke: "var(--neutral-500)",
                                                        strokeWidth: "1.2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M5 1v3M11 1v3",
                                                        stroke: "var(--neutral-500)",
                                                        strokeWidth: "1.2",
                                                        strokeLinecap: "round"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 129,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-urbanist text-[14px] text-[var(--grey-800)]",
                                                children: prayerTime.date
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 134,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: date,
                                        onChange: (e)=>setDate(e.target.value),
                                        className: "w-full px-4 py-2.5 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[14px] text-[var(--grey-800)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 137,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex mb-6 border-b border-[var(--border-01)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('daily'),
                                        className: `flex-1 py-3 font-urbanist font-semibold text-[14px] text-center transition-colors relative cursor-pointer
                                ${activeTab === 'daily' ? 'text-[var(--brand)]' : 'text-[var(--neutral-500)] hover:text-[var(--grey-800)]'}`,
                                        children: [
                                            "Daily Prayer",
                                            activeTab === 'daily' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand)] rounded-t-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 149,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('jumuah'),
                                        className: `flex-1 py-3 font-urbanist font-semibold text-[14px] text-center transition-colors relative cursor-pointer
                                ${activeTab === 'jumuah' ? 'text-[var(--brand)]' : 'text-[var(--neutral-500)] hover:text-[var(--grey-800)]'}`,
                                        children: [
                                            "Jumu'ah",
                                            activeTab === 'jumuah' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand)] rounded-t-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 172,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 162,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 148,
                                columnNumber: 21
                            }, this),
                            activeTab === 'daily' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-[120px_1fr_1fr] gap-4 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 182,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-urbanist font-semibold text-[12px] text-[var(--neutral-500)] uppercase tracking-wider text-center",
                                                children: "Begins"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-urbanist font-semibold text-[12px] text-[var(--neutral-500)] uppercase tracking-wider text-center",
                                                children: "Jamah"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                lineNumber: 184,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 181,
                                        columnNumber: 29
                                    }, this),
                                    PRAYER_ROWS.map(({ key, label, hasJamah })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-[120px_1fr_1fr] gap-4 py-2.5 border-b border-[var(--border-01)] items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-urbanist font-semibold text-[13px] text-[var(--brand)] uppercase",
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "time",
                                                    value: prayers[key]?.athan || '',
                                                    onChange: (e)=>handlePrayerChange(key, 'athan', e.target.value),
                                                    className: "w-full px-3 py-2 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[13px] text-[var(--grey-800)] text-center focus:outline-none focus:border-[var(--brand)] transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 37
                                                }, this),
                                                hasJamah ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "time",
                                                    value: prayers[key]?.jamah || '',
                                                    onChange: (e)=>handlePrayerChange(key, 'jamah', e.target.value),
                                                    className: "w-full px-3 py-2 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[13px] text-[var(--grey-800)] text-center focus:outline-none focus:border-[var(--brand)] transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 41
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                            lineNumber: 189,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 179,
                                columnNumber: 25
                            }, this),
                            activeTab === 'jumuah' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-urbanist text-[12px] text-[var(--neutral-500)] italic",
                                        children: "*Please note Jumu'ah prayer times are applicable for Fridays only"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 217,
                                        columnNumber: 29
                                    }, this),
                                    jumuahTimes.map((slot, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 border border-[var(--border-01)] rounded-[10px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-urbanist font-semibold text-[14px] text-[var(--brand)]",
                                                            children: [
                                                                "JUMU'AH ",
                                                                index + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 41
                                                        }, this),
                                                        jumuahTimes.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>removeJumuahSlot(index),
                                                            className: "text-[var(--error)] font-urbanist text-[12px] hover:underline cursor-pointer",
                                                            children: "Remove"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-3 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-urbanist text-[12px] text-[var(--neutral-500)] mb-1",
                                                                    children: "Begins"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 238,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "time",
                                                                    value: slot.begins || '',
                                                                    onChange: (e)=>handleJumuahChange(index, 'begins', e.target.value),
                                                                    className: "w-full px-3 py-2 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[13px] focus:outline-none focus:border-[var(--brand)]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-urbanist text-[12px] text-[var(--neutral-500)] mb-1",
                                                                    children: "Khutbah"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "time",
                                                                    value: slot.khutbah || '',
                                                                    onChange: (e)=>handleJumuahChange(index, 'khutbah', e.target.value),
                                                                    className: "w-full px-3 py-2 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[13px] focus:outline-none focus:border-[var(--brand)]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 249,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block font-urbanist text-[12px] text-[var(--neutral-500)] mb-1",
                                                                    children: "Jamah"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 258,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "time",
                                                                    value: slot.jamah || '',
                                                                    onChange: (e)=>handleJumuahChange(index, 'jamah', e.target.value),
                                                                    className: "w-full px-3 py-2 border border-[var(--border-01)] rounded-[8px] font-urbanist text-[13px] focus:outline-none focus:border-[var(--brand)]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                            lineNumber: 222,
                                            columnNumber: 33
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: addJumuahSlot,
                                        className: "w-full py-2.5 border border-dashed border-[var(--brand)] text-[var(--brand)] rounded-[8px] font-urbanist font-semibold text-[13px] hover:bg-[var(--brand-05)] transition-colors cursor-pointer",
                                        children: "+ Add Jumu'ah Slot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                        lineNumber: 271,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 216,
                                columnNumber: 25
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 font-urbanist text-[13px] text-[var(--error)]",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 283,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 font-urbanist text-[12px] italic text-[var(--neutral-500)]",
                                children: "*Whatever the changes saved, it'll automatically reflect in the Mobile App."
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 287,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end gap-3 px-6 py-5 border-t border-[var(--border-01)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                disabled: saving,
                                className: "px-8 py-2.5 border border-[var(--border-01)] text-[var(--grey-800)] rounded-[8px] font-urbanist font-semibold text-[13px] hover:bg-[var(--neutral-100)] transition-colors disabled:opacity-50 cursor-pointer",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                disabled: saving,
                                className: "px-8 py-2.5 bg-[var(--brand)] text-white rounded-[8px] font-urbanist font-semibold text-[13px] hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer",
                                children: saving ? 'Saving...' : 'Save'
                            }, void 0, false, {
                                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                                lineNumber: 302,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                        lineNumber: 293,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx",
        lineNumber: 97,
        columnNumber: 9
    }, this);
}
_s(UpdatePrayerTimeModal, "+ZdPAUwAtRkKG7HWcAThJk/IUtA=");
_c = UpdatePrayerTimeModal;
var _c;
__turbopack_context__.k.register(_c, "UpdatePrayerTimeModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(dashboard)/prayer-management/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PrayerManagementPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/prayer-times.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$prayer$2d$management$2f$UpdatePrayerTimeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/prayer-management/UpdatePrayerTimeModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
/* ── Constants ── */ const PRAYER_NAMES = [
    'fajr',
    'sunrise',
    'zuhr',
    'asr',
    'maghrib',
    'isha'
];
const PRAYER_LABELS = {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    zuhr: 'Zuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
};
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const MONTHS_SHORT = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
const DAYS_FULL = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
/* ── Helpers ── */ function formatTime12h(time24) {
    if (!time24) return '—';
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${ampm}`;
}
/** Returns time+ampm parts for Athan superscript, e.g. { time: "5:50", ampm: "AM" } */ function formatAthanParts(time24) {
    if (!time24) return null;
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return {
        time: `${hours}:${minutes}`,
        ampm
    };
}
function getDateParts(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return {
        dayFull: DAYS_FULL[d.getDay()],
        dayNum: d.getDate(),
        isFriday: d.getDay() === 5,
        monthShort: MONTHS_SHORT[d.getMonth()]
    };
}
/* ── Shared arrow SVG (Figma: "Component 1") ── */ function ChevronRight({ className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M7.5 5L12.5 10L7.5 15",
            stroke: "var(--brand)",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
            lineNumber: 73,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
        lineNumber: 72,
        columnNumber: 9
    }, this);
}
_c = ChevronRight;
function PrayerManagementPage() {
    _s();
    const [prayerTimes, setPrayerTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPrayerTime, setEditingPrayerTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().getMonth());
    const [currentYear, setCurrentYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().getFullYear());
    const todayStr = new Date().toISOString().split('T')[0];
    const todayPrayerTime = prayerTimes.find((pt)=>pt.date === todayStr);
    /* ── data fetching ── */ const fetchPrayerTimes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PrayerManagementPage.useCallback[fetchPrayerTimes]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
                const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
                const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPrayerTimes"])({
                    startDate,
                    endDate,
                    size: 31
                });
                setPrayerTimes(result.content);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load prayer times');
            } finally{
                setLoading(false);
            }
        }
    }["PrayerManagementPage.useCallback[fetchPrayerTimes]"], [
        currentMonth,
        currentYear
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrayerManagementPage.useEffect": ()=>{
            fetchPrayerTimes();
        }
    }["PrayerManagementPage.useEffect"], [
        fetchPrayerTimes
    ]);
    /* ── navigation ── */ const handlePrevMonth = ()=>{
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y)=>y - 1);
        } else {
            setCurrentMonth((m)=>m - 1);
        }
    };
    const handleNextMonth = ()=>{
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y)=>y + 1);
        } else {
            setCurrentMonth((m)=>m + 1);
        }
    };
    /* ── actions ── */ const handleDelete = async (id)=>{
        if (!confirm('Are you sure you want to delete this prayer time entry?')) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$prayer$2d$times$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePrayerTime"])(id);
            fetchPrayerTimes();
        } catch  {
            alert('Failed to delete prayer time');
        }
    };
    const handleEdit = (pt)=>{
        setEditingPrayerTime(pt);
        setShowModal(true);
    };
    const handleAddNew = ()=>{
        setEditingPrayerTime(null);
        setShowModal(true);
    };
    const handleModalClose = ()=>{
        setShowModal(false);
        setEditingPrayerTime(null);
    };
    const handleModalSuccess = ()=>{
        handleModalClose();
        fetchPrayerTimes();
    };
    /* ── determine active prayer ── */ const getActivePrayer = ()=>{
        if (!todayPrayerTime) return null;
        const now = new Date();
        const currentMin = now.getHours() * 60 + now.getMinutes();
        const order = [
            'fajr',
            'sunrise',
            'zuhr',
            'asr',
            'maghrib',
            'isha'
        ];
        let active = null;
        for (const p of order){
            const t = todayPrayerTime.prayers[p]?.jamah || todayPrayerTime.prayers[p]?.athan;
            if (t) {
                const [h, m] = t.split(':').map(Number);
                if (currentMin >= h * 60 + m) active = p;
            }
        }
        return active;
    };
    const activePrayer = getActivePrayer();
    /* ── hijri range for month header ── */ const firstHijri = prayerTimes.length > 0 ? prayerTimes[0]?.hijriDate : null;
    const lastHijri = prayerTimes.length > 1 ? prayerTimes[prayerTimes.length - 1]?.hijriDate : null;
    const hijriRange = firstHijri && lastHijri && firstHijri !== lastHijri ? `${firstHijri} - ${lastHijri}` : firstHijri || '';
    /* ═══════════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════════ */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-urbanist font-bold text-[24px] text-[#1f1f1f] leading-normal",
                        children: "Prayer Management"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 168,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleAddNew,
                        className: "flex items-center gap-2.5 h-[44px] px-6 bg-[var(--brand)] text-white rounded-[12px] font-inter font-medium text-[16px] hover:opacity-90 transition-opacity cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 20 20",
                                fill: "none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "2",
                                        y: "3",
                                        width: "16",
                                        height: "14",
                                        rx: "2",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M2 7.5h16",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 1.5v3M14 1.5v3",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10 10.5v4M8 12.5h4",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 177,
                                columnNumber: 21
                            }, this),
                            "Add Prayer Time"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 171,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                lineNumber: 167,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 items-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between w-full bg-[var(--brand-05)] px-4 py-1.5 rounded-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRight, {
                                    className: "rotate-180"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 193,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-urbanist font-semibold text-[24px] text-[var(--grey-800)] leading-normal",
                                        children: new Date().toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 25
                                    }, this),
                                    todayPrayerTime?.hijriDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-urbanist font-semibold text-[20px] text-[var(--brand)] leading-normal",
                                        children: todayPrayerTime.hijriDate
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 198,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRight, {}, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 210,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 191,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between w-full py-3",
                        children: PRAYER_NAMES.map((prayer)=>{
                            const isActive = activePrayer === prayer;
                            const data = todayPrayerTime?.prayers?.[prayer];
                            const athanParts = formatAthanParts(data?.athan);
                            const isSunrise = prayer === 'sunrise';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `
                                    flex flex-col items-center justify-center gap-2
                                    p-6 rounded-[12px] border
                                    transition-all duration-200
                                    ${isActive ? 'bg-[var(--brand)] border-[var(--brand-10)] text-white' : 'bg-[var(--brand-05)] border-[var(--brand-10)]'}
                                `,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-urbanist font-normal text-[26px] uppercase tracking-[-0.14px] leading-normal ${isActive ? 'text-white' : 'text-[var(--brand)]'}`,
                                        children: PRAYER_LABELS[prayer]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-volkhov font-bold text-[26px] leading-normal ${isActive ? 'text-white' : 'text-[var(--brand)]'}`,
                                        children: data ? formatTime12h(data.jamah || data.athan) : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-urbanist font-medium uppercase text-center leading-none ${isSunrise ? 'opacity-0' : ''} ${isActive ? 'text-white' : 'text-[#578d6d]'}`,
                                        children: athanParts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[22px]",
                                                    children: [
                                                        "Athan ",
                                                        athanParts.time
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px]",
                                                    children: athanParts.ampm
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[22px]",
                                            children: "—"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, prayer, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 224,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 216,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                lineNumber: 188,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between bg-[var(--brand-05)] h-[67px] px-4 py-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePrevMonth,
                                className: "border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRight, {
                                    className: "rotate-180"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-urbanist font-semibold text-[24px] text-[var(--grey-800)] leading-normal",
                                        children: [
                                            MONTHS[currentMonth],
                                            " ",
                                            currentYear
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 25
                                    }, this),
                                    hijriRange && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-urbanist font-semibold text-[20px] text-[var(--brand)] leading-normal",
                                        children: hijriRange
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNextMonth,
                                className: "border border-[var(--brand-50)] rounded-[8px] p-1.5 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronRight, {}, void 0, false, {
                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 289,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 border-3 border-[var(--brand)] border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                            lineNumber: 300,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 299,
                        columnNumber: 21
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-urbanist text-[var(--error)] text-[16px]",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 304,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: fetchPrayerTimes,
                                className: "mt-4 px-6 py-2.5 bg-[var(--brand)] text-white rounded-[12px] font-inter font-medium text-[16px] cursor-pointer",
                                children: "Retry"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 305,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 303,
                        columnNumber: 21
                    }, this) : prayerTimes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-urbanist text-[var(--neutral-500)] text-[16px]",
                                children: [
                                    "No prayer times found for ",
                                    MONTHS[currentMonth],
                                    " ",
                                    currentYear
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 309,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddNew,
                                className: "mt-4 px-6 py-2.5 bg-[var(--brand)] text-white rounded-[12px] font-inter font-medium text-[16px] cursor-pointer",
                                children: "Add Prayer Times"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 312,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 308,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[48px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[var(--table-white)] border-y border-[var(--border-01)] flex items-center px-4 py-3.5 w-[354px] shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-urbanist font-medium text-[16px] text-[#667085] uppercase",
                                            children: "Day"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 29
                                    }, this),
                                    PRAYER_NAMES.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[var(--table-white)] border-y border-[var(--border-01)] flex flex-1 items-center px-4 py-3.5 min-w-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-urbanist font-medium text-[16px] text-[#667085] uppercase",
                                                children: PRAYER_LABELS[p]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 37
                                            }, this)
                                        }, p, false, {
                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                            lineNumber: 322,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                lineNumber: 317,
                                columnNumber: 25
                            }, this),
                            prayerTimes.map((pt)=>{
                                const { dayFull, dayNum, monthShort } = getDateParts(pt.date);
                                const isToday = pt.date === todayStr;
                                const textColor = isToday ? 'text-[var(--grey-800)]' : 'text-[#666d80]';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-[52px] bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex shrink-0 w-[354px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-[188px] flex items-center px-4 overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-urbanist font-medium text-[16px] ${textColor} leading-normal whitespace-nowrap`,
                                                                children: [
                                                                    monthShort,
                                                                    " ",
                                                                    dayNum,
                                                                    ", ",
                                                                    dayFull
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 340,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-[145px] flex items-center justify-end px-4 overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-urbanist font-medium text-[20px] ${textColor} leading-normal`,
                                                                children: "Begins"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 345,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 41
                                                }, this),
                                                PRAYER_NAMES.map((prayer)=>{
                                                    const pData = pt.prayers[prayer];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-1 items-center px-4 min-w-0 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `font-urbanist font-medium text-[24px] ${textColor} leading-normal`,
                                                            children: formatTime12h(pData?.athan)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, prayer, false, {
                                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                            lineNumber: 337,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex h-[52px] ${isToday ? 'bg-[var(--brand)]' : 'bg-[var(--brand-10)]'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex shrink-0 w-[354px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-[188px] flex items-center px-4 overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-urbanist font-medium text-[16px] leading-normal whitespace-nowrap ${isToday ? 'text-white' : 'text-[var(--grey-800)]'}`,
                                                                children: pt.hijriDate || '—'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                                lineNumber: 369,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-[145px] flex items-center justify-end px-4 overflow-hidden",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: `font-urbanist font-medium text-[20px] leading-normal ${isToday ? 'text-white' : 'text-[var(--grey-800)]'}`,
                                                                children: "Jama'h"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                                lineNumber: 374,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 41
                                                }, this),
                                                PRAYER_NAMES.map((prayer)=>{
                                                    const pData = pt.prayers[prayer];
                                                    const isSunrise = prayer === 'sunrise';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-1 items-center px-4 min-w-0 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `font-urbanist font-medium text-[24px] leading-normal ${isSunrise ? 'opacity-0' : ''} ${isToday ? 'text-white' : 'text-[var(--grey-800)]'}`,
                                                            children: isSunrise ? '—' : formatTime12h(pData?.jamah)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, prayer, false, {
                                                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 49
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                            lineNumber: 365,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, pt.id, true, {
                                    fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 33
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                        lineNumber: 315,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                lineNumber: 264,
                columnNumber: 13
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$prayer$2d$management$2f$UpdatePrayerTimeModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                prayerTime: editingPrayerTime,
                onClose: handleModalClose,
                onSuccess: handleModalSuccess
            }, void 0, false, {
                fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
                lineNumber: 401,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(dashboard)/prayer-management/page.tsx",
        lineNumber: 164,
        columnNumber: 9
    }, this);
}
_s(PrayerManagementPage, "gtNsh1wXh6U3zwRddlu0ZZz7PV8=");
_c1 = PrayerManagementPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChevronRight");
__turbopack_context__.k.register(_c1, "PrayerManagementPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a25617a7._.js.map