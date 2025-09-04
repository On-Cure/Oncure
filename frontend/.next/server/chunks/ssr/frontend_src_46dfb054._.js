module.exports = {

"[project]/frontend/src/components/chat/ConversationList.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ConversationList)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/utils/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ConversationList({ conversations, selectedConversation, onConversationSelect, loading }) {
    const getInitials = (firstName, lastName)=>{
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };
    const containerStyles = {
        flex: 1,
        overflowY: 'auto',
        padding: '0.75rem',
        minHeight: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: '#2A3343 transparent'
    };
    const loadingStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#B8C1CF'
    };
    const emptyStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#B8C1CF',
        textAlign: 'center'
    };
    const conversationItemStyles = (isSelected, hasUnread)=>({
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: isSelected ? 'rgba(58, 134, 255, 0.15)' : 'transparent',
            border: isSelected ? '1px solid rgba(58, 134, 255, 0.4)' : hasUnread ? '1px solid rgba(255, 0, 110, 0.3)' : '1px solid transparent',
            marginBottom: '0.5rem',
            position: 'relative',
            boxShadow: isSelected ? '0 2px 8px rgba(58, 134, 255, 0.1)' : 'none'
        });
    const avatarStyles = {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3A86FF 0%, #8338EC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: '1rem',
        fontWeight: '700',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(58, 134, 255, 0.2)'
    };
    const avatarImageStyles = {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    };
    const conversationInfoStyles = {
        flex: 1,
        minWidth: 0
    };
    const nameStyles = (hasUnread)=>({
            fontSize: '1rem',
            fontWeight: hasUnread ? '600' : '500',
            color: '#FFFFFF',
            marginBottom: '0.25rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        });
    const messagePreviewStyles = (hasUnread)=>({
            fontSize: '0.875rem',
            color: hasUnread ? '#B8C1CF' : '#6C7A89',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: hasUnread ? '500' : '400'
        });
    const timestampStyles = {
        fontSize: '0.75rem',
        color: '#6C7A89',
        marginTop: '0.125rem'
    };
    const unreadBadgeStyles = {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        backgroundColor: '#FF006E',
        color: '#FFFFFF',
        fontSize: '0.75rem',
        fontWeight: '600',
        borderRadius: '50%',
        minWidth: '1.25rem',
        height: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0.25rem'
    };
    const onlineIndicatorStyles = {
        width: '1rem',
        height: '1rem',
        borderRadius: '50%',
        backgroundColor: '#06D6A0',
        border: '3px solid #1A2333',
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        boxShadow: '0 0 0 2px rgba(6, 214, 160, 0.3)'
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: containerStyles,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: loadingStyles,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '1.5rem',
                            height: '1.5rem',
                            border: '2px solid #2A3343',
                            borderTop: '2px solid #3A86FF',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            marginLeft: '0.5rem'
                        },
                        children: "Loading conversations..."
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                lineNumber: 143,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
            lineNumber: 142,
            columnNumber: 7
        }, this);
    }
    if (!conversations || conversations.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: containerStyles,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: emptyStyles,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                        style: {
                            width: '2rem',
                            height: '2rem',
                            marginBottom: '0.5rem',
                            opacity: 0.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '0.875rem'
                        },
                        children: "No conversations yet"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            opacity: 0.7
                        },
                        children: "Start a new chat to begin messaging"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                lineNumber: 161,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
            lineNumber: 160,
            columnNumber: 7
        }, this);
    }
    const formatTime = (timestamp)=>{
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        if (diffInMinutes < 1) {
            return 'now';
        } else if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)}m ago`;
        } else if (diffInHours < 24) {
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (diffInDays < 7) {
            return date.toLocaleDateString([], {
                weekday: 'short'
            });
        } else {
            return date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric'
            });
        }
    };
    const truncateMessage = (message, maxLength = 40)=>{
        if (!message) return 'No recent messages';
        return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyles,
        className: "jsx-ff161281ed666c63",
        children: [
            conversations.map((conversationInfo, index)=>{
                // Handle both old and new data structures
                const conversation = conversationInfo.user || conversationInfo;
                const unreadCount = conversationInfo.unread_count || 0;
                const lastMessage = conversationInfo.last_message || '';
                const lastMessageTime = conversationInfo.last_message_time;
                const isOnline = conversationInfo.is_online || false;
                const hasUnread = unreadCount > 0;
                const isSelected = selectedConversation?.id === conversation.id;
                // Create a unique key combining conversation ID and index to avoid duplicates
                const uniqueKey = `conversation-${conversation.id}-${index}`;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: conversationItemStyles(isSelected, hasUnread),
                    onClick: ()=>onConversationSelect(conversation),
                    onMouseEnter: (e)=>{
                        if (!isSelected) {
                            e.target.style.backgroundColor = 'rgba(184, 193, 207, 0.05)';
                        }
                    },
                    onMouseLeave: (e)=>{
                        if (!isSelected) {
                            e.target.style.backgroundColor = 'transparent';
                        }
                    },
                    className: "jsx-ff161281ed666c63",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            className: "jsx-ff161281ed666c63",
                            children: [
                                conversation.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(conversation.avatar),
                                    alt: `${conversation.first_name} ${conversation.last_name}`,
                                    style: avatarImageStyles,
                                    className: "jsx-ff161281ed666c63"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 232,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: avatarStyles,
                                    className: "jsx-ff161281ed666c63",
                                    children: getInitials(conversation.first_name, conversation.last_name)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 238,
                                    columnNumber: 17
                                }, this),
                                isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: onlineIndicatorStyles,
                                    className: "jsx-ff161281ed666c63"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 243,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: conversationInfoStyles,
                            className: "jsx-ff161281ed666c63",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: nameStyles(hasUnread),
                                    className: "jsx-ff161281ed666c63",
                                    children: [
                                        conversation.first_name,
                                        " ",
                                        conversation.last_name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: messagePreviewStyles(hasUnread),
                                    className: "jsx-ff161281ed666c63",
                                    children: truncateMessage(lastMessage)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                lastMessageTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: timestampStyles,
                                    className: "jsx-ff161281ed666c63",
                                    children: formatTime(lastMessageTime)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                                    lineNumber: 254,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this),
                        hasUnread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: unreadBadgeStyles,
                            className: "jsx-ff161281ed666c63",
                            children: unreadCount > 99 ? '99+' : unreadCount
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                            lineNumber: 262,
                            columnNumber: 15
                        }, this)
                    ]
                }, uniqueKey, true, {
                    fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
                    lineNumber: 215,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "ff161281ed666c63",
                children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/ConversationList.jsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/components/chat/MessageBubble.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MessageBubble)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/check-check.js [app-ssr] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/utils/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MessageBubble({ message, isOwn, showAvatar, showTimestamp, isGroupChat = false }) {
    const [showTime, setShowTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const formatTime = (timestamp)=>{
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = (now - date) / (1000 * 60);
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        if (diffInMinutes < 1) {
            return 'now';
        } else if (diffInMinutes < 60) {
            return `${Math.floor(diffInMinutes)}m ago`;
        } else if (diffInHours < 24) {
            return date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (diffInDays < 7) {
            return date.toLocaleDateString([], {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } else {
            return date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };
    const getInitials = (firstName, lastName)=>{
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };
    // Get sender info from message
    const sender = message.sender || {};
    const senderName = `${sender.first_name || ''} ${sender.last_name || ''}`.trim();
    const containerStyles = {
        display: 'flex',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: '0.75rem',
        marginBottom: showTimestamp ? '1rem' : '0.25rem',
        padding: '0 1rem'
    };
    const avatarStyles = {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        backgroundColor: '#3A86FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: '0.75rem',
        fontWeight: '600',
        flexShrink: 0,
        visibility: showAvatar ? 'visible' : 'hidden',
        border: '2px solid #2A3343' // Border color from style guide
    };
    const avatarImageStyles = {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        objectFit: 'cover'
    };
    const messageContainerStyles = {
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOwn ? 'flex-end' : 'flex-start'
    };
    const bubbleStyles = {
        padding: '0.75rem 1rem',
        borderRadius: isOwn ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
        backgroundColor: isOwn ? '#3A86FF' : '#2A3343',
        color: '#FFFFFF',
        fontSize: '0.95rem',
        lineHeight: '1.4',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        transition: 'all 0.2s ease',
        border: isOwn ? 'none' : '1px solid #374151',
        boxShadow: isOwn ? '0 2px 8px rgba(58, 134, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative'
    };
    const timeStyles = {
        fontSize: '0.7rem',
        color: isOwn ? 'rgba(255, 255, 255, 0.7)' : '#9CA3AF',
        marginTop: '0.25rem',
        textAlign: isOwn ? 'right' : 'left',
        fontWeight: '400'
    };
    const senderNameStyles = {
        fontSize: '0.75rem',
        color: '#3A86FF',
        fontWeight: '600',
        marginBottom: '0.25rem',
        display: isOwn ? 'none' : 'block'
    };
    const statusStyles = {
        fontSize: '0.7rem',
        color: '#6C7A89',
        marginTop: '0.25rem',
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '0.25rem'
    };
    const getMessageStatus = ()=>{
        if (!isOwn) return null;
        // For now, we'll use simple logic based on message properties
        // In a real app, you'd have proper delivery/read status from the backend
        if (message.is_read) {
            return {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                    style: {
                        width: '0.875rem',
                        height: '0.875rem'
                    }
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                    lineNumber: 131,
                    columnNumber: 15
                }, this),
                text: 'Read',
                color: '#06D6A0'
            };
        } else if (message.id) {
            return {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    style: {
                        width: '0.875rem',
                        height: '0.875rem'
                    }
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                    lineNumber: 137,
                    columnNumber: 15
                }, this),
                text: 'Delivered',
                color: '#6C7A89'
            };
        } else {
            return {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                    style: {
                        width: '0.875rem',
                        height: '0.875rem'
                    }
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                    lineNumber: 143,
                    columnNumber: 15
                }, this),
                text: 'Sent',
                color: '#6C7A89'
            };
        }
    };
    const messageStatus = getMessageStatus();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyles,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: avatarStyles,
                children: showAvatar && sender?.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(sender.avatar),
                    alt: senderName,
                    style: avatarImageStyles
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, this) : showAvatar ? getInitials(sender?.first_name, sender?.last_name) : null
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: messageContainerStyles,
                children: [
                    !isOwn && showAvatar && isGroupChat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: senderNameStyles,
                        children: senderName || 'Unknown User'
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: bubbleStyles,
                        children: message.content
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    showTimestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: timeStyles,
                        children: formatTime(message.created_at)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    isOwn && messageStatus && showTimestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            ...statusStyles,
                            color: messageStatus.color
                        },
                        children: [
                            messageStatus.icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: messageStatus.text
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/MessageBubble.jsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/components/chat/MessageInput.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MessageInput)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/smile.js [app-ssr] (ecmascript) <export default as Smile>");
'use client';
;
;
;
;
function MessageInput({ onSendMessage, onTypingChange, disabled, placeholder = "Type a message..." }) {
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showEmojiPicker, setShowEmojiPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage('');
            // Stop typing indicator
            if (isTyping && onTypingChange) {
                setIsTyping(false);
                onTypingChange(false);
            }
            // Clear typing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const handleTextareaChange = (e)=>{
        const newMessage = e.target.value;
        setMessage(newMessage);
        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        // Handle typing indicator
        if (onTypingChange) {
            if (newMessage.trim() && !isTyping) {
                setIsTyping(true);
                onTypingChange(true);
            } else if (!newMessage.trim() && isTyping) {
                setIsTyping(false);
                onTypingChange(false);
            }
            // Clear existing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            // Set new timeout to stop typing indicator
            if (newMessage.trim()) {
                typingTimeoutRef.current = setTimeout(()=>{
                    setIsTyping(false);
                    onTypingChange(false);
                }, 2000);
            }
        }
    };
    const insertEmoji = (emoji)=>{
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newMessage = message.slice(0, start) + emoji + message.slice(end);
        setMessage(newMessage);
        // Focus back to textarea and set cursor position
        setTimeout(()=>{
            textarea.focus();
            textarea.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);
    };
    const commonEmojis = [
        '😀',
        '😂',
        '😍',
        '🥰',
        '😊',
        '😎',
        '🤔',
        '😢',
        '😮',
        '👍',
        '👎',
        '❤️',
        '🔥',
        '💯',
        '🎉',
        '👏'
    ];
    const containerStyles = {
        padding: '1rem 1.5rem',
        borderTop: '1px solid #2A3343',
        backgroundColor: '#1A2333'
    };
    const formStyles = {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '0.75rem',
        position: 'relative'
    };
    const inputContainerStyles = {
        flex: 1,
        position: 'relative',
        backgroundColor: '#0F1624',
        borderRadius: '1.5rem',
        border: '1px solid #2A3343',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0.75rem 1rem',
        transition: 'border-color 0.2s'
    };
    const textareaStyles = {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#FFFFFF',
        fontSize: '0.875rem',
        lineHeight: '1.4',
        resize: 'none',
        minHeight: '1.4em',
        maxHeight: '120px',
        fontFamily: 'inherit',
        '::placeholder': {
            color: '#6C7A89'
        }
    };
    const emojiButtonStyles = {
        color: '#B8C1CF',
        padding: '0.25rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'color 0.2s',
        marginLeft: '0.5rem'
    };
    const sendButtonStyles = {
        backgroundColor: disabled ? '#2A3343' : '#3A86FF',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '50%',
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        flexShrink: 0
    };
    const emojiPickerStyles = {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: '0.5rem',
        backgroundColor: '#1A2333',
        border: '1px solid #2A3343',
        borderRadius: '0.75rem',
        padding: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '0.5rem',
        maxWidth: '280px'
    };
    const emojiItemStyles = {
        fontSize: '1.25rem',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        textAlign: 'center',
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        lineHeight: 1,
        border: 'none',
        backgroundColor: 'transparent'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyles,
        className: "jsx-a6169c0bc177cbd5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                style: formStyles,
                className: "jsx-a6169c0bc177cbd5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            ...inputContainerStyles,
                            borderColor: message.trim() ? '#3A86FF' : '#2A3343'
                        },
                        className: "jsx-a6169c0bc177cbd5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ref: textareaRef,
                                value: message,
                                onChange: handleTextareaChange,
                                onKeyPress: handleKeyPress,
                                placeholder: placeholder,
                                disabled: disabled,
                                style: textareaStyles,
                                rows: 1,
                                className: "jsx-a6169c0bc177cbd5"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowEmojiPicker(!showEmojiPicker),
                                style: emojiButtonStyles,
                                onMouseEnter: (e)=>e.target.style.color = '#3A86FF',
                                onMouseLeave: (e)=>e.target.style.color = '#B8C1CF',
                                className: "jsx-a6169c0bc177cbd5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: disabled || !message.trim(),
                        style: sendButtonStyles,
                        onMouseEnter: (e)=>{
                            if (!disabled && message.trim()) {
                                e.target.style.backgroundColor = '#2D6FD9';
                            }
                        },
                        onMouseLeave: (e)=>{
                            if (!disabled && message.trim()) {
                                e.target.style.backgroundColor = '#3A86FF';
                            }
                        },
                        className: "jsx-a6169c0bc177cbd5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            style: {
                                width: '1.25rem',
                                height: '1.25rem'
                            }
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    showEmojiPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: emojiPickerStyles,
                        className: "jsx-a6169c0bc177cbd5",
                        children: commonEmojis.map((emoji, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    insertEmoji(emoji);
                                    setShowEmojiPicker(false);
                                },
                                style: emojiItemStyles,
                                onMouseEnter: (e)=>e.target.style.backgroundColor = 'rgba(58, 134, 255, 0.1)',
                                onMouseLeave: (e)=>e.target.style.backgroundColor = 'transparent',
                                className: "jsx-a6169c0bc177cbd5",
                                children: emoji
                            }, index, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "a6169c0bc177cbd5",
                children: "textarea.jsx-a6169c0bc177cbd5::placeholder{color:#6c7a89}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/MessageInput.jsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/components/chat/MessageArea.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MessageArea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/hooks/useAuth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/MessageBubble.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/MessageInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/utils/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function MessageArea({ conversation, currentUser, onMessagesRead }) {
    const [messageList, setMessageList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isOnline, setIsOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typingTimeout, setTypingTimeout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { websocket } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Fetch messages when conversation changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (conversation) {
            fetchMessages();
            markMessagesAsRead();
        }
    }, [
        conversation
    ]);
    // Listen for new messages and status updates via WebSocket
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (websocket) {
            const handleMessage = (event)=>{
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'private_message' && data.message) {
                        const message = data.message;
                        // Only add message if it's for this conversation
                        // Handle both receiver_id and recipient_id for compatibility
                        const receiverId = message.receiver_id || message.recipient_id;
                        // Convert to numbers for comparison to avoid type mismatches
                        const senderId = parseInt(message.sender_id);
                        const recipientId = parseInt(receiverId);
                        const conversationId = parseInt(conversation.id);
                        const userId = parseInt(currentUser.id);
                        if (senderId === conversationId && recipientId === userId || senderId === userId && recipientId === conversationId) {
                            // Handle message updates and avoid duplicates
                            setMessageList((prev)=>{
                                // Check if this is replacing an optimistic message
                                const optimisticIndex = prev.findIndex((existingMsg)=>existingMsg.id.toString().startsWith('temp-') && existingMsg.content === message.content && parseInt(existingMsg.sender_id) === senderId);
                                if (optimisticIndex !== -1) {
                                    // Replace optimistic message with real one
                                    const newList = [
                                        ...prev
                                    ];
                                    newList[optimisticIndex] = message;
                                    return newList;
                                }
                                // Check if message already exists (by ID)
                                const messageExists = prev.some((existingMsg)=>parseInt(existingMsg.id) === parseInt(message.id));
                                if (messageExists) {
                                    return prev;
                                }
                                return [
                                    ...prev,
                                    message
                                ];
                            });
                            scrollToBottom();
                            // Mark as read if it's from the other user
                            if (senderId === conversationId) {
                                markMessagesAsRead();
                            }
                        }
                    } else if (data.type === 'user_online_status') {
                        // Handle online status updates
                        if (parseInt(data.user_id) === parseInt(conversation.id)) {
                            setIsOnline(data.is_online);
                        }
                    } else if (data.type === 'typing_indicator') {
                        // Handle typing indicators
                        if (parseInt(data.user_id) === parseInt(conversation.id) && parseInt(data.recipient_id) === parseInt(currentUser.id)) {
                            setIsTyping(data.is_typing);
                            // Clear typing indicator after 3 seconds
                            if (data.is_typing) {
                                if (typingTimeout) clearTimeout(typingTimeout);
                                const timeout = setTimeout(()=>setIsTyping(false), 3000);
                                setTypingTimeout(timeout);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };
            websocket.addEventListener('message', handleMessage);
            return ()=>{
                websocket.removeEventListener('message', handleMessage);
                if (typingTimeout) clearTimeout(typingTimeout);
            };
        }
    }, [
        websocket,
        conversation,
        currentUser,
        typingTimeout
    ]);
    // Auto-scroll to bottom when new messages arrive
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        scrollToBottom();
    }, [
        messageList
    ]);
    // Clear typing indicator when conversation changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsTyping(false);
        if (typingTimeout) clearTimeout(typingTimeout);
    }, [
        conversation.id
    ]);
    const fetchMessages = async ()=>{
        try {
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"].getMessages(conversation.id);
            setMessageList(data || []);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            setMessageList([]);
        } finally{
            setLoading(false);
        }
    };
    const markMessagesAsRead = async ()=>{
        // Add validation to prevent unnecessary API calls
        if (!conversation?.id || !currentUser?.id) {
            console.warn('Cannot mark messages as read: missing conversation or user ID');
            return;
        }
        try {
            console.log('Marking messages as read for conversation:', conversation.id); // Debug log
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"].markAsRead(conversation.id);
            console.log('Mark as read response:', response); // Debug log
            // Notify parent component that messages were read
            if (onMessagesRead) {
                onMessagesRead(conversation.id);
            }
        } catch (error) {
            console.error('Failed to mark messages as read for conversation:', conversation.id);
            console.error('Error details:', error.message);
            console.error('Full error:', error);
        }
    };
    const handleSendMessage = async (content)=>{
        if (!content.trim()) return;
        // Create optimistic message for immediate UI feedback
        const optimisticMessage = {
            id: `temp-${Date.now()}`,
            content: content.trim(),
            sender_id: currentUser.id,
            recipient_id: conversation.id,
            created_at: new Date().toISOString(),
            is_read: false,
            sender: currentUser
        };
        try {
            setSending(true);
            // Stop typing indicator when message is sent
            sendTypingIndicator(false);
            // Add optimistic message immediately
            setMessageList((prev)=>[
                    ...prev,
                    optimisticMessage
                ]);
            scrollToBottom();
            // Send message to backend
            await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"].sendMessage(conversation.id, content.trim());
        // The real message will come via WebSocket and replace the optimistic one
        } catch (error) {
            console.error('Failed to send message:', error);
            // Remove optimistic message on error
            setMessageList((prev)=>prev.filter((msg)=>msg.id !== optimisticMessage.id));
        // You could show an error toast here
        } finally{
            setSending(false);
        }
    };
    const sendTypingIndicator = (isTyping)=>{
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            const typingData = {
                type: 'typing_indicator',
                user_id: currentUser.id,
                recipient_id: conversation.id,
                is_typing: isTyping
            };
            websocket.send(JSON.stringify(typingData));
        }
    };
    const handleInputChange = (isTyping)=>{
        sendTypingIndicator(isTyping);
    };
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    const getInitials = (firstName, lastName)=>{
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };
    // Responsive header styles
    const getHeaderStyles = ()=>{
        const baseStyles = {
            padding: '1rem',
            borderBottom: '1px solid #2A3343',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: '#2A3343',
            minHeight: '80px'
        };
        // Responsive adjustments
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return baseStyles;
    };
    const headerStyles = getHeaderStyles();
    // Responsive avatar and user info styles
    const getResponsiveStyles = ()=>{
        const isSmallScreen = "undefined" !== 'undefined' && window.innerWidth <= 640;
        const isMediumScreen = "undefined" !== 'undefined' && window.innerWidth <= 1024;
        return {
            avatarStyles: {
                width: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '2.5rem',
                height: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '2.5rem',
                borderRadius: '50%',
                backgroundColor: '#3A86FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '0.875rem',
                fontWeight: '600',
                position: 'relative'
            },
            avatarImageStyles: {
                width: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '2.5rem',
                height: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '2.5rem',
                borderRadius: '50%',
                objectFit: 'cover'
            },
            userInfoStyles: {
                flex: 1,
                minWidth: 0
            },
            nameStyles: {
                fontSize: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '1.125rem',
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: '0.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'nowrap'
            },
            statusStyles: {
                fontSize: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : '0.875rem',
                color: '#B8C1CF'
            }
        };
    };
    const responsiveStyles = getResponsiveStyles();
    const { avatarStyles, avatarImageStyles, userInfoStyles, nameStyles, statusStyles } = responsiveStyles;
    const messagesContainerStyles = {
        flex: 1,
        overflowY: 'auto',
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1A2333' // Plain chat background - no pattern
    };
    const loadingStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: '#B8C1CF'
    };
    const emptyStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: '#B8C1CF',
        textAlign: 'center'
    };
    // If this is a message request, block replying until accepted
    const isRequest = conversation.is_request;
    // Accept message request handler
    const handleAcceptRequest = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"].acceptMessageRequest(conversation.user.id);
            window.location.reload(); // Reload to update conversation state
        } catch (err) {
            alert('Failed to accept message request.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        className: "jsx-ff161281ed666c63",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: headerStyles,
                className: "jsx-ff161281ed666c63",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative'
                        },
                        className: "jsx-ff161281ed666c63",
                        children: [
                            conversation.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(conversation.avatar),
                                alt: `${conversation.first_name} ${conversation.last_name}`,
                                style: avatarImageStyles,
                                className: "jsx-ff161281ed666c63"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: avatarStyles,
                                className: "jsx-ff161281ed666c63",
                                children: getInitials(conversation.first_name, conversation.last_name)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this),
                            isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ff161281ed666c63" + " " + "absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 border-2 border-surface z-10"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: userInfoStyles,
                        className: "jsx-ff161281ed666c63",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: nameStyles,
                                className: "jsx-ff161281ed666c63",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            flex: 1
                                        },
                                        className: "jsx-ff161281ed666c63",
                                        children: [
                                            conversation.first_name,
                                            " ",
                                            conversation.last_name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                        lineNumber: 371,
                                        columnNumber: 13
                                    }, this),
                                    isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-ff161281ed666c63" + " " + "inline-flex items-center text-xs sm:text-sm text-green-500 font-medium flex-shrink-0",
                                        children: "• online"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: statusStyles,
                                className: "jsx-ff161281ed666c63",
                                children: isTyping && conversation.id === conversation.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#06D6A0',
                                        fontStyle: 'italic'
                                    },
                                    className: "jsx-ff161281ed666c63",
                                    children: "typing..."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-ff161281ed666c63",
                                    children: conversation.nickname ? `@${conversation.nickname}` : ''
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                    lineNumber: 391,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                        lineNumber: 369,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            color: '#B8C1CF',
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.2s'
                        },
                        className: "jsx-ff161281ed666c63",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                            style: {
                                width: '1.25rem',
                                height: '1.25rem'
                            }
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                lineNumber: 348,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: messagesContainerStyles,
                className: "jsx-ff161281ed666c63",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: loadingStyles,
                    className: "jsx-ff161281ed666c63",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '1.5rem',
                                height: '1.5rem',
                                border: '2px solid #2A3343',
                                borderTop: '2px solid #3A86FF',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            },
                            className: "jsx-ff161281ed666c63"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 412,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                marginLeft: '0.5rem'
                            },
                            className: "jsx-ff161281ed666c63",
                            children: "Loading messages..."
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                    lineNumber: 411,
                    columnNumber: 11
                }, this) : messageList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: emptyStyles,
                    className: "jsx-ff161281ed666c63",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                            style: {
                                width: '3rem',
                                height: '3rem',
                                marginBottom: '1rem',
                                opacity: 0.3
                            }
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 424,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem',
                                color: '#FFFFFF'
                            },
                            className: "jsx-ff161281ed666c63",
                            children: "No messages yet"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 425,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '0.875rem'
                            },
                            className: "jsx-ff161281ed666c63",
                            children: "Start the conversation by sending a message below"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 428,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                    lineNumber: 423,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        messageList.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageBubble$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                message: message,
                                isOwn: message.sender_id === currentUser.id,
                                showAvatar: index === 0 || messageList[index - 1].sender_id !== message.sender_id,
                                showTimestamp: index === messageList.length - 1 || messageList[index + 1].sender_id !== message.sender_id || new Date(messageList[index + 1].created_at).getTime() - new Date(message.created_at).getTime() > 300000 // 5 minutes
                            }, `message-${message.id || `temp-${index}`}`, false, {
                                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                                lineNumber: 435,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: messagesEndRef,
                            className: "jsx-ff161281ed666c63"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                            lineNumber: 451,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                lineNumber: 409,
                columnNumber: 7
            }, this),
            isRequest ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '1.5rem',
                    textAlign: 'center',
                    color: '#B8C1CF',
                    background: 'rgba(58,134,255,0.05)',
                    borderRadius: '0.75rem',
                    margin: '1rem 0'
                },
                className: "jsx-ff161281ed666c63",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginBottom: '1rem'
                        },
                        className: "jsx-ff161281ed666c63",
                        children: "This is a message request. Accept to reply."
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            background: '#3A86FF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem'
                        },
                        onClick: handleAcceptRequest,
                        className: "jsx-ff161281ed666c63",
                        children: "Accept Message Request"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                        lineNumber: 467,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                lineNumber: 458,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onSendMessage: handleSendMessage,
                onTypingChange: handleInputChange,
                disabled: sending,
                placeholder: `Message ${conversation.first_name}...`
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
                lineNumber: 484,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "ff161281ed666c63",
                children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/MessageArea.jsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/components/chat/UserSelector.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>UserSelector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/utils/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function UserSelector({ onUserSelect, onClose }) {
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [suggestedUsers, setSuggestedUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [onlineUsers, setOnlineUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchUsers();
    }, []);
    const fetchUsers = async ()=>{
        try {
            setLoading(true);
            const [suggested, online] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["users"].getSuggestedUsers(),
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["users"].getOnlineUsers()
            ]);
            setSuggestedUsers(suggested || []);
            setOnlineUsers(online || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setSuggestedUsers([]);
            setOnlineUsers([]);
        } finally{
            setLoading(false);
        }
    };
    const getInitials = (firstName, lastName)=>{
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };
    // Only filter by search term; backend enforces privacy
    const filteredSuggestedUsers = suggestedUsers.filter((user)=>`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) || user.nickname && user.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredOnlineUsers = onlineUsers.filter((user)=>`${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) || user.nickname && user.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    const overlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem'
    };
    const modalStyles = {
        backgroundColor: '#1A2333',
        borderRadius: '1rem',
        border: '1px solid #2A3343',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    };
    const headerStyles = {
        padding: '1.5rem',
        borderBottom: '1px solid #2A3343',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };
    const titleStyles = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif"
    };
    const closeButtonStyles = {
        color: '#B8C1CF',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    };
    const searchContainerStyles = {
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #2A3343'
    };
    const searchInputContainerStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };
    const searchInputStyles = {
        width: '100%',
        backgroundColor: '#0F1624',
        border: '1px solid #2A3343',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem 0.75rem 2.5rem',
        color: '#FFFFFF',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };
    const searchIconStyles = {
        position: 'absolute',
        left: '0.75rem',
        color: '#6C7A89',
        width: '1.25rem',
        height: '1.25rem'
    };
    const contentStyles = {
        flex: 1,
        overflowY: 'auto',
        padding: '1rem 1.5rem'
    };
    const sectionStyles = {
        marginBottom: '1.5rem'
    };
    const sectionTitleStyles = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#B8C1CF',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };
    const userListStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    };
    const userItemStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        border: '1px solid transparent'
    };
    const avatarStyles = {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        backgroundColor: '#3A86FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: '0.875rem',
        fontWeight: '600',
        flexShrink: 0
    };
    const avatarImageStyles = {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        objectFit: 'cover'
    };
    const userInfoStyles = {
        flex: 1,
        minWidth: 0
    };
    const nameStyles = {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#FFFFFF',
        marginBottom: '0.125rem'
    };
    const usernameStyles = {
        fontSize: '0.875rem',
        color: '#B8C1CF'
    };
    const onlineIndicatorStyles = {
        width: '0.5rem',
        height: '0.5rem',
        borderRadius: '50%',
        backgroundColor: '#06D6A0'
    };
    const emptyStyles = {
        textAlign: 'center',
        color: '#6C7A89',
        fontSize: '0.875rem',
        padding: '1rem'
    };
    const loadingStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#B8C1CF'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: overlayStyles,
        onClick: onClose,
        className: "jsx-ff161281ed666c63",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: modalStyles,
                onClick: (e)=>e.stopPropagation(),
                className: "jsx-ff161281ed666c63",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: headerStyles,
                        className: "jsx-ff161281ed666c63",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: titleStyles,
                                className: "jsx-ff161281ed666c63",
                                children: "Start New Chat"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: closeButtonStyles,
                                onMouseEnter: (e)=>e.target.style.backgroundColor = 'rgba(184, 193, 207, 0.1)',
                                onMouseLeave: (e)=>e.target.style.backgroundColor = 'transparent',
                                className: "jsx-ff161281ed666c63",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    style: {
                                        width: '1.25rem',
                                        height: '1.25rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: searchContainerStyles,
                        className: "jsx-ff161281ed666c63",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: searchInputContainerStyles,
                            className: "jsx-ff161281ed666c63",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    style: searchIconStyles
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 246,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search users...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    style: searchInputStyles,
                                    onFocus: (e)=>e.target.style.borderColor = '#3A86FF',
                                    onBlur: (e)=>e.target.style.borderColor = '#2A3343',
                                    className: "jsx-ff161281ed666c63"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: contentStyles,
                        className: "jsx-ff161281ed666c63",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: loadingStyles,
                            className: "jsx-ff161281ed666c63",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '1.5rem',
                                        height: '1.5rem',
                                        border: '2px solid #2A3343',
                                        borderTop: '2px solid #3A86FF',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    },
                                    className: "jsx-ff161281ed666c63"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        marginLeft: '0.5rem'
                                    },
                                    className: "jsx-ff161281ed666c63",
                                    children: "Loading users..."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                filteredOnlineUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: sectionStyles,
                                    className: "jsx-ff161281ed666c63",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: sectionTitleStyles,
                                            className: "jsx-ff161281ed666c63",
                                            children: "Online Now"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: userListStyles,
                                            className: "jsx-ff161281ed666c63",
                                            children: filteredOnlineUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: userItemStyles,
                                                    onClick: ()=>onUserSelect(user),
                                                    onMouseEnter: (e)=>{
                                                        e.target.style.backgroundColor = 'rgba(58, 134, 255, 0.1)';
                                                        e.target.style.borderColor = 'rgba(58, 134, 255, 0.3)';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.target.style.backgroundColor = 'transparent';
                                                        e.target.style.borderColor = 'transparent';
                                                    },
                                                    className: "jsx-ff161281ed666c63",
                                                    children: [
                                                        user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(user.avatar),
                                                            alt: `${user.first_name} ${user.last_name}`,
                                                            style: avatarImageStyles,
                                                            className: "jsx-ff161281ed666c63"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 295,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: avatarStyles,
                                                            className: "jsx-ff161281ed666c63",
                                                            children: getInitials(user.first_name, user.last_name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 301,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: userInfoStyles,
                                                            className: "jsx-ff161281ed666c63",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: nameStyles,
                                                                    className: "jsx-ff161281ed666c63",
                                                                    children: [
                                                                        user.first_name,
                                                                        " ",
                                                                        user.last_name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                                    lineNumber: 307,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: usernameStyles,
                                                                    className: "jsx-ff161281ed666c63",
                                                                    children: user.nickname ? `@${user.nickname}` : 'Online'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                                    lineNumber: 310,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 306,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: onlineIndicatorStyles,
                                                            className: "jsx-ff161281ed666c63"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 315,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, user.id, true, {
                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                    lineNumber: 281,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 279,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 277,
                                    columnNumber: 17
                                }, this),
                                filteredSuggestedUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: sectionStyles,
                                    className: "jsx-ff161281ed666c63",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: sectionTitleStyles,
                                            className: "jsx-ff161281ed666c63",
                                            children: "Suggested"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 325,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: userListStyles,
                                            className: "jsx-ff161281ed666c63",
                                            children: filteredSuggestedUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: userItemStyles,
                                                    onClick: ()=>onUserSelect(user),
                                                    onMouseEnter: (e)=>{
                                                        e.target.style.backgroundColor = 'rgba(58, 134, 255, 0.1)';
                                                        e.target.style.borderColor = 'rgba(58, 134, 255, 0.3)';
                                                    },
                                                    onMouseLeave: (e)=>{
                                                        e.target.style.backgroundColor = 'transparent';
                                                        e.target.style.borderColor = 'transparent';
                                                    },
                                                    className: "jsx-ff161281ed666c63",
                                                    children: [
                                                        user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$utils$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getImageUrl"])(user.avatar),
                                                            alt: `${user.first_name} ${user.last_name}`,
                                                            style: avatarImageStyles,
                                                            className: "jsx-ff161281ed666c63"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 342,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: avatarStyles,
                                                            className: "jsx-ff161281ed666c63",
                                                            children: getInitials(user.first_name, user.last_name)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 348,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: userInfoStyles,
                                                            className: "jsx-ff161281ed666c63",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: nameStyles,
                                                                    className: "jsx-ff161281ed666c63",
                                                                    children: [
                                                                        user.first_name,
                                                                        " ",
                                                                        user.last_name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                                    lineNumber: 354,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: usernameStyles,
                                                                    className: "jsx-ff161281ed666c63",
                                                                    children: user.nickname ? `@${user.nickname}` : 'User'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                                    lineNumber: 357,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                            lineNumber: 353,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, user.id, true, {
                                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                                    lineNumber: 328,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 326,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this),
                                !loading && filteredOnlineUsers.length === 0 && filteredSuggestedUsers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: emptyStyles,
                                    className: "jsx-ff161281ed666c63",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            style: {
                                                width: '3rem',
                                                height: '3rem',
                                                margin: '0 auto 1rem',
                                                opacity: 0.3
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 370,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-ff161281ed666c63",
                                            children: searchTerm ? 'No users found matching your search.' : 'No users available to chat with.'
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                            lineNumber: 371,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                                    lineNumber: 369,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "ff161281ed666c63",
                children: "@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/UserSelector.jsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/components/chat/ChatInterface.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatInterface)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/hooks/useAuth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$ConversationList$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/ConversationList.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageArea$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/MessageArea.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$UserSelector$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/UserSelector.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
'use client';
;
;
;
;
;
;
;
;
function ChatInterface() {
    const { user, websocket } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$hooks$2f$useAuth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedConversation, setSelectedConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showUserSelector, setShowUserSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Fetch conversations on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            fetchConversations();
        }
    }, [
        user
    ]);
    // Listen for new messages via WebSocket to update conversation list
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (websocket && user) {
            const handleMessage = (event)=>{
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'private_message' && data.message) {
                        const message = data.message;
                        // Update conversation list with new message
                        setConversations((prev)=>{
                            return prev.map((conv)=>{
                                const convUser = conv.user || conv;
                                // If this message is for this conversation
                                if (message.sender_id === convUser.id && message.recipient_id === user.id || message.sender_id === user.id && message.recipient_id === convUser.id) {
                                    // Only increment unread count if message is from other user and conversation is not selected
                                    const shouldIncrementUnread = message.sender_id === convUser.id && (!selectedConversation || selectedConversation.id !== convUser.id);
                                    return {
                                        ...conv,
                                        last_message: message.content,
                                        last_message_time: message.created_at,
                                        unread_count: shouldIncrementUnread ? (conv.unread_count || 0) + 1 : conv.unread_count || 0
                                    };
                                }
                                return conv;
                            });
                        });
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message in ChatInterface:', error);
                }
            };
            websocket.addEventListener('message', handleMessage);
            return ()=>{
                websocket.removeEventListener('message', handleMessage);
            };
        }
    }, [
        websocket,
        user,
        selectedConversation
    ]);
    const fetchConversations = async ()=>{
        try {
            setLoading(true);
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"].getConversations();
            setConversations(data || []);
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            setConversations([]);
        } finally{
            setLoading(false);
        }
    };
    const handleConversationSelect = (conversation)=>{
        // Handle both old and new data structures
        const actualConversation = conversation.user || conversation;
        setSelectedConversation(actualConversation);
        setShowUserSelector(false);
        // Immediately update the conversation list to remove unread indicators
        setConversations((prev)=>prev.map((conv)=>{
                const convUser = conv.user || conv;
                return convUser.id === actualConversation.id ? {
                    ...conv,
                    unread_count: 0
                } : conv;
            }));
    };
    const handleNewConversation = (selectedUser)=>{
        // Create a new conversation object
        const newConversation = {
            id: selectedUser.id,
            first_name: selectedUser.first_name,
            last_name: selectedUser.last_name,
            avatar: selectedUser.avatar,
            nickname: selectedUser.nickname
        };
        setSelectedConversation(newConversation);
        setShowUserSelector(false);
        // Add to conversations list if not already there
        const exists = conversations.find((conv)=>conv.id === selectedUser.id);
        if (!exists) {
            setConversations((prev)=>[
                    newConversation,
                    ...prev
                ]);
        }
    };
    const handleMessagesRead = (conversationId)=>{
        // Update conversation list to remove unread count
        setConversations((prev)=>prev.map((conv)=>{
                const convUser = conv.user || conv;
                return convUser.id === conversationId ? {
                    ...conv,
                    unread_count: 0
                } : conv;
            }));
    };
    // Responsive container - matching group chat styling
    const containerStyles = {
        height: '100%',
        backgroundColor: '#1A2333',
        borderRadius: '0.75rem',
        border: '1px solid #2A3343',
        display: 'flex',
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        flexDirection: 'row',
        minHeight: 0
    };
    // Responsive sidebar
    const sidebarStyles = {
        width: '100%',
        maxWidth: 360,
        minWidth: 320,
        borderRight: '1px solid #2A3343',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1A2333',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
    };
    const sidebarHeaderStyles = {
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid #2A3343',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(58, 134, 255, 0.1) 0%, rgba(131, 56, 236, 0.1) 100%)',
        backdropFilter: 'blur(10px)'
    };
    const titleStyles = {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-0.025em'
    };
    const newChatButtonStyles = {
        backgroundColor: '#3A86FF',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '0.75rem',
        padding: '0.625rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(58, 134, 255, 0.2)',
        ':hover': {
            backgroundColor: '#2D6FD9',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(58, 134, 255, 0.3)'
        }
    };
    // Responsive main area
    const mainAreaStyles = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0F1624',
        minWidth: 0,
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        borderRadius: '0 1rem 1rem 0'
    };
    const emptyStateStyles = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#B8C1CF',
        textAlign: 'center',
        padding: '2rem'
    };
    const emptyIconStyles = {
        width: '4rem',
        height: '4rem',
        marginBottom: '1rem',
        opacity: 0.5
    };
    const emptyTitleStyles = {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#FFFFFF'
    };
    const emptyDescriptionStyles = {
        fontSize: '1rem',
        color: '#B8C1CF',
        marginBottom: '2rem'
    };
    const startChatButtonStyles = {
        backgroundColor: '#3A86FF',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };
    // Responsive design for different screen sizes
    const getScreenSize = ()=>{
        if ("TURBOPACK compile-time truthy", 1) return 'desktop';
        "TURBOPACK unreachable";
        const width = undefined;
    };
    const screenSize = getScreenSize();
    // Apply responsive styles
    if (screenSize === 'mobile') {
        // Mobile phones (≤640px)
        containerStyles.flexDirection = 'column';
        containerStyles.height = '100vh';
        containerStyles.borderRadius = 0;
        containerStyles.margin = 0;
        sidebarStyles.width = '100%';
        sidebarStyles.maxWidth = '100%';
        sidebarStyles.height = '40%';
        sidebarStyles.borderRight = 'none';
        sidebarStyles.borderBottom = '1px solid #2A3343';
        mainAreaStyles.width = '100%';
        mainAreaStyles.maxWidth = '100%';
        mainAreaStyles.height = '60%';
        mainAreaStyles.borderRadius = 0;
    } else if (screenSize === 'tablet') {
        // Tablets/iPads (641px - 1024px)
        containerStyles.flexDirection = 'row';
        containerStyles.height = '100%';
        sidebarStyles.width = '35%';
        sidebarStyles.minWidth = '300px';
        sidebarStyles.maxWidth = '400px';
        mainAreaStyles.width = '65%';
        mainAreaStyles.flex = 1;
    } else {
        // Desktop/Laptops (>1024px)
        containerStyles.flexDirection = 'row';
        containerStyles.height = '100%';
        sidebarStyles.width = '30%';
        sidebarStyles.minWidth = '320px';
        sidebarStyles.maxWidth = '380px';
        mainAreaStyles.width = '70%';
        mainAreaStyles.flex = 1;
    }
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: containerStyles,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: emptyStateStyles,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                        style: emptyIconStyles
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                        lineNumber: 320,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: emptyTitleStyles,
                        children: "Please log in to access messages"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                lineNumber: 319,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
            lineNumber: 318,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: containerStyles,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: sidebarStyles,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: sidebarHeaderStyles,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: titleStyles,
                                children: "Conversations"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: newChatButtonStyles,
                                onClick: ()=>setShowUserSelector(true),
                                onMouseEnter: (e)=>e.target.style.backgroundColor = '#2D6FD9',
                                onMouseLeave: (e)=>e.target.style.backgroundColor = '#3A86FF',
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        style: {
                                            width: '1rem',
                                            height: '1rem'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this),
                                    "New"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$ConversationList$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        conversations: conversations,
                        selectedConversation: selectedConversation,
                        onConversationSelect: handleConversationSelect,
                        loading: loading
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: mainAreaStyles,
                children: selectedConversation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$MessageArea$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    conversation: selectedConversation,
                    currentUser: user,
                    onMessagesRead: handleMessagesRead
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                    lineNumber: 355,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: emptyStateStyles,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                            style: emptyIconStyles
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                            lineNumber: 362,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: emptyTitleStyles,
                            children: "Select a conversation"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                            lineNumber: 363,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: emptyDescriptionStyles,
                            children: "Choose a conversation from the sidebar or start a new one"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: startChatButtonStyles,
                            onClick: ()=>setShowUserSelector(true),
                            onMouseEnter: (e)=>e.target.style.backgroundColor = '#2D6FD9',
                            onMouseLeave: (e)=>e.target.style.backgroundColor = '#3A86FF',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    style: {
                                        width: '1rem',
                                        height: '1rem'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this),
                                "Start New Chat"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                    lineNumber: 361,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            showUserSelector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$UserSelector$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onUserSelect: handleNewConversation,
                onClose: ()=>setShowUserSelector(false)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
                lineNumber: 382,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/ChatInterface.jsx",
        lineNumber: 328,
        columnNumber: 5
    }, this);
}
}}),
"[project]/frontend/src/app/chat/chat.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "chat-page-container": "chat-module__xCzTYq__chat-page-container",
  "chat-page-content": "chat-module__xCzTYq__chat-page-content",
  "chat-page-inner": "chat-module__xCzTYq__chat-page-inner",
  "chat-page-title": "chat-module__xCzTYq__chat-page-title",
});
}}),
"[project]/frontend/src/app/chat/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/Layout.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$ChatInterface$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/chat/ChatInterface.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chat$2f$chat$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/src/app/chat/chat.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
function ChatPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$Layout$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "chat-page-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "chat-page-title",
                    children: "Messages"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chat/page.js",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "chat-page-content",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "chat-page-inner",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$chat$2f$ChatInterface$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/frontend/src/app/chat/page.js",
                            lineNumber: 14,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chat/page.js",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chat/page.js",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/chat/page.js",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/chat/page.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=frontend_src_46dfb054._.js.map