# SkLoL Mods

O repositório oficial de mods do [SkLoL](https://github.com/fky-kauany/sklol-plugin): mapas, interface, sons, fontes, announcer, recall e outros mods que não são skin de campeão (as skins ficam no [sklol-skins](https://github.com/fky-kauany/sklol-skins)). É o que a Loja do app mostra.

Nada aqui é editado à mão. Tudo é gerado pelo `bun run skins publish-mods` do SkLoL, e os números de download são atualizados por uma GitHub Action.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.json` | O catálogo: todos os mods e os criadores, num arquivo só. É o que o app lê. |
| `creators.json` | O perfil de cada criador: nome, avatar, bio e redes. |
| `creators/<id>.webp` | O avatar de cada criador. |
| `mods/<id>/mod.json` | O mod inteiro, com a descrição (e os créditos que a licença pede). |
| `mods/<id>/thumb.webp` | A capa do mod (1280x720). |

Os pacotes (`.fantome`, `.modpkg`) ficam nas **releases**: cada mod tem a release `mod-<id>`, e cada versão é um anexo dela (`<id>-v1.fantome`).

## Um mod no índice

```json
{
	"id": "dark-mode-summoner-s-rift",
	"name": "Dark Mode Summoner's Rift",
	"kind": "maps",
	"creator": "pimek",
	"patch": "16.20",
	"publishedAt": "2026-10-15",
	"updatedAt": "2026-10-15",
	"downloads": 0,
	"thumb": "mods/dark-mode-summoner-s-rift/thumb.webp?v=1a2b3c4d",
	"file": { "version": 1, "asset": "dark-mode-summoner-s-rift-v1.fantome", "size": 151069762, "sha256": "..." },
	"maps": [11]
}
```

O `kind` é o tipo: `maps`, `mobs` (minions e monstros da selva), `fonts`, `ui`, `icons`, `sounds`, `announcer`, `vfx`, `recall` ou `other`. A categoria da loja sai dele.

## Licenças

Cada mod vem de um criador da comunidade, com a licença que ele escolheu (só as Creative Commons que deixam redistribuir). A descrição de cada um traz quem fez, o link do original, a licença e se o SkLoL mudou alguma coisa (o conserto e a otimização).
