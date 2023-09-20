let arrayProduct = [
      {
        'img':'photo/p1.jpg',
         'nameproduct' : 'CHEETOS BALLS - CHEESE & BACON',
         'category' : 'snacks',
         'price' :'4$',
    },
    {
        'img':'photo/p2.jpg',
         'nameproduct' : 'CHEETOS PUFFS - HONEY BBQ',
         'category' : 'snacks',
         'price' :'4$',
    },
    {
        'img':'photo/p3.jpg',
         'nameproduct' : 'CHEETOS PUFFS - FLAMIN HOT',
         'category' : 'snacks',
         'price' :'4$',
    },
    
    {
        'img':'photo/p4.jpg',
         'nameproduct' : 'CHEETOS PUFFS - ORIGINAL',
         'category' : 'snacks',
         'price' :'4$',
    },
    {
        'img':'photo/p5.jpg',
         'nameproduct' : 'NERDS ROPE RAINBOW',
         'category' : 'sweets & candies',
         'price' : '3.5$',
    },
    {
        'img':'photo/p6.jpg',
         'nameproduct' : 'HUBBA BUBBA BUBBLE TAPE - BLUE RASPBERRY',
         'category' : 'sweets & candies',
         'price' : '4$',
    },
    {
        'img':'photo/p7.jpg',
         'nameproduct' : 'HUBBA BUBBA BUBBLE TAPE - STRAWBERRY',
         'category' : 'sweets & candies',
         'price' : '4$',

    },
    {
        'img':'photo/p8.jpg',
         'nameproduct' : 'HUBBA BUBBA BUBBLE TAPE - GRAPE',
         'category' : 'sweets & candies',
         'price' : '4$',
    },
    {
        'img':'photo/p9.jpg',
         'nameproduct' : 'JOLLY RANCHER GUMMIES - ORIGINAL FLAVORS',
         'category' : 'sweets & candies',
         'price' : '5.5$',
    },
    {
        'img':'photo/p10.jpg',
         'nameproduct' : 'BEAN BOOZLED (REFILL)',
         'category' : 'sweets & candies',
         'price' : '5.5$',
    },
    {
        'img':'photo/p11.jpg',
         'nameproduct' : 'BEAN BOOZLED',
         'category' : 'sweets & candies',
         'price' : '18.5$',
    },
    {
        'img':'photo/p12.jpg',
        'nameproduct' : 'BEAN BOOZLED',
        'category' : 'sweets & candies',
        'price' : '18$',
    },
    {
        'img':'photo/p13.jpg',
        'nameproduct' : 'DORITOS (LARGE) - ORIGINAL SALTED',
        'category' : 'snacks',
        'price' : '5.5$',
    },
    {
        'img':'photo/p14.jpg',
         'nameproduct' : 'DORITOS (LARGE) - NACHO CHEESE',
         'category' : 'snacks',
        'price' : '5.5$',
    },
    {
        'img':'photo/p15.jpg',
         'nameproduct' : 'DORITOS (LARGE) - CHEESE SUPREME',
         'category' : 'snacks',
         'price' : '5.5$',
    },
 
    {
        'img':'photo/p16.jpg',
         'nameproduct' : 'DORITOS (LARGE) - MEXICANAE',
         'category' : 'snacks',
         'price' : '5.5$',
    },
    {
        'img':'photo/p17.jpg',
         'nameproduct' : 'SOURPATCH KIDS',
         'category' : 'sweets & candies',
         'price' : '4$',
    },
    {
        'img':'photo/p18.jpg',
         'nameproduct' : 'SOURPATCH KIDS MAX SUPER SOUR',
         'category' : 'sweets & candies',
         'price' : '4.5$',
    },
    {
        'img':'photo/p19.jpg',
         'nameproduct' : 'SOURPATCH KIDS BERRY',
         'category' : 'sweets & candies',
         'price' : '4.5$',
    },
    {
        'img':'photo/p20.jpg',
         'nameproduct' : 'WARHEADS CUBES',
         'category' : 'snacks',
         'price' : '5$',
    },
    {
        'img':'photo/p21.jpg',
         'nameproduct' : 'SOURPATCH KIDS WATERMELON',
         'category' : 'sweets & candies',
         'price' : '4.5$',
    },
    {
        'img':'photo/p22.jpg',
         'nameproduct' : 'SOURPATCH KIDS WATERMELON BOX',
         'categoty' : 'sweets & candies',
         'price' : '5.5$',
    },
    {
        'img':'photo/p23.jpg',
         'nameproduct' : 'NERDS WONKA RAINBOW CANDY',
         'category' : 'sweets & candies',
         'price' : '5$',
    },
    {
        'img':'photo/p24.jpg',
        'nameproduct' : 'PRIME ENERGY - ICEPOP',
        'category' : 'prime drink',
         'price' : '13$',
    },
    {
        'img':'photo/p25.jpg',
         'nameproduct' : 'PRIME ENERGY - TROPICAL PUNCH',
         'categiry' : 'prime drink',
         'price' : '11$',
    },
    {
        'img':'photo/p26.jpg',
         'nameproduct' : 'PRIME ENERGY - STRAWBERRY WATERMELON',
         'category' : 'prime drink',
         'price' : '12$',
    },
    {
        'img':'photo/p27.jpg',
         'nameproduct' : 'PRIME ENERGY - ORANGE MANGO',
         'category' : 'prime drink',
         'price' : '9$',
    },
    {
        'img':'photo/p28.jpg',
         'nameproduct' : 'PRIME HYDRATION - LEMON LIME',
         'category' : 'prime drink',
         'price' : '8.5$',
    },
    {
        'img':'photo/p29.jpg',
         'nameproduct' : 'PRIME ENERGY - STRAWBERRY WATERMELON',
         'category' : 'prime drink',
         'price' : '12$',
    },
    {
        'img':'photo/p30.jpg',
         'nameproduct' : 'PRIME HYDRATION - ORANGE',
         'category' : 'prime drink',
         'price' : '8.5$',
    },
];
let boxProduct = document.querySelector(".box-product");
    window.addEventListener("DOMContentLoaded" , ()=>{
        let newBoxProduct = arrayProduct.map((e)=>{
          return `
          <div class="product">
          <img src="${e.img}" alt="">
          <div class="info-product">
           <p>${e.nameproduct}</p>
           <p>${e.category}</p>
          </div>
          <p class="price">
           ${e.price}
          </p>
     </div>
          `;
        }).join("");
        boxProduct.innerHTML = newBoxProduct;
    });
   