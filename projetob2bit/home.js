const token = localStorage.getItem("token");

if(!token){
    window.location.href = "login.html";
}

const nameE = document.querySelector("#name");
const emailE = document.querySelector("#email");
const fotoE = document.querySelector("#avatar"); 
const logoutBtn = document.querySelector("#logout");

if(!token || token === "undefined"){ 
    localStorage.clear(); 
    window.location.href = "login.html";
}

console.log("Elemento Name:", nameE);
console.log("Elemento Email:", emailE);
console.log("Elemento Avatar:", fotoE);

nameE.textContent = localStorage.getItem("userName") || "";
emailE.textContent = localStorage.getItem("userEmail") || "";

async function loadProfile() {
    const cleanToken = token ? token.trim() : '';

  try {
    const response = await axios.get(
      "https://api.homologation.cliqdrive.com.br/auth/profile/",
      {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          Accept: "application/json;version=v1_web",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Perfil carregado com sucesso:", response.data);
    const data = response.data; 

    const avatarUrl = data.avatar?.url;

    nameE.textContent = data.name;
    emailE.textContent = data.email;
    fotoE.src = avatarUrl || "https://placehold.co/150x150";

    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userAvatar", avatarUrl);

    console.log("SUCESSO FINAL: Dados processados e salvos. Saindo do TRY.");

  } catch (err) {
    console.error("FALHA INESPERADA: O código chegou no CATCH.");
    console.error(err); 
    alert("Sessão expirada. Faça o login novamente");
    localStorage.clear();
    window.location.href = "login.html";
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

loadProfile();

