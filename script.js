/*==================================================
  CELESTIA GOURMET
  FILE : js/script.js
  PART 1
==================================================*/

/*================ LOADER ================*/

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 1200);
    }
});

/*================ CUSTOM CURSOR ================*/

const cursor = document.querySelector(".cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

/*================ SCROLL PROGRESS ================*/

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / height) * 100;

    progressBar.style.width = progress + "%";

});

/*================ STICKY NAVBAR ================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    navbar.classList.toggle("active", window.scrollY > 80);

});

/*================ MOBILE MENU ================*/

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}

/*================ DARK MODE ================*/

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        themeBtn.innerHTML = document.body.classList.contains("dark")
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}

/*================ BACK TO TOP ================*/

const topBtn = document.querySelector(".back-to-top");

if (topBtn) {

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 400 ? "flex" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*================ SMOOTH SCROLL ================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", (e) => {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*================ FLOATING ORDER BUTTON ================*/

const orderBtn = document.querySelector(".floating-order");

if (orderBtn) {

    orderBtn.addEventListener("click", () => {

        alert(
            "🍽 Welcome to Celestia Gourmet!\n\nOnline Ordering Coming Soon."
        );

    });

}

/*================ IMAGE HOVER ================*/

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.05)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

/*================ AOS ================*/

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 1000,

        once: true,

        offset: 100

    });

}

/*================ GSAP ================*/

if (typeof gsap !== "undefined") {

    gsap.from(".navbar", {

        y: -100,

        opacity: 0,

        duration: 1

    });

    gsap.from(".hero-left", {

        opacity: 0,

        x: -100,

        duration: 1.2

    });

    gsap.from(".hero-right", {

        opacity: 0,

        x: 100,

        duration: 1.2

    });

}

console.log("Part 1 Loaded");
/*==================================================
  CELESTIA GOURMET
  FILE : js/script.js
  PART 2
==================================================*/

/*================ MENU FILTER ================*/

const filterButtons = document.querySelectorAll(".menu-filter button");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.textContent.trim().toLowerCase();

        menuCards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (filter === "all" || title.includes(filter)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

/*================ MENU SEARCH ================*/

const searchInput = document.getElementById("searchFood");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        menuCards.forEach(card => {

            const food = card.querySelector("h3").textContent.toLowerCase();

            card.style.display = food.includes(value)
                ? "block"
                : "none";

        });

    });

}

/*================ NOTIFICATION ================*/

function showNotification(message) {

    let note = document.querySelector(".notification");

    if (!note) {

        note = document.createElement("div");

        note.className = "notification";

        document.body.appendChild(note);

    }

    note.innerHTML = message;

    note.style.display = "block";

    clearTimeout(note.timer);

    note.timer = setTimeout(() => {

        note.style.display = "none";

    }, 2500);

}

/*================ SHOPPING CART ================*/

let cart = [];
let cartCount = 0;

const cartIcon = document.querySelector(".fa-cart-shopping");
const cartItems = document.querySelector(".cart-items");

document.querySelectorAll(".price-row button").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".menu-card");

        const name = card.querySelector("h3").textContent;

        const price = card.querySelector("h4").textContent;

        cart.push({
            name,
            price
        });

        cartCount++;

        if (cartIcon) {

            cartIcon.setAttribute("data-count", cartCount);

        }

        updateCart();

        showNotification("🛒 Item Added Successfully");

    });

});

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

        <div>

            <h4>${item.name}</h4>

            <p>${item.price}</p>

        </div>

        `;

        cartItems.appendChild(div);

    });

}

/*================ OPEN CART ================*/

const cartPanel = document.querySelector(".cart-panel");

if (cartPanel && cartIcon) {

    cartIcon.addEventListener("click", () => {

        cartPanel.classList.toggle("active");

    });

}

/*================ RESERVATION FORM ================*/

const reservationForm = document.querySelector(".reservation form");

if (reservationForm) {

    reservationForm.addEventListener("submit", e => {

        e.preventDefault();

        showNotification("✅ Table Reserved Successfully!");

        reservationForm.reset();

    });

}

/*================ CONTACT FORM ================*/

const contactForm = document.querySelector(".contact form");

if (contactForm) {

    contactForm.addEventListener("submit", e => {

        e.preventDefault();

        showNotification("📩 Message Sent Successfully!");

        contactForm.reset();

    });

}

/*================ COUNTER ================*/

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter => {

    const target = parseInt(counter.textContent);

    let count = 0;

    const updateCounter = () => {

        const increment = Math.ceil(target / 80);

        if (count < target) {

            count += increment;

            counter.textContent = count + "+";

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent = target + "+";

        }

    };

    updateCounter();

});

/*================ GALLERY ZOOM ================*/

document.querySelectorAll(".gallery img").forEach(image => {

    image.addEventListener("click", () => {

        image.classList.toggle("zoom");

    });

});

/*================ HERO TEXT ================*/

const words = [

    "Luxury Dining",

    "Premium Cuisine",

    "Fresh Ingredients",

    "Fine Hospitality",

    "World Class Taste"

];

const welcome = document.querySelector(".welcome");

if (welcome) {

    let index = 0;

    setInterval(() => {

        index = (index + 1) % words.length;

        welcome.textContent = words[index];

    }, 3000);

}

/*================ HERO TYPE EFFECT ================*/

const title = document.querySelector(".hero-left h1");

if (title) {

    const original = title.textContent;

    title.textContent = "";

    let i = 0;

    function typing() {

        if (i < original.length) {

            title.textContent += original.charAt(i);

            i++;

            setTimeout(typing, 40);

        }

    }

    typing();

}

console.log("Part 2 Loaded");
/*==================================================
  CELESTIA GOURMET
  FILE : js/script.js
  PART 3 (FINAL)
==================================================*/

/*================ AI CHAT ================*/

const aiButton = document.querySelector(".ai-chat");
const chatWindow = document.querySelector(".chat-window");
const closeChat = document.querySelector(".close-chat");
const sendBtn = document.querySelector(".send-btn");
const chatInput = document.querySelector(".chat-input input");
const chatBody = document.querySelector(".chat-body");

if (aiButton && chatWindow) {

    aiButton.addEventListener("click", () => {

        chatWindow.style.display =
            chatWindow.style.display === "flex"
                ? "none"
                : "flex";

    });

}

if (closeChat) {

    closeChat.addEventListener("click", () => {

        chatWindow.style.display = "none";

    });

}

if (sendBtn) {

    sendBtn.addEventListener("click", sendMessage);

}

if (chatInput) {

    chatInput.addEventListener("keypress", e => {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}

function sendMessage() {

    const text = chatInput.value.trim();

    if (!text) return;

    addMessage(text, "user");

    let reply = "😊 Welcome to Celestia Gourmet.";

    const msg = text.toLowerCase();

    if (msg.includes("menu"))
        reply = "🍕 Our menu includes Pizza, Pasta, Burgers, Seafood, Steak and Desserts.";

    else if (msg.includes("reservation"))
        reply = "📅 You can reserve your table from the Reservation section.";

    else if (msg.includes("time"))
        reply = "🕙 We are open daily from 10:00 AM to 11:00 PM.";

    else if (msg.includes("location"))
        reply = "📍 We are located in Chennai, Tamil Nadu.";

    else if (msg.includes("contact"))
        reply = "📞 Call us at +91 98765 43210.";

    else if (msg.includes("hello") || msg.includes("hi"))
        reply = "👋 Hello! Welcome to Celestia Gourmet.";

    setTimeout(() => {

        addMessage(reply, "bot");

    }, 600);

    chatInput.value = "";

}

function addMessage(message, type) {

    if (!chatBody) return;

    const div = document.createElement("div");

    div.className = "chat-message";

    if (type === "user")
        div.classList.add("user");

    div.innerHTML = message;

    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;

}

/*================ PARALLAX ================*/

const heroVideo = document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

    if (heroVideo) {

        heroVideo.style.transform =
            `translateY(${window.scrollY * 0.25}px)`;

    }

});

/*================ LIVE CLOCK ================*/

const clock = document.createElement("div");

clock.className = "live-clock";

document.body.appendChild(clock);

setInterval(() => {

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

}, 1000);

/*================ RANDOM FOOD QUOTES ================*/

const quotes = [

    "🍕 Food is Happiness",

    "🍽 Luxury begins with Taste",

    "🌿 Fresh Food Fresh Mood",

    "❤️ Every Bite tells a Story",

    "👨‍🍳 Cooking is an Art"

];

setInterval(() => {

    const random = Math.floor(Math.random() * quotes.length);

    console.log(quotes[random]);

}, 10000);

/*================ LAZY LOADING ================*/

if ("IntersectionObserver" in window) {

    const lazyImages = document.querySelectorAll("img");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                observer.unobserve(entry.target);

            }

        });

    });

    lazyImages.forEach(img => {

        img.style.opacity = ".3";

        observer.observe(img);

    });

}

/*================ CURRENT YEAR ================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*================ WELCOME NOTIFICATION ================*/

setTimeout(() => {

    if (typeof showNotification === "function") {

        showNotification("🍽 Welcome to Celestia Gourmet!");

    }

}, 1500);

/*================ CHEF CARD EFFECT ================*/

document.querySelectorAll(".chef-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

/*================ END ================*/

console.log("✅ Celestia Gourmet Loaded Successfully");
alert("js connected sucessfully");