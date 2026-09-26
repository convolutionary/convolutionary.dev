import { useEffect, useState } from "react";

// module-level cache so hopping between the manual and the desktop
// doesn't burn the 60 req/hr unauthenticated github limit
let cache = null;

export const useRepos = () => {
	const [state, setState] = useState(cache || { status: "loading", repos: [] });

	useEffect(() => {
		if (cache) return;
		let dead = false;
		(async () => {
			try {
				const r = await fetch("https://api.github.com/users/convolutionary/repos?per_page=100&sort=pushed");
				if (!r.ok) throw new Error(`github said ${r.status}`);
				const all = (await r.json()) || [];
				const repos = all
					.filter((x) => !x.fork && !x.archived)
					.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
				cache = { status: repos.length ? "ok" : "empty", repos };
			} catch {
				cache = null; // let a remount retry
				if (!dead) setState({ status: "error", repos: [] });
				return;
			}
			if (!dead) setState(cache);
		})();
		return () => { dead = true; };
	}, []);

	return state;
};
