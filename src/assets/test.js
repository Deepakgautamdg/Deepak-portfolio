; (function (window, document) {
	// === CONFIGURATION ===
	const RUM_ENDPOINT = "https://dev.exsete.com/syrn_as_service_backend/rum/rum";

	// Extract PROJECT_KEY from <script> tag. This Project key is unique per Customer
	let PROJECT_KEY = "YOUR_PROJECT_KEY"; // default fallback
	try {
		const currentScript = document.currentScript || (function () {
			const scripts = document.getElementsByTagName('script');
			return scripts[scripts.length - 1];
		})();
		const params = new URLSearchParams(currentScript.src.split('?')[1]);
		if (params.has('key')) {
			PROJECT_KEY = params.get('key');
		}
	} catch (e) {
		console.warn("Could not read project key from script tag:", e);
	}

	// Generate or reuse a visitor ID (cookie/localStorage)
	function getVisitorId() {
		try {
			let id = localStorage.getItem("visitor_id");
			if (!id) {
				id = crypto.randomUUID();
				localStorage.setItem("visitor_id", id);
			}
			return id;
		} catch (e) {
			return crypto.randomUUID();
		}
	}

		// Session handling (new session after 30 mins inactivity)
	function getSessionId() {
		const now = Date.now();
		let session = JSON.parse(sessionStorage.getItem("rum_session") || "null");

		if (!session || now - session.lastActivity > 30 * 60 * 1000) {
		// Start new session
		session = { id: crypto.randomUUID(), lastActivity: now };
		} else {
		session.lastActivity = now;
		}

		sessionStorage.setItem("rum_session", JSON.stringify(session));
		return session.id;
	}


	// === HELPER: Device & Environment Information ===
	function getEnvironmentInfo() {
		const ua = navigator.userAgent || "";
		// const platform = navigator.platform || "unknown";
		const language = navigator.language || "unknown";
		const languages = navigator.languages ? navigator.languages.join(",") : "";
		const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
		const networkType = connection ? connection.effectiveType : "unknown";

		// Simple device type detection
		const deviceType = /mobile/i.test(ua)
			? "mobile"
			: /tablet|ipad/i.test(ua)
				? "tablet"
				: "desktop";

		// Browser detection
		// let browser = "unknown";
		// let browserVersion = "unknown";
		// const browserMatchers = [
		// 	{ name: "Edge", regex: /Edg\/([\d.]+)/ },
		// 	{ name: "Chrome", regex: /Chrome\/([\d.]+)/ },
		// 	{ name: "Firefox", regex: /Firefox\/([\d.]+)/ },
		// 	{ name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
		// 	{ name: "Opera", regex: /OPR\/([\d.]+)/ },
		// ];
		// for (const { name, regex } of browserMatchers) {
		// 	const match = ua.match(regex);
		// 	if (match) {
		// 		browser = name;
		// 		browserVersion = match[1];
		// 		break;
		// 	}
		// }

		// OS detection
		// let os = "unknown";
		// let osVersion = "unknown";
		// if (/Windows NT/.test(ua)) {
		// 	os = "Windows";
		// 	const versionMap = {
		// 		"10.0": "10",
		// 		"6.3": "8.1",
		// 		"6.2": "8",
		// 		"6.1": "7",
		// 		"6.0": "Vista",
		// 		"5.1": "XP"
		// 	};
		// 	const match = ua.match(/Windows NT ([\d.]+)/);
		// 	osVersion = match ? versionMap[match[1]] || match[1] : "unknown";
		// } else if (/Mac OS X/.test(ua)) {
		// 	os = "macOS";
		// 	const match = ua.match(/Mac OS X ([\d_]+)/);
		// 	osVersion = match ? match[1].replace(/_/g, ".") : "unknown";
		// } else if (/Android/.test(ua)) {
		// 	os = "Android";
		// 	const match = ua.match(/Android ([\d.]+)/);
		// 	osVersion = match ? match[1] : "unknown";
		// } else if (/iPhone|iPad|iPod/.test(ua)) {
		// 	os = "iOS";
		// 	const match = ua.match(/OS ([\d_]+)/);
		// 	osVersion = match ? match[1].replace(/_/g, ".") : "unknown";
		// }

		return {
			device_type: deviceType,
			// os,
			// os_version: osVersion,
			// browser,
			// browser_version: browserVersion,
			screen_width: window.screen.width,
			screen_height: window.screen.height,
			device_pixel_ratio: window.devicePixelRatio,
			screen_orientation: (screen.orientation && screen.orientation.type) || "unknown",
			network_type: networkType,
			language,
			languages,
			// platform,
			// user_agent: ua,
		};
	}


	function send(payload) {
		payload.project_key = PROJECT_KEY;
		payload.environment = getEnvironmentInfo();
		const data = JSON.stringify(payload);
		const sizeBytes = new Blob([data]).size;
		console.log("Payload size:", sizeBytes, "bytes");

		if (navigator.sendBeacon) {
			navigator.sendBeacon(RUM_ENDPOINT, data);
		} else {
			fetch(RUM_ENDPOINT, {
				method: "POST",
				body: data,
				keepalive: true,
				headers: { "Content-Type": "application/json" }
			});
		}
	}

	// Capture a "pageview" event
	function trackPageview() {
		const payload = {
			type: "pageview",
			visitor_id: getVisitorId(),
			session_id: getSessionId(),
			url: location.href,
			timestamp: new Date().toISOString()
		};
		send(payload);
	}

	// Capture a "custom event" (clicks, conversions, etc.)
	function trackEvent(name, properties = {}) {
		const payload = {
			type: "event",
			visitor_id: getVisitorId(),
			session_id: getSessionId(),
			name,
			properties,
			url: location.href,
			timestamp: new Date().toISOString()
		};
		send(payload);
	}

	function hookIntoSPA() {
		let lastUrl = location.href;

		const pushState = history.pushState;
		const replaceState = history.replaceState;

		function checkUrlChange() {
			const currentUrl = location.href;
			if (currentUrl !== lastUrl) {
				lastUrl = currentUrl;
				trackPageview();
				setupPerformanceTracking(); // re-init observer per SPA route
				// sentMetrics.clear(); // reset metrics cache for new page
			}
		}

		history.pushState = function (...args) {
			pushState.apply(this, args);
			checkUrlChange();
		};

		history.replaceState = function (...args) {
			replaceState.apply(this, args);
			checkUrlChange();
		};

		window.addEventListener("popstate", checkUrlChange);
	}

	// Capture JS errors (uncaught exceptions)
	function setupErrorTracking() {
		window.addEventListener("error", function (event) {
			const payload = {
				type: "error",
				visitor_id: getVisitorId(),
				session_id: getSessionId(), // keep session tracking if you have it
				message: event.message,
				filename: event.filename,
				lineno: event.lineno,
				colno: event.colno,
				stack: event.error ? event.error.stack : null,
				timestamp: new Date().toISOString()
			};
			// console.log("JS Error Captured:", payload);
			send(payload);
		});

		window.addEventListener("unhandledrejection", function (event) {
			const payload = {
				type: "error",
				visitor_id: getVisitorId(),
				session_id: getSessionId(),
				message: event.reason ? event.reason.message : "Unhandled rejection",
				stack: event.reason ? event.reason.stack : null,
				timestamp: new Date().toISOString()
			};
			// console.log("Promise Rejection Captured:", payload);
			send(payload);
		});
	}

	// Track Core Web Vitals (LCP, CLS, FID)
	let performanceObserver = null;
	let sentMetrics = new Set();

	function setupPerformanceTracking() {
		if (!("PerformanceObserver" in window)) return;

		try {
			// Disconnect any old observer (important for SPA navigations)
			if (performanceObserver) {
				try { performanceObserver.disconnect(); } catch { }
				performanceObserver = null;
			}


			// performanceObserver = new PerformanceObserver((list) => {
			// 	for (const entry of list.getEntries()) {
			// 		// Some entries (like for CLS) have entry.name empty; use entry.entryType as fallback
			// 		const metricName = entry.name || entry.entryType || "unknown_metric";
			// 		const key = `${metricName}-${location.href}`;

			// 		// Avoid sending duplicates for the same URL + metric
			// 		if (sentMetrics.has(key)) continue;
			// 		sentMetrics.add(key);

			// 		const payload = {
			// 			type: "performance",
			// 			metric_name: metricName,
			// 			value: entry.value,
			// 			url: location.href,
			// 			timestamp: Date.now(),
			// 			visitor_id: getVisitorId(),
			// 		};

			// 		console.log("📊 Sending Performance Metric:", payload);
			// 		send(payload);
			// 	}
			// });

			// Observe important metrics
			performanceObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					const metricName = entry.name || entry.entryType || "unknown"; 	// Some entries (like for CLS) have entry.name empty; use entry.entryType as fallback

					const key = `${metricName}-${location.href}`;

					if (sentMetrics.has(key)) continue; //  skip if already sent
					sentMetrics.add(key);

					let metricValue = 0;
					switch (entry.entryType) {
						case "largest-contentful-paint":
							metricValue = entry.renderTime || entry.loadTime || 0;
							break;
						case "layout-shift":
							if (entry.hadRecentInput) continue; //skip if layout-shift is - for example user triggered
							metricValue = entry.value;
							break;
						case "first-input":
							metricValue = entry.processingStart - entry.startTime;
							break;
						default:
							metricValue = entry.value || 0;
					}

					// send({
					// 	type: "performance",
					// 	metric_name: metricName,
					// 	value: metricValue,
					// 	url: location.href,
					// 	timestamp: new Date().toISOString(),
					// 	visitor_id: getVisitorId(),
					// 	session_id: getSessionId(),
					// });
				}
			});

			performanceObserver.observe({ type: "largest-contentful-paint", buffered: true });
			performanceObserver.observe({ type: "first-input", buffered: true });
			performanceObserver.observe({ type: "layout-shift", buffered: true });
		} catch (e) {
			console.warn("Performance tracking not supported:", e);
		}
	}

	function setupSessionReplay() {
    if (!window.rrweb) {
        console.warn("rrweb not loaded; session replay disabled.");
        return;
    }

    // Collect replay events in memory
    let replayBuffer = [];

    rrweb.record({
        emit(event) {
            replayBuffer.push(event);

            // Send every 2 seconds (batching)
            if (replayBuffer.length >= 20) {
                flushReplayBuffer();
            }
        }
    });

    function flushReplayBuffer() {
        if (replayBuffer.length === 0) return;

        const payload = {
            type: "session_replay",
            visitor_id: getVisitorId(),
            session_id: getSessionId(),
            url: location.href,
            timestamp: new Date().toISOString(),
            events: replayBuffer
        };

        send(payload);
        replayBuffer = [];
    }

    // flush remaining replay data on page unload
    window.addEventListener("beforeunload", flushReplayBuffer);
}





	// Initialize tracking
	function init() {
		trackPageview();
		setupErrorTracking();
		setupPerformanceTracking();
		setupSessionReplay();
		hookIntoSPA();

		// Track ALL button clicks
		// Example: auto-track button clicks with [data-rum-event] attribute
		document.addEventListener("click", (e) => {
			if (e.target.tagName.toLowerCase() === "button") {
				const btnText = e.target.innerText.trim();
				const btnId = e.target.id || null;
				const btnClass = e.target.className || null;

				trackEvent("button_click", {
					text: btnText,
					id: btnId,
					class: btnClass
				});
			}
		});
	}

	// Run when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}

	// Expose global API for manual event tracking
	window.RUM = {
		trackEvent
	};
})(window, document);
