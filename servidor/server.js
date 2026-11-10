import express from 'express'

const app = express()
const porta = 3000

// sprint 01
app.get('/', (req, res) => {
  res.send('Seja muito bem-vindo à Central de Informações Escola Linda')
})

// início dados 01
let cursos = [
  { "id": 1, "nome": "Desenvolvimento de Sistemas" },
  { "id": 2, "nome": "Redes de Computadores" },
  { "id": 3, "nome": "Administração" }
]

let instituicao = {
  "nome": "Escola Linda",
  "cidade": "São Paulo",
  "tipo": "Ensino Técnico"
}

let professores = [
  { "id": 1, "nome": "Thiago", "disciplina": "Biologia" },
  { "id": 2, "nome": "Eduardo", "disciplina": "Java" },
  { "id": 3, "nome": "Kevin", "disciplina": "Sistemas Operacionais" },
]

let ajuda = {
  Status: 'Status informando que o servidor está online',
  Escola: 'Informações da escola',
  Cursos: 'Mostra os cursos e informações referentes',
  Professor: 'Mostra os professores'
}
// fim dados 01

app.get('/status', (req, res) => {
  res.json({ status: 'Servidor Online' })
})

app.get('/escola', (req, res) => {
  res.json(instituicao)
})

app.get('/cursos', (req, res) => {
  res.json(cursos)
})

app.get('/professor', (req, res) => {
  res.json(professores)
})

app.get('/ajuda', (req, res) => {
  res.send(ajuda)
})

//DESAFIO EXTRA 01
app.get('/requisicao', (req, res) => {
  res.json({
    metodo: req.method,
    caminho: req.path,
    mensagem: "Solicitação recebida com sucesso!"
  });
});

// sprint 02

// início dados 02
const mensagens = [
  { id: 1, usuario: "Ana", texto: "Bom dia!" },
  { id: 2, usuario: "Pedro", texto: "Olá!" },
  { id: 3, usuario: "Maria", texto: "Tudo bem?" },
  { id: 4, usuario: "Lucas", texto: "Como vai?" },
  { id: 5, usuario: "Carla", texto: "Até logo!" }
];
// fim dados 02

function listarMensagens() { return mensagens; }

app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));
// app.get("/status", (req, res) => res.json({ status: "online", sprint: 2 }));
app.get("/sobre", (req, res) => res.send("Projeto Mensageiro Local"));
app.get("/mensagens", (req, res) => res.json(listarMensagens()));

app.get("/mensagens/:id", (req, res) => {
  const mensagem = mensagens.find(m => m.id === Number(req.params.id));
  if (!mensagem) return res.status(404).json({ erro: "Não encontrada" });
  res.json(mensagem);
});

app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));

// sprint 03

function consultar(falhar = false) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        falhar
        ? reject(new Error('Falhou'))
        : resolve(mensagens);
    }, 1000);
});
}

app.get("/mensagens-then", (req, res) => {
    consultar()
    .then(lista => res.json(lista))
    .catch(() => res.status(500).json({erro: "Falha na consulta"}));
});

app.get("/mensagens-async", async (req, res) => {
    try {
        res.json(await consultar());
    } catch (error) {
       res.status(500).json({erro: "Falha na consulta"});
    }
});

app.get("/mensagens-erro", async (req, res) => {
    try {
        res.json(await consultar(true));
    } catch (erro) {
        res.status(500).json({erro: "Falha simulada"});
    }
});

// porta
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});