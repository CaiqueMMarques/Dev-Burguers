const menuOptions = [
    { name: 'X-Salada', price: 30, vegan: false, src: './assets/xsalada.jpeg' },
    { name: 'X-Bacon', price: 35, vegan: false, src: './assets/xbacon.png' },
    { name: 'X-Bacon Egg', price: 40, vegan: false, src: './assets/bacon-egg.png' },
    { name: 'Monstruoso', price: 50, vegan: false, src: './assets/monstruoso.png' },
    { name: 'X-Vegan', price: 45, vegan: true, src: './assets/xvegan.png' },
    { name: 'Big-Vegan', price: 55, vegan: true, src: './assets/monstruoso-vegan.png' },
]

const buttonShowAll = document.querySelector(".Show-all");
const buttonDescount = document.querySelector(".descount");
const buttonSum = document.querySelector(".sum");
const buttonFilter = document.querySelector(".filter");
const section = document.querySelector("section");
const main = document.querySelector("main");

let discountItems = "";
let clicouShowAll = false;
let clicouDescount = false;

function renderizarMenu(array) {
    let newMenuOptions = "";
    array.forEach(option => {
        newMenuOptions += ` 
            <a href="x-salada.html" class="card-link">
            <div class="card">
                <img src="${option.src}" alt="${option.name}">
                <h2>${option.name}</h2>
                <p>${formatarPrice(option.price)}</p> 
            </div>
        </a>
        `
    })
    section.innerHTML = newMenuOptions;
}

buttonShowAll.addEventListener("click", () => {
    renderizarMenu(menuOptions);
    clicouShowAll = true;
})

buttonDescount.addEventListener("click", () => {
    if (!clicouShowAll) {
        alert("Clique em 'Mostrar Tudo' para aplicar o desconto.");
        return;
    } else {
        discountItems = menuOptions.map(option => ({
            ...option,
            price: option.price - (option.price * 0.10), /* option.price * 0.9 é a mesma coisa de dar os 10% de desconto */
        }));
        renderizarMenu(discountItems);
        clicouDescount = true;
    }
});

function renderizarSoma(total) {
    section.innerHTML = `
            <div class="total-sum">
                <p class="paragraph-sum">A soma de todos os itens do menu é: ${formatarPrice(total)}</p>
            </div>
            `
}

buttonSum.addEventListener("click", () => {

    if (!clicouShowAll && !clicouDescount) {
        alert("Clique em 'Mostrar Tudo' e depois em 'Desconto' para calcular a soma dos itens do menu.");
        return;
    } else if (clicouShowAll && !clicouDescount) {
        alert("Clique em 'Desconto' antes de calcular a soma dos itens do menu.");
        return;
    } else {
        const total = discountItems.reduce((acc, option) => {
            acc += option.price; 
            return acc;
        }, 0) 
        renderizarSoma(total);
    }
})

function renderizarVegan() {
    if(!clicouShowAll) {
        alert("Clique em 'Mostrar Tudo' para filtrar os itens veganos.");
    }else {
    const veganOptions = menuOptions.filter(option => {
        return option.vegan === true;
    })
    renderizarMenu(veganOptions);
    }};

buttonFilter.addEventListener("click", renderizarVegan);

function formatarPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format (price)
}