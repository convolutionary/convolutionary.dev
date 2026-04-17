import { useEffect } from "react";

const listeners = new Set();
let current = "home";

export const setActiveSection = (id) => {
	if (id === current) return;
	current = id;
	listeners.forEach((fn) => fn(id));
};

export const useActiveSection = (fn) => {
	useEffect(() => {
		listeners.add(fn);
		fn(current);
		return () => listeners.delete(fn);
	}, [fn]);
};
