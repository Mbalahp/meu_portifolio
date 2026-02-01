Portfólio — Instruções de publicação

Este repositório contém um template simples de portfólio estático para publicar no GitHub Pages.

Passos rápidos para publicar:

1) Inicialize git e faça o primeiro commit (execute na pasta `tarefa`):

```bash
git init
git add .
git commit -m "Initial portfolio template"
```

2) Crie um repositório no GitHub. Se pretende site de utilizador (username.github.io), nomeie o repositório como `USERNAME.github.io`.

3) Adicione o remote e envie:

```bash
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

4) Ativar GitHub Pages:
- Vá a *Settings → Pages* no repositório e selecione a branch `main` e pasta `/ (root)`.
- Salve; o site ficará disponível em `https://USERNAME.github.io/REPO` (ou `https://USERNAME.github.io` para repo com esse nome).

Opcional — usar `gh-pages` branch:

```bash
git checkout -b gh-pages
git push -u origin gh-pages
```
Depois configure Pages para servir a partir de `gh-pages`.

Substitua o conteúdo de `index.html`, `assets/css/style.css` e as imagens em `assets/img/` com seus dados. Se quiser, eu posso preencher os placeholders com suas informações e gerar as imagens necessários.

Se quiser deploy automático via GitHub Actions, diga que eu adiciono o workflow.
