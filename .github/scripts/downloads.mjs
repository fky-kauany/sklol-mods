// Soma os downloads de cada mod (todos os anexos da release `mod-<id>`: as versões dele) e grava no
// `downloads` dele, no index.json. Roda na Action `downloads.yml`, com o
// GITHUB_TOKEN da própria Action (1000 pedidos por hora; uma página de 100 releases por pedido).
// O resto do índice não é mexido: ele é montado pelo `bun run skins publish-mods` do SkLoL.
import { readFileSync, writeFileSync } from "node:fs";

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const totals = new Map();

for (let page = 1; ; page++) {
	const response = await fetch(
		`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`,
		{
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${token}`,
			},
		},
	);
	if (!response.ok)
		throw new Error(`GitHub ${response.status}: ${await response.text()}`);
	const releases = await response.json();
	for (const release of releases) {
		const id = /^mod-(.+)$/.exec(release.tag_name)?.[1];
		if (!id) continue;
		const sum = release.assets.reduce((n, a) => n + a.download_count, 0);
		totals.set(id, (totals.get(id) ?? 0) + sum);
	}
	if (releases.length < 100) break;
}

const text = readFileSync("index.json", "utf8");
const index = JSON.parse(text);
let changed = 0;
for (const mod of index.mods) {
	const downloads = totals.get(mod.id) ?? 0;
	// Nunca desce: um anexo apagado (uma versão velha substituída) leva os downloads dele junto.
	if (downloads > mod.downloads) {
		mod.downloads = downloads;
		changed++;
	}
}
if (changed) {
	writeFileSync("index.json", `${JSON.stringify(index, null, "\t")}\n`);
}
console.log(`${changed} mods com downloads novos`);
