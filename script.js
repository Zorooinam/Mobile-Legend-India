const products = [
  { id:'p86', name:'86', qty:86, price:110, img:'https://rinstore.in/gallery/1745551945416--1734510330-icon-1.webp', bonus:'78+8bonus' },
  { id:'p172', name:'172', qty:172, price:220, img:'https://rinstore.in/gallery/1745551962218--1734510324-icon-2.webp', bonus:'156+16bonus' },
  { id:'p257', name:'257', qty:257, price:320, img:'https://rinstore.in/gallery/1745551962218--1734510324-icon-2.webp', bonus:'234+23bonus' },
  { id:'p343', name:'343', qty:343, price:430, img:'https://rinstore.in/gallery/1745551979858--1734510316-icon-3.webp', bonus:'312+31bonus' },
  { id:'p429', name:'429', qty:429, price:537, img:'https://rinstore.in/gallery/1745551979858--1734510316-icon-3.webp', bonus:'390+ 39bonus' },
  { id:'p514', name:'514 ', qty:514, price:638, img:'https://rinstore.in/gallery/1745551979858--1734510316-icon-3.webp', bonus:'468+46bonus' },
  { id:'p600', name:'600 ', qty:600, price:748, img:'https://rinstore.in/gallery/1745551992830--1734510311-icon-4.webp', bonus:'546+54bonus' },
  { id:'p706', name:'706 ', qty:706, price:865, img:'https://rinstore.in/gallery/1745551992830--1734510311-icon-4.webp', bonus:'625+81bonus' },
  { id:'p878', name:'878 ', qty:878, price:1080, img:'https://rinstore.in/gallery/1745553023850--1734510668-icon-5.png', bonus:'781+97bonus' },
  { id:'p963', name:'963', qty:963, price:1185, img:'https://rinstore.in/gallery/1745553023850--1734510668-icon-5.png', bonus:'859+104bonus' },
   { id:'p1049', name:'1049', qty:1049, price:1300, img:'https://rinstore.in/gallery/1745553023850--1734510668-icon-5.png', bonus:'937+112bonus' },
   { id:'p1412', name:'1412', qty:1412, price:1800, img:'https://rinstore.in/gallery/1745553023850--1734510668-icon-5.png', bonus:'1250+162bonus' },
];

const grid = document.getElementById('productsGrid');
const qrTitle = document.getElementById('qrTitle');
const qrAmount = document.getElementById('qrAmount');
const selectedQty = document.getElementById('selectedQty');
const buyBtn = document.getElementById('buyNowBtn');
const userId = document.getElementById('userId');
const serverId = document.getElementById('serverId');
const storeBanner = document.getElementById('storeBanner');
const storeNameDisplay = document.getElementById('storeNameDisplay');

let selectedProduct = null;
let selectedPayment = 'qr';
const upiId = "rahuloinam872@okaxis";
let qrInstance = new QRCode(document.getElementById("qrcode"), {text:"",width:100,height:100});

function renderProducts(){
  grid.innerHTML='';
  products.forEach(p=>{
    const card=document.createElement('div');
    card.className='product-card';
    card.innerHTML=`
      <img src="${p.img}" alt="">
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-qty" contenteditable="true">${p.bonus}</div>
      </div>
      <div class="product-price">₹${p.price}</div>
    `;
    card.onclick=()=>selectProduct(p,card);
    grid.appendChild(card);
  });
}

function clearSel(){
  document.querySelectorAll('.product-card.selected').forEach(e=>e.classList.remove('selected'));
}

function selectProduct(p,el){
  selectedProduct=p;
  clearSel();
  el.classList.add('selected');
  qrTitle.textContent=p.name;
  qrAmount.textContent=`₹${p.price}`;
  selectedQty.textContent=`${p.qty} diamonds`;
  buyBtn.textContent='Buy Now';
  updateQR(p.price);
}

function updateQR(amount){
  const upiString=`upi://pay?pa=${upiId}&pn=${storeBanner.textContent}&am=${amount}&cu=INR`;
  document.getElementById('qrcode').innerHTML="";
  qrInstance=new QRCode(document.getElementById("qrcode"), {text:upiString,width:100,height:100});
}

document.querySelectorAll('.pay-method').forEach(m=>{
  m.addEventListener('click',()=>{
    document.querySelectorAll('.pay-method').forEach(x=>x.classList.remove('active'));
    m.classList.add('active');
    selectedPayment = m.dataset.method;
  });
});

// Update store display if banner changes
storeBanner.addEventListener('input',()=>{
  storeNameDisplay.textContent = storeBanner.textContent;
  if(selectedProduct) updateQR(selectedProduct.price);
});

buyBtn.onclick=()=>{
  const uid = userId.value.trim();
  const sid = serverId.value.trim();
  if(!selectedProduct){alert('Select a product first.'); return;}
  if(!uid || !sid){alert('Enter User ID and Zone ID.'); return;}
  const now = new Date();
  const bonusText = document.querySelector('.product-card.selected .product-qty').textContent;
  const msg = `*${storeBanner.textContent}*\n\n*Invoice*\nDate: ${now.toLocaleDateString()}\nTime: ${now.toLocaleTimeString()}\n\nUser ID: ${uid}\nServer/Zone: ${sid}\n\nProduct: ${selectedProduct.name}\nQty: ${bonusText}\nPayment: ${selectedPayment.toUpperCase()}\nAmount: ₹${selectedProduct.price}\n\nPlease confirm this order.`;
  const wa = `https://wa.me/918414075796?text=${encodeURIComponent(msg)}`;
  window.open(wa,'_blank');
}

renderProducts();