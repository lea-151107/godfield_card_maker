//表示
const img_ = document.getElementById("img_");
const bName_ = document.getElementById("bName_");
const sName_ = document.getElementById("sName_");
const bLore_ = document.getElementById("bLore_");
const sLore_ = document.getElementById("sLore_");
const subLore_ = document.getElementById("subLore_");
const elImg_ = document.getElementById("elImg_");
const money_ = document.getElementById("money_");
const mana_ = document.getElementById("mana_");
const cost_ = document.getElementsByClassName("cost_");

//画像
const imageInput = document.getElementById("images");
//cropper
const image = document.getElementById('image');
const cropButton = document.getElementById('cropButton');

//入力欄
const name = document.getElementById("name");
const pLore = document.getElementById("pLore");
const lore = document.getElementById("lore");
const subLore = document.getElementById("subLore");
const sLore = document.getElementById("sLore");
const costs = document.getElementById("costs");

//コスト
const money = document.getElementById("money");
const mana = document.getElementById("mana");
const noCost = document.getElementById("none");

//属性
const noEl = document.getElementById("none");
const fire = document.getElementById("fire");
const water = document.getElementById("water");
const wood = document.getElementById("wood");
const stone = document.getElementById("stone");
const light = document.getElementById("light");
const darkness = document.getElementById("darkness");
const neptune = document.getElementById("neptune");
const venus = document.getElementById("venus");
const earth = document.getElementById("earth");
const moon = document.getElementById("moon");
const elements = document.getElementsByClassName("elements");

//エスケープ
function escape_html(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function (match) {
    return {
      "&": "&amp;",
      "'": "&#x27;",
      "`": "&#x60;",
      '"': "&quot;",
      "<": "&lt;",
      ">": "&gt;",
    }[match]
  });
}

function chAll() {
  setTimeout(() => {
    var node = document.getElementById("imgs");
    var mainEl = document.getElementById("main_");

    domtoimage
      .toPng(mainEl)
      .then(function (URL) {
        var newImg = new Image();
        newImg.src = URL;
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        node.appendChild(newImg);
      })
      .catch(function (error) {
        console.error("error");
      });
  }, 100);
}

let cropper;

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target.result;
      image.style.display = 'block';

      // インスタンスがある場合は破棄
      if (cropper) {
        cropper.destroy();
      }
      cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
      });
    };

    reader.readAsDataURL(file);
  }
});

// トリミングボタン
cropButton.addEventListener('click', () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas();
    const croppedDataUrl = canvas.toDataURL('image/png');

    img_.style.backgroundImage = `url(${croppedDataUrl})`;
    chAll();
  }
});

//雑貨化
function chSLore() {
  if (sLore.checked) {
    subLore.disabled = true;
    subLore_.style.display = "none";
    bLore_.style.display = "none";
    sLore_.style.display = "";
    bName_.style.display = "none";
    sName_.style.display = "";
    elImg_.style.display = "none";
    pLore.innerHTML = "説明(正確な描画は一行全角10文字まで)";
    lore.placeholder = "説明(\\nで改行)";
    // Array.from(elements).forEach(function (e) {
    //   e.disabled = true;
    // });

  } else {
    subLore.disabled = false;
    subLore_.style.display = "";
    bLore_.style.display = "";
    sLore_.style.display = "none";
    bName_.style.display = "";
    sName_.style.display = "none";
    elImg_.style.display = "";
    pLore.innerHTML = "説明(正確な描画は全角6文字まで)";
    lore.placeholder = "説明(守5, 75%攻5など)";
    // Array.from(elements).forEach(function (e) {
    //   e.disabled = false;
    // });
  }
  chAll();
}

//名前
const chName = () => {
  bName_.innerHTML = escape_html(name.value);
  sName_.innerHTML = escape_html(name.value);
  chAll();
}

name.addEventListener("change", chName);

//説明
const chLore = () => {
  bLore_.innerHTML = escape_html(lore.value);
  sLore_.innerHTML = escape_html(lore.value).replace("\\n", '<br>');
  chAll();
}

lore.addEventListener("change", chLore);

//サブ説明
const chSubLore = () => {
  subLore_.innerHTML = escape_html(subLore.value);
  chAll();
}

subLore.addEventListener("change", chSubLore);

//コスト数の変更
const chCosts = () => {
  console.log(cost_);
  Array.from(cost_).forEach(function (e) {
    e.innerHTML = costs.value;
  });
  chAll();
}

costs.addEventListener("change", chCosts);

//コスト種類の変更
function chCost() {
  if (money.checked) {
    mana_.style.display = "none";
    money_.style.display = "";
  } else if (mana.checked) {
    money_.style.display = "none";
    mana_.style.display = "";
  } else if (noCost.checked) {
    money_.style.display = "none";
    mana_.style.display = "none";
  }
  chAll();
}

//属性
var elImg = "light";
var fColor = "79, 79, 79";

function chEl() {
  if (!sLore.checked) {
    elImg_.style.display = "";
  }
  switch (true) {
    case none.checked:
      elImg = "none"
      fColor = "79, 79, 79";
      break;
    case fire.checked:
      elImg = "fire";
      fColor = "255, 102, 102";
      break;
    case water.checked:
      elImg = "water";
      fColor = "102, 102, 255";
      break;
    case wood.checked:
      elImg = "wood";
      fColor = "255, 153, 0";
      break;
    case stone.checked:
      elImg = "stone";
      fColor = "102, 136, 170";
      break;
    case light.checked:
      elImg = "light";
      fColor = "197, 197, 0";
      break;
    case darkness.checked:
      elImg = "darkness";
      fColor = "170, 85, 204";
      break;
    case neptune.checked:
      elImg = "none";
      fColor = "0, 170, 238";
      break;
    case venus.checked:
      elImg = "none";
      fColor = "0, 136, 0";
      break;
    case earth.checked:
      elImg = "none";
      fColor = "238, 170, 170";
      break;
    case moon.checked:
      elImg = "none";
      fColor = "187, 187, 119";
      break;
  }

  elImg_.style.backgroundImage = `url(./images/${elImg}.png)`;
  bName_.style.color = `rgb(${fColor})`;
  bLore_.style.color = `rgb(${fColor})`;
  sName_.style.color = `rgb(${fColor})`;
  sLore_.style.color = `rgb(${fColor})`;
  subLore_.style.color = `rgb(${fColor})`;
  chAll();
}



chAll();
