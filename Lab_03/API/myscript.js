let products = [];

async function getData() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products.slice(0, 30);
    displayProducts(products);
}

function displayProducts(products) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td><img src="${product.images}" alt="${product.title}" style="width: 50px; height: 50px;"></td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                `;
        tableBody.appendChild(row);
    });
}


function filterProducts() {
    const filterText = document.getElementById('filterInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(filterText));
    displayProducts(filteredProducts);
}


function sortProducts() {
    const sortOption = document.getElementById('sortSelect').value;
    let sortedProducts = products;

    if (sortOption === 'asc') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayProducts(sortedProducts);
}


document.getElementById('filterInput').addEventListener('input', () => {
    filterProducts();
});

document.getElementById('sortSelect').addEventListener('change', () => {
    sortProducts();
});

window.onload = getData;