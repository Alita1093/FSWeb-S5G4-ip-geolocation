//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
function infoYansıt(data) {
  const mainBox = document.createElement("div");
  mainBox.classList.add("card");

  const cFlag = document.createElement("img");
  cFlag.src = data.ülkebayrağı;

  const innerBox = document.createElement("div");
  innerBox.classList.add("card-info");

  const adress = document.createElement("h3");
  adress.classList.add("ip");
  adress.textContent = data.sorgu;

  const country = document.createElement("p");
  country.classList.add("ulke");
  country.textContent = `${data.ülke}:${data.ülkeKodu}`;

  const cordinate = document.createElement("p");
  cordinate.textContent = `Enlem:${data.enlem} Boylam:${data.boylam}`;

  const city = document.createElement("p");
  city.textContent = `Şehir:${data.şehir}`;

  const timeZone = document.createElement("p");
  timeZone.textContent = `Saat dilimi:${data.saatdilimi}`;

  const currency = document.createElement("p");
  currency.textContent = `Para birimi:${data.parabirimi}`;

  const ISP = document.createElement("p");
  ISP.textContent = `ISP:${data.isp}`;

  innerBox.appendChild(adress);
  innerBox.appendChild(country);
  innerBox.appendChild(cordinate);
  innerBox.appendChild(city);
  innerBox.appendChild(timeZone);
  innerBox.appendChild(currency);
  innerBox.appendChild(ISP);

  mainBox.appendChild(cFlag);
  mainBox.appendChild(innerBox);
  return mainBox;
}

const eklenti = document.querySelector(".cards");

const connection = async function () {
  await ipAdresimiAl();
  axios
    .get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
    .then((response) => {
      eklenti.appendChild(infoYansıt(response.data));
    })
    .catch((error) => {
      console.log("Error:" + error);
    });
};
connection();
