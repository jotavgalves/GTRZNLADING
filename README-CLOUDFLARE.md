# La Rumba Jampa — Deploy no Cloudflare Pages

O repositório está preparado como site estático + Cloudflare Pages Functions.

## Estrutura

- `index.html` — landing pública PT/ES.
- `admin/index.html` — painel de edição em `/admin`.
- `functions/api/site.js` — configuração pública da landing.
- `functions/api/admin/*` — login, leitura, gravação e upload.
- `functions/media/[[path]].js` — entrega das imagens salvas no R2.
- `_routes.json` — somente `/api/*` e `/media/*` passam por Functions; os demais assets continuam estáticos.

## 1. Criar o projeto Pages

No Cloudflare, importe o repositório `jotavgalves/GTRZNLADING`.

Configuração recomendada:

- Production branch: `main`
- Framework preset: nenhum
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: raiz do repositório

## 2. D1 obrigatório para o painel

Crie um banco D1 e adicione ao projeto Pages com o binding `DB`.

Não precisa executar migration manual. A primeira chamada ao painel cria automaticamente a tabela `site_config` e grava a configuração padrão.

Sem D1, a landing continua abrindo com os valores padrão do HTML, mas o painel não consegue persistir alterações.

## 3. Secrets do painel

Nas variáveis/secrets do projeto configure:

- `ADMIN_PASSWORD` — senha usada em `/admin`.
- `SESSION_SECRET` — string longa e aleatória usada para assinar a sessão.

Exemplo: gere 32 bytes aleatórios com `openssl rand -hex 32` ou um gerenciador de senhas.

Nunca grave esses valores no GitHub.

## 4. R2 para upload das fotos dos DJs

Opcional, mas recomendado.

Crie um bucket R2 e adicione ao projeto Pages com o binding `MEDIA`.

O painel permite subir a foto de Vogn e Glitzy. O upload vai para o R2 e a própria aplicação serve a imagem em `/media/...`.

Se o binding `MEDIA` não existir, o painel continua permitindo colar uma URL de imagem manualmente.

## 5. Google Maps

O painel possui:

- endereço do local;
- link do botão “Como chegar”;
- URL do iframe do Google Maps;
- preview do mapa dentro do admin.

A landing exibe o iframe com `loading="lazy"`.

O valor padrão usa `https://www.google.com/maps?q=...&output=embed`, portanto não exige chave da Google Maps API.

## 6. Painel

Depois do deploy acesse:

`https://SEU-DOMINIO/admin`

No painel é possível editar:

- lote e preço;
- data e horário;
- cidade, local e endereço;
- WhatsApp, Sympla, Instagram e email;
- Google Maps;
- gêneros musicais PT/ES;
- textos principais PT/ES;
- biografias de Vogn e Glitzy;
- fotos dos DJs;
- ativar/desativar seções.

As alterações são gravadas no D1 e aparecem na landing sem novo deploy.

## 7. Depois de criar bindings ou secrets

Faça um novo deploy do projeto Pages para garantir que os bindings estejam disponíveis nas Pages Functions.
