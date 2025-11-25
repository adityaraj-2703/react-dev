import React, { useEffect, useState } from "react";
import "./pokedex.css";

const ALLOWED = ["grass", "water", "fire"];

export default function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      // 1) Load Kanto Pokédex
      const res = await fetch("https://pokeapi.co/api/v2/pokedex/kanto");
      if (!res.ok) {
        throw new Error("Failed to load pokedex");
      }
      const data = await res.json();
      const entries = data && data.pokemon_entries ? data.pokemon_entries : [];

      // 2) Fetch Pokémon until we have up to 3 per allowed type
      const buckets = { grass: [], water: [], fire: [] };

      for (let i = 0; i < entries.length; i++) {
        if (
          ALLOWED.every(function (t) {
            return buckets[t].length >= 3;
          })
        ) {
          break;
        }

        const species = entries[i] && entries[i].pokemon_species;
        if (!species || !species.name) {
          continue;
        }
        const name = species.name;

        const pr = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
        if (!pr.ok) {
          continue;
        }
        const p = await pr.json();

        // collect type names
        const types = [];
        if (p.types && p.types.length) {
          for (let j = 0; j < p.types.length; j++) {
            const t = p.types[j];
            const tname = t && t.type && t.type.name ? t.type.name : null;
            if (tname) {
              types.push(tname);
            }
          }
        }

        // find first allowed type match
        var match = null;
        for (let k = 0; k < ALLOWED.length; k++) {
          if (types.indexOf(ALLOWED[k]) !== -1) {
            match = ALLOWED[k];
            break;
          }
        }
        if (!match) {
          continue;
        }
        if (buckets[match].length >= 3) {
          continue;
        }

        // pick a sprite
        let img = null;
        if (
          p.sprites &&
          p.sprites.other &&
          p.sprites.other["official-artwork"] &&
          p.sprites.other["official-artwork"].front_default
        ) {
          img = p.sprites.other["official-artwork"].front_default;
        } else if (p.sprites && p.sprites.front_default) {
          img = p.sprites.front_default;
        }

        // sum base stats
        let total = 0;
        if (p.stats && p.stats.length) {
          for (let s = 0; s < p.stats.length; s++) {
            const bs = p.stats[s] && p.stats[s].base_stat ? p.stats[s].base_stat : 0;
            total += bs;
          }
        }

        buckets[match].push({
          id: p.id,
          name: p.name,
          img: img,
          types: types,
          typeKey: match,
          total: total,
          rank: 0,
        });
      }

      // 3) Rank by total stats (asc) within each type
      for (let r = 0; r < ALLOWED.length; r++) {
        const key = ALLOWED[r];
        buckets[key].sort(function (a, b) {
          return a.total - b.total;
        });
        for (let i = 0; i < buckets[key].length; i++) {
          buckets[key][i].rank = i; // 0,1,2
        }
      }

      const out = buckets.grass.concat(buckets.water).concat(buckets.fire);
      setCards(out);
    } catch (e) {
      const msg = e && e.message ? e.message : "Unexpected error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Mini Pokédex</h1>
        <small>Fire • Water • Grass</small>
      </header>
      <main className="main">
        {loading ? <div className="muted">Loading…</div> : null}
        {error ? <div className="error">{error}</div> : null}
        {!loading && !error ? (
          <div className="grid">
            {cards.map(function (c) {
              return (
                <article key={c.typeKey + "-" + c.id} className={"card type-" + c.typeKey + " rank-" + c.rank}>
                  <div className="thumb">
                    {c.img ? <img src={c.img} alt={c.name} loading="lazy" /> : <span className="muted">No image</span>}
                  </div>
                  <div className="info">
                    <div className="top">
                      <h3 title={c.name}>{capitalize(c.name)}</h3>
                      <span className="id">#{c.id}</span>
                    </div>
                    <div className="badges">
                      {c.types.map(function (t) {
                        return (
                          <span key={t} className="badge">
                            {t}
                          </span>
                        );
                      })}
                    </div>
                    <div className="stats">
                      Total: <b>{c.total}</b>
                      <span className="rank">(rank {c.rank + 1})</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </main>
    </div>
  );
}

function capitalize(s) {
  if (!s || typeof s !== "string") return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
