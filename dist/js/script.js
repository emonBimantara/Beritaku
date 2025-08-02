const API = {
    beranda: "https://api-berita-indonesia.vercel.app/cnn/terbaru",
    olahraga: "https://api-berita-indonesia.vercel.app/cnn/olahraga",
    nasional: "https://api-berita-indonesia.vercel.app/cnn/nasional",
    internasional: "https://api-berita-indonesia.vercel.app/cnn/internasional"
};

const hero = document.getElementById("hero");
const olahragaBox = document.querySelector(".olahraga-box");
const nasionalMainBox = document.querySelector(".nasional-main-box");
const nasionalBox = document.querySelector(".nasional-box");
const internasionalBox = document.querySelector(".internasional-box");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});

getBeritaTerbaru(API.beranda);
getBeritaOlahraga(API.olahraga);
getBeritaNasional(API.nasional);
getBeritaInternasional(API.internasional);

function generateCard({ title, link, description, pubDate, thumbnail }, logo){
    return `
    <a href="${link}" target="_blank" class="no-underline">
        <div class="box group mt-10 mb-1 w-full rounded-lg cursor-pointer hover:bg-red-500 transition duration-300 p-5">
            <img src="${thumbnail}" alt="" class="w-full rounded-lg">
            <div class="detail-box flex gap-2 mt-3">
                <img src="${logo}" alt="" class="w-5 rounded-md">
                <h3 class="group-hover:text-white">• ${formatTanggal(pubDate)}</h3>
            </div>  
            <h1 class="font-bold text-2xl mt-2 mb-2 group-hover:text-white">${title}</h1>
            <p class="group-hover:text-white">${description}</p>
        </div>
    </a>
    `;
}

async function getBeritaTerbaru(url){
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        showBeritaTerbaru(respData.data.posts[10], respData.data.image);
    } catch (error) {
        console.error("Gagal Mengambil Berita Terbaru")
    }
}

async function getBeritaNasional(url){
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        showBeritaNasional(respData.data.posts, respData.data.image);
    } catch (error) {
        console.error("Gagal Mengambil Berita Nasional")
    }
}

async function getBeritaOlahraga(url){
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        showBeritaOlahraga(respData.data.posts, respData.data.image);
    } catch (error) {
        console.error("Gagal Mengambil Berita Olahraga")
    }
}

async function getBeritaInternasional(url){
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        showBeritaInternasional(respData.data.posts, respData.data.image);
    } catch (error) {
        console.error("Gagal Mengambil Berita Interasional")
    }
}

function showBeritaTerbaru(berita, logo){
    hero.innerHTML = "";
    const { title, link, description, pubDate, thumbnail } = berita;

    hero.innerHTML = `
    <div class="container w-[80%] mx-auto">
        <div class="hero-box grid grid-col-1 items-center lg:grid-cols-2 lg:gap-[30px]">
            <div class="box order-2 lg:order-1">
                <h1 class="font-bold text-4xl pb-10">${title}</h1>

                <p class="text-xl pb-5">${description}</p>
                <div class="detail-box flex gap-2">
                    <img src="${logo}" alt="Logo" class="w-7 h-7 rounded-md object-cover">
                    <h3>• ${formatTanggal(pubDate)}</h3>
                </div>
                <div class="bg-red-500 hover:bg-red-700 text-center text-2xl py-1 px-5 mx-auto rounded-lg mt-5 lg:w-fit lg:text-lg lg:mx-0">
                    <a href="${link}" class="text-white">Baca Selengkapnya</a>
                </div>
            </div>

            <div class="box order-1 mb-4 lg:order-2">
                <img src="${thumbnail}" alt="" class="w-full rounded-lg">
            </div>
        </div>
    </div>
    `;
}

function showBeritaOlahraga(berita, logo){
    olahragaBox.innerHTML = "";
    berita.slice(0, 4).forEach(b => {
        olahragaBox.innerHTML += generateCard(b, logo);
    });
}

function showBeritaNasional(berita, logo){
    nasionalMainBox.innerHTML = "";
    const beritaUtama = berita[10];
    const { title, link, description, pubDate, thumbnail } = beritaUtama;

    nasionalMainBox.innerHTML = `
    <a href="${link}" target="_blank" class="no-underline">
    <div class="box relative">
        <img src="${thumbnail}" alt="" class="w-full h-[500px] object-cover rounded-2xl">
        <div class="desc absolute bottom-10 left-10 w-[70%]">
            <div class="detail-box flex gap-2 mt-2">
                <img src="${logo}" alt="" class="w-5 rounded-md">
                <h3 class="text-white">• ${formatTanggal(pubDate)}</h3>
            </div>  
            <h1 class="font-bold text-2xl mt-2 mb-2 text-white">${title}</h1>
            <p class="text-white">${description}</p>
        </div>
    </div>
    `;

    nasionalBox.innerHTML = "";
    berita.slice(0, 4).forEach(b => {
        nasionalBox.innerHTML += generateCard(b, logo);
    });
}

function showBeritaInternasional(berita, logo){
    internasionalBox.innerHTML = "";
    berita.slice(0, 4).forEach(b => {
        internasionalBox.innerHTML += generateCard(b, logo);
    });
}

function formatTanggal(pubDate) {
    const tanggal = new Date(pubDate);
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        timeZone: 'Asia/Jakarta' 
    };
    return tanggal.toLocaleDateString('id-ID', options);
}