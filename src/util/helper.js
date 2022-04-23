export const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export const range = (start, length) => Array.from(new Array(length), (_, i) => start + i);

export const isExist = value => value !== null && value !== '' && typeof value !== 'undefined';

export const isEmpty = value => !isExist(value);

export const normalizePrice = num => {
	if (num.length <= 3) {
		return num;
	}

	return `${normalizePrice(num.slice(0, -3))},${num.slice(-3)}`;
};

export const chunk = (str, n) => str.split(new RegExp(`(.{${n}})`)).filter(x => x.length > 0);

// https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
export const isInternetExplorer = () =>
	window.navigator.userAgent.indexOf('MSIE ') > 0 ||
	window.navigator.userAgent.indexOf('Trident/') > 0;

export const focusInChildren = (relatedTarget, currentTarget) => {
	if (relatedTarget === null) {
		return false;
	}

	if (relatedTarget === currentTarget) {
		return true;
	}

	return focusInChildren(relatedTarget.parentNode, currentTarget);
};
