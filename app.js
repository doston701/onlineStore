const elBlockList = document.querySelector(".block__list");
const elStoreList = document.querySelector(".store__list");
const Allprice = document.querySelector(".price-title");

const totalPrice = () => {
  const prices = storeList.reduce((a, b) => a + b.clientPrice, 0);
  Allprice.textContent = `${prices} $`;
};

const data = [
  {
    id: 1,
    img: "./img/iphone14.jpg",
    price: 1700,
    count: 10,
    name: "IPhone 14 pro Gold",
  },
  {
    id: 2,
    img: "./img/redmi11.webp",
    price: 400,
    count: 11,
    name: "Redmi 11 pro",
  },
  {
    id: 3,
    img: "./img/samsung.webp",
    price: 700,
    count: 12,
    name: "Samsung A 52",
  },
];

const storeList = [];

function rednerProduct(item) {
  totalPrice();
  elBlockList.innerHTML = "";
  for (let i of item) {
    if (i.count > 0) {
      let li = document.createElement("li");
      li.className = "block__item";
      li.innerHTML = `
        <div class="block__img-wrapper">
          <img class="block__img" src="${i.img}" alt="Gold Iphone 14 pro" />
        </div>
        <div class="block__content">
          <h2 class="block__title">${i.name}</h2>
          <p class="product__price">${i.price}</p>
          <button id="${i.id}" class="block__add" type="button">+</button>
          <strong>${i.count}</strong>
          <button id="${i.id}" class="block__remove" type="button">-</button>
        </div>
      `;
      elBlockList.appendChild(li);
    }
  }
}

rednerProduct(data);

function rednerStore(item) {
  elStoreList.innerHTML = "";
  for (let i of item) {
    if (i.count > 0) {
      let li = document.createElement("li");
      li.className = "block__item";
      li.innerHTML = `
        <div class="block__img-wrapper">
          <img class="block__img" src="${i.img}" alt="Gold Iphone 14 pro" />
        </div>
        <div class="block__content">
          <h2 class="block__title">${i.name}</h2>
          <p class="product__price">${i.clientPrice}$</p>
          <strong>${i.count}</strong>
        </div>
      `;
      elStoreList.appendChild(li);
    }
  }
}

elBlockList.addEventListener("click", (e) => {
  if (e.target.className === "block__add") {
    for (let i of data) {
      if (i.id === Number(e.target.id)) {
        let obj = storeList.some((find) => find.id == e.target.id);
        i.count -= 1;
        if (!obj) {
          storeList.push({ ...i, clientPrice: i.price, count: 1 });
        } else {
          for (let oldProduct of storeList) {
            if (e.target.id == oldProduct.id) {
              oldProduct.count += 1;
              oldProduct.clientPrice = oldProduct.price * oldProduct.count;
            }
          }
        }
      }
    }
  }
  if (e.target.className === "block__remove") {
    for (let i of storeList) {
      if (i.id == e.target.id && i.count > 0) {
        i.count -= 1;
        i.clientPrice = i.price * i.count;
        for (let y of data) {
          if (y.id == e.target.id) {
            y.count += 1;
          }
        }
      }
    }
  }
  rednerStore(storeList);
  rednerProduct(data);
});
