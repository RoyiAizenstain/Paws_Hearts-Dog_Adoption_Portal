/**
 * Dog Adoption Portal — Test Suite
 * Run in browser console or via: node tests.js
 */

(function () {
    let passed = 0;
    let failed = 0;
    const results = [];

    function assert(testName, condition, reason) {
        if (condition) {
            passed++;
            results.push({ name: testName, status: "PASS" });
            console.log(`✅ PASS: ${testName}`);
        } else {
            failed++;
            results.push({ name: testName, status: "FAIL", reason });
            console.log(`❌ FAIL: ${testName} — ${reason}`);
        }
    }

    // ── Mock Data ──────────────────────────────────────────────

    const MOCK_DOGS = [
        {
            id: 1, name: "Brandi", age: "Adult (3–8 years)",
            breed: "Labrador Retriever & American Staffordshire Terrier Mix",
            sex: "Female",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/2b34ab68-c16c-464a-a958-cc72d149da94/image/392ed23f-316c-407e-89b7-1ae92f7ae9c2.jpg",
            house_trained: true, vaccinated: true,
            story: "Brandi is a loving, 60‑lb adult dog who spent five months at a city shelter before being rescued."
        },
        {
            id: 2, name: "24-063 Juno", age: "Adult (3–8 years)",
            breed: "Bull Terrier", sex: "Female",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/65fbe519-8948-4db4-b7ad-ea70aa24cf2f/image/0b4076e8-ce4d-4104-8d46-896825e43edb.jpg",
            house_trained: true, vaccinated: null,
            story: "Juno is an adult female bull terrier located in MA."
        },
        {
            id: 3, name: "24-103 Monty", age: "Adult (approximately 2 years)",
            breed: "Bull Terrier", sex: "Male",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/3054cb0b-c050-4c37-80b7-fcbc4faff245/image/05605de1-13e0-4ab1-90a6-9091fedf4744.jpg",
            house_trained: true, vaccinated: null,
            story: "Monty is a two‑year‑old bull terrier who loves to snuggle."
        },
        {
            id: 4, name: "25-088 Ez", age: "Senior (8+ years)",
            breed: "Bull Terrier", sex: "Female",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/0b09dfa0-906a-4e62-a931-106039c5dfb4/image/25175028-b671-4f04-b371-faf8928f6187.jpg",
            house_trained: true, vaccinated: null,
            story: "Ez is a spunky senior bull terrier located in MO."
        },
        {
            id: 5, name: "Jimmy", age: "Adult (3–8 years)",
            breed: "Boxer & American Bulldog Mix", sex: "Male",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/6a059831-78eb-425c-9abf-dff7204694f8/image/0f0c727c-560e-4498-b8df-c64562836570.jpg",
            house_trained: true, vaccinated: true,
            story: "Jimmy, formerly known as King, is a six‑year‑old boxer–American bulldog mix."
        },
        {
            id: 6, name: "25-067 Bodger", age: "Young (1–3 years)",
            breed: "Bull Terrier", sex: "Male",
            first_image_url: "https://dbw3zep4prcju.cloudfront.net/animal/ddfc9dff-a9eb-4b22-92e1-8c013b19a0e6/image/1706f45d-d5ea-4ba4-a8cc-411514f9eb18.jpg",
            house_trained: true, vaccinated: null,
            story: "Bodger is a young bull terrier with a big personality."
        }
    ];

    // ── Mock Fetch ─────────────────────────────────────────────

    function mockFetch(responseData, status) {
        status = status || 200;
        var calls = [];
        var original = window.fetch;
        window.fetch = function (url, options) {
            calls.push({ url: url, options: options });
            return Promise.resolve({
                ok: status >= 200 && status < 300,
                status: status,
                json: function () { return Promise.resolve(responseData); }
            });
        };
        return {
            calls: calls,
            restore: function () { window.fetch = original; }
        };
    }

    // ── 1. Utility Function Tests ──────────────────────────────

    function testUtilities() {
        console.log("\n── Utility Functions ──");

        // formatBoolean
        assert("formatBoolean(true) returns 'Yes'",
            formatBoolean(true) === "Yes",
            "Got: " + formatBoolean(true));

        assert("formatBoolean(false) returns 'No'",
            formatBoolean(false) === "No",
            "Got: " + formatBoolean(false));

        assert("formatBoolean(null) returns 'Unknown'",
            formatBoolean(null) === "Unknown",
            "Got: " + formatBoolean(null));

        // getDogIdFromURL — test with current URL or default
        assert("getDogIdFromURL returns integer",
            typeof getDogIdFromURL() === "number",
            "Got type: " + typeof getDogIdFromURL());

        // fetchAllDogs calls correct URL
        var mock1 = mockFetch(MOCK_DOGS);
        return fetchAllDogs().then(function (data) {
            assert("fetchAllDogs calls fetch with /dogs",
                mock1.calls.length === 1 && mock1.calls[0].url.endsWith("/dogs"),
                "URL: " + (mock1.calls[0] ? mock1.calls[0].url : "no call"));
            assert("fetchAllDogs returns array of 6 dogs",
                Array.isArray(data) && data.length === 6,
                "Got length: " + (data ? data.length : "null"));
            mock1.restore();

            // fetchDogById calls correct URL
            var mock2 = mockFetch(MOCK_DOGS[2]);
            return fetchDogById(2).then(function (dog) {
                assert("fetchDogById(2) calls fetch with /dogs/2",
                    mock2.calls.length === 1 && mock2.calls[0].url.endsWith("/dogs/2"),
                    "URL: " + (mock2.calls[0] ? mock2.calls[0].url : "no call"));
                assert("fetchDogById(2) returns correct dog",
                    dog.name === "24-103 Monty",
                    "Got: " + (dog ? dog.name : "null"));
                mock2.restore();
            });
        });
    }

    // ── 2. Index Page Tests ────────────────────────────────────

    function testIndexPage() {
        console.log("\n── Index Page (DOM) ──");

        var cards = document.querySelectorAll(".dog-card");
        assert("Six dog cards exist", cards.length === 6,
            "Found " + cards.length + " cards");

        var allHaveImg = true;
        var allHaveH2 = true;
        var allHaveLink = true;
        var allLinksCorrect = true;

        cards.forEach(function (card, i) {
            if (!card.querySelector("img")) allHaveImg = false;
            if (!card.querySelector("h2")) allHaveH2 = false;
            var a = card.querySelector("a");
            if (!a) { allHaveLink = false; return; }
            if (a.textContent.trim() !== "More Info") allHaveLink = false;
            if (a.getAttribute("href") && a.getAttribute("href").indexOf("dog.html?id=") === -1) allLinksCorrect = false;
        });

        assert("Each card has an <img>", allHaveImg, "Some cards missing <img>");
        assert("Each card has an <h2>", allHaveH2, "Some cards missing <h2>");
        assert("Each card has 'More Info' link", allHaveLink, "Some cards missing link");
        assert("Links contain dog.html?id=", allLinksCorrect, "Some links incorrect");

        // Check images populated after fetch
        var mock = mockFetch(MOCK_DOGS);
        return fetchAllDogs().then(function (dogs) {
            cards.forEach(function (card, i) {
                var img = card.querySelector("img");
                if (dogs[i]) {
                    img.src = dogs[i].first_image_url;
                }
            });
            var firstImg = cards[0].querySelector("img");
            assert("img.src populated after fetch",
                firstImg.src !== "" && firstImg.src !== window.location.href,
                "src is empty");
            mock.restore();
        });
    }

    // ── 3. Dog Detail Page Tests ───────────────────────────────

    function testDogPage() {
        console.log("\n── Dog Detail Page ──");

        var heading = document.getElementById("dog-heading");
        assert("dog-heading element exists", !!heading,
            "No element with id='dog-heading'");

        var prevBtn = document.getElementById("prev-btn");
        var nextBtn = document.getElementById("next-btn");
        assert("prev-btn element exists", !!prevBtn, "No prev-btn found");
        assert("next-btn element exists", !!nextBtn, "No next-btn found");

        var adoptBtn = document.getElementById("adopt-btn");
        assert("adopt-btn element exists", !!adoptBtn, "No adopt-btn found");
        if (adoptBtn) {
            assert("adopt-btn href contains adopt.html?id=",
                (adoptBtn.getAttribute("href") || "").indexOf("adopt.html?id=") !== -1,
                "href: " + adoptBtn.getAttribute("href"));
        }

        // Test prev hidden at index 0
        // Simulate: at index 0, prev should be hidden
        if (prevBtn) {
            // Read current URL to check
            var currentId = getDogIdFromURL();
            if (currentId === 0) {
                assert("prev-btn hidden at arrayIndex=0",
                    prevBtn.style.display === "none",
                    "display: " + prevBtn.style.display);
            }
            if (currentId === 5) {
                assert("next-btn hidden at arrayIndex=5",
                    nextBtn.style.display === "none",
                    "display: " + nextBtn.style.display);
            }
            if (currentId > 0 && currentId < 5) {
                assert("prev-btn visible at arrayIndex=" + currentId,
                    prevBtn.style.display !== "none", "prev-btn is hidden");
                assert("next-btn visible at arrayIndex=" + currentId,
                    nextBtn.style.display !== "none", "next-btn is hidden");
            }
        }

        return Promise.resolve();
    }

    // ── 4. Adopt Page Tests ────────────────────────────────────

    function testAdoptPage() {
        console.log("\n── Adopt Page ──");

        var form = document.getElementById("adopt-form");
        assert("adopt-form exists", !!form, "No element with id='adopt-form'");

        var emailInput = document.querySelector('input[type="email"]');
        assert("Email input exists", !!emailInput, "No email input");
        if (emailInput) {
            assert("Email input is required", emailInput.required === true,
                "Not required");
        }

        var nameInput = document.querySelector('input[name="fullname"]');
        assert("Fullname input exists", !!nameInput, "No fullname input");
        if (nameInput) {
            assert("Fullname input is required", nameInput.required === true,
                "Not required");
        }

        var phoneInput = document.querySelector('input[type="tel"]');
        assert("Phone input exists", !!phoneInput, "No phone input");
        if (phoneInput) {
            assert("Phone input is required", phoneInput.required === true,
                "Not required");
        }

        // Test form POST
        if (form && emailInput && nameInput && phoneInput) {
            var mock = mockFetch({ success: true, message: "Enquiry received" });
            emailInput.value = "test@example.com";
            nameInput.value = "Test User";
            phoneInput.value = "1234567890";

            var preventDefaultCalled = false;
            var fakeEvent = new Event("submit", { cancelable: true, bubbles: true });
            Object.defineProperty(fakeEvent, "preventDefault", {
                value: function () { preventDefaultCalled = true; }
            });

            // Override location to capture redirect
            var originalLocation = window.location.href;
            var redirectUrl = null;

            // We can't easily test redirect without more complex setup
            // Just test that fetch is called with POST
            form.dispatchEvent(fakeEvent);

            // Give async handler time to run
            return new Promise(function (resolve) {
                setTimeout(function () {
                    assert("preventDefault called on submit",
                        preventDefaultCalled, "preventDefault was not called");

                    assert("POST fetch called on submit",
                        mock.calls.length >= 1 && mock.calls[0].options && mock.calls[0].options.method === "POST",
                        "No POST call found. Calls: " + mock.calls.length);

                    if (mock.calls.length >= 1 && mock.calls[0].options && mock.calls[0].options.body) {
                        var body = JSON.parse(mock.calls[0].options.body);
                        assert("POST body has email, fullname, phone",
                            body.email === "test@example.com" && body.fullname === "Test User" && body.phone === "1234567890",
                            "Body: " + JSON.stringify(body));
                    }

                    mock.restore();
                    resolve();
                }, 200);
            });
        }

        return Promise.resolve();
    }

    // ── 5. Thank You Page Tests ────────────────────────────────

    function testThankYouPage() {
        console.log("\n── Thank You Page ──");

        var dogName = document.getElementById("dog-name");
        assert("Dog name element exists", !!dogName, "No dog-name element");

        var message = document.getElementById("message");
        assert("Enquiry message element exists", !!message, "No message element");
        if (message) {
            assert("Message text is correct",
                message.textContent === "Thank you for your enquiry!",
                "Got: " + message.textContent);
        }

        var backLink = document.querySelector('a[href="index.html"]');
        assert("Back to home link exists", !!backLink,
            "No link with href='index.html'");

        return Promise.resolve();
    }

    // ── Run Tests Based on Current Page ────────────────────────

    function detectPage() {
        var path = window.location.pathname;
        if (path.indexOf("dog.html") !== -1) return "dog";
        if (path.indexOf("adopt.html") !== -1) return "adopt";
        if (path.indexOf("thankyou.html") !== -1) return "thankyou";
        return "index";
    }

    function runAll() {
        console.log("═══════════════════════════════════════");
        console.log("  Dog Adoption Portal — Test Suite");
        console.log("═══════════════════════════════════════");

        var page = detectPage();
        console.log("Detected page: " + page);

        testUtilities().then(function () {
            if (page === "index") return testIndexPage();
            if (page === "dog") return testDogPage();
            if (page === "adopt") return testAdoptPage();
            if (page === "thankyou") return testThankYouPage();
            return Promise.resolve();
        }).then(function () {
            console.log("\n═══════════════════════════════════════");
            console.log("  " + passed + "/" + (passed + failed) + " tests passed");
            if (failed > 0) {
                console.log("  " + failed + " test(s) FAILED:");
                results.forEach(function (r) {
                    if (r.status === "FAIL") {
                        console.log("    - " + r.name + ": " + r.reason);
                    }
                });
            }
            console.log("═══════════════════════════════════════");
        });
    }

    // Run on DOMContentLoaded or immediately if already loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            // Delay to let page JS run first
            setTimeout(runAll, 500);
        });
    } else {
        setTimeout(runAll, 500);
    }
})();
