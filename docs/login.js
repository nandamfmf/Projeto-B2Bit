const formLogin = document.querySelector("#formLogin");
const emailInput = document.querySelector("#emailinp");
const passwordInput = document.querySelector("#senhainp");
const errorMessage = document.querySelector("#errorMessage");

formLogin.addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = ""; 

  try {
    const response = await axios.post(
        "https://api.homologation.cliqdrive.com.br/auth/login/",
    {email, password},

    {
        headers: {
            Accept: "application/json;version=v1_web",
            "Content-Type": "application/json"
        },
    }
);

    console.log("Status da Resposta:", response.status); // <--- DEVE SER 200
    console.log("Dados Completos:", response.data);

    const token = response.data.tokens.access;

    console.log("Token a ser salvo:", token);

    if (!token) {
    console.error("ERRO GRAVE: O token não foi capturado corretamente.");
    throw new Error("Falha ao obter token após sucesso.");
    }
    
    localStorage.setItem("token", token);

    const user = response.data.user;
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userAvatar", user.avatar?.url || "");

    window.location.href = "home.html";

    } catch (err) {
    console.log("Erro completo no login:", err);
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Dados retornados:", err.response.data);
    }
    errorMessage.textContent = "E-mail ou senha inválidos!";
  }
});

