export const setSessionStorage = (key: string, value: string) => {
	sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string) => {
	return sessionStorage.getItem(key) || '';
};
